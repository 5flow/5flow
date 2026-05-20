import PageHeader from '@/components/core/page-header';
import FullBleedLines from '@/components/core/full-bleed-lines';
import ConsultingButton from './ConsultingButton';

type HeroProps = {
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  ctaText?: string;
  ctaUrl?: string;
};

export default function Hero({
  titleLine1 = "We don't just create strategy,",
  titleLine2 = 'we make it work.',
  subtitle = 'Most consultancies focus on strategy alone.',
  descriptionLine1 = 'We combine marketing operations consulting, operating model design, and',
  descriptionLine2 = 'execution to deliver real, measurable outcomes.',
  ctaText,
  ctaUrl,
}: HeroProps) {
  return (
    <section className="px-4 sm:px-6 md:px-0">
      <PageHeader title="consulting" />

      <FullBleedLines className="font-heading mt-8 py-12 md:mt-16 md:py-16 lg:py-20">
        <div className="max-w-none">
          <h1 className="text-4xl leading-none font-bold tracking-tighter sm:text-5xl md:text-[72px] md:leading-[72px] lg:text-[94px] lg:leading-[94px]">
            <span className="block lg:whitespace-nowrap">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </h1>
          <p className="text-primary mt-4 text-2xl leading-none tracking-tighter sm:text-3xl md:mt-5 md:text-5xl">
            {subtitle}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed tracking-tight md:mt-8 md:text-lg">
            {descriptionLine1}
            <br className="hidden md:block" />
            {descriptionLine2}
          </p>
          <div className="mt-8">
            <ConsultingButton href={ctaUrl} label={ctaText} />
          </div>
        </div>
      </FullBleedLines>
    </section>
  );
}
