import { ArrowDown } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import ConsultingButton from './ConsultingButton';

const impactStats: StatItem[] = [
  { value: '70%', label: 'Faster speed to market' },
  { value: '60%', label: 'Improvement in right-first-time' },
  { value: '80%', label: 'Reduction in manual effort' },
  { value: '$MM', label: 'In savings through operational efficiency' },
];

const trustStats: StatItem[] = [
  { value: '30+', label: 'Countries' },
  { value: '20+', label: 'Industry sectors' },
  { value: '9,000+', label: 'Global specialists' },
];

type StatItem = {
  value?: string;
  label?: string;
  text?: string;
  prefix?: string;
};

type MetricsSectionProps = {
  impactTitle?: string;
  impactHighlight?: string;
  impactSubtitle?: string;
  impactStats?: StatItem[];
  trustTitleLine1?: string;
  trustTitleLine2?: string;
  trustHighlight?: string;
  trustSubtitle?: string;
  trustStats?: StatItem[];
  ctaText?: string;
  ctaUrl?: string;
};

function renderHighlightedTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, ...rest] = title.split(highlight);
  return (
    <>
      {before}
      <InlineHighlight>{highlight}</InlineHighlight>
      {rest.join(highlight)}
    </>
  );
}

export default function MetricsSection({
  impactTitle = 'Measurable impact',
  impactHighlight = 'impact',
  impactSubtitle = 'Real results from scalable, repeatable operations:',
  impactStats: impactStatsProp,
  trustTitleLine1 = 'Trusted by marketing operations teams across',
  trustTitleLine2 = 'global manufacturers, brand owners, and retailers.',
  trustHighlight = 'Trusted',
  trustSubtitle = 'Helping organizations simplify complexity and transform how marketing operations work.',
  trustStats: trustStatsProp,
  ctaText,
  ctaUrl,
}: MetricsSectionProps) {
  const displayImpactStats = impactStatsProp?.length ? impactStatsProp : impactStats;
  const displayTrustStats = trustStatsProp?.length ? trustStatsProp : trustStats;

  return (
    <section className="px-4 sm:px-6 md:px-0">
      <FullBleedLines className="py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-24 md:gap-40 lg:gap-48">
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-10">
              <div>
                <h2 className="font-heading text-4xl leading-none font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
                  {renderHighlightedTitle(impactTitle, impactHighlight)}
                </h2>
                <p className="mt-3 text-base leading-snug tracking-tight md:text-lg">{impactSubtitle}</p>
              </div>
              <ArrowDown className="text-accent1 h-16 w-16 md:h-28 md:w-28" strokeWidth={1.6} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-4">
              {displayImpactStats.map(stat => (
                <article
                  key={stat.label || stat.text || stat.value}
                  className="bg-background flex h-40 flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:h-56"
                >
                  <b className="font-body text-primary text-4xl sm:text-6xl">{stat.value}</b>
                  <p className="max-w-56 text-lg leading-tight font-bold tracking-tight sm:text-2xl sm:leading-none">
                    {stat.label || stat.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <ConsultingButton href={ctaUrl} label={ctaText} />
            </div>
          </div>

          <div>
            <h2 className="font-heading mx-auto w-full max-w-none text-center text-4xl leading-none font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
              <span className="block xl:whitespace-nowrap">
                {renderHighlightedTitle(trustTitleLine1, trustHighlight)}
              </span>
              <span className="block xl:whitespace-nowrap">{trustTitleLine2}</span>
            </h2>
            <p className="mt-6 text-center text-base leading-snug tracking-tight md:text-lg">{trustSubtitle}</p>

            <div className="mt-8 grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3">
              {displayTrustStats.map(stat => (
                <article
                  key={stat.label || stat.text || stat.value}
                  className="bg-background flex h-40 flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:h-56"
                >
                  {stat.prefix && <p className="text-xl tracking-tight sm:text-2xl">{stat.prefix}</p>}
                  <b className="font-body text-primary text-4xl sm:text-6xl">{stat.value}</b>
                  <p className="text-lg leading-tight font-bold tracking-tight sm:text-2xl sm:leading-none">
                    {stat.label || stat.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </FullBleedLines>
    </section>
  );
}
