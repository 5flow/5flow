import { getPageMetadata } from '@/lib/cms/seo';
import { BrandManagerPage, metadata as fallbackMetadata } from '@/app/applications/role/brand-manager/content';



export default function GermanBrandManager() {
  return <BrandManagerPage cmsSlug="brand-manager-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('brand-manager-2', fallbackMetadata, 'de');
}
