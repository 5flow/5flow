import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Cloud } from 'lucide-react';
import * as Lucide from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

type HowItem = { title: string; desc: string; link?: string; iconKey?: string };
type HowProps = { title?: string; subtitle?: string; desc?: string; items?: HowItem[] };

function toPascalCase(key: string): string {
  return key
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

const fallbackItems: HowItem[] = [
  {
    title: 'Wave Platform',
    desc: 'Platform technology that streamlines workflows for packaging, content, and creative. Built for automation, approvals, and compliance, at scale.',
    link: '/products/wave',
    iconKey: 'cloud',
  },
  {
    title: 'Custom Solutions',
    desc: 'Tailored to your business needs. Enhanced with AI, automation, and seamless integration into your ecosystem.',
    link: '/products/mediabox',
    iconKey: 'puzzle',
  },
  {
    title: 'Consulting',
    desc: 'Expert guidance to simplify complexity, optimize workflows, and unlock growth through strategy, technology, and process transformation.',
    link: '/solutions/consulting',
    iconKey: 'message-square',
  },
];

const How = ({ title, subtitle, desc, items }: HowProps) => {
  const data = items && items.length > 0 ? items : fallbackItems;
  const sectionTitle = title || 'How do we solve it?';
  const sectionSubtitle = subtitle || 'Simplifying Complexity Across Marketing & Packaging Ecosystems.';
  const sectionDesc = desc || 'Driven by AI, automation, and the power of Propelis.';
  return (
    <div className="text-foreground flex w-full flex-col">
      <div className="p-2 pt-12 pb-8 md:pt-16 md:pb-6">
        <FullBleedLines className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p className="font-heading text-center text-4xl leading-tight font-bold tracking-tight sm:text-6xl sm:leading-none md:text-left md:text-[64px]">
              <InlineHighlight>{sectionTitle.split(' ')[0]}</InlineHighlight>{' '}
              {sectionTitle.split(' ').slice(1).join(' ')}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-8 md:gap-6 md:px-0">
            <b className="font-heading text-center text-xl leading-tight tracking-tight sm:text-2xl sm:leading-none md:text-left md:text-[32px]">
              {sectionSubtitle}
            </b>
            <p className="text-foreground w-full text-center text-sm leading-[150%] font-normal tracking-tight sm:text-base md:text-left md:text-[20px] md:leading-7 md:tracking-normal md:text-[#030712cc]">
              {sectionDesc}
            </p>
          </div>
        </FullBleedLines>
      </div>

      <FullBleedLines>
        <div className="flex flex-col gap-2 p-2 py-8 md:flex-row md:py-12">
          {data.map((item, i) => {
            const Icon = (() => {
              if (!item.iconKey) return Cloud;
              const pascal = toPascalCase(item.iconKey);
              const Dynamic = (Lucide as Record<string, any>)[pascal];
              return Dynamic || Cloud;
            })();
            return (
              <div
                key={i}
                className="bg-background flex w-full flex-col gap-2 rounded-2xl p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] md:flex-1 md:p-1"
              >
                <div className="flex w-full items-center gap-4 p-2 md:gap-6 md:p-5">
                  <Icon className="text-primary h-10 w-10 sm:h-14 sm:w-14 md:h-15 md:w-15" strokeWidth={1.5} />
                  <p className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl sm:leading-none md:text-3xl">{item.title}</p>
                </div>

                <div className="grid w-full flex-1 grid-cols-1 gap-4 p-2 md:min-h-[220px] md:grid-cols-[1fr_auto] md:items-end md:gap-8 md:p-5">
                  <p className="font-body text-foreground text-base leading-tight font-normal tracking-tight sm:text-xl sm:leading-none md:self-start md:text-[20px] md:leading-7 md:tracking-normal md:text-[#030712cc]">
                    {item.desc}
                  </p>
                  {item.link && (
                    <Link href={item.link} className="self-end md:self-end">
                      <Button
                        className="bg-primary hover:ring-primary/50 hover:ring-offset-background size-12 origin-center cursor-pointer rounded-none px-2 py-1 transition-all duration-300 ease-[var(--easing-smooth)] hover:translate-x-[1px] hover:scale-[0.92] hover:ring-4 hover:ring-offset-2 active:scale-[0.9] active:ring-6 md:size-15 md:px-4 md:py-2"
                        aria-label="Contact"
                      >
                        <ArrowUpRight className="size-6 sm:size-8" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FullBleedLines>
    </div>
  );
};

export default How;
