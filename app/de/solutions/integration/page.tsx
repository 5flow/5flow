import { getPageMetadata } from '@/lib/cms/seo';
import { IntegrationPage, metadata as fallbackMetadata } from '@/app/solutions/integration/content';



export default function GermanIntegration() {
  return <IntegrationPage cmsSlug="integration-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('integration-2', fallbackMetadata, 'de');
}
