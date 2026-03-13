import { wpFetch } from './client';
import type { CaseStudy, CaseStudyCardItem } from '@/lib/resources/case-studies';

type WpCategory = {
  id: number;
  slug: string;
};

type WpCaseStudyPost = {
  id: number;
  slug: string;
  date: string;
  link: string;
  categories?: number[];
  title: { rendered: string };
  content: { rendered: string; raw?: string };
  excerpt: { rendered: string; raw?: string };
  acf?: {
    card_title?: string;
    card_desc?: string;
    is_featured_case_study?: boolean | number | string;
    image_focus?: string;
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

function mapCaseStudyDetail(post: WpCaseStudyPost): CaseStudy {
  const title = decodeHtmlEntities(post.acf?.card_title || post.title.rendered || '');
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/product/rectangle.webp';

  return {
    slug: post.slug,
    title,
    date: post.date,
    image,
    content: post.content?.rendered || '',
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

export async function getCmsCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const categoryId = await getCaseStudyCategoryId();
    if (!categoryId) return null;

    const posts = (await wpFetch(`/wp-json/wp/v2/posts?slug=${slug}&_embed`)) as WpCaseStudyPost[];
    const post = posts[0];
    if (!post) return null;

    const categories = post.categories || [];
    if (!categories.includes(categoryId)) return null;

    return mapCaseStudyDetail(post);
  } catch (error) {
    console.error(`Error fetching CMS case study ${slug}:`, error);
    return null;
  }
}

export async function getAllCmsCaseStudySlugs(): Promise<string[]> {
  try {
    const categoryId = await getCaseStudyCategoryId();
    if (!categoryId) return [];

    const posts = (await wpFetch(`/wp-json/wp/v2/posts?categories=${categoryId}&per_page=100&_fields=slug`)) as {
      slug: string;
    }[];

    return posts.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching CMS case study slugs:', error);
    return [];
  }
}
