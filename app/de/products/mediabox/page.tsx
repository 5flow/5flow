import { getPageMetadata } from '@/lib/cms/seo';
import { MediaboxPage, metadata as fallbackMetadata } from '@/app/products/mediabox/content';



export default function GermanMediabox() {
  return <MediaboxPage cmsSlug="mediabox-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('mediabox-2', fallbackMetadata, 'de');
}
