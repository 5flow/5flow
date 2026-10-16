import { getPageMetadata } from '@/lib/cms/seo';
import { AssetLibraryPage, metadata as fallbackMetadata } from '@/app/solutions/asset-library/content';



export default function GermanAssetLibrary() {
  return <AssetLibraryPage cmsSlug="asset-library-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('asset-library-2', fallbackMetadata, 'de');
}
