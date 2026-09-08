import { wpFetch } from './client';

type AboutItem = {
  title?: string;
  description?: string;
  icon_key?: string;
  iconKey?: string;
};

type AboutStat = {
  value?: string;
  label?: string;
};

export interface AboutData {
  pageHeaderTitle?: string;
  hero?: {
    description?: string;
    images: string[];
  };
  vision?: {
    title?: string;
    text?: string;
  };
  mission?: {
    title?: string;
    text?: string;
  };
  propelis?: {
    title?: string;
    highlight?: string;
    description?: string;
  };
  apart?: {
    title?: string;
    highlight?: string;
    items: AboutItem[];
  };
  workflow?: {
    title?: string;
    highlight?: string;
    introText?: string;
    images: string[];
    isoText?: string;
  };
  performance?: {
    title?: string;
    highlight?: string;
    description?: string;
    stats: AboutStat[];
  };
  results?: {
    title?: string;
    highlight?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
}

function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export async function getAbout(slug = 'about'): Promise<AboutData | null> {
  const raw = await wpFetch(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const page: any = raw[0];
  const acf: Record<string, any> = page.acf || {};
  const meta: Record<string, any> = page.meta || acf;

  return {
    pageHeaderTitle: meta.page_header_title || acf.page_header_title,
    hero: {
      description: meta.hero_description || acf.hero_description,
      images: parseJsonArray<string>(meta.hero_images_json || acf.hero_images_json),
    },
    vision: {
      title: meta.vision_title || acf.vision_title,
      text: meta.vision_text || acf.vision_text,
    },
    mission: {
      title: meta.mission_title || acf.mission_title,
      text: meta.mission_text || acf.mission_text,
    },
    propelis: {
      title: meta.propelis_title || acf.propelis_title,
      highlight: meta.propelis_highlight || acf.propelis_highlight,
      description: meta.propelis_description || acf.propelis_description,
    },
    apart: {
      title: meta.apart_title || acf.apart_title,
      highlight: meta.apart_highlight || acf.apart_highlight,
      items: parseJsonArray<AboutItem>(meta.apart_items_json || acf.apart_items_json),
    },
    workflow: {
      title: meta.workflow_title || acf.workflow_title,
      highlight: meta.workflow_highlight || acf.workflow_highlight,
      introText: meta.workflow_intro_text || acf.workflow_intro_text,
      images: parseJsonArray<string>(meta.workflow_images_json || acf.workflow_images_json),
      isoText: meta.workflow_iso_text || acf.workflow_iso_text,
    },
    performance: {
      title: meta.performance_title || acf.performance_title,
      highlight: meta.performance_highlight || acf.performance_highlight,
      description: meta.performance_description || acf.performance_description,
      stats: parseJsonArray<AboutStat>(meta.performance_stats_json || acf.performance_stats_json),
    },
    results: {
      title: meta.results_title || acf.results_title,
      highlight: meta.results_highlight || acf.results_highlight,
      description: meta.results_description || acf.results_description,
      ctaText: meta.results_cta_text || acf.results_cta_text,
      ctaUrl: meta.results_cta_url || acf.results_cta_url,
    },
  };
}
