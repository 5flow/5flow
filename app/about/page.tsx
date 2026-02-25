import { CtaV2 } from '@/components/layout/cta-v2';
import PageHeader from '@/components/core/page-header';
import AboutServerSections from '@/components/page/about/About.server';

export default function About() {
  return (
    <div className="relative">
      <div className="container mx-auto">
        <PageHeader title="we. are." />
        <div className="mt-0 flex flex-col gap-16 md:mt-8 md:gap-32">
          <AboutServerSections />
        </div>
      </div>

      <CtaV2 />
    </div>
  );
}
