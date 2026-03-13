import { CtaV2 } from '@/components/layout/cta-v2';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/about/Hero';
import Vision from '@/components/page/about/Vision';
import Mission from '@/components/page/about/Mission';
import Propelis from '@/components/page/about/Propelis';
import Apart from '@/components/page/about/Apart';
import Workflow from '@/components/page/about/Workflow';
import Performance from '@/components/page/about/Performance';
import Results from '@/components/page/about/Results';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artwork Collaboration Platform for Brands | 5Flow',
  description: 'Learn how 5Flow helps brands streamline artwork collaboration, automate workflows, maintain compliance and centralize creative assets across teams.',
};
export default function About() {
  return (
    <div className="relative">
      <div className="container mx-auto">
        <PageHeader title="we. are." />
        <div className="mt-0 flex flex-col gap-16 md:mt-8 md:gap-32">
          <Hero />
          <div className="flex flex-col gap-8 md:gap-16">
            <Vision />
            <Mission />
          </div>
          <Propelis />
          <Apart />
        </div>
      </div>

      {/* Full-width sections outside container */}
      <div className="mt-16 flex flex-col gap-16 md:mt-32 md:gap-32">
        <Workflow />
        <div className="container relative mx-auto">
          <Performance />
          <Results />
        </div>
      </div>

      <CtaV2 />
    </div>
  );
}

