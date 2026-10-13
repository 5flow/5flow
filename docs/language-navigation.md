# English and German navigation

The header selector switches between English and German before the demo button
on desktop and beside the menu button on mobile. Selecting a language writes the
essential `5flow-language` preference cookie for one year.

For all 23 existing German routes, switching preserves the current page, query
string, and fragment. When selecting German on a page without a translation, the
selector opens `/de`. Translated pages read their existing German WordPress entries.

Internal Next links use `components/core/localized-link.tsx`, which chooses the
published translation using `lib/i18n.ts`. The middleware also redirects English
requests for translated pages when German is selected, covering plain CMS anchors
and direct navigation. Unsupported translations keep their existing URL and the
German preference. External URLs, downloads, API routes, and fragments are preserved.

Contact, consulting, resources, and legal pages currently have no German route.
These remain available at their existing English URLs. Add a German route and its
path to `GERMAN_PATHS` when a translation is ready; do not add links to missing routes.

Shared English/German page implementations are in adjacent `content.tsx` files.
Route `page.tsx` files export only Next.js-supported exports, allowing production
builds without invalid custom page exports. `npm run build` uses the standard
Next.js production builder; the Turbopack build was failing during page-data
collection with missing generated modules in this workspace.

Run `node scripts/test-i18n.cjs` for route coverage and cookie redirect checks.
The production deployment must include the new middleware and shared content files.
Use the existing `CMS_ENABLED=true` production setting to read the translated CMS
content. This repository change does not deploy the site.
