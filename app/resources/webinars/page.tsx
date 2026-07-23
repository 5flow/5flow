import type { Metadata } from 'next';
import { Contact } from '@/components/layout';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/resources/Hero';
import WebinarsSection from '@/components/page/resources/WebinarsSection';
import { getWebinarCards } from '@/lib/resources/webinars';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Industry Expert Webinars | 5Flow',
  description: 'Explore 5Flow webinars and expert sessions.',
};

export default async function Webinars() {
  const webinarItems = await getWebinarCards();

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="webinars" />

        <div className="flex flex-col gap-32">
          <Hero
            title="Insights from industry experts"
            subtitle="Access expert sessions designed to help teams work smarter, move faster, and deliver with confidence."
          />
          <WebinarsSection items={webinarItems} />

          <Contact leadingText="Ready to write your own " highlightedText="success" trailingText=" story?" />
        </div>
      </div>
    </div>
  );
}
