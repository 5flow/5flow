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
  title: 'Cookies Policy | 5Flow',
  description: 'Learn how 5Flow uses cookies to enhance your browsing experience and provide personalized content.',
};

async function getMarkdown(): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'legal', 'Cookies Policy.md');
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return 'Content not available.';
  }
}

export default async function CookiesPolicyPage() {
  if (features.enabled) {
    const dm = await draftMode();
    const isPreview = dm.isEnabled;
    const page = isPreview ? await getDraftLegalPage('cookies') : await getLegalPage('cookies');
    return (
      <div className="relative">
        <div className="container mx-auto mb-32">
          <PageHeader title="cookies policy" />
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
          <PageHeader title="cookies policy" />
          <div className="mt-10 max-w-5xl md:mt-16">
            <Markdown content={md} />
          </div>
        </div>
      </div>
    );
  }
}
