import { wpFetch } from './client';

export interface ApplicationItemRaw {
  id?: string | number;
  title?: string;
  subtitle?: string;
  body_html?: string;
  bodyHtml?: string;
  description?: string;
  icon_key?: string;
  iconKey?: string;
  iconName?: string;
  link_url?: string;
  linkUrl?: string;
  image_url?: string;
  imageUrl?: string;
  imageSrc?: string;
  button_text?: string;
  buttonText?: string;
  button_link?: string;
  buttonLink?: string;
  button_url?: string;
  buttonUrl?: string;
}

export interface ApplicationData {
  hero?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    ctaText?: string;
    imageUrl?: string;
    mobileImageUrl?: string;
    imageAlt?: string;
  } | null;
  challenges?: {
    heading?: string;
    headingHighlight?: string;
    items: ApplicationItemRaw[];
  } | null;
  how?: {
    items: ApplicationItemRaw[];
  } | null;
  benefits?: {
    heading?: string;
    headingHighlight?: string;
    items: ApplicationItemRaw[];
    highlightedText?: string;
  } | null;
  workflow?: {
    title?: string;
    subtitle?: string;
    highlightedText?: string;
    stats?: { label: string; value: string }[];
  } | null;
  contact?: {
    heading?: string;
    highlight?: string;
    formTitle?: string;
  } | null;
}

function parseJsonArray(value: unknown): ApplicationItemRaw[] {
  const normalizeItems = (items: ApplicationItemRaw[]) =>
    items.map(item => {
      const raw = item as Record<string, any>;
      return {
        ...item,
        subtitle: item.subtitle || raw.desc,
        bodyHtml: item.bodyHtml || item.body_html || item.description || raw.sub,
        buttonText: item.buttonText || item.button_text,
        buttonLink: item.buttonLink || item.button_link || item.buttonUrl || item.button_url || item.linkUrl || item.link_url,
        imageUrl: item.imageUrl || item.image_url || item.imageSrc,
        iconKey: item.iconKey || item.icon_key || item.iconName,
      };
    });

  if (Array.isArray(value)) return normalizeItems(value as ApplicationItemRaw[]);
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return normalizeItems(parsed as ApplicationItemRaw[]);
    return [];
  } catch {
    return [];
  }
}

function pickField(source: Record<string, any>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}

export async function getApplication(slug: string): Promise<ApplicationData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const page: any = raw[0];
  const meta: Record<string, any> = page?.meta || page?.acf || {};
  const acf: Record<string, any> = page?.acf || {};

  const hero = {
    title: meta.hero_title || acf.hero_title,
    subtitle: meta.hero_subtitle || acf.hero_subtitle,
    bodyHtml: meta.hero_body_html || meta.hero_bodyhtml || acf.hero_body_html,
    ctaText: meta.hero_cta_text || acf.hero_cta_text,
    imageUrl: meta.hero_image_url || acf.hero_image_url,
    mobileImageUrl: meta.hero_mobile_image_url || meta.hero_image_mobile_url || acf.hero_mobile_image_url,
    imageAlt: meta.hero_image_alt || acf.hero_image_alt,
  };

  const challengesItems = parseJsonArray(
    pickField(meta, ['challenges_items_json', 'challenge_items_json', 'challenges_items', 'challenge_items']) ||
      pickField(acf, ['challenges_items_json', 'challenge_items_json', 'challenges_items', 'challenge_items'])
  );
  const howItems = parseJsonArray(pickField(meta, ['how_items_json', 'how_items']) || pickField(acf, ['how_items_json', 'how_items']));
  const benefitsItems = parseJsonArray(
    pickField(meta, ['benefits_items_json', 'benefit_items_json', 'benefits_items', 'benefit_items']) ||
      pickField(acf, ['benefits_items_json', 'benefit_items_json', 'benefits_items', 'benefit_items'])
  );
  const benefitsHighlightedText =
    meta.benefits_highlighted_text ||
    meta.benefits_highlight ||
    acf.benefits_highlighted_text ||
    acf.benefits_highlight;

  const workflowStats = parseJsonArray(
    pickField(meta, ['workflow_stats_json', 'workflow_stats']) || pickField(acf, ['workflow_stats_json', 'workflow_stats'])
  );
  const workflowTitle = meta.workflow_title || acf.workflow_title;
  const workflowSubtitle = meta.workflow_subtitle || acf.workflow_subtitle;
  const workflowHighlightedText =
    meta.workflow_highlighted_text ||
    meta.workflow_title_highlight ||
    meta.workflow_highlight ||
    acf.workflow_highlighted_text ||
    acf.workflow_title_highlight ||
    acf.workflow_highlight;

  return {
    hero,
    challenges: {
      heading: meta.challenges_heading || acf.challenges_heading,
      headingHighlight: meta.challenges_heading_highlight || acf.challenges_heading_highlight,
      items: challengesItems,
    },
    how: { items: howItems },
    benefits: {
      heading: meta.benefits_heading || acf.benefits_heading,
      headingHighlight: meta.benefits_heading_highlight || acf.benefits_heading_highlight,
      items: benefitsItems,
      highlightedText: benefitsHighlightedText,
    },
    workflow: {
      title: workflowTitle,
      subtitle: workflowSubtitle,
      highlightedText: workflowHighlightedText,
      stats: workflowStats.map((it: any) => ({
        label: it.label || it.title || '',
        value: it.value || it.subtitle || '',
      })),
    },
    contact: {
      heading: meta.contact_heading || meta.contact_title || acf.contact_heading || acf.contact_title,
      highlight:
        meta.contact_heading_highlight ||
        meta.contact_title_highlight ||
        meta.contact_highlight ||
        acf.contact_heading_highlight ||
        acf.contact_title_highlight ||
        acf.contact_highlight,
      formTitle:
        meta.contact_form_heading ||
        meta.contact_form_title ||
        acf.contact_form_heading ||
        acf.contact_form_title,
    },
  };
}
