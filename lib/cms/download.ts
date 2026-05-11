import { wpFetch } from './client';
import type { DownloadCardItem } from '@/lib/resources/downloads';

type WpCategory = {
  id: number;
  slug: string;
};

type AcfImageField = string | { url?: string; sizes?: Record<string, string> } | undefined;
type AcfFileField = string | { url?: string } | undefined;

type WpDownloadPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string; raw?: string };
  acf?: {
    card_title?: string;
    card_desc?: string;
    card_image?: AcfImageField;
    download_file?: AcfFileField;
    download_url?: string;
    button_label?: string;
    image_focus?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
};

const DOWNLOADS_CATEGORY_SLUG = 'downloads';

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

function resolveAcfFile(fileField: AcfFileField): string | undefined {
  if (!fileField) return undefined;
  if (typeof fileField === 'string') return fileField;
  return fileField.url;
}

async function getDownloadsCategoryId(): Promise<number | null> {
  try {
    const categories = (await wpFetch(
      `/wp-json/wp/v2/categories?slug=${encodeURIComponent(DOWNLOADS_CATEGORY_SLUG)}`,
    )) as WpCategory[];
    return categories[0]?.id ?? null;
  } catch (error) {
    console.error('Error fetching downloads category:', error);
    return null;
  }
}

function mapDownload(post: WpDownloadPost): DownloadCardItem {
  const title = decodeHtmlEntities(post.acf?.card_title || post.title.rendered || '');
  const desc = decodeHtmlEntities(stripHtml(post.acf?.card_desc || post.excerpt?.rendered || ''));
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/product/rectangle.webp';
  const image = resolveAcfImage(post.acf?.card_image) || featuredImage;
  const href = resolveAcfFile(post.acf?.download_file) || post.acf?.download_url || '#';

  return {
    title,
    desc,
    image,
    imageFocus: post.acf?.image_focus,
    href,
    buttonLabel: post.acf?.button_label || 'Download now',
  };
}

export async function getCmsDownloadCards(): Promise<DownloadCardItem[]> {
  try {
    const categoryId = await getDownloadsCategoryId();
    if (!categoryId) return [];

    const posts = (await wpFetch(
      `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=100&orderby=date&order=desc`,
    )) as WpDownloadPost[];

    return posts.map(mapDownload);
  } catch (error) {
    console.error('Error fetching CMS downloads:', error);
    return [];
  }
}
