import { CtaV2 } from '@/components/layout/cta-v2';
import PageHeader from '@/components/core/page-header';
import AboutServerSections from '@/components/page/about/About.server';

export default function About() {
  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="we. are." />
        <div className="mt-8 flex flex-col gap-16 md:mt-16 md:gap-32">
          <AboutServerSections />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
