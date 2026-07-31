import type { Metadata } from 'next';
import { Contact } from '@/components/layout';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/ai-solutions/Hero';
import Why from '@/components/page/ai-solutions/Why';
import Build from '@/components/page/ai-solutions/Build';
import What from '@/components/page/ai-solutions/What';
import Ready from '@/components/page/ai-solutions/Ready';

export const metadata: Metadata = {
  title: 'AI Solutions for Packaging Quality | QC Assist | 5Flow',
  description:
    'QC Assist uses AI-assisted quality checks to help packaging teams identify potential artwork, barcode, spelling and compliance issues earlier.',
};

export default function AiSolutions() {
  return (
    <div className="relative overflow-x-clip">
      <div className="container mx-auto mb-32">
        <PageHeader title="QC Assist" />

        <div className="flex flex-col gap-28 md:gap-36">
          <Hero />
          <Why />
          <Build />
          <What />
          <Ready />
          <Contact headingWrapperClassName="hidden" formTitle="Book a demo" />
        </div>
      </div>
    </div>
  );
}
