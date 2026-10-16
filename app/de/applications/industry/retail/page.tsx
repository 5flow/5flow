import { getPageMetadata } from '@/lib/cms/seo';
import { RetailPage, metadata as fallbackMetadata } from '@/app/applications/industry/retail/content';



export default function GermanRetail() {
  return <RetailPage cmsSlug="retail-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('retail-2', fallbackMetadata, 'de');
}
