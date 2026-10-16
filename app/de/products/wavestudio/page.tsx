import { getPageMetadata } from '@/lib/cms/seo';
import { WavestudioPage, metadata as fallbackMetadata } from '@/app/products/wavestudio/content';



export default function GermanWavestudio() {
  return <WavestudioPage cmsSlug="wavestudio-4" />;
}

export async function generateMetadata() {
  return getPageMetadata('wavestudio-4', fallbackMetadata, 'de');
}
