import { wpFetch } from './client';
import type { WebinarCardItem } from '@/lib/resources/webinars';

type WpCategory = {
  id: number;
  slug: string;
};

type AcfImageField = string | { url?: string; sizes?: Record<string, string> } | undefined;
type AcfLinkField = string | { url?: string; title?: string; target?: string } | undefined;

type WpWebinarPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string; raw?: string };
  acf?: {
    card_title?: string;
    card_desc?: string;
    card_description?: string;
    card_image?: AcfImageField;
    webinar_url?: AcfLinkField;
    event_url?: AcfLinkField;
    registration_url?: AcfLinkField;
    watch_url?: AcfLinkField;
    button_url?: AcfLinkField;
    button_label?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
};

const WEBINAR_CATEGORY_SLUGS = ['webinars', 'webinar'];

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

function resolveAcfLink(linkField: AcfLinkField): string | undefined {
  if (!linkField) return undefined;
  if (typeof linkField === 'string') return linkField;
  return linkField.url;
}

async function getWebinarCategoryId(): Promise<number | null> {
  for (const slug of WEBINAR_CATEGORY_SLUGS) {
    try {
      const categories = (await wpFetch(`/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`)) as WpCategory[];
      const categoryId = categories[0]?.id ?? null;
      if (categoryId) return categoryId;
    } catch (error) {
      console.error(`Error fetching webinars category for slug "${slug}":`, error);
    }
  }

  return null;
}

function mapWebinar(post: WpWebinarPost): WebinarCardItem {
  const title = decodeHtmlEntities(post.acf?.card_title || post.title.rendered || '');
  const desc = decodeHtmlEntities(stripHtml(post.acf?.card_desc || post.acf?.card_description || post.excerpt?.rendered || ''));
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/resources/Webinar_Cover-1-Secure_Food.png';
  const image = resolveAcfImage(post.acf?.card_image) || featuredImage;
  const link =
    resolveAcfLink(post.acf?.webinar_url) ||
    resolveAcfLink(post.acf?.event_url) ||
    resolveAcfLink(post.acf?.registration_url) ||
    resolveAcfLink(post.acf?.watch_url) ||
    resolveAcfLink(post.acf?.button_url) ||
    '#';

  return {
    title,
    desc,
    image,
    link,
    buttonLabel: post.acf?.button_label || 'Watch now',
  };
}

export async function getCmsWebinarCards(): Promise<WebinarCardItem[]> {
  try {
    const categoryId = await getWebinarCategoryId();
    if (!categoryId) return [];

    const posts = (await wpFetch(
      `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=100&orderby=date&order=desc`,
    )) as WpWebinarPost[];

    return posts.map(mapWebinar);
  } catch (error) {
    console.error('Error fetching CMS webinars:', error);
    return [];
  }
}
