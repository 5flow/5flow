import { getPageMetadata } from '@/lib/cms/seo';
import { AboutPage, metadata as fallbackMetadata } from '@/app/about/content';



export default function GermanAbout() {
  return <AboutPage cmsSlug="about-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('about-2', fallbackMetadata, 'de');
}
