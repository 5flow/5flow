import { wpFetch } from './client';

export function resolvePageHeaderTitle(page: unknown): string | undefined {
  if (!page || typeof page !== 'object') return undefined;
  const raw = page as { meta?: Record<string, unknown>; acf?: Record<string, unknown> };
  for (const value of [raw.meta?.page_header_title, raw.acf?.page_header_title]) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

export async function getPageHeaderTitle(slug: string): Promise<string | undefined> {
  const pages = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  return Array.isArray(pages) ? resolvePageHeaderTitle(pages[0]) : undefined;
}
