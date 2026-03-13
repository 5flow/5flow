import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import ServerHero from '@/components/page/home/Hero.server';
import ServerWhat from '@/components/page/home/What.server';
import ServerHow from '@/components/page/home/How.server';
import ServerWho from '@/components/page/home/Who.server';
import ServerWhy from '@/components/page/home/Why.server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artwork Workflow Automation Platform | 5Flow',
  description: "Streamline packaging and creative operations with 5Flow's artwork workflow automation platform, enabling faster approvals, compliance tracking and collaboration.",
};
export default function Home() {
  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <ServerHero />
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-32">
          <ServerWhat />
          <ServerWho />
        </div>
      </div>

      <div className="bg-primary/5 pb-10">
        <div className="container mx-auto">
          <ServerHow />
        </div>
      </div>

      <div className="container mx-auto mb-12">
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-32">
          <ServerWhy />
          <Contact />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}

