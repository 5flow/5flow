import {
  CmsCtaBlock,
  CmsHeroSection,
  CmsLegalPage,
  CmsMediaAsset,
  CmsContentBlock,
  CmsContentItem,
  CmsGenericPage,
} from './types';

function sanitize(html: string): string {
  return typeof html === 'string' ? html : '';
}

type AnyObj = Record<string, unknown>;

export function toMediaAsset(rawUnknown: unknown): CmsMediaAsset {
  const raw = (rawUnknown as AnyObj) || {};
  const id = raw['id'];
  const url = raw['url'] ?? (raw as AnyObj)['source_url'];
  const alt = raw['alt'] ?? (raw as AnyObj)['alt_text'];
  const width = raw['width'];
  const height = raw['height'];
  return {
    id: typeof id === 'string' || typeof id === 'number' ? String(id) : '',
    url: typeof url === 'string' ? url : '',
    altText: typeof alt === 'string' ? alt : '',
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
  };
}

export function toCtaBlock(rawUnknown: unknown): CmsCtaBlock {
  const raw = (rawUnknown as AnyObj) || {};
  const key = raw['key'] ?? raw['internal_key'];
  const headline = raw['headline'];
  const subhead = raw['subhead'];
  const button_text = raw['button_text'];
  const buttonText = raw['buttonText'];
  const button_url = raw['button_url'];
  const buttonUrl = raw['buttonUrl'];
  const style_variant = raw['style_variant'];
  const styleVariant = raw['styleVariant'];
  const background_image = raw['background_image'];
  return {
    key: typeof key === 'string' ? key : String(key ?? ''),
    headline: typeof headline === 'string' ? headline : '',
    subhead: typeof subhead === 'string' ? subhead : undefined,
    buttonText: typeof button_text === 'string' ? button_text : typeof buttonText === 'string' ? buttonText : '',
    buttonUrl: typeof button_url === 'string' ? button_url : typeof buttonUrl === 'string' ? buttonUrl : '',
    styleVariant: (typeof style_variant === 'string'
      ? style_variant
      : typeof styleVariant === 'string'
        ? styleVariant
        : undefined) as string | undefined,
    backgroundImage: background_image ? toMediaAsset(background_image) : null,
  };
}

export function toHeroSection(rawUnknown: unknown): CmsHeroSection {
  const raw = (rawUnknown as AnyObj) || {};
  const mediaRaw = Array.isArray(raw['media']) ? (raw['media'] as unknown[]) : [];
  const id = raw['id'];
  const identifier = raw['identifier'];
  const title = raw['title'];
  const body_html = raw['body_html'];
  const body = raw['body'];
  const cta = raw['cta'];
  const highlight_style = raw['highlight_style'];
  const highlightStyle = raw['highlightStyle'];
  const sort_order = raw['sort_order'];
  const sortOrder = raw['sortOrder'];
  return {
    id: typeof id === 'string' || typeof id === 'number' ? String(id) : '',
    identifier: typeof identifier === 'string' ? identifier : '',
    title: typeof title === 'string' ? title : '',
    subtitle: typeof raw['subtitle'] === 'string' ? raw['subtitle'] : '',
    bodyHtml: sanitize(typeof body_html === 'string' ? body_html : typeof body === 'string' ? body : ''),
    media: mediaRaw.map(toMediaAsset),
    cta: cta ? toCtaBlock(cta) : undefined,
    highlightStyle: (typeof highlight_style === 'string'
      ? highlight_style
      : typeof highlightStyle === 'string'
        ? highlightStyle
        : 'default') as 'default' | 'inline-highlight' | 'pattern-overlay',
    sortOrder: typeof sort_order === 'number' ? sort_order : typeof sortOrder === 'number' ? sortOrder : 0,
  };
}

export function toContentItem(rawUnknown: unknown): CmsContentItem {
  const raw = (rawUnknown as AnyObj) || {};
  const id = raw['id'];
  const title = raw['title'];
  const subtitle = raw['subtitle'];
  const body_html = raw['body_html'];
  const body = raw['body'];
  const icon_key = raw['icon_key'];
  const iconKey = raw['iconKey'];
  const link = raw['link'];
  const link_url = raw['link_url'];
  const linkUrl = raw['linkUrl'];
  const button_link = raw['button_link'];
  const buttonLink = raw['buttonLink'];
  const button_url = raw['button_url'];
  const buttonUrl = raw['buttonUrl'];
  const image = raw['image'];
  const sort_order = raw['sort_order'];
  const sortOrder = raw['sortOrder'];
  return {
    id: typeof id === 'string' || typeof id === 'number' ? String(id) : '',
    title: typeof title === 'string' ? title : '',
    subtitle: typeof subtitle === 'string' ? subtitle : undefined,
    bodyHtml: sanitize(typeof body_html === 'string' ? body_html : typeof body === 'string' ? body : ''),
    iconKey: typeof icon_key === 'string' ? icon_key : typeof iconKey === 'string' ? iconKey : undefined,
    image: image ? toMediaAsset(image) : null,
    linkUrl:
      typeof link === 'string'
        ? link
        : typeof link_url === 'string'
          ? link_url
          : typeof linkUrl === 'string'
            ? linkUrl
            : typeof button_link === 'string'
              ? button_link
              : typeof buttonLink === 'string'
                ? buttonLink
                : typeof button_url === 'string'
                  ? button_url
                  : typeof buttonUrl === 'string'
                    ? buttonUrl
                    : undefined,
    sortOrder: typeof sort_order === 'number' ? sort_order : typeof sortOrder === 'number' ? sortOrder : 0,
  };
}

export function toContentBlock(rawUnknown: unknown): CmsContentBlock {
  const raw = (rawUnknown as AnyObj) || {};
  const id = raw['id'];
  const identifier = raw['identifier'];
  const title = raw['title'];
  const body_html = raw['body_html'];
  const body = raw['body'];
  const itemsRaw = Array.isArray(raw['items']) ? (raw['items'] as unknown[]) : [];
  const sort_order = raw['sort_order'];
  const sortOrder = raw['sortOrder'];
  return {
    id: typeof id === 'string' || typeof id === 'number' ? String(id) : '',
    identifier: typeof identifier === 'string' ? identifier : '',
    title: typeof title === 'string' ? title : '',
    bodyHtml: sanitize(typeof body_html === 'string' ? body_html : typeof body === 'string' ? body : ''),
    items: itemsRaw.map(toContentItem),
    sortOrder: typeof sort_order === 'number' ? sort_order : typeof sortOrder === 'number' ? sortOrder : 0,
  };
}

export function toLegalPage(rawUnknown: unknown): CmsLegalPage {
  const raw = (rawUnknown as AnyObj) || {};
  const slug = raw['slug'];
  const title = raw['title'];
  const titleRendered = (title as AnyObj)?.['rendered'];
  const effective_date = raw['effective_date'];
  const effectiveDate = raw['effectiveDate'];
  const body_html = raw['body_html'];
  const content = raw['content'];
  const contentRendered = (content as AnyObj)?.['rendered'];
  const revision_notes = raw['revision_notes'];
  const revisionNotes = raw['revisionNotes'];
  const modified = raw['modified'];
  const updated_at = raw['updated_at'];
  const version = raw['version'];
  return {
    slug: typeof slug === 'string' ? slug : String(slug ?? ''),
    title: typeof title === 'string' ? title : typeof titleRendered === 'string' ? titleRendered : '',
    effectiveDate:
      typeof effective_date === 'string' ? effective_date : typeof effectiveDate === 'string' ? effectiveDate : '',
    bodyHtml: sanitize(
      typeof body_html === 'string'
        ? body_html
        : typeof content === 'string'
          ? content
          : typeof contentRendered === 'string'
            ? contentRendered
            : ''
    ),
    revisionNotes:
      typeof revision_notes === 'string'
        ? revision_notes
        : typeof revisionNotes === 'string'
          ? revisionNotes
          : undefined,
    updatedAt:
      typeof modified === 'string' ? modified : typeof updated_at === 'string' ? updated_at : new Date().toISOString(),
    version: typeof version === 'number' ? version : 1,
  };
}

export function toGenericPage(rawUnknown: unknown): CmsGenericPage {
  const raw = (rawUnknown as AnyObj) || {};
  const slug = raw['slug'];
  const title = raw['title'];
  const titleRendered = (title as AnyObj)?.['rendered'];
  const content = raw['content'];
  const contentRendered = (content as AnyObj)?.['rendered'];
  const modified = raw['modified'];
  const acf = (raw['acf'] as AnyObj) || {};

  let heroImages: string[] = [];
  if (Array.isArray(acf['hero_images'])) {
    heroImages = acf['hero_images'].map((img: any) => img.url || img).filter((s: any) => typeof s === 'string');
  } else if (typeof acf['hero_images_json'] === 'string') {
    try {
      const parsed = JSON.parse(acf['hero_images_json'] as string);
      if (Array.isArray(parsed)) {
        heroImages = parsed.map((img: any) => img.url || img).filter((s: any) => typeof s === 'string');
      }
    } catch {}
  }

  return {
    slug: typeof slug === 'string' ? slug : String(slug ?? ''),
    title: typeof title === 'string' ? title : typeof titleRendered === 'string' ? titleRendered : '',
    bodyHtml: sanitize(
      typeof content === 'string' ? content : typeof contentRendered === 'string' ? contentRendered : ''
    ),
    updatedAt: typeof modified === 'string' ? modified : new Date().toISOString(),
    heroImages: heroImages.length > 0 ? heroImages : undefined,
  };
}
