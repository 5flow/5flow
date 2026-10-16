import { getPageMetadata } from '@/lib/cms/seo';
import { DataAnalysisPage, metadata as fallbackMetadata } from '@/app/solutions/data-analysis/content';



export default function GermanDataAnalysis() {
  return <DataAnalysisPage cmsSlug="data-analysis-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('data-analysis-2', fallbackMetadata, 'de');
}
