import { getPageMetadata } from '@/lib/cms/seo';
import { DragonflyPage, metadata as fallbackMetadata } from '@/app/products/dragonfly/content';



export default function GermanDragonfly() {
  return <DragonflyPage cmsSlug="dragonfly-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('dragonfly-2', fallbackMetadata, 'de');
}
