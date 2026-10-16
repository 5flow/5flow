import { getPageMetadata } from '@/lib/cms/seo';
import { QualityRegulatoryPage, metadata as fallbackMetadata } from '@/app/applications/role/quality-regulatory/content';



export default function GermanQualityRegulatory() {
  return <QualityRegulatoryPage cmsSlug="quality-regulatory-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('quality-regulatory-2', fallbackMetadata, 'de');
}
