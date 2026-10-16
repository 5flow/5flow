import type { Metadata } from 'next';
import { Element, Text, htmlToDOM } from 'html-react-parser';
import { cache } from 'react';
import { wpFetch } from './client';

type Language = string;

export const getMetadataForCmsUrl = cache(async (url: string): Promise<Pick<Metadata, 'title' | 'description'>> => {
  try {
    const result = await wpFetch(`/wp-json/rankmath/v1/getHead?${new URLSearchParams({ url })}`);
    if (result?.success === true && typeof result.head === 'string') return parseRankMathMetadata(result.head);
  } catch (error) {
    console.error('Unable to load Rank Math metadata', error instanceof Error ? error.message : error);
  }
  return {};
});

// Explicitly allow only these two fields. CMS robots, URLs and schema must never
// be copied into the public site's metadata.
export function parseRankMathMetadata(head: string): Pick<Metadata, 'title' | 'description'> {
  const metadata: Pick<Metadata, 'title' | 'description'> = {};
  for (const node of htmlToDOM(head)) {
    if (!(node instanceof Element)) continue;
    if (node.name === 'title') {
      const title = node.children.map(child => (child instanceof Text ? child.data : '')).join('').trim();
      if (title) metadata.title = title;
    }
    if (node.name === 'meta' && node.attribs.name?.toLowerCase() === 'description') {
      const description = node.attribs.content?.trim();
      if (description) metadata.description = description;
    }
  }
  return metadata;
}

const getRankMathMetadata = cache(async (type: 'pages' | 'posts', slug: string, language: Language) => {
  try {
    // Resolve the real WP permalink: frontend paths and translated slugs differ.
    const query = new URLSearchParams({ slug, lang: language, _fields: 'id,slug,link' });
    const entries = await wpFetch(`/wp-json/wp/v2/${type}?${query}`);
    if (!Array.isArray(entries)) return {};
    const entry = entries.find(entry => entry.slug === slug && typeof entry.link === 'string');
    if (!entry) return {};
    return getMetadataForCmsUrl(entry.link);
  } catch (error) {
    console.error(`Unable to load Rank Math metadata for ${type}/${slug}`, error instanceof Error ? error.message : error);
  }
  return {};
});

export async function getPageMetadata(slug: string, fallback: Metadata = {}, language: Language = 'en'): Promise<Metadata> {
  return { ...fallback, ...(await getRankMathMetadata('pages', slug, language)) };
}

export async function getPostMetadata(slug: string, fallback: Metadata = {}, language: Language = 'en'): Promise<Metadata> {
  return { ...fallback, ...(await getRankMathMetadata('posts', slug, language)) };
}
