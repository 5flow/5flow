import { Contact } from '@/components/layout';
import Hero from '@/components/page/home/Hero';
import What from '@/components/page/home/What';
import How from '@/components/page/home/How';
import Why from '@/components/page/home/Why';
import Who from '@/components/page/home/Who';
import New from '@/components/page/home/New';
import InlineHighlight from '@/components/core/inline-highlight';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artwork Workflow Automation Platform | 5Flow',
  description: "Streamline packaging and creative operations with 5Flow's artwork workflow automation platform, enabling faster approvals, compliance tracking and collaboration.",
};
export default function Home() {
  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <Hero />
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-20">
          <What />
        </div>
      </div>

      <div className="bg-primary/5 pb-10">
        <div className="container mx-auto">
          <How />
        </div>
      </div>

      <div className="container mx-auto mb-12">
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-32">
          <Why />
          <Who title="Trusted by packaging leaders" />
          <New />
          <Contact
            heading={
              <>
                Ready for <InlineHighlight>better flow?</InlineHighlight>
              </>
            }
            subheading="Bring packaging to market. Without the chaos."
          />
        </div>
      </div>
    </div>
  );
}


