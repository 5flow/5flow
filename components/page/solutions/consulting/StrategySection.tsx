import { ArrowDownLeft } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

const tiles = [
  'Optimize how work gets done',
  'Scale content and campaigns with consistency',
  'Lead transformation with clarity',
  'Faster delivery. Clearer workflows. Scalable growth.',
];

type StrategyProps = {
  titleLine1?: string;
  titleLine2?: string;
  highlight?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  items?: { title?: string; text?: string }[];
};

export default function StrategySection({
  titleLine1 = 'Strategy + Implementation (yes, both)',
  titleLine2 = 'for marketing operations transformation',
  highlight = 'Strategy + Implementation',
  descriptionLine1 = 'Big ideas are easy to agree on. Making them work consistently is where it gets',
  descriptionLine2 = 'harder. With us, nothing gets lost between planning and doing. We help you:',
  items,
}: StrategyProps) {
  const displayTiles = items?.length ? items.map(item => item.title || item.text || '') : tiles;
  const titleBeforeHighlight = titleLine1.includes(highlight) ? titleLine1.split(highlight)[0] : '';
  const titleAfterHighlight = titleLine1.includes(highlight) ? titleLine1.split(highlight).slice(1).join(highlight) : titleLine1;

  return (
    <section className="px-4 sm:px-6 md:px-0">
      <FullBleedLines className="font-heading py-12 md:py-16 lg:py-20">
        <h2 className="max-w-6xl text-4xl leading-none font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
          <span className="block">
            {highlight && titleLine1.includes(highlight) ? (
              <>
                {titleBeforeHighlight}
                <InlineHighlight>{highlight}</InlineHighlight>
                <span>{titleAfterHighlight}</span>
              </>
            ) : (
              titleLine1
            )}
          </span>
          <span className="block">{titleLine2}</span>
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-snug tracking-tight md:text-lg">
          {descriptionLine1}
          <br className="hidden md:block" />
          {descriptionLine2}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
          {displayTiles.map((tile, index) => (
            <article
              key={tile}
              className={`flex min-h-40 flex-col justify-end p-5 md:min-h-80 md:p-6 ${
                index === tiles.length - 1 ? 'bg-[#32D430]/50 text-success-foreground' : 'bg-[#D1DAFD]'
              }`}
            >
              {index === tiles.length - 1 && (
                <ArrowDownLeft className="mb-auto h-14 w-14 md:h-20 md:w-20" strokeWidth={1.8} />
              )}
              <h3 className="max-w-72 text-xl leading-none font-bold tracking-tight md:text-3xl">{tile}</h3>
            </article>
          ))}
        </div>
      </FullBleedLines>
    </section>
  );
}
