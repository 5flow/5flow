import type { Metadata } from 'next';
import { Contact } from '@/components/layout';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/resources/Hero';
import DownloadsSection from '@/components/page/resources/DownloadsSection';
import { getDownloadCards } from '@/lib/resources/downloads';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Artwork Workflow Downloads & Guides | 5Flow',
  description: 'Download practical guides, templates, and in-depth resources from 5Flow.',
};

export default async function Downloads() {
  const downloadItems = await getDownloadCards();

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="downloads" />

        <div className="flex flex-col gap-32">
          <Hero
            title="Download practical resources"
            subtitle="Access expert guides, templates, and in-depth materials designed to help you streamline workflows, improve data flow, and drive operational efficiency."
          />
          <DownloadsSection items={downloadItems} />

          <Contact leadingText="Explore " highlightedText="more" trailingText=" resources" />
        </div>
      </div>
    </div>
  );
}
