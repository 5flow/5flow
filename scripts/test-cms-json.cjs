const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    require: name => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  }, { filename: file });
  return exports;
}

const json = load('lib/cms/json.ts');
const brokenChallenges = `[
  {
    "title": "Hohes Compliance-Risiko",
    "buttonText": "Jetzt Demo buchen,
    "linkUrl": "/solutions/artwork-management"
  }
]`;
const brokenBenefits = `[
  {
    "title": "Auch bei großen Mengen,
    "subtitle": "10 oder 10.000 SKUs"
  },
  {
    "title": "Gleichbleibende Qualität,
    "subtitle": "Einheitliche Ergebnisse über alle Märkte"
  }
]`;

async function run() {
  const valid = [{ title: 'Größe, Qualität', bodyHtml: '„Freigaben“, apostrophe’s, comma, } and escaped "quotes"' }];
  assert.equal(JSON.stringify(json.parseCmsJson(JSON.stringify(valid))), JSON.stringify(valid));
  assert.equal(json.parseCmsJson('fragmented-documentation'), null);
  assert.equal(json.parseCmsJson('[{"title": "unrecoverable}]'), null);
  assert.equal(json.parseCmsJson('[{"title": "Beratung",},]')[0].title, 'Beratung');

  const application = load('lib/cms/application.ts', {
    './json': json,
    './client': { wpFetch: async () => [{ meta: {}, acf: {
      challenges_items_json: brokenChallenges.replace(/\n/g, '\r\n'),
      benefits_items_json: brokenBenefits,
    } }] },
  });
  const app = await application.getApplication('test-de');
  assert.equal(app.challenges.items[0].buttonText, 'Jetzt Demo buchen');
  assert.equal(app.challenges.items[0].buttonLink, '/solutions/artwork-management');
  assert.equal(app.benefits.items.length, 2);
  assert.equal(app.benefits.items[1].title, 'Gleichbleibende Qualität');

  const cards = [{ title: 'Individuelle Lösungen', subtitle: 'Für Ihr Team', body_html: 'Maßgeschneiderte Lösungen.', link_url: '/products/mediabox', icon_key: 'puzzle' }];
  let acf = { how_body_html: JSON.stringify(cards), how_description: 'Ein Partner. Drei Wege.' };
  const homepage = load('lib/cms/homepage.ts', {
    './json': json,
    './client': { wpFetch: async () => [{ meta: {}, acf }] },
  });
  const home = await homepage.getHomepage('home-3');
  assert.equal(home.how.items[0].bodyHtml, cards[0].body_html);
  assert.equal(home.how.items[0].subtitle, cards[0].subtitle);
  assert.equal(home.how.items[0].iconKey, 'puzzle');
  assert.equal(home.how.bodyHtml, acf.how_description);
  acf = { how_body_json: JSON.stringify(cards) };
  assert.equal((await homepage.getHomepage()).how.bodyHtml, undefined);
  acf = { how_body_html: '<p>Existing English description</p>' };
  assert.equal((await homepage.getHomepage()).how.bodyHtml, acf.how_body_html);
  acf = { how_items_json: JSON.stringify([{ title: 'Canonical cards' }]), how_body_html: JSON.stringify(cards) };
  assert.equal((await homepage.getHomepage()).how.items[0].title, 'Canonical cards');
  console.log('CMS JSON regression checks passed.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
