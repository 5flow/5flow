import { getPageMetadata } from '@/lib/cms/seo';
import { OnlineProofingPage, metadata as fallbackMetadata } from '@/app/solutions/online-proofing/content';



export default function GermanOnlineProofing() {
  return <OnlineProofingPage cmsSlug="online-proofing-2" />;
}

export async function generateMetadata() {
  return getPageMetadata('online-proofing-2', fallbackMetadata, 'de');
}
