import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { features } from '@/lib/features';
import { getDraftLegalPage, getLegalPage } from '@/lib/cms/legal';
import PageHeader from '@/components/core/page-header';
import Markdown from '@/components/core/markdown';
import HtmlContent from '@/components/core/html-content';

export const metadata: Metadata = {
  title: 'Disclaimer | 5Flow',
  description: "Read 5Flow's website disclaimer and legal information.",
};

async function getMarkdown(): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'legal', 'Disclaimer.md');
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return 'Content not available.';
  }
}

export default async function DisclaimerPage() {
  if (features.enabled) {
    const dm = await draftMode();
    const isPreview = dm.isEnabled;
    const page = isPreview ? await getDraftLegalPage('disclaimer') : await getLegalPage('disclaimer');
    return (
      <div className="relative">
        <div className="container mx-auto mb-32">
          <PageHeader cmsSlug="disclaimer" title="disclaimer" />
          <div className="mt-10 max-w-5xl md:mt-16">
            <HtmlContent html={page.bodyHtml} />
          </div>
        </div>
      </div>
    );
  } else {
    const md = await getMarkdown();
    return (
      <div className="relative">
        <div className="container mx-auto mb-32">
          <PageHeader cmsSlug="disclaimer" title="disclaimer" />
          <div className="mt-10 max-w-5xl md:mt-16">
            <Markdown content={md} />
          </div>
        </div>
      </div>
    );
  }
}
