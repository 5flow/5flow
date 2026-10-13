import { wpFetch } from './client';
import { cache } from 'react';
import { resolvePageHeaderTitle } from './page-header';
import { QUICK_LINK_GROUPS } from '../quick-links';
import { GERMAN_PATHS } from '../i18n';

export type QuickLinkLabels = { en: Record<string, string>; de: Record<string, string> };

export const getQuickLinkLabels = cache(async (): Promise<QuickLinkLabels> => {
  const labels: QuickLinkLabels = { en: {}, de: {} };
  const targets = QUICK_LINK_GROUPS.flatMap(group => group.links).flatMap(({ href }) => {
    const slug = href.split('/').pop()!;
    return [
      { href, slug, language: 'en' as const },
      ...(GERMAN_PATHS.has(href) ? [{ href, slug: `${slug}-2`, language: 'de' as const }] : []),
    ];
  });
  const slugs = [...new Set(targets.map(target => target.slug))];
  // Fetch both languages together so client navigation and switching language
  // can reuse the persistent root layout without stale footer labels.
  const pages = await wpFetch(
    `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slugs.join(','))}&per_page=100&_fields=slug,acf,meta`
  );
  if (!Array.isArray(pages)) return labels;
  for (const target of targets) {
    const page = pages.find(page => page?.slug === target.slug);
    const title = resolvePageHeaderTitle(page);
    if (title) labels[target.language][target.href] = title;
  }
  return labels;
});
