import { BadgeCheck, CircleAlert, Languages, ScanBarcode } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

type WhatItem = { title?: string; bodyHtml?: string; iconKey?: string };
type WhatProps = {
  title?: string;
  highlight?: string;
  items?: WhatItem[];
  changesTitle?: string;
  changesItems?: WhatItem[];
};

const catchCards = [
  {
    title: 'Regulatory Statements',
    desc: 'Stay compliant and avoid surprises. QC Assist helps identify potential gaps before they become approval delays.',
    icon: BadgeCheck,
  },
  {
    title: 'Spelling & Grammar',
    desc: 'Catch errors before they reach the next review cycle. QC Assist helps teams improve consistency and reduce avoidable rework.',
    icon: Languages,
  },
  {
    title: 'Barcode Validation',
    desc: 'Review with confidence. QC Assist helps validate barcode information during review, reducing risk before artwork is approved.',
    icon: ScanBarcode,
  },
  {
    title: 'Quality Risks',
    desc: 'Keep approvals moving. QC Assist surfaces potential issues earlier, helping teams make faster and more consistent decisions.',
    icon: CircleAlert,
  },
];

const changeCards = [
  {
    title: 'Faster approvals',
    desc: 'Catch issues earlier and reduce review cycle times.',
  },
  {
    title: 'Reduced compliance risk',
    desc: 'Rule-based validation helps identify issues before approval.',
  },
  {
    title: 'Consistency at scale',
    desc: 'Standardized checks across teams, reviewers and regions.',
  },
  {
    title: 'Reviewer confidence',
    desc: 'Clear findings help reviewers make better decisions.',
  },
];

const iconMap = {
  'badge-check': BadgeCheck,
  languages: Languages,
  'scan-barcode': ScanBarcode,
  'circle-alert': CircleAlert,
};

function renderHighlightedTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, ...after] = title.split(highlight);
  return (
    <>
      {before}
      <InlineHighlight>{highlight}</InlineHighlight>
      {after.join(highlight)}
    </>
  );
}

export default function What({
  title = 'What QC Assist helps you catch',
  highlight = 'helps you catch',
  items,
  changesTitle = 'What changes with QC Assist?',
  changesItems,
}: WhatProps) {
  const displayCatchCards = catchCards.map((fallback, index) => {
    const item = items?.[index];
    return {
      title: item?.title || fallback.title,
      desc: item?.bodyHtml || fallback.desc,
      icon: item?.iconKey ? iconMap[item.iconKey as keyof typeof iconMap] || fallback.icon : fallback.icon,
    };
  });
  const displayChangeCards = changeCards.map((fallback, index) => ({
    title: changesItems?.[index]?.title || fallback.title,
    desc: changesItems?.[index]?.bodyHtml || fallback.desc,
  }));
  return (
    <section className="flex w-full flex-col gap-20 px-4 sm:px-6 md:px-0">
      <div>
        <FullBleedLines>
          <h2 className="font-heading text-center text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
            {renderHighlightedTitle(title, highlight)}
          </h2>
        </FullBleedLines>

        <FullBleedLines className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2">
          {displayCatchCards.map(({ title, desc, icon: Icon }) => (
            <article
              key={title}
              className="bg-background min-h-[196px] rounded-lg p-6 text-left shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
            >
              <div className="flex items-start justify-between gap-5">
                <h3 className="font-heading min-w-0 text-2xl leading-[1.08] font-bold tracking-normal text-[#262626]">
                  {title}
                </h3>
                <Icon className="text-primary mt-0.5 h-8 w-8 shrink-0" strokeWidth={1.8} />
              </div>
              <p className="mt-10 max-w-[440px] text-base leading-[1.6] font-semibold tracking-normal text-[#303030]">
                {desc}
              </p>
            </article>
          ))}
        </FullBleedLines>
      </div>

      <div>
        <FullBleedLines>
          <h2 className="font-heading text-center text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
            {changesTitle}
          </h2>
        </FullBleedLines>

        <FullBleedLines className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayChangeCards.map(item => (
            <article key={item.title} className="bg-primary flex min-h-[250px] flex-col rounded-lg p-7 text-left">
              <h3 className="text-success min-h-[112px] max-w-[220px] text-[30px] leading-[1.15] font-bold tracking-normal">
                {item.title}
              </h3>
              <p className="text-primary-foreground max-w-[230px] text-base leading-5 font-bold tracking-normal">
                {item.desc}
              </p>
            </article>
          ))}
        </FullBleedLines>
      </div>
    </section>
  );
}
