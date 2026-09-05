import { wpFetch } from './client';

type WpCategory = {
  id: number;
};

type WpPodcastPost = {
  id: number;
  slug: string;
  date: string;
  categories?: number[];
  title: { rendered: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    episode_number?: string;
    guest_name?: string;
    guest_role?: string;
    hero_description?: string;
    youtube_url?: string;
    spotify_url?: string;
    topics_json?: string;
  };
};

export type PodcastEpisode = {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  episodeNumber: string;
  guestName: string;
  guestRole: string;
  heroDescription: string;
  youtubeUrl: string;
  youtubeVideoId?: string;
  youtubeThumbnail?: string;
  spotifyUrl: string;
  topics: string[];
  content: string;
};

export type PodcastCardItem = {
  title: string;
  desc: string;
  date: string;
  image: string;
  link: string;
};

const PODCAST_CATEGORY_SLUG = 'podcast';

function decodeHtmlEntities(value: string): string {
  return value
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

function stripHtml(value: string): string {
  return decodeHtmlEntities(
    value
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function parseStringArray(value?: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value !== 'string' || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function getYoutubeVideoId(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0];
    if (url.hostname.includes('youtube.com')) {
      const queryId = url.searchParams.get('v');
      if (queryId) return queryId;
      const segments = url.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(segments[0])) return segments[1];
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function mapPodcastEpisode(post: WpPodcastPost): PodcastEpisode {
  const acf = post.acf && !Array.isArray(post.acf) ? post.acf : {};
  const youtubeVideoId = getYoutubeVideoId(acf.youtube_url);

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: decodeHtmlEntities(post.title?.rendered || ''),
    excerpt: stripHtml(post.excerpt?.rendered || ''),
    episodeNumber: acf.episode_number || '',
    guestName: acf.guest_name || '',
    guestRole: acf.guest_role || '',
    heroDescription: acf.hero_description || '',
    youtubeUrl: acf.youtube_url || '',
    youtubeVideoId,
    youtubeThumbnail: youtubeVideoId ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg` : undefined,
    spotifyUrl: acf.spotify_url || '',
    topics: parseStringArray(acf.topics_json),
    content: post.content?.rendered || '',
  };
}

async function getPodcastCategoryId(): Promise<number | null> {
  try {
    const categories = (await wpFetch(
      `/wp-json/wp/v2/categories?slug=${encodeURIComponent(PODCAST_CATEGORY_SLUG)}`
    )) as WpCategory[];
    return categories[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function getCmsPodcastEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const categoryId = await getPodcastCategoryId();
    if (!categoryId) return [];
    const posts = (await wpFetch(
      `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=100&orderby=date&order=desc`
    )) as WpPodcastPost[];
    return posts.map(mapPodcastEpisode);
  } catch {
    return [];
  }
}

export async function getCmsPodcastCards(): Promise<PodcastCardItem[]> {
  const episodes = await getCmsPodcastEpisodes();
  return episodes
    .filter(episode => episode.youtubeThumbnail)
    .map(episode => ({
      title: episode.title,
      desc: episode.excerpt,
      date: episode.date,
      image: episode.youtubeThumbnail as string,
      link: `/resources/podcast/${episode.slug}`,
    }));
}

export async function getCmsPodcastEpisodeBySlug(slug: string): Promise<PodcastEpisode | null> {
  try {
    const posts = (await wpFetch(`/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`)) as WpPodcastPost[];
    const post = posts[0];
    if (!post) return null;

    // Category validation must not make a published episode unavailable when
    // WordPress temporarily fails to serve the categories endpoint.
    const categoryId = await getPodcastCategoryId();
    if (categoryId && !post.categories?.includes(categoryId)) return null;
    return mapPodcastEpisode(post);
  } catch {
    return null;
  }
}

export async function getAllCmsPodcastSlugs(): Promise<string[]> {
  const episodes = await getCmsPodcastEpisodes();
  return episodes.map(episode => episode.slug);
}
