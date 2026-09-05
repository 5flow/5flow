import { wpFetch } from './client';

export type ConsultingItem = {
  title?: string;
  text?: string;
  label?: string;
  value?: string;
  prefix?: string;
  iconKey?: string;
  assetSrc?: string;
};

export type ConsultingData = {
  hero?: {
    titleLine1?: string;
    titleLine2?: string;
    subtitle?: string;
    descriptionLine1?: string;
    descriptionLine2?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  strategy?: {
    titleLine1?: string;
    titleLine2?: string;
    highlight?: string;
    descriptionLine1?: string;
    descriptionLine2?: string;
    items?: ConsultingItem[];
  };
  pain?: {
    titleLine1?: string;
    titleLine2Prefix?: string;
    highlight?: string;
    descriptionLine1?: string;
    descriptionLine2?: string;
    items?: string[];
    summaryLine1?: string;
    summaryLine2?: string;
  };
  how?: {
    eyebrow?: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    paragraphs?: string[];
    ctaText?: string;
    ctaUrl?: string;
    items?: ConsultingItem[];
  };
  delivery?: {
    eyebrow?: string;
    title?: string;
    highlights?: string[];
    subtitle?: string;
    items?: ConsultingItem[];
  };
  metrics?: {
    impactTitle?: string;
    impactHighlight?: string;
    impactSubtitle?: string;
    impactStats?: ConsultingItem[];
    trustTitleLine1?: string;
    trustTitleLine2?: string;
    trustHighlight?: string;
    trustSubtitle?: string;
    trustStats?: ConsultingItem[];
    ctaText?: string;
    ctaUrl?: string;
  };
  value?: {
    title?: string;
    highlight?: string;
    body?: string;
    introTitle?: string;
    introText?: string;
    questions?: string[];
  };
  contact?: {
    line1?: string;
    line2Prefix?: string;
    highlight?: string;
    line2Suffix?: string;
    line3?: string;
  };
};

function getField(meta: Record<string, any>, acf: Record<string, any>, key: string): string | undefined {
  const value = meta[key] ?? acf[key];
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function parseJsonObject(value: unknown): Record<string, any> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, any>;
  if (typeof value !== 'string' || !value.trim()) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function splitBreaks(value?: string): [string | undefined, string | undefined] {
  if (!value) return [undefined, undefined];
  const parts = value.split(/<br\s*\/?>/i).map(part => part.trim());
  return parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : [value, ''];
}

function normalizeItems(items: Array<ConsultingItem | string>): ConsultingItem[] {
  return items
    .map(item =>
      typeof item === 'string'
        ? { title: item }
        : {
            title: item.title,
            text: item.text || item.label,
            label: item.label,
            value: item.value,
            prefix: item.prefix,
            iconKey: item.iconKey || (item as any).icon_key,
            assetSrc: item.assetSrc || (item as any).asset_src,
          }
    )
    .filter(item => item.title || item.text || item.label || item.value);
}

export async function getConsulting(slug = 'consulting'): Promise<ConsultingData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const page: any = raw[0];
  const meta: Record<string, any> = page.meta || page.acf || {};
  const acf: Record<string, any> = page.acf || {};
  const field = (key: string) => getField(meta, acf, key);
  const strategyContent = parseJsonObject(meta.strategy_content_json || acf.strategy_content_json);
  const painContent = parseJsonObject(meta.pain_content_json || acf.pain_content_json);
  const howContent = parseJsonObject(meta.how_content_json || acf.how_content_json);
  const deliveryContent = parseJsonObject(meta.delivery_content_json || acf.delivery_content_json);
  const metricsContent = parseJsonObject(meta.metrics_content_json || acf.metrics_content_json);
  const valueContent = parseJsonObject(meta.value_content_json || acf.value_content_json);
  const [heroTitleLine1, heroTitleLine2] = splitBreaks(field('hero_title'));
  const [heroDescriptionLine1, heroDescriptionLine2] = splitBreaks(field('hero_body_html'));
  const [painTitleLine1, painTitleLine2] = splitBreaks(field('pain_title'));
  const painHighlight = field('pain_highlight');
  const painTitlePrefix = painHighlight ? painTitleLine2?.replace(painHighlight, '').trim() : painTitleLine2;

  return {
    hero: {
      titleLine1: field('hero_title_line_1') || heroTitleLine1,
      titleLine2: field('hero_title_line_2') || heroTitleLine2,
      subtitle: field('hero_subtitle'),
      descriptionLine1: field('hero_description_line_1') || heroDescriptionLine1,
      descriptionLine2: field('hero_description_line_2') || heroDescriptionLine2,
      ctaText: field('hero_cta_text'),
      ctaUrl: field('hero_cta_url'),
    },
    strategy: {
      titleLine1: field('strategy_title_line_1') || field('strategy_title'),
      titleLine2: field('strategy_title_line_2') || (field('strategy_title') ? '' : undefined),
      highlight: field('strategy_highlight'),
      descriptionLine1:
        field('strategy_description_line_1') || field('strategy_body_html') || strategyContent.description,
      descriptionLine2: field('strategy_description_line_2') || (strategyContent.description ? '' : undefined),
      items: normalizeItems(
        parseJsonArray<ConsultingItem | string>(
          meta.strategy_items_json || acf.strategy_items_json || strategyContent.items
        )
      ),
    },
    pain: {
      titleLine1: field('pain_title_line_1') || painTitleLine1,
      titleLine2Prefix: field('pain_title_line_2_prefix') || painTitlePrefix,
      highlight: painHighlight,
      descriptionLine1: field('pain_description_line_1') || field('pain_body_html') || painContent.description,
      descriptionLine2: field('pain_description_line_2') || (painContent.description ? '' : undefined),
      items: parseJsonArray<string>(meta.pain_items_json || acf.pain_items_json || painContent.items),
      summaryLine1: field('pain_summary_line_1') || painContent.summary,
      summaryLine2: field('pain_summary_line_2'),
    },
    how: {
      eyebrow: field('how_eyebrow') || field('how_title_small'),
      title: field('how_title'),
      highlight: field('how_highlight'),
      subtitle: field('how_subtitle') || howContent.subtitle,
      paragraphs: parseJsonArray<string>(meta.how_paragraphs_json || acf.how_paragraphs_json || howContent.paragraphs),
      ctaText: field('how_cta_text'),
      ctaUrl: field('how_cta_url'),
      items: normalizeItems(
        parseJsonArray<ConsultingItem>(meta.how_items_json || acf.how_items_json || howContent.items)
      ),
    },
    delivery: {
      eyebrow: field('delivery_eyebrow'),
      title: field('delivery_title'),
      highlights: parseJsonArray<string>(meta.delivery_highlights_json || acf.delivery_highlights_json),
      subtitle: field('delivery_subtitle') || deliveryContent.subtitle,
      items: normalizeItems(
        parseJsonArray<ConsultingItem>(meta.delivery_items_json || acf.delivery_items_json || deliveryContent.items)
      ),
    },
    metrics: {
      impactTitle: field('impact_title') || metricsContent.impact?.title,
      impactHighlight: field('impact_highlight'),
      impactSubtitle: field('impact_subtitle') || metricsContent.impact?.subtitle,
      impactStats: normalizeItems(
        parseJsonArray<ConsultingItem>(meta.impact_stats_json || acf.impact_stats_json || metricsContent.impact?.stats)
      ),
      trustTitleLine1: field('trust_title_line_1') || field('trust_title') || metricsContent.trust?.title_line_1,
      trustTitleLine2: field('trust_title_line_2') || metricsContent.trust?.title_line_2,
      trustHighlight: field('trust_highlight'),
      trustSubtitle: field('trust_subtitle') || metricsContent.trust?.subtitle,
      trustStats: normalizeItems(
        parseJsonArray<ConsultingItem>(meta.trust_stats_json || acf.trust_stats_json || metricsContent.trust?.stats)
      ),
      ctaText: field('metrics_cta_text'),
      ctaUrl: field('metrics_cta_url'),
    },
    value: {
      title: field('value_title'),
      highlight: field('value_highlight'),
      body: field('value_body_html') || field('value_body') || valueContent.body,
      introTitle: field('value_intro_title') || valueContent.intro_title,
      introText: field('value_intro_text') || valueContent.intro_text,
      questions: parseJsonArray<string>(
        meta.value_questions_json || acf.value_questions_json || valueContent.questions
      ),
    },
    contact: {
      line1: field('contact_heading_line_1'),
      line2Prefix: field('contact_heading_line_2_prefix'),
      highlight: field('contact_heading_highlight'),
      line2Suffix: field('contact_heading_line_2_suffix'),
      line3: field('contact_heading_line_3'),
    },
  };
}
