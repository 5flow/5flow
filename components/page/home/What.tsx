import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarClock, Layers2, CircleAlert, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullBleedLines from '@/components/core/full-bleed-lines';

type WhatItem = {
  title: string;
  desc: string;
  sub?: string;
  iconKey?: string;
};

type WhatProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  ctaTitle?: string;
  ctaText?: string;
  items?: WhatItem[];
};

const challenges = [
  {
    title: 'Approval delays',
    desc: 'Too many handoffs. Too little visibility. Reviews get stuck and launches slow down.',
    icon: CalendarClock,
  },
  {
    title: 'Compliance risk',
    desc: 'Manual checks and inconsistent reviews make costly mistakes harder to catch.',
    icon: CircleAlert,
  },
  {
    title: 'Growing Complexity',
    desc: 'More SKUs, more markets and more change requests create pressure across every team.',
    icon: Layers2,
  },
  {
    title: 'Disconnected Workflows',
    desc: 'Emails, PDFs, spreadsheets and multiple systems make collaboration harder than it should be.',
    icon: Network,
  },
];

const iconMap = { 'calendar-clock': CalendarClock, 'circle-alert': CircleAlert, 'layers-2': Layers2, network: Network };

const What = ({
  title = 'More products. More regulations. More stakeholders.',
  subtitle = 'Same deadline.',
  description = 'Packaging teams are under constant pressure to move faster while managing increasing complexity across artwork, compliance and approvals.',
  imageUrl = '/home/Tired_at_laptop.webp',
  ctaTitle = 'Stop the chaos. Take control.',
  ctaText = 'Book a Demo',
  items,
}: WhatProps) => {
  const displayChallenges = challenges.map((fallback, index) => {
    const item = items?.[index];
    const Icon = item?.iconKey ? iconMap[item.iconKey as keyof typeof iconMap] || fallback.icon : fallback.icon;
    return {
      title: item?.title || fallback.title,
      desc: item?.desc || fallback.desc,
      icon: Icon,
    };
  });
  const titleLines = title.split(/<br\s*\/?>/i);

  return (
    <section className="text-foreground w-full px-2 pt-8 pb-0 md:pt-10">
      <FullBleedLines>
        <div className="w-full">
          <div>
            <h2 className="font-heading max-w-[1180px] text-[34px] leading-[1.08] font-bold tracking-normal sm:text-5xl sm:leading-[64px] md:text-[64px]">
              {titleLines.length > 1 ? (
                titleLines.map((line, index) => (
                  <span className="block" key={`${line}-${index}`}>
                    {line}
                  </span>
                ))
              ) : title === 'More products. More regulations. More stakeholders.' ? (
                <>
                  <span className="sm:hidden">
                    More products.
                    <br />
                    More regulations.
                    <br />
                    More stakeholders.
                  </span>
                  <span className="hidden sm:inline">
                    More products. More regulations.
                    <br /> More stakeholders.
                  </span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-primary mt-3 text-2xl leading-tight font-semibold tracking-normal sm:text-[30px]">
              {subtitle}
            </p>
            <p className="mt-3 max-w-[690px] text-sm leading-5 font-semibold tracking-normal text-[#262626] sm:text-base sm:leading-6">
              {description}
            </p>
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_0.82fr]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
              {displayChallenges.map(({ title, desc, icon: Icon }) => (
                <article
                  key={title}
                  className="bg-background box-border flex min-h-[196px] flex-col rounded-lg p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
                >
                  <div className="flex items-start gap-5">
                    <Icon className="text-primary mt-0.5 h-8 w-8 shrink-0" strokeWidth={1.8} />
                    <h3 className="text-2xl leading-[1.08] font-bold tracking-normal text-[#262626]">{title}</h3>
                  </div>
                  <p className="mt-10 max-w-[315px] text-base leading-[1.6] font-semibold tracking-normal text-[#303030]">
                    {desc}
                  </p>
                </article>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="relative min-h-[196px] overflow-hidden rounded-lg shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
                <Image
                  src={imageUrl}
                  alt="Tired packaging team member working at a laptop"
                  fill
                  sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="flex min-h-[196px] flex-col rounded-lg bg-[#2530b8] p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
                <p className="max-w-[300px] text-[30px] leading-[1.08] font-bold tracking-normal text-[#24d54a]">
                  {ctaTitle}
                </p>
                <Button
                  asChild
                  className="group/cta active:ring-primary/50 active:ring-offset-background mt-auto inline-flex origin-left items-center justify-start gap-0 self-start rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 has-[>svg]:px-0"
                >
                  <Link href="/contact" aria-label="Book a demo">
                    <span className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-9 items-center px-4 text-base transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3">
                      {ctaText}
                    </span>
                    <span
                      className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FullBleedLines>
    </section>
  );
};

export default What;
