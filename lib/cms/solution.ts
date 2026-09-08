import { wpFetch } from './client';

export interface SolutionItemRaw {
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
  heading?: string;
  value?: string;
  label?: string;
}

export interface SolutionData {
  hero?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    ctaText?: string;
    ctaUrl?: string;
    imageUrl?: string;
    mobileImageUrl?: string;
  } | null;
  how?: {
    title?: string;
    items: SolutionItemRaw[];
  } | null;
  why?: {
    title?: string;
    items: SolutionItemRaw[];
  } | null;
  workflow?: {
    title?: string;
    highlight?: string;
    subtitle?: string;
    stats: { value: string; label: string }[];
  } | null;
  contact?: {
    heading?: string;
    highlight?: string;
    formTitle?: string;
  } | null;
}

function parseJsonArray(value: unknown): SolutionItemRaw[] {
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed as SolutionItemRaw[];
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

export async function getSolution(slug: string): Promise<SolutionData | null> {
  // Expect CPT 'solution' or page by slug 'solutions/<slug>' — using CPT for parity
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const page: any = raw[0];
  const meta: Record<string, any> = page.meta || page.acf || {};

  const hero = {
    title: meta.hero_title || page.acf?.hero_title,
    subtitle: meta.hero_subtitle || page.acf?.hero_subtitle,
    bodyHtml: meta.hero_body_html || meta.hero_bodyhtml || page.acf?.hero_body_html,
    ctaText: meta.hero_cta_text || page.acf?.hero_cta_text,
    ctaUrl: meta.hero_cta_url || page.acf?.hero_cta_url || page.acf?.hero_cta_urls,
    imageUrl: meta.hero_image_url || page.acf?.hero_image_url,
    mobileImageUrl: meta.hero_mobile_image_url || meta.hero_image_mobile_url || page.acf?.hero_mobile_image_url,
  };

  const howItems = parseJsonArray(meta.how_items_json || page.acf?.how_items_json);
  const whyItems = parseJsonArray(meta.why_items_json || page.acf?.why_items_json);
  const workflowStats = parseStatsArray(meta.workflow_stats_json || page.acf?.workflow_stats_json);

  const workflow = {
    title: meta.workflow_title || page.acf?.workflow_title,
    highlight: meta.workflow_title_highlight || page.acf?.workflow_title_highlight,
    subtitle: meta.workflow_subtitle || page.acf?.workflow_subtitle,
    stats: workflowStats,
  };

  return {
    hero,
    how: { title: meta.how_title || page.acf?.how_title, items: howItems },
    why: { title: meta.why_title || page.acf?.why_title, items: whyItems },
    workflow,
    contact: {
      heading: meta.contact_heading || meta.contact_title || page.acf?.contact_heading,
      highlight: meta.contact_heading_highlight || meta.contact_highlight || page.acf?.contact_heading_highlight,
      formTitle: meta.contact_form_heading || meta.contact_form_title || page.acf?.contact_form_heading,
    },
  };
}
