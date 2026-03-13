import { ArrowUpRight, Layers2 } from 'lucide-react';
import * as Lucide from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

type WhatItem = {
  title: string;
  desc: string;
  sub?: string;
  iconKey?: string;
};

type WhatProps = {
  title?: string;
  items?: WhatItem[];
};

function toPascalCase(key: string): string {
  return key
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

const fallbackItems: WhatItem[] = [
  {
    title: 'Growing Complexity',
    desc: 'Too many solutions, agencies and teams create silos that slow execution.',
    sub: 'With 5Flow, Bring everything into a single, connected ecosystem.',
    iconKey: 'layers2',
  },
  {
    title: 'Faster Time-to-Market',
    desc: 'Increased pressure to deliver more, sooner',
    sub: 'With 5Flow: Meet demand and work faster with integrated workflows.',
    iconKey: 'rocket',
  },
  {
    title: 'Rising Content Demands',
    desc: 'Always-on channels require more assets than teams can keep up with.',
    sub: 'With 5Flow: Accelerate approvals and keep launches on schedule.',
    iconKey: 'calendar-clock',
  },
  {
    title: 'Risk of Errors',
    desc: 'Inconsistent data and processes make it harder to stay on-brand and compliant.',
    sub: '5FLOW scales execution globally while keeping it locally responsive and consistent.',
    iconKey: 'circle-alert',
  },
];

const What = ({ title, items }: WhatProps) => {
  const data = items && items.length > 0 ? items : fallbackItems;
  const sectionTitle = title || 'Breaking barriers in the modern content supply chain';
  return (
    <div className="text-foreground flex w-full flex-col gap-4 md:gap-8">
      <div className="px-2 py-8">
        <FullBleedLines className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="font-heading w-full max-w-full text-center text-4xl leading-none font-bold tracking-tight md:max-w-5xl md:text-left md:text-[64px]">
            {sectionTitle.split(' ').map((word, i) => {
              const highlightWords = ['modern', 'content'];
              return highlightWords.includes(word) ? (
                <span key={i}><InlineHighlight>{word}</InlineHighlight> </span>
              ) : (
                <span key={i}>{word} </span>
              );
            })}
          </h2>
        </FullBleedLines>
      </div>

      <FullBleedLines>
        <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-2">
          {data.map((card, i) => {
            const Icon = (() => {
              if (!card.iconKey) return Layers2;
              const pascal = toPascalCase(card.iconKey);
              const Dynamic = (Lucide as Record<string, any>)[pascal];
              return Dynamic || Layers2;
            })();
            return (
              <div
                key={i}
                className="bg-background box-border flex h-[200px] flex-col gap-8 rounded-2xl p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:p-6 md:h-[252px]"
              >
                <div className="flex w-full items-start justify-between">
                  <p className="text-xl font-bold tracking-tight sm:text-2xl md:text-[36px]">{card.title}</p>
                  <Icon className="text-primary h-[60px] w-[60px] shrink-0" strokeWidth={1.5} />
                </div>
                <div className="w-full max-w-xl">
                  <p className="w-full max-w-102 text-[20px] leading-7 font-bold tracking-tight">{card.desc}</p>
                  {card.sub && (
                    <p className="font-body pt-2 text-[20px] leading-7 font-normal tracking-normal text-[#030712cc]">
                      {card.sub}
                    </p>
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

export default What;
