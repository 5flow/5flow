import Image from 'next/image';
import { UsersRound, Zap } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import ConsultingButton from './ConsultingButton';

const principles = [
  {
    title: 'Collaborative',
    text: 'We work alongside your team, in the room',
    icon: UsersRound,
  },
  {
    title: 'Actionable',
    text: 'Built for execution, not theory',
    icon: Zap,
  },
  {
    title: 'Sustainable',
    text: 'Change that keeps delivering over time',
    assetSrc: '/product/badge-dollar-sign.svg',
  },
];

type PrincipleItem = {
  title?: string;
  text?: string;
  icon?: React.ElementType;
  assetSrc?: string;
};

type HowWeWorkProps = {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  paragraphs?: string[];
  ctaText?: string;
  ctaUrl?: string;
  items?: PrincipleItem[];
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

export default function HowWeWork({
  eyebrow,
  title = 'Practical. Proven. Hands-on.',
  highlight = 'Proven.',
  subtitle = 'We embed with your team to simplify complexity and build systems that work.',
  paragraphs,
  ctaText,
  ctaUrl,
  items,
}: HowWeWorkProps) {
  const displayParagraphs =
    paragraphs?.length
      ? paragraphs
      : [
          'From strategy through to execution, we help organizations turn transformation plans into practical, everyday ways of working.',
          'Operating model expertise meets hands-on delivery and the global strength of the Propelis network, helping teams move from planning and alignment to real adoption, measurable progress, and ways of working that actually stick.',
          "Because real transformation doesn't stop at strategy. It works in practice.",
        ];
  const displayItems = items?.length ? items : principles;

  return (
    <section className="relative isolate px-4 sm:px-6 md:px-0">
      <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[#f2f2f7]" />
      <FullBleedLines className="py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 p-4 md:grid-cols-[1fr_1.35fr] md:gap-10 md:p-8 lg:p-10">
          <div>
            {eyebrow && <p className="sr-only">{eyebrow}</p>}
            <h2 className="font-heading text-4xl leading-none font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
              {renderHighlightedTitle(title, highlight)}
            </h2>
            <p className="mt-6 text-lg leading-tight font-bold tracking-tight md:mt-8 md:text-2xl">
              {subtitle}
            </p>
            <div className="mt-5 flex flex-col gap-4 text-base leading-snug tracking-tight md:text-lg">
              {displayParagraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <ConsultingButton href={ctaUrl} label={ctaText} />
            </div>
          </div>

          <div className="grid content-center gap-4 md:grid-cols-3">
            {displayItems.map(({ title, text, icon: Icon, assetSrc }) => (
              <article
                key={title}
                className="bg-background grid min-h-52 grid-rows-[56px_40px_1fr] gap-5 rounded-xl p-5 shadow-sm md:min-h-72 md:grid-rows-[72px_48px_1fr] md:gap-6 md:p-7"
              >
                <div className="flex items-start">
                  {assetSrc ? (
                    <Image src={assetSrc} alt="" width={72} height={72} className="h-11 w-11 md:h-14 md:w-14" />
                  ) : (
                    Icon && <Icon className="text-primary h-11 w-11 md:h-14 md:w-14" strokeWidth={1.8} />
                  )}
                </div>
                <h3 className="font-heading self-center text-xl leading-none font-bold tracking-tight md:text-2xl">
                  {title}
                </h3>
                <p className="self-start text-base leading-tight tracking-tight md:text-lg">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </FullBleedLines>
    </section>
  );
}
