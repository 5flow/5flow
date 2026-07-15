import { Contact } from '@/components/layout';
import ServerHero from '@/components/page/home/Hero.server';
import ServerWhat from '@/components/page/home/What.server';
import ServerHow from '@/components/page/home/How.server';
import ServerWho from '@/components/page/home/Who.server';
import ServerWhy from '@/components/page/home/Why.server';
import type { Metadata } from 'next';

const GERMAN_HOME_SLUG = 'home-3';

export const metadata: Metadata = {
  title: '5Flow | Startseite',
  description: "German homepage powered by the WordPress translation entry for 5Flow's home page.",
};

export default function GermanHome() {
  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <ServerHero slug={GERMAN_HOME_SLUG} />
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-32">
          <ServerWhat slug={GERMAN_HOME_SLUG} />
          <ServerWho slug={GERMAN_HOME_SLUG} />
        </div>
      </div>

      <div className="bg-primary/5 pb-10">
        <div className="container mx-auto">
          <ServerHow slug={GERMAN_HOME_SLUG} />
        </div>
      </div>

      <div className="container mx-auto mb-12">
        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-32">
          <ServerWhy slug={GERMAN_HOME_SLUG} />
          <Contact />
        </div>
      </div>
    </div>
  );
}
