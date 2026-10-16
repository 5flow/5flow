import { getPageMetadata } from '@/lib/cms/seo';
import { ContentManagementPage, metadata as fallbackMetadata } from '@/app/solutions/content-management/content';



export default function GermanContentManagement() {
  return <ContentManagementPage cmsSlug="content-management-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('content-management-2', fallbackMetadata, 'de');
}
