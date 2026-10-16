import { getPageMetadata } from '@/lib/cms/seo';
import { BeautyCosmeticsPage, metadata as fallbackMetadata } from '@/app/applications/industry/beauty-cosmetics/content';



export default function GermanBeautyCosmetics() {
  return <BeautyCosmeticsPage cmsSlug="beauty-cosmetics-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('beauty-cosmetics-2', fallbackMetadata, 'de');
}
