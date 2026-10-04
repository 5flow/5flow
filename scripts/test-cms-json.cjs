const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(
    source,
    {
      exports,
      require: name => {
        if (name === './page-header') return pageHeader;
        assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
        return dependencies[name];
      },
    },
    { filename: file }
  );
  return exports;
}

const pageHeader = load('lib/cms/page-header.ts', { './client': { wpFetch: async () => [] } });
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
  assert.equal(
    pageHeader.resolvePageHeaderTitle({ acf: { page_header_title: ' Lebensmittel & Getränke ' } }),
    'Lebensmittel & Getränke'
  );
  assert.equal(
    pageHeader.resolvePageHeaderTitle({ meta: { page_header_title: ' ' }, acf: { page_header_title: 'Deutsch' } }),
    'Deutsch'
  );
  assert.equal(pageHeader.resolvePageHeaderTitle({ title: { rendered: 'CMS editor title' } }), undefined);
  assert.equal(pageHeader.resolvePageHeaderTitle(null), undefined);
  let requestedSlug;
  const headers = load('lib/cms/page-header.ts', {
    './client': {
      wpFetch: async endpoint => {
        requestedSlug = endpoint;
        return [{ acf: { page_header_title: 'Lebensmittel & Getränke' } }];
      },
    },
  });
  assert.equal(await headers.getPageHeaderTitle('food-beverages-2'), 'Lebensmittel & Getränke');
  assert.equal(requestedSlug, '/wp-json/wp/v2/pages?slug=food-beverages-2');
  const valid = [{ title: 'Größe, Qualität', bodyHtml: '„Freigaben“, apostrophe’s, comma, } and escaped "quotes"' }];
  assert.equal(JSON.stringify(json.parseCmsJson(JSON.stringify(valid))), JSON.stringify(valid));
  assert.equal(json.parseCmsJson('fragmented-documentation'), null);
  assert.equal(json.parseCmsJson('[{"title": "unrecoverable}]'), null);
  assert.equal(json.parseCmsJson('[{"title": "Beratung",},]')[0].title, 'Beratung');

  const application = load('lib/cms/application.ts', {
    './json': json,
    './client': {
      wpFetch: async () => [
        {
          meta: {},
          acf: {
            page_header_title: 'Anwendungen',
            challenges_items_json: brokenChallenges.replace(/\n/g, '\r\n'),
            benefits_items_json: brokenBenefits,
          },
        },
      ],
    },
  });
  const app = await application.getApplication('test-de');
  assert.equal(app.pageHeaderTitle, 'Anwendungen');
  assert.equal(app.challenges.items[0].buttonText, 'Jetzt Demo buchen');
  assert.equal(app.challenges.items[0].buttonLink, '/solutions/artwork-management');
  assert.equal(app.benefits.items.length, 2);
  assert.equal(app.benefits.items[1].title, 'Gleichbleibende Qualität');

  const cards = [
    {
      title: 'Individuelle Lösungen',
      subtitle: 'Für Ihr Team',
      body_html: 'Maßgeschneiderte Lösungen.',
      link_url: '/products/mediabox',
      icon_key: 'puzzle',
    },
  ];
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

  const artworkItems = [
    {
      title: 'Zentrale Plattformen',
      description: 'Ein Ort für Dateien.',
      imageSrc: '/solutions/1.svg',
      iconName: 'MonitorCog',
    },
    { title: 'Automatisierte Workflows', description: 'Freigaben bleiben im Zeitplan.' },
    {
      title: 'Klare Briefings',
      description: 'Projekte starten mit vollständigen Informationen, zugeschnitten auf Ihre Vorgaben.',
    },
    { title: 'Dashboards', description: 'Sehen Sie alles, was gerade läuft.' },
  ];
  const brokenArtwork = JSON.stringify(artworkItems, null, 2).replace('Vorgaben.",', 'Vorgaben.,');
  const solution = load('lib/cms/solution.ts', {
    './json': json,
    './client': { wpFetch: async () => [{ meta: {}, acf: { how_items_json: brokenArtwork } }] },
  });
  const artwork = await solution.getSolution('artwork-management-2');
  assert.equal(artwork.how.items.length, 4);
  assert.equal(artwork.how.items[2].bodyHtml, artworkItems[2].description);
  assert.equal(artwork.how.items[0].imageUrl, '/solutions/1.svg');
  assert.equal(artwork.how.items[0].iconKey, 'MonitorCog');

  let aiPage = {
    meta: {},
    acf: {
      ready_content_json: JSON.stringify({ human_title: 'Legacy human heading', final_title: 'Legacy final heading' }),
      ready_human_title: 'KI unterstützt. Menschen entscheiden.',
      ready_human_description: 'Ihr Team entscheidet.',
      ready_final_title: 'Bereit für QC Assist?',
      ready_final_description: 'QC Assist in Aktion erleben.',
      ready_highlights_json: '["Bereit"]',
    },
  };
  const aiSolutions = load('lib/cms/ai-solutions.ts', { './client': { wpFetch: async () => [aiPage] } });
  const ai = await aiSolutions.getAiSolutions('ai-solutions-2');
  assert.equal(ai.ready.humanTitle, aiPage.acf.ready_human_title);
  assert.equal(ai.ready.humanDescription, aiPage.acf.ready_human_description);
  assert.equal(ai.ready.finalTitle, aiPage.acf.ready_final_title);
  assert.equal(ai.ready.finalDescription, aiPage.acf.ready_final_description);
  assert.equal(ai.ready.highlights[0], 'Bereit');
  aiPage = {
    meta: {},
    acf: { ready_content_json: '{"human_title":"Legacy human heading","final_title":"Legacy final heading"}' },
  };
  assert.equal((await aiSolutions.getAiSolutions()).ready.humanTitle, 'Legacy human heading');
  assert.equal((await aiSolutions.getAiSolutions()).ready.finalTitle, 'Legacy final heading');

  for (const source of ['meta', 'acf']) {
    const page = { meta: {}, acf: {} };
    page[source] = {
      how_title: 'Wie funktioniert es?',
      how_heading_highlight: 'Wie',
      how_items_json: '[{"title":"CMS step","body_html":"Schrittbeschreibung"}]',
    };
    const industry = load('lib/cms/application.ts', { './json': json, './client': { wpFetch: async () => [page] } });
    const data = await industry.getApplication('retail-2');
    assert.equal(data.how.title, 'Wie funktioniert es?');
    assert.equal(data.how.headingHighlight, 'Wie');
    assert.equal(data.how.items[0].bodyHtml, 'Schrittbeschreibung');
  }
  console.log('CMS JSON regression checks passed.');
}
run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
