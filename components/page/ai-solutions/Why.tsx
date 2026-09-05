import { CircleAlert, CircleDollarSign, Eye, Layers } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import HtmlContent from '@/components/core/html-content';

type WhyItem = { title?: string; bodyHtml?: string; iconKey?: string };
type WhyProps = { title?: string; bodyHtml?: string; items?: WhyItem[] };

const cards = [
  {
    title: 'Approval delays',
    desc: 'Issues are discovered late in the review cycle.',
    icon: Layers,
  },
  {
    title: 'Inconsistent Reviews',
    desc: 'Checks vary between reviewers, teams and regions.',
    icon: Eye,
  },
  {
    title: 'Compliance Risk',
    desc: 'Critical information can be missed under pressure.',
    icon: CircleAlert,
  },
  {
    title: 'Costly Rework',
    desc: 'Preventable mistakes create additional review cycles.',
    icon: CircleDollarSign,
  },
];

const iconMap = { layers: Layers, eye: Eye, 'circle-alert': CircleAlert, 'circle-dollar-sign': CircleDollarSign };

export default function Why({ title = 'Why issues get caught too late.', bodyHtml, items }: WhyProps) {
  const displayCards = cards.map((fallback, index) => {
    const item = items?.[index];
    return {
      title: item?.title || fallback.title,
      desc: item?.bodyHtml || fallback.desc,
      icon: item?.iconKey ? iconMap[item.iconKey as keyof typeof iconMap] || fallback.icon : fallback.icon,
    };
  });
  return (
    <section className="flex w-full flex-col gap-8 px-4 sm:px-6 md:px-0">
      <FullBleedLines>
        <h2 className="font-heading text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">{title}</h2>
        <div className="mt-6 max-w-4xl text-xl leading-7 tracking-normal text-[#262626]">
          {bodyHtml ? (
            <HtmlContent html={bodyHtml} />
          ) : (
            <>
              Artwork reviews are often complex, time-consuming and highly dependent on individual reviewers. When teams
              are under pressure, small issues can easily slip through leading to rework, delays and unnecessary
              compliance risks.
            </>
          )}
        </div>
      </FullBleedLines>

      <FullBleedLines className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayCards.map(({ title, desc, icon: Icon }) => (
          <article
            key={title}
            className="bg-background flex min-h-[210px] flex-col rounded-lg p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
          >
            <div className="flex items-start gap-4">
              <Icon className="text-primary h-8 w-8 shrink-0" strokeWidth={1.7} />
              <h3 className="text-[28px] leading-[1.12] font-bold tracking-normal text-[#262626]">{title}</h3>
            </div>
            <p className="mt-auto max-w-[220px] pt-8 text-base leading-6 tracking-normal text-[#303030]">{desc}</p>
          </article>
        ))}
      </FullBleedLines>
    </section>
  );
}
