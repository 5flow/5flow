# Technical Design Document (TDD)

## 1. Purpose

Define the technical approach for integrating a headless WordPress CMS into the existing Next.js codebase (`5flow`). This enables dynamic content management for marketing/legal assets while preserving performance, security, and developer ergonomics.

## 2. High-Level Architecture

```
+----------------------+          +----------------------------+
|  WordPress Headless  |  Webhook |  Next.js (App Router)      |
|  (REST / GraphQL)    +--------->+  /api/revalidate           |
|  Auth, Revisions     |          |  ISR + Preview Mode        |
+----------+-----------+          +------+----------+----------+
           ^                                 |          |
           |  Fetch (build/ISR)              |          |
           |                                  v          v
           |                               Components  lib/cms/* adapters
           |                                           (schema mapping)
           |                                     Observability & Cache
           v
   Media CDN / WP files
```

- WordPress acts as the single source of truth for target content types.
- Next.js uses static generation with ISR (Incremental Static Regeneration) per page + on-demand revalidation via webhook.
- A CMS Adapter layer abstracts WordPress API specifics behind normalized TypeScript interfaces used by components.

## 3. Content Type Mapping & TypeScript Interfaces

Create `lib/cms/types.ts` defining normalized interfaces. Example:

```ts
export interface CmsHeroSection {
  id: string;
  identifier: string; // stable key used by front-end component
  title: string;
  bodyHtml: string; // already sanitized
  media: CmsMediaAsset[];
  cta?: CmsCtaBlock;
  highlightStyle?: 'default' | 'inline-highlight' | 'pattern-overlay';
  sortOrder: number;
}

export interface CmsLegalPage {
  slug: string;
  title: string;
  effectiveDate: string; // ISO date
  bodyHtml: string;
  revisionNotes?: string;
  updatedAt: string;
  version: number;
}

export interface CmsBlogPost {
  /* ... */
}
// Additional interfaces for products, solutions, applications, navigation labels, footer content, CTA blocks.
```

Design principle: interfaces reflect front-end consumption shape, not necessarily WP raw schema. Raw WP JSON will be transformed.

## 4. CMS Adapter Layer

### Application and homepage JSON textareas

- Application challenges and benefits use `challenges_items_json` and `benefits_items_json` in page meta or ACF. Both snake_case and camelCase item properties are normalized by the adapter.
- Homepage cards use `how_items_json` (or `how_items`). The field labeled **How Body JSON** is also supported as `how_body_html` or `how_body_json`; parsed items become cards rather than section description text. `how_description` supplies the section description, and each item's `subtitle` supplies its card lead.
- `lib/cms/json.ts` parses valid JSON first to preserve punctuation and German text. It also recovers a missing closing quote before a comma at the end of a string property line when the next line is another property. Other unparseable content continues to use the existing fallback behavior. Editors should still save valid JSON in WordPress.
- Run `node scripts/test-cms-json.cjs` to check German content recovery, valid-text preservation, homepage field aliases, and existing HTML descriptions.

Directory: `lib/cms/`
Files:

- `client.ts`: low-level fetch with auth, retry, rate-limit.
- `transform.ts`: mapping WP JSON -> normalized interfaces.
- `legal.ts`, `blogs.ts`, `hero.ts`, etc.: domain-specific fetch functions (`getLegalPage(slug)`, `listBlogPosts(pagination)`).
- `preview.ts`: functions to retrieve draft revisions (requires preview token / `?status=draft`).
- `revalidate.ts`: helper to parse webhook payload and determine revalidation strategy.

Example fetch wrapper:

```ts
const WP_BASE = process.env.WP_BASE_URL!;
const WP_TOKEN = process.env.WP_API_TOKEN!; // JWT or application password

async function wpFetch(path: string, init: RequestInit = {}) {
  const url = `${WP_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${WP_TOKEN}`,
      Accept: 'application/json',
      ...(init.headers || {}),
    },
    next: { revalidate: 0 }, // avoid Next caching at this layer
  });
  if (!res.ok) {
    throw new Error(`WP fetch failed ${res.status} ${path}`);
  }
  return res.json();
}
```

## 5. Data Fetch Strategy (Next.js App Router)

- Pages under `app/` that currently use static markdown will be refactored to call CMS adapter inside `generateStaticParams` (for dynamic slugs) and `generateMetadata` for SEO where needed.
- Use `fetch` with `next: { revalidate: <TTL> }` for baseline ISR (e.g., 3600s). Legal pages may have longer TTL but rely on on-demand revalidation for immediate updates.
- Blog listing pages: implement pagination; caching layer (optional) via edge runtime if needed.

## 6. Revalidation Mechanism

Create endpoint `app/api/revalidate/route.ts`:
Responsibilities:

1. Verify HMAC or shared secret from WordPress webhook.
2. Parse payload: `{type: 'legalPage' | 'blogPost' | 'heroSection' | ... , slugs: string[]}`.
3. Call `res.revalidate(path)` for each affected route OR use `revalidateTag` if adopting tag-based caching.
4. Emit structured log with correlation id.

Example sketch:

```ts
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret');
  if (secret !== process.env.WP_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  // Determine affected paths
  // await res.revalidate(`/privacy`); // For example
  return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
}
```

Decision: Prefer path-based revalidation for explicit clarity; consider tag-based approach (e.g., `revalidateTag('legalPages')`) later.

## 7. Preview Mode

Endpoint `app/api/preview/route.ts`:

1. Accept query params `type`, `slug`, `token`.
2. Validate token by calling WP preview endpoint (or verifying ephemeral signed token).
3. Activate Next.js preview mode using `draftMode().enable()`.
4. Redirect to target path where components detect preview mode and fetch draft content via adapter `getDraftLegalPage` etc.

Components adapt by reading a `isPreview` flag from `headers()` or `cookies()` to select draft fetchers.

## 8. Sanitization & Security

- WordPress raw rich text sanitized server-side before transform: allowlist tags (per PRD) using a sanitization library (e.g., `sanitize-html`). Implement in `transform.ts`.
- Enforce character limits and alt text presence during transform; log warnings if missing (do not block unless critical).
- Secrets: `WP_API_TOKEN`, `WP_WEBHOOK_SECRET` stored in platform secret manager (Vercel/Env). Do not commit to repo.
- Rate limiting for webhook endpoint (basic sliding window in-memory, may upgrade to external store if needed).
- MFA / strong passwords handled by WordPress host (out of scope for Next.js layer).

## 9. Authentication (WordPress -> Next.js)

Webhook security options:

1. Shared secret header (simplest).
2. HMAC signature of payload body (`X-Signature`) using SHA256 + secret to prevent tampering.
   Chosen: HMAC for integrity. Implementation details:

```ts
import crypto from 'crypto';
function verifySignature(secret: string, rawBody: string, signature: string) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
```

Need raw body: use Next.js config to disable automatic body parsing for that route if necessary.

## 10. Plugin & Technology Selection (WordPress Side)

Required plugins (tentative):

- JWT / Application Passwords for API auth.
- Revision / Diff viewer (native revisions plus diff enhancer).
- Headless content model builder (ACF or WPGraphQL + ACF for structured fields).
- Media optimization plugin (e.g., ShortPixel) or rely on Next.js optimization only.
- Webhook plugin (or custom function) to fire events on publish / scheduled publish.
- Role management (capabilities assignments; may be native + small plugin for custom roles).

GraphQL vs REST:

- GraphQL (WPGraphQL) preferred for selective field querying & versioning.
- Fallback to REST for endpoints not exposed (e.g., revision diffs). Adapter functions choose appropriate transport.

## 11. Deployment & Environments

Environments: `development`, `staging`, `production`.

- Separate WP instance for staging mirrored content to test migrations and plugin updates.
- Environment variables mirrored across Vercel projects with distinct secrets.
- Migration scripts run against staging first; content freeze procedure documented.

## 12. Migration Tooling

Create `scripts/migrate/` Node scripts:

- `legal-to-wp.ts`: Reads existing `public/legal/*.md`, converts to HTML (markdown parser), pushes via WP REST/GraphQL mutation.
- `blogs-to-wp.ts`: If migrating blogs; handles front-matter (if any) -> ACF fields.
- Maintains mapping file `scripts/migrate/mapping.json` storing old file path -> new WP ID for rollback checks.
  Dry-run mode prints summary without performing writes.

## 13. Observability & Logging

Add `lib/log.ts` wrapper over `console` with structured JSON output:

```ts
export function log(event: string, data: Record<string, unknown>) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...data }));
}
```

Use in webhook route, preview route, adapter fetches (error cases only). Later integrate with external provider by replacing implementation.
Metrics (future): integrate with edge analytics or serverless function metrics.

## 14. Error Handling Strategy

Categories:

- Fetch errors: wrap in `CmsFetchError` (include `status`, `endpoint`). Front-end shows fallback content + banner for legal pages.
- Transform errors: treat as fatal; log and skip publishing (should surface during preview).
- Webhook errors: respond non-200 -> WordPress plugin retries (configure exponential backoff). Add idempotency key using WP revision id to avoid duplicate revalidation.
  Fallback Rendering:
- If CMS unreachable, use `lastSuccessfulData` cached in memory (short-lived) OR rely on previously generated static content until next successful build.

## 15. Testing Strategy

Levels:

1. Unit: `lib/cms/transform.test.ts` ensures mapping & sanitization rules.
2. Integration: Mock WP API (using MSW) to test adapter functions and preview route.
3. End-to-End (optional Phase 2): Cypress/Playwright to validate editor publish -> site update (staging environment).
4. Migration script dry-run tests.
   Edge Cases:

- Oversized images rejected.
- Missing alt text triggers warning.
- Webhook invalid signature blocked.
- Preview token expired.

## 16. Performance Considerations

- Batch blog listing queries: GraphQL query requesting necessary fields only.
- Hydration: Keep page components using server components when possible (App Router) to avoid additional client fetches.
- Image optimization uses Next.js `<Image>` with remote patterns configured in `next.config.ts` to allow WP domain.
- Revalidation concurrency: limit simultaneous revalidations (queue if > N). Possibly simple in-memory queue; escalate if scaling.

## 17. Accessibility Implementation

- Enforce alt text at transform layer (throw if missing for required images).
- Heading order validator analyzing `bodyHtml` (optional warning) — implement simple parser.
- Provide editorial feedback in logs / preview (render warnings banner in preview mode only).

## 18. Security Hardening

- HMAC on webhook payload.
- Least-privilege WordPress API token (read + publish limited to required content types; approval actions restricted to specific role accounts, not general token).
- Dependency scanning (existing tooling or add `npm run audit:ci`).
- Sanitize HTML server-side; never trust client merges.
- Rate limit preview endpoint (e.g., 30 requests/min per IP) — simple in-memory counter with `Map<string, {count, resetTs}>`.

## 19. Implementation Phases (Engineering)

Phase A (Week 1-2):

- Set up WP dev instance, choose GraphQL plugin, define schema fields (ACF groups).
- Add `lib/cms/` scaffolding and initial types for Legal & Hero.
- Implement legal page fetch, transform, and integrate with one legal page route.

Phase B (Week 2-3):

- Webhook endpoint + HMAC verification.
- Revalidation for legal/privacy pages.
- Migration script for legal pages.

Phase C (Week 3-4):

- Hero sections + CTA blocks integration.
- Navigation labels dynamic fetch.
- Preview mode implementation.

Phase D (Week 4-5):

- Product / Solution / Application mapping.
- Blog post adapter (if migrating now).
- Observability logging + error banners.

Phase E (Week 5-6):

- Testing suite build-out.
- Performance tuning & rate limiting.
- Final migration, freeze legacy markdown sources.

## 20. Open Technical Decisions

- Tag-based caching vs path-based revalidation (affects scale & complexity). Currently path-based.
- GraphQL persisted queries adoption for network performance.
- Storage for audit export beyond WP (if volume grows). Could use external object storage.
- In-memory vs Redis-based rate limiting (depends on traffic & deployment platform capabilities).

## 21. Risks (Technical) & Mitigations

| Risk                                           | Mitigation                                               |
| ---------------------------------------------- | -------------------------------------------------------- |
| GraphQL plugin instability                     | Keep REST fallback adapter functions; feature flag usage |
| Webhook request storms on batch publishes      | Queue + deduplicate by slug/version                      |
| Transform logic divergence from schema changes | Schema versioning doc + adapter unit tests               |
| Preview token leakage                          | Short TTL + signed tokens + rate limiting                |
| Missing sanitization edge case                 | Audit allowed tags list quarterly + tests                |

## 22. Codebase Touch Points

- `next.config.ts`: Add remote image domain for WP.
- `app/<legal>/page.tsx`: Replace file-based content with adapter fetch.
- `app/api/revalidate/route.ts`: New implementation.
- `app/api/preview/route.ts`: New preview route.
- `components/layout/navigation.tsx`: Replace hardcoded labels with CMS fetch (SSR).
- `components/layout/cta.tsx`: Accept CMS-provided CTA props.

## 23. Environment Variables

| Name                | Purpose                           |
| ------------------- | --------------------------------- |
| `WP_BASE_URL`       | WordPress API base (REST/GraphQL) |
| `WP_API_TOKEN`      | Auth token for WP API             |
| `WP_WEBHOOK_SECRET` | Shared secret for webhook HMAC    |
| `WP_PREVIEW_SECRET` | Used for preview token signing    |
| `CMS_FEATURE_BLOG`  | Feature flag to enable blog fetch |

## 24. Feature Flags

Implement simple flags via env variables in `lib/utils.ts`:

```ts
export const features = {
  blog: process.env.CMS_FEATURE_BLOG === 'true',
};
```

Use to conditionally build blog routes & fetchers.

## 25. Fallback Strategy Details

- Legal pages: if adapter throws, catch in page loader, render last known static HTML (bundled fallback) + stale banner component `LegalStaleNotice`.
- For other pages, return 500 or partial content depending on criticality (hero failure -> show minimal default hero).

## 26. Migration Verification Checklist

For each migrated item:

- ID mapping persisted.
- Slug matches existing route.
- HTML sanitized & length constraints satisfied.
- Alt text correct.
- Publish state confirmed in staging.

## 27. Rollback Plan

If integration causes instability:

1. Disable webhook secret (stops revalidations).
2. Toggle env flag to fall back to local markdown (keep legacy code path for 2 releases behind feature flag `CMS_ENABLED`).
3. Rebuild site with static content base.
4. Investigate logs, patch, re-enable.

## 28. Documentation Artifacts

- Developer Quickstart: how to add new content type (schema + adapter + interface + page integration).
- Admin Guide (separate doc) for editors (out of scope here).

## 29. Example Transform Flow (Legal Page)

```
WP Raw -> { id, slug, title, meta: { effective_date }, content: '<p>...</p>', revisions:[...] }
  | sanitize(content)
  | compute version number (revisions.length)
  | shape -> CmsLegalPage
  | return
```

## 30. Non-Functional Validations Implementation

- Performance budget assertions: add `scripts/perf-check.js` measuring TTFB for sample pages after deploy (optional).
- Accessibility check: integrate `axe-core` in preview-only route rendering.

## 31. Future-Proofing Notes

- Keep transform pure & deterministic — facilitates caching and potential precomputation.
- Introduce a tagging system for revalidation once content volume increases (e.g., `revalidateTag('blogPosts')`).
- Consider moving rate limiting + queue to edge functions if traffic spikes.

## 32. Acceptance Traceability

Link each PRD acceptance criterion to implementation artifact in a separate table (to be created during implementation planning).

---

Prepared for implementation planning & task breakdown.
