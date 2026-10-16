import { getPageMetadata } from '@/lib/cms/seo';
import { CreativeStudioPage, metadata as fallbackMetadata } from '@/app/applications/role/creative-studio/content';



export default function GermanCreativeStudio() {
  return <CreativeStudioPage cmsSlug="creative-studio-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('creative-studio-2', fallbackMetadata, 'de');
}
