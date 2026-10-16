import { getPageMetadata } from '@/lib/cms/seo';
import { ArtworkManagementPage, metadata as fallbackMetadata } from '@/app/solutions/artwork-management/content';



export default function GermanArtworkManagement() {
  return <ArtworkManagementPage cmsSlug="artwork-management-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('artwork-management-2', fallbackMetadata, 'de');
}
