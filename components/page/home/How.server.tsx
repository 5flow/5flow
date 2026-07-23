import { features } from '@/lib/features';
import { getHomepage } from '@/lib/cms/homepage';
import { getContentBlock } from '@/lib/cms/content-block';
import How from './How';

interface ServerHowProps {
  slug?: string;
}

function resolveUrl(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || undefined;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const resolved = resolveUrl(item);
      if (resolved) return resolved;
    }
    return undefined;
  }

  if (value && typeof value === 'object') {
    const item = value as Record<string, unknown>;
    return (
      resolveUrl(item.url) ||
      resolveUrl(item.href) ||
      resolveUrl(item.link) ||
      resolveUrl(item.link_url) ||
      resolveUrl(item.linkUrl) ||
      resolveUrl(item.button_link) ||
      resolveUrl(item.buttonLink) ||
      resolveUrl(item.button_url) ||
      resolveUrl(item.buttonUrl)
    );
  }

  return undefined;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function resolveHowLink(item: unknown, index?: number): string | undefined {
  const record = (item || {}) as Record<string, unknown>;
  const fromCms =
    resolveUrl(record.link) ||
    resolveUrl(record.link_url) ||
    resolveUrl(record.linkUrl) ||
    resolveUrl(record.button_link) ||
    resolveUrl(record.buttonLink) ||
    resolveUrl(record.button_url) ||
    resolveUrl(record.buttonUrl) ||
    resolveUrl(record.cta) ||
    resolveUrl(record.button);

  if (fromCms) return fromCms;

  const title = typeof record.title === 'string' ? normalizeText(record.title) : '';
  if (title.includes('wave')) return '/products/wave';
  if (title.includes('custom') || title.includes('mediabox') || title.includes('individuelle')) {
    return '/products/mediabox';
  }
  if (title.includes('consulting') || title.includes('beratung')) return '/solutions/consulting';

  const fallbackLinks = ['/products/wave', '/products/mediabox', '/solutions/consulting'];
  if (typeof index === 'number' && index >= 0 && index < fallbackLinks.length) {
    return fallbackLinks[index];
  }

  return undefined;
}

export default async function ServerHow({ slug }: ServerHowProps) {
  if (!features.enabled) return <How />;
  try {
    const homepage = await getHomepage(slug);
    if (homepage?.how?.items?.length) {
      const items = homepage.how.items.map((i, index) => ({
        title: i.title || '',
        desc: i.body_html || i.bodyHtml || '',
        link: resolveHowLink(i, index),
        iconKey: i.icon_key || i.iconKey,
      }));
      return (
        <How title={homepage.how.title} desc={homepage.how.bodyHtml} subtitle={homepage.how.subtitle} items={items} />
      );
    }
    const block = await getContentBlock('home-how');
    if (block) {
      const items = block.items.map(i => ({
        title: i.title,
        desc: i.bodyHtml || '',
        link: i.linkUrl,
        iconKey: i.iconKey,
      }));
      return <How title={block.title} subtitle={block.bodyHtml} items={items} />;
    }
    return <How />;
  } catch {
    return <How />;
  }
}
