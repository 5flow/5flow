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
    card_image?: string | { url?: string; sizes?: Record<string, string> };
    card_image_focus?: string;
    case_study_detail_image_focus?: string;
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
type AcfImageField = string | { url?: string; sizes?: Record<string, string> } | undefined;

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

function resolveAcfImage(imageField: AcfImageField): string | undefined {
  if (!imageField) return undefined;
  if (typeof imageField === 'string') return imageField;
  if (typeof imageField.url === 'string' && imageField.url.length > 0) return imageField.url;

  const preferredSizes = ['large', 'medium_large', 'medium', 'full'];
  for (const size of preferredSizes) {
    const url = imageField.sizes?.[size];
    if (typeof url === 'string' && url.length > 0) return url;
  }

  return undefined;
}

function isCssLength(value: string): boolean {
  return /^\d+(\.\d+)?(px|rem|em|vh|dvh|svh|lvh|%)$/i.test(value.trim());
}

function parseImageFocusConfig(value?: string): { imageFocus?: string; desktopImageHeight?: string } {
  if (!value) return {};

  const heightMatch = value.match(/(?:desktop[-_\s]?height|height)\s*:\s*([0-9.]+(?:px|rem|em|vh|dvh|svh|lvh|%))/i);
  const desktopImageHeight = heightMatch?.[1];
  const parts = value
    .replace(heightMatch?.[0] || '', '')
    .split(/[;|]/)
    .map(part => part.trim())
    .filter(Boolean);
  const heightOnlyPart = parts.find(isCssLength);
  const imageFocus = parts.filter(part => part !== heightOnlyPart).join(' ').trim() || undefined;

  return {
    imageFocus,
    desktopImageHeight: desktopImageHeight || heightOnlyPart,
  };
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
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/product/rectangle.webp';
  const image = resolveAcfImage(post.acf?.card_image) || featuredImage;
  const { imageFocus } = parseImageFocusConfig(post.acf?.card_image_focus || post.acf?.image_focus);

  return {
    title,
    desc,
    image,
    imageFocus,
    link: `/resources/case-studies/${post.slug}`,
  };
}

function mapCaseStudyDetail(post: WpCaseStudyPost): CaseStudy {
  const title = decodeHtmlEntities(post.acf?.card_title || post.title.rendered || '');
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/product/rectangle.webp';
  const { imageFocus, desktopImageHeight } = parseImageFocusConfig(
    post.acf?.case_study_detail_image_focus || post.acf?.image_focus,
  );

  return {
    slug: post.slug,
    title,
    date: post.date,
    image,
    imageFocus,
    desktopImageHeight,
    content: post.content?.rendered || '',
  };
}

export async function getCmsCaseStudyCards(): Promise<CaseStudyCardItem[]> {
  try {
    const categoryId = await getCaseStudyCategoryId();
    if (!categoryId) return [];

    const posts = (await wpFetch(
      `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=100&orderby=date&order=desc`,
    )) as WpCaseStudyPost[];

    if (posts.length === 0) return [];

    const featuredPostIndex = posts.findIndex(post => isFeaturedCaseStudy(post.acf));
    const orderedPosts =
      featuredPostIndex === -1
        ? posts
        : [posts[featuredPostIndex], ...posts.filter((_, index) => index !== featuredPostIndex)];

    return orderedPosts.map(mapCaseStudy);
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
