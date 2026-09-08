import { wpFetch } from './client';
import { inferAltTextFromUrl } from './homepage';

export interface ProductItemRaw {
  title?: string;
  subtitle?: string;
  body_html?: string;
  bodyHtml?: string;
  description?: string;
  icon_key?: string;
  iconKey?: string;
  iconName?: string;
  button_text?: string;
  buttonText?: string;
  link_url?: string;
  linkUrl?: string;
  image_url?: string;
  imageUrl?: string;
  imageSrc?: string;
  buttonLink?: string;
  value?: string; // for stats
  label?: string; // for stats
}

export interface ProductData {
  hero?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    ctaText?: string;
    ctaUrl?: string;
    imageUrl?: string;
    mobileImageUrl?: string;
  } | null;
  what?: {
    title?: string;
    items: ProductItemRaw[];
  } | null;
  how?: {
    title?: string;
    items: ProductItemRaw[];
  } | null;
  why?: {
    title?: string;
    items: ProductItemRaw[];
  } | null;
  need?: {
    title1?: string;
    highlightTitle?: string;
    title2?: string;
    subtitle?: string;
    bodyHtml?: string;
    buttonText?: string;
    buttonUrl?: string;
  } | null;
  workflow?: {
    title?: string;
    highlight?: string;
    subtitle?: string;
    stats: { value: string; label: string }[];
  } | null;
  who?: {
    title?: string;
    clients: { imageUrl: string; altText: string }[];
  } | null;
  contact?: {
    heading?: string;
    highlight?: string;
    formTitle?: string;
  } | null;
}

function parseJsonArray(value: unknown): ProductItemRaw[] {
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed as ProductItemRaw[];
    return [];
  } catch {
    return [];
  }
}

function parseStatsArray(value: unknown): { value: string; label: string }[] {
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(it => typeof it === 'object' && it)
      .map(it => ({
        value: String((it as any).value || ''),
        label: String((it as any).label || ''),
      }))
      .filter(s => s.value || s.label);
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<ProductData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const page: any = raw[0];
  const meta: Record<string, any> = page.meta || page.acf || {};

  const hero = {
    title: meta.hero_title || page.acf?.hero_title,
    subtitle: meta.hero_subtitle || page.acf?.hero_subtitle,
    bodyHtml: meta.hero_body_html || meta.hero_bodyhtml || page.acf?.hero_body_html,
    ctaText: meta.hero_cta_text || page.acf?.hero_cta_text,
    ctaUrl: meta.hero_cta_url || page.acf?.hero_cta_url,
    imageUrl: meta.hero_image_url || meta.imagesrc || page.acf?.hero_image_url,
    mobileImageUrl:
      meta.hero_mobile_image_url ||
      meta.hero_image_mobile_url ||
      meta.mobileimagesrc ||
      page.acf?.hero_mobile_image_url,
  };

  const whatItems = parseJsonArray(meta.what_items_json || page.acf?.what_items_json);
  const howItems = parseJsonArray(meta.how_items_json || page.acf?.how_items_json);
  const whyItems = parseJsonArray(meta.why_items_json || page.acf?.why_items_json);
  const workflowStats = parseStatsArray(meta.workflow_stats_json || page.acf?.workflow_stats_json);

  const need = {
    title1: meta.need_title1 || page.acf?.need_title1,
    highlightTitle: meta.need_highlight_title || page.acf?.need_highlight_title,
    title2: meta.need_title2 || page.acf?.need_title2,
    subtitle: meta.need_subtitle || page.acf?.need_subtitle,
    bodyHtml: meta.need_body_html || meta.need_bodyhtml || page.acf?.need_body_html,
    buttonText: meta.need_button_text || page.acf?.need_button_text,
    buttonUrl: meta.need_button_url || page.acf?.need_button_url,
  };

  const workflow = {
    title: meta.workflow_title || page.acf?.workflow_title,
    highlight: meta.workflow_title_highlight || page.acf?.workflow_title_highlight,
    subtitle: meta.workflow_subtitle || page.acf?.workflow_subtitle,
    stats: workflowStats,
  };

  const whoItems = parseJsonArray(meta.who_items_json || page.acf?.who_items_json);
  const who = {
    title: meta.who_title || page.acf?.who_title,
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
  };

  return {
    hero,
    what: {
      title: meta.what_title || page.acf?.what_title,
      items: whatItems,
    },
    how: {
      title: meta.how_title || page.acf?.how_title,
      items: howItems,
    },
    why: {
      title: meta.why_title || page.acf?.why_title,
      items: whyItems,
    },
    need,
    workflow,
    who,
    contact: {
      heading: meta.contact_heading || meta.contact_title || page.acf?.contact_heading,
      highlight: meta.contact_heading_highlight || meta.contact_highlight || page.acf?.contact_heading_highlight,
      formTitle: meta.contact_form_heading || meta.contact_form_title || page.acf?.contact_form_heading,
    },
  };
}
