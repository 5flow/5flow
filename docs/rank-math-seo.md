# Rank Math titles and descriptions

WordPress remains the backend at `cms.5flowtech.com`. Keep its search engine
visibility disabled. The frontend imports only the Rank Math title and meta
description through `lib/cms/seo.ts`; it does not import CMS robots directives,
canonical URLs, social tags, or schema.

Each existing frontend page calls `getPageMetadata` with the same WordPress slug
as its content. German routes use their translated entries (for example,
`home-3` and `wave-2`). Blog, case study, and podcast detail routes use
`getPostMetadata` with the post slug. The helper first resolves the WordPress
permalink, then requests Rank Math's `getHead` REST endpoint.

To change metadata, edit the corresponding WordPress page or post, update the
Rank Math snippet, and publish/update it. Requests use the existing uncached CMS
fetcher. Missing entries, empty metadata fields, or API failures preserve the
frontend's fallback metadata. No CMS indexing settings are changed.

New published WordPress pages are handled automatically by `app/[...slug]/page.tsx`
at the same permalink path on the frontend domain, including nested pages and
`/de/` translations. They render the WordPress title and editor content in a
standard page layout and load Rank Math titles and descriptions automatically.
Existing custom frontend routes retain their layouts and take precedence.
Language folders are detected from the URL using language codes, including
regional codes such as `/es/`, `/it/`, `/ja/`, and `/pt-br/`. The corresponding
WordPress language must be configured with the same folder/code. Metadata is
fetched from the resolved page's exact permalink; no language allowlist is
required. Language homepages (such as `/es/`) can use a different CMS slug.
The document's HTML language also follows that URL language. This does not
automatically translate shared navigation, footer copy, or add language-picker
options; those remain controlled by the site's existing navigation setup.
Drafts, password-protected pages, and unmatched paths return 404. Pages built
only with custom ACF sections still need a custom frontend layout to render
those sections. New posts use the existing blog, case study, and podcast routes.

Validation: TypeScript and ESLint pass. Focused checks cover entity decoding,
the two-field allowlist, translated permalink lookup, and API/missing-entry
fallbacks. Both live homepage lookups return their separate saved Rank Math
titles and descriptions.
