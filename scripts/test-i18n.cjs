const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const exportsObject = {};
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync('lib/i18n.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText,
  { exports: exportsObject }
);
const { localizedHref, englishPath, GERMAN_PATHS } = exportsObject;

function pages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? pages(file) : entry.name === 'page.tsx' ? [file] : [];
  });
}
const actual = pages('app/de').map(file => '/' + path.relative('app/de', path.dirname(file)).replaceAll('\\', '/'));
assert.deepEqual([...GERMAN_PATHS].sort(), actual.sort(), 'Every published DE route must be represented.');
for (const base of GERMAN_PATHS) {
  const de = base === '/' ? '/de' : `/de${base}`;
  assert.equal(localizedHref(base, 'de'), de);
  assert.equal(localizedHref(de, 'de'), de);
  assert.equal(localizedHref(de, 'en'), base);
  assert.equal(localizedHref(base + '?campaign=de#demo', 'de'), de + '?campaign=de#demo');
}
assert.equal(englishPath('/de/about/'), '/about');
for (const href of [
  '/contact',
  '/resources/blogs/article',
  '/privacy',
  '/api/lead',
  '/about/image.svg',
  'https://external.com/about',
  '//external.com/about',
  'mailto:hello@example.com',
  '#demo',
]) {
  assert.equal(localizedHref(href, 'de'), href, `Do not invent a translation for ${href}`);
}

// Exercise redirects and preference handling without starting a server.
const middlewareExports = {};
const nextResponse = {
  redirect: url => ({ redirect: url }),
  next: options => ({
    ...options,
    cookieChanges: [],
    cookies: {
      set(...args) {
        this.changes.push(args);
      },
      changes: [],
    },
  }),
};
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync('middleware.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  {
    exports: middlewareExports,
    Headers,
    require: name => (name === './lib/i18n' ? exportsObject : { NextResponse: nextResponse }),
  }
);
function request(route, preference) {
  const url = new URL('https://5flowtech.com' + route);
  url.clone = () => new URL(url);
  return {
    nextUrl: url,
    headers: new Headers(),
    cookies: { get: () => (preference ? { value: preference } : undefined) },
  };
}
const deRedirect = middlewareExports.middleware(request('/products/wave?test=1', 'de'));
assert.equal(deRedirect.redirect.href, 'https://5flowtech.com/de/products/wave?test=1');
const enRequest = middlewareExports.middleware(request('/products/wave', 'en'));
assert.equal(enRequest.redirect, undefined);
assert.equal(enRequest.request.headers.get('x-site-language'), 'en');
const untranslated = middlewareExports.middleware(request('/contact', 'de'));
assert.equal(untranslated.redirect, undefined);
assert.equal(untranslated.request.headers.get('x-site-language'), 'de');
assert.equal(untranslated.request.headers.get('x-site-content-language'), 'en');
const directDe = middlewareExports.middleware(request('/de/about'));
assert.equal(directDe.request.headers.get('x-site-content-language'), 'de');
assert.equal(directDe.cookies.changes[0][1], 'de');
console.log('Language routing checks passed for all German routes and preference redirects.');
