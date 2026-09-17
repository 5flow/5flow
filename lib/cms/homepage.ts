import { wpFetch } from './client';

export interface HomepageItemRaw {
  title?: string;
  subtitle?: string;
  body_html?: string;
  bodyHtml?: string;
  description?: string;
  desc?: string;
  sub?: string;
  icon_key?: string;
  iconKey?: string;
  iconName?: string;
  link?: string;
  link_url?: string;
  linkUrl?: string;
  button_link?: string;
  buttonLink?: string;
  button_url?: string;
  buttonUrl?: string;
  button_text?: string;
  buttonText?: string;
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
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    ctaTitle?: string;
    ctaText?: string;
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
    highlight?: string;
    bodyHtml?: string;
    imageUrl?: string;
    items: HomepageItemRaw[];
  };
  news?: {
    title?: string;
    description?: string;
  };
  contact?: {
    heading?: string;
    highlight?: string;
    subtitle?: string;
    formTitle?: string;
  };
}

function parseJsonArray<T = HomepageItemRaw>(value: unknown): T[] {
  const normalizeItems = (items: HomepageItemRaw[]) =>
    items.map(item => {
      if (typeof item === 'string') return item;
      const raw = item as Record<string, any>;
      return {
        ...item,
        subtitle: item.subtitle || item.sub || raw.lead,
        bodyHtml: item.bodyHtml || item.body_html || item.description || item.desc || raw.body,
        buttonText: item.buttonText || item.button_text || raw.buttonLabel || raw.button_label || raw.ctaText || raw.cta_text,
        buttonLink:
          item.buttonLink ||
          item.button_link ||
          item.buttonUrl ||
          item.button_url ||
          item.linkUrl ||
          item.link_url ||
          item.link ||
          raw.url ||
          raw.href,
        imageUrl: item.imageUrl || item.image_url,
        iconKey: item.iconKey || item.icon_key || item.iconName,
      };
    });

  const parseValue = (rawValue: string) => {
    const normalized = rawValue
      .trim()
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/,\s*([}\]])/g, '$1');
    const candidates = [
      normalized,
      normalized.replace(/'/g, '"'),
      normalized.startsWith('[') && !normalized.endsWith(']') ? `${normalized}]` : '',
      normalized.startsWith('{') && !normalized.endsWith('}') ? `${normalized}}` : '',
      !normalized.startsWith('[') && /}\s*,\s*{/.test(normalized) ? `[${normalized}]` : '',
    ].filter(Boolean);

    for (const candidate of candidates) {
      try {
        return JSON.parse(candidate);
      } catch {}
    }

    return null;
  };

  if (Array.isArray(value)) return normalizeItems(value as HomepageItemRaw[]) as T[];
  if (value && typeof value === 'object') return normalizeItems([value as HomepageItemRaw]) as T[];
  if (typeof value !== 'string') return [];

  const parsed = parseValue(value);
  if (Array.isArray(parsed)) return normalizeItems(parsed as HomepageItemRaw[]) as T[];
  if (parsed && typeof parsed === 'object') return normalizeItems([parsed as HomepageItemRaw]) as T[];
  return [];
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

function resolveImageUrl(value: unknown): string | undefined {
  if (typeof value === 'string') return value.trim() || undefined;
  if (!value || typeof value !== 'object') return undefined;
  const image = value as Record<string, unknown>;
  return typeof image.url === 'string' && image.url.trim() ? image.url : undefined;
}

function pickField(source: Record<string, any>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}

export async function getHomepage(slug = 'home'): Promise<HomepageData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const page: any = raw[0];
  const meta: Record<string, any> = page.meta || page.acf || {};

  const hero = {
    title: meta.hero_title || meta.hero_h1 || meta.title || page.acf?.hero_title || page.acf?.hero_h1,
    subtitle: meta.hero_subtitle || meta.hero_h2 || meta.subtitle || page.acf?.hero_subtitle || page.acf?.hero_h2,
    bodyHtml:
      meta.hero_body_html ||
      meta.hero_bodyhtml ||
      meta.hero_body_text ||
      meta.hero_p ||
      meta.bodyhtml ||
      page.acf?.hero_body_html ||
      page.acf?.hero_body_text ||
      page.acf?.hero_p,
    ctaText: meta.hero_cta_text || meta.cta || page.acf?.hero_cta_text,
    ctaUrl: meta.hero_cta_url || meta.cta_url || page.acf?.hero_cta_url,
  };

  const acf: Record<string, any> = page.acf || {};
  const whatItems = parseJsonArray<HomepageItemRaw>(pickField(meta, ['what_items_json', 'what_items']) || pickField(acf, ['what_items_json', 'what_items']));
  const howItems = parseJsonArray<HomepageItemRaw>(pickField(meta, ['how_items_json', 'how_items']) || pickField(acf, ['how_items_json', 'how_items']));
  const whoItems = parseJsonArray<HomepageItemRaw | string>(pickField(meta, ['who_items_json', 'who_items']) || pickField(acf, ['who_items_json', 'who_items']));
  const whyItems = parseJsonArray<HomepageItemRaw>(pickField(meta, ['why_items_json', 'why_items']) || pickField(acf, ['why_items_json', 'why_items']));

  return {
    hero: hero,
    what: {
      title: meta.what_title || meta.what_h1 || acf.what_title || acf.what_h1,
      subtitle: meta.what_subtitle || meta.what_h2 || acf.what_subtitle || acf.what_h2,
      description: meta.what_description || meta.what_p || acf.what_description || acf.what_p,
      imageUrl: resolveImageUrl(meta.what_image || acf.what_image),
      ctaTitle: meta.what_cta_title || acf.what_cta_title,
      ctaText: meta.what_cta_text || acf.what_cta_text,
      items: whatItems,
    },
    how: {
      title: meta.how_title || meta.how_h1 || acf.how_title || acf.how_h1,
      subtitle: meta.how_subtitle || meta.how_h2 || acf.how_subtitle || acf.how_h2,
      bodyHtml: meta.how_description || meta.how_body_html || meta.how_p || acf.how_description || acf.how_body_html || acf.how_p,
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
      title: meta.why_title || meta.why_h1 || acf.why_title || acf.why_h1,
      highlight: meta.why_highlight || acf.why_highlight,
      bodyHtml: meta.why_body_html || meta.why_bodyhtml || meta.why_p || acf.why_body_html || acf.why_bodyhtml || acf.why_p,
      imageUrl: resolveImageUrl(meta.why_image || acf.why_image),
      items: whyItems,
    },
    news: {
      title: meta.new_title || acf.new_title,
      description: meta.new_description || acf.new_description,
    },
    contact: {
      heading: meta.contact_heading || meta.contact_title || acf.contact_heading,
      highlight:
        meta.contact_heading_highlight ||
        meta.contact_title_highlight ||
        meta.contact_highlight ||
        acf.contact_heading_highlight ||
        acf.contact_title_highlight ||
        acf.contact_highlight,
      subtitle: meta.contact_subtitel || meta.contact_subtitle || acf.contact_subtitel || acf.contact_subtitle,
      formTitle: meta.contact_form_heading || meta.contact_form_title || acf.contact_form_heading || acf.contact_form_title,
    },
  };
}
