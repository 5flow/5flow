import { features } from '@/lib/features';
import { getHomepage } from '@/lib/cms/homepage';
import { getContentBlock } from '@/lib/cms/content-block';
import What from './What';

interface ServerWhatProps {
  slug?: string;
}

export default async function ServerWhat({ slug }: ServerWhatProps) {
  if (!features.enabled) return <What />;
  try {
    const homepage = await getHomepage(slug);
    if (homepage?.what?.items?.length) {
      const items = homepage.what.items.map(i => ({
        title: i.title || '',
        desc: i.body_html || i.bodyHtml || '',
        sub: i.subtitle,
        iconKey: i.icon_key || i.iconKey,
      }));
      return <What title={homepage.what.title} items={items} />;
    }
    const block = await getContentBlock('home-what');
    if (block) {
      const items = block.items.map(i => ({
        title: i.title,
        desc: i.bodyHtml || '',
        sub: i.subtitle,
        iconKey: i.iconKey,
      }));
      return <What title={block.title} items={items} />;
    }
    return <What />;
  } catch {
    return <What />;
  }
}
