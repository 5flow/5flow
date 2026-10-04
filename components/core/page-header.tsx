import FullBleedLines from './full-bleed-lines';
import InlineCmsText from './inline-cms-text';
import { features } from '@/lib/features';
import { getPageHeaderTitle } from '@/lib/cms/page-header';

interface PageHeaderProps {
  title: string;
  cmsSlug?: string;
}

const PageHeader = async ({ title, cmsSlug }: PageHeaderProps) => {
  const cmsTitle = features.enabled && cmsSlug ? await getPageHeaderTitle(cmsSlug).catch(() => undefined) : undefined;
  return (
    <FullBleedLines className="mt-32 flex w-full justify-end gap-8 md:mt-50">
      <b className="text-foreground min-w-0 text-4xl leading-none tracking-tight md:text-5xl">
        <InlineCmsText value={cmsTitle || title} />
      </b>
      <div className="bg-primary h-10 w-10 shrink-0" />
    </FullBleedLines>
  );
};

export default PageHeader;
