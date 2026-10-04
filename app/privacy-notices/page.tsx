import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import PageHeader from '@/components/core/page-header';
import Markdown from '@/components/core/markdown';

export const metadata: Metadata = {
  title: 'Privacy Notices | 5Flow',
  description: "Read 5Flow's privacy notices.",
};

async function getMarkdown(): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'legal', 'Privacy Notices.md');
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return 'Content not available.';
  }
}

export default async function PrivacyPolicyPage() {
  const md = await getMarkdown();
  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader cmsSlug="privacy-notices" title="privacy notices" />
        <div className="mt-10 max-w-5xl md:mt-16">
          <Markdown content={md} />
        </div>
      </div>
    </div>
  );
}
