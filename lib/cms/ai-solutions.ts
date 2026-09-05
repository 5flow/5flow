import { wpFetch } from './client';

export type AiSolutionItem = {
  title?: string;
  bodyHtml?: string;
  iconKey?: string;
};

export type AiSolutionsData = {
  hero?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  why?: {
    title?: string;
    bodyHtml?: string;
    items?: AiSolutionItem[];
  };
  build?: {
    title?: string;
    subtitle?: string;
    bodyHtml?: string;
    imageUrl?: string;
    items?: AiSolutionItem[];
    ctaText?: string;
    ctaUrl?: string;
  };
  what?: {
    title?: string;
    highlight?: string;
    items?: AiSolutionItem[];
    changesTitle?: string;
    changesItems?: AiSolutionItem[];
  };
  ready?: {
    title?: string;
    description?: string;
    items?: string[];
    humanTitle?: string;
    humanDescription?: string;
    finalTitle?: string;
    finalDescription?: string;
    highlights?: string[];
  };
};

function parseJson<T>(value: unknown, fallback: T): T {
  if (value && typeof value === 'object') return value as T;
  if (typeof value !== 'string' || !value.trim()) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapItems(value: unknown): AiSolutionItem[] {
  const items = parseJson<Array<Record<string, unknown>>>(value, []);
  return items.map(item => ({
    title: typeof item.title === 'string' ? item.title : undefined,
    bodyHtml:
      typeof item.body_html === 'string'
        ? item.body_html
        : typeof item.bodyHtml === 'string'
          ? item.bodyHtml
          : undefined,
    iconKey:
      typeof item.icon_key === 'string' ? item.icon_key : typeof item.iconKey === 'string' ? item.iconKey : undefined,
  }));
}

function resolveImageUrl(value: unknown): string | undefined {
  if (typeof value === 'string') return value.trim() || undefined;
  if (!value || typeof value !== 'object') return undefined;
  const image = value as Record<string, unknown>;
  return typeof image.url === 'string' && image.url.trim() ? image.url : undefined;
}

export async function getAiSolutions(slug = 'ai-solutions'): Promise<AiSolutionsData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || !raw.length) return null;

  const page = raw[0] as Record<string, any>;
  const acf = (page.acf || {}) as Record<string, any>;
  const meta = (page.meta || {}) as Record<string, any>;
  const field = (key: string) => meta[key] ?? acf[key];
  const whatContent = parseJson<Record<string, any>>(field('what_content_json'), {});
  const readyContent = parseJson<Record<string, any>>(field('ready_content_json'), {});

  return {
    hero: {
      title: field('hero_title'),
      subtitle: field('hero_subtitle'),
      bodyHtml: field('hero_body_html'),
      ctaText: field('hero_cta_text'),
      ctaUrl: field('hero_cta_url'),
    },
    why: {
      title: field('why_title'),
      bodyHtml: field('why_body_html'),
      items: mapItems(field('why_items_json')),
    },
    build: {
      title: field('build_title'),
      subtitle: field('build_subtitle'),
      bodyHtml: field('build_body_html'),
      imageUrl: resolveImageUrl(field('build_image')),
      items: mapItems(field('build_items_json')),
      ctaText: field('build_cta_text'),
      ctaUrl: field('build_cta_url'),
    },
    what: {
      title: field('what_title'),
      highlight: field('what_highlight'),
      items: mapItems(whatContent.items),
      changesTitle: whatContent.changes_title,
      changesItems: mapItems(whatContent.changes_items),
    },
    ready: {
      title: field('ready_title'),
      description: readyContent.description,
      items: parseJson<string[]>(readyContent.items, []),
      humanTitle: readyContent.human_title,
      humanDescription: readyContent.human_description,
      finalTitle: readyContent.final_title,
      finalDescription: readyContent.final_description,
      highlights: parseJson<string[]>(field('ready_highlights_json'), []),
    },
  };
}
