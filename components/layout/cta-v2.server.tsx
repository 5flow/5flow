import { features } from '@/lib/features';
import { getQuickLinkLabels } from '@/lib/cms/quick-links';
import { CtaV2 } from './cta-v2';

export async function ServerCtaV2() {
  const labels = features.enabled ? await getQuickLinkLabels().catch(() => undefined) : undefined;
  return <CtaV2 labels={labels} />;
}
