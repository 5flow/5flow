import { cache } from 'react';
import { wpFetch } from './client';
import { getPathLanguage } from './language';

export type RoutedCmsPage = {
  slug: string;
  link: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string; protected?: boolean };
};

function normalizePath(path: string): string {
  return decodeURIComponent(path).replace(/\/+$/, '') || '/';
}

// Resolve the complete permalink, not just the final slug, so nested pages and
// translations cannot accidentally display a different page's content.
export const getCmsPageByPath = cache(async (path: string): Promise<RoutedCmsPage | null> => {
  const parts = path.split('/').filter(Boolean);
  const slug = parts.at(-1);
  if (!slug) return null;
  const language = getPathLanguage(path);
  const languageRoot = parts.length === 1 && parts[0].toLowerCase() === language;
  const query = new URLSearchParams({
    lang: language,
    status: 'publish',
    per_page: '100',
    _fields: 'slug,link,status,title,content',
  });
  if (!languageRoot) query.set('slug', slug);
  // A translated homepage can have an unrelated slug (home-4) at /es/.
  // Walk all result pages when resolving a language root.
  for (let pageNumber = 1; ; pageNumber++) {
    query.set('page', String(pageNumber));
    let pages;
    try {
      pages = await wpFetch(`/wp-json/wp/v2/pages?${query}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('rest_post_invalid_page_number')) return null;
      throw error;
    }
    if (!Array.isArray(pages)) return null;
    const match = pages.find((page: RoutedCmsPage) => {
      if (page.status !== 'publish' || page.content?.protected || typeof page.link !== 'string') return false;
      try {
        return normalizePath(new URL(page.link).pathname) === normalizePath(path);
      } catch {
        return false;
      }
    });
    if (match) return match;
    if (pages.length < 100) return null;
  }
});
