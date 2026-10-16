import { getPageMetadata } from '@/lib/cms/seo';
import { AutomatedArtworkPage, metadata as fallbackMetadata } from '@/app/solutions/automated-artwork/content';



export default function GermanAutomatedArtwork() {
  return <AutomatedArtworkPage cmsSlug="automated-artwork-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('automated-artwork-2', fallbackMetadata, 'de');
}
