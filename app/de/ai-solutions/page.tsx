import { getPageMetadata } from '@/lib/cms/seo';
import { AiSolutionsPage, metadata as fallbackMetadata } from '@/app/ai-solutions/content';



export default function GermanAiSolutions() {
  return <AiSolutionsPage cmsSlug="ai-solutions-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('ai-solutions-2', fallbackMetadata, 'de');
}
