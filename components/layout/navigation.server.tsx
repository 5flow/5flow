import { features } from '@/lib/features';
import { getNavigationLabels } from '@/lib/cms/navigation';
import { getQuickLinkLabels, type QuickLinkLabels } from '@/lib/cms/quick-links';
import { Navigation } from './navigation';

// Server component to fetch navigation labels and render from CMS
export async function ServerNavigation() {
  let labelsMap: Record<string, string> | undefined = undefined;
  let pageLabels: QuickLinkLabels | undefined;

  if (features.enabled) {
    const [navigationResult, pageResult] = await Promise.allSettled([getNavigationLabels(), getQuickLinkLabels()]);
    if (navigationResult.status === 'fulfilled') {
      const labels = navigationResult.value;
      if (Array.isArray(labels) && labels.length > 0) {
        labelsMap = Object.fromEntries(labels.filter(l => l.isActive).map(l => [l.key, l.displayText]));
      }
    }
    if (pageResult.status === 'fulfilled') pageLabels = pageResult.value;
  }

  return <Navigation labels={labelsMap} pageLabels={pageLabels} />;
}
