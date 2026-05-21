import { features } from '@/lib/features';
import { getHomepage } from '@/lib/cms/homepage';
import { getContentBlock } from '@/lib/cms/content-block';
import How from './How';

interface ServerHowProps {
  slug?: string;
}

export default async function ServerHow({ slug }: ServerHowProps) {
  if (!features.enabled) return <How />;
  try {
    const homepage = await getHomepage(slug);
    if (homepage?.how?.items?.length) {
      const items = homepage.how.items.map(i => ({
        title: i.title || '',
        desc: i.body_html || i.bodyHtml || '',
        link:
          i.link ||
          i.link_url ||
          i.linkUrl ||
          i.button_link ||
          i.buttonLink ||
          i.button_url ||
          i.buttonUrl ||
          '/contact',
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
