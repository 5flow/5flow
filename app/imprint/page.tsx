import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { features } from '@/lib/features';
import { getDraftLegalPage, getLegalPage } from '@/lib/cms/legal';
import PageHeader from '@/components/core/page-header';
import HtmlContent from '@/components/core/html-content';

export const metadata: Metadata = {
  title: 'Imprint | 5Flow',
  description: 'Company imprint and legal disclosure for 5Flow GmbH.',
};

async function getImprint(): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'legal', 'Imprint.txt');
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return 'Content not available.';
  }
}

export default async function ImprintPage() {
  if (features.enabled) {
    const dm = await draftMode();
    const isPreview = dm.isEnabled;
    const page = isPreview ? await getDraftLegalPage('imprint') : await getLegalPage('imprint');
    return (
      <div className="relative">
        <div className="container mx-auto mb-32">
          <PageHeader cmsSlug="imprint" title="imprint" />
          <div className="mt-10 max-w-5xl md:mt-16">
            <HtmlContent html={page.bodyHtml} />
          </div>
        </div>
      </div>
    );
  } else {
    const content = await getImprint();
    return (
      <div className="relative">
        <div className="container mx-auto mb-32">
          <PageHeader cmsSlug="imprint" title="imprint" />
          <div className="text-foreground/80 mt-10 max-w-5xl leading-7 whitespace-pre-wrap md:mt-16">{content}</div>
        </div>
      </div>
    );
  }
}
