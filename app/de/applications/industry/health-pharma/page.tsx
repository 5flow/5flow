import { getPageMetadata } from '@/lib/cms/seo';
import { HealthPharmaPage, metadata as fallbackMetadata } from '@/app/applications/industry/health-pharma/content';



export default function GermanHealthPharma() {
  return <HealthPharmaPage cmsSlug="health-pharma-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('health-pharma-2', fallbackMetadata, 'de');
}
