import Image from 'next/image';
import { Boxes, HandHeart, ShieldCheck, Zap } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

const services = [
  {
    title: 'Operating Model Design',
    text: 'Future-ready, aligned to strategy and growth',
    icon: Boxes,
  },
  {
    title: 'Workflow Optimization',
    text: 'Built for scale',
    icon: Zap,
  },
  {
    title: 'Technology Integration',
    text: 'Connected and optimized',
    icon: ShieldCheck,
  },
  {
    title: 'AI in Marketing Operations',
    text: 'Practical applications validated for real impact',
    icon: Zap,
  },
  {
    title: 'Partner and Agency Management',
    text: 'Aligned with clear governance and accountability',
    icon: HandHeart,
  },
  {
    title: 'Marketing Operations Transformation',
    text: 'Change that lasts',
    assetSrc: '/product/badge-dollar-sign.svg',
  },
];

type DeliveryItem = {
  title?: string;
  text?: string;
  icon?: React.ElementType;
  assetSrc?: string;
};

type DeliverySectionProps = {
  eyebrow?: string;
  title?: string;
  highlights?: string[];
  subtitle?: string;
  items?: DeliveryItem[];
};

function renderHighlightedTitle(title: string, highlights: string[]) {
  if (!highlights.length) return title;
  let parts: React.ReactNode[] = [title];
  highlights.forEach(highlight => {
    const nextParts: React.ReactNode[] = [];
    parts.forEach(part => {
      if (typeof part !== 'string' || !part.includes(highlight)) {
        nextParts.push(part);
        return;
      }
      const split = part.split(highlight);
      split.forEach((text, index) => {
        nextParts.push(text);
        if (index < split.length - 1) {
          nextParts.push(<InlineHighlight key={`${highlight}-${index}`}>{highlight}</InlineHighlight>);
        }
      });
    });
    parts = nextParts;
  });
  return parts;
}

export default function DeliverySection({
  eyebrow,
  title = 'Not your typical consultancy',
  highlights = ['Not', 'typical'],
  subtitle = "We don't separate thinking from doing. We roll up our sleeves across:",
  items,
}: DeliverySectionProps) {
  const displayItems = items?.length ? items : services;

  return (
    <section className="px-4 sm:px-6 md:px-0">
      <FullBleedLines className="py-12 md:py-16 lg:py-20">
        {eyebrow && <p className="sr-only">{eyebrow}</p>}
        <h2 className="font-heading text-4xl leading-none font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
          {renderHighlightedTitle(title, highlights)}
        </h2>
        <p className="mt-4 text-base leading-snug tracking-tight md:text-lg">
          {subtitle}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {displayItems.map(({ title, text, icon: Icon, assetSrc }) => (
            <article
              key={title}
              className="border-border flex min-h-52 flex-col justify-between rounded-xl border bg-background p-5 md:min-h-72 md:p-7"
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-heading max-w-72 text-xl leading-none font-bold tracking-tight md:text-3xl">
                  {title}
                </h3>
                {assetSrc ? (
                  <Image src={assetSrc} alt="" width={72} height={72} className="h-10 w-10 shrink-0 md:h-14 md:w-14" />
                ) : (
                  Icon && <Icon className="text-primary h-10 w-10 shrink-0 md:h-14 md:w-14" strokeWidth={1.8} />
                )}
              </div>
              <p className="mt-8 max-w-80 text-base leading-tight tracking-tight md:mt-0 md:text-2xl">{text}</p>
            </article>
          ))}
        </div>
      </FullBleedLines>
    </section>
  );
}
