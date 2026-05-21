import { wpFetch } from './client';

export interface HomepageItemRaw {
  title?: string;
  subtitle?: string;
  body_html?: string;
  bodyHtml?: string;
  icon_key?: string;
  iconKey?: string;
  link?: string;
  link_url?: string;
  linkUrl?: string;
  button_link?: string;
  buttonLink?: string;
  button_url?: string;
  buttonUrl?: string;
  image_url?: string;
  imageUrl?: string;
}

export interface HomepageData {
  hero?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  what?: {
    title?: string;
    items: HomepageItemRaw[];
  };
  how?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    items: HomepageItemRaw[];
  };
  who?: {
    title?: string;
    clients: { imageUrl: string; altText: string }[];
  };
  why?: {
    title?: string;
    bodyHtml?: string;
    items: HomepageItemRaw[];
  };
}

function parseJsonArray<T = HomepageItemRaw>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed as T[];
    return [];
  } catch {
    return [];
  }
}

export function inferAltTextFromUrl(url: string): string | undefined {
  if (!url) return undefined;
  const filename = url.split('/').pop()?.split('?')[0] ?? '';
  if (!filename) return undefined;
  const withoutExtension = filename.replace(/\.[^.]+$/, '');
  const normalized = withoutExtension.replace(/[-_]+/g, ' ').trim();
  if (!normalized) return undefined;
  return normalized
    .split(' ')
    .map(part => (part ? part[0].toUpperCase() + part.slice(1) : ''))
    .join(' ')
    .trim();
}

export async function getHomepage(slug = 'home'): Promise<HomepageData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const page: any = raw[0];
  const meta: Record<string, any> = page.meta || page.acf || {};

  const hero = {
    title: meta.hero_title || meta.title || page.acf?.hero_title,
    subtitle: meta.hero_subtitle || meta.subtitle || page.acf?.hero_subtitle,
    bodyHtml: meta.hero_body_html || meta.bodyhtml || page.acf?.hero_body_text,
    ctaText: meta.hero_cta_text || meta.cta || page.acf?.hero_cta_text,
    ctaUrl: meta.hero_cta_url || meta.cta_url || page.acf?.hero_cta_url,
  };

  const acf: Record<string, any> = page.acf || {};
  const whatItems = parseJsonArray<HomepageItemRaw>(meta.what_items_json || acf.what_items_json);
  const howItems = parseJsonArray<HomepageItemRaw>(meta.how_items_json || acf.how_items_json || acf.how_body_html);
  const whoItems = parseJsonArray<HomepageItemRaw | string>(meta.who_items_json || acf.who_items_json);
  const whyItems = parseJsonArray<HomepageItemRaw>(meta.why_items_json || acf.why_items_json);

  return {
    hero: hero,
    what: {
      title: meta.what_title || acf.what_title,
      items: whatItems,
    },
    how: {
      title: meta.how_title || acf.how_title,
      subtitle: meta.how_subtitle || acf.how_subtitle,
      bodyHtml: meta.how_description || meta.how_body_html || acf.how_description || acf.how_body_html,
      items: howItems,
    },
    who: {
      title: meta.who_title || acf.who_title,
      clients: whoItems.map(ci => {
        if (typeof ci === 'string') {
          return {
            imageUrl: ci,
            altText: inferAltTextFromUrl(ci) || 'Client Logo',
          };
        }

        const url = ci.image_url || ci.imageUrl || '';
        const altText = ci.title || ci.subtitle || inferAltTextFromUrl(url) || 'Client Logo';
        return { imageUrl: url, altText };
      }),
    },
    why: {
      title: meta.why_title || acf.why_title,
      bodyHtml: meta.why_body_html || meta.why_bodyhtml || acf.why_body_html || acf.why_bodyhtml,
      items: whyItems,
    },
  };
}
