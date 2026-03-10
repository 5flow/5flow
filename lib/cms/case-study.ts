import { wpFetch } from './client';
import type { CaseStudyCardItem } from '@/lib/resources/case-studies';

type WpCategory = {
  id: number;
  slug: string;
};

type WpCaseStudyPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string; raw?: string };
  acf?: {
    card_title?: string;
    card_desc?: string;
    is_featured_case_study?: boolean | number | string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
};

const CASE_STUDIES_CATEGORY_SLUG = 'case-studies';

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#038;/g, '&')
    .replace(/&#039;/g, "'");
}

function stripHtml(text: string) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isFeaturedCaseStudy(value?: WpCaseStudyPost['acf']) {
  const raw = value?.is_featured_case_study;
  return raw === true || raw === 1 || raw === '1' || raw === 'true';
}

async function getCaseStudyCategoryId(): Promise<number | null> {
  try {
    const categories = (await wpFetch(
      `/wp-json/wp/v2/categories?slug=${encodeURIComponent(CASE_STUDIES_CATEGORY_SLUG)}`,
    )) as WpCategory[];
    return categories[0]?.id ?? null;
  } catch (error) {
    console.error('Error fetching case studies category:', error);
    return null;
  }
}

function mapCaseStudy(post: WpCaseStudyPost): CaseStudyCardItem {
  const title = decodeHtmlEntities(post.acf?.card_title || post.title.rendered || '');
  const desc = decodeHtmlEntities(stripHtml(post.acf?.card_desc || post.excerpt?.rendered || ''));
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/product/rectangle.webp';

  return {
    title,
    desc,
    image,
    link: `/resources/case-studies/${post.slug}`,
  };
}

export async function getCmsCaseStudyCards(): Promise<CaseStudyCardItem[]> {
  try {
    const categoryId = await getCaseStudyCategoryId();
    if (!categoryId) return [];

    const posts = (await wpFetch(
      `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=100`,
    )) as WpCaseStudyPost[];

    if (posts.length === 0) return [];

    const featuredPost = posts.find(post => isFeaturedCaseStudy(post.acf));
    const selectedPost = featuredPost || posts[0];

    return [mapCaseStudy(selectedPost)];
  } catch (error) {
    console.error('Error fetching CMS case studies:', error);
    return [];
  }
}
