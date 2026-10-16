import { getPageMetadata } from '@/lib/cms/seo';
import { ProcurementSourcingPage, metadata as fallbackMetadata } from '@/app/applications/role/procurement-sourcing/content';



export default function GermanProcurementSourcing() {
  return <ProcurementSourcingPage cmsSlug="procurement-sourcing-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('procurement-sourcing-2', fallbackMetadata, 'de');
}
