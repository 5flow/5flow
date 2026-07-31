import { BadgeCheck, CircleAlert, Languages, ScanBarcode } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

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

export default function What() {
  return (
    <section className="flex w-full flex-col gap-20 px-4 sm:px-6 md:px-0">
      <div>
        <FullBleedLines>
          <h2 className="font-heading text-center text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
            What QC Assist <InlineHighlight>helps you catch</InlineHighlight>
          </h2>
        </FullBleedLines>

        <FullBleedLines className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2">
          {catchCards.map(({ title, desc, icon: Icon }) => (
            <article
              key={title}
              className="bg-background relative min-h-[190px] rounded-lg p-6 text-left shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
            >
              <h3 className="font-heading max-w-[340px] text-[30px] leading-tight font-bold tracking-normal text-[#262626]">
                {title}
              </h3>
              <Icon className="text-primary absolute top-6 right-6 h-10 w-10" strokeWidth={1.7} />
              <p className="mt-8 max-w-[440px] text-base leading-6 tracking-normal text-[#303030]">{desc}</p>
            </article>
          ))}
        </FullBleedLines>
      </div>

      <div>
        <FullBleedLines>
          <h2 className="font-heading text-center text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
            What changes with QC Assist?
          </h2>
        </FullBleedLines>

        <FullBleedLines className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {changeCards.map(item => (
            <article key={item.title} className="bg-primary flex min-h-[250px] flex-col rounded-lg p-7 text-left">
              <h3 className="min-h-[112px] max-w-[220px] text-[30px] leading-[1.15] font-bold tracking-normal text-success">
                {item.title}
              </h3>
              <p className="max-w-[230px] text-base leading-5 font-bold tracking-normal text-primary-foreground">{item.desc}</p>
            </article>
          ))}
        </FullBleedLines>
      </div>
    </section>
  );
}
