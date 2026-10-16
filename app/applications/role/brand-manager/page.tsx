import { getPageMetadata } from '@/lib/cms/seo';
export { default } from './content';
import { metadata as fallbackMetadata } from './content';

export async function generateMetadata() {
  return getPageMetadata('brand-manager', fallbackMetadata, 'en');
}
