import { getPageMetadata } from '@/lib/cms/seo';
import { WavePage, metadata as fallbackMetadata } from '@/app/products/wave/content';



export default function GermanWave() {
  return <WavePage cmsSlug="wave-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('wave-2', fallbackMetadata, 'de');
}
