import FullBleedLines from '@/components/core/full-bleed-lines';
import HighlightedCmsText from '@/components/core/highlighted-cms-text';
import InlineHighlight from '@/components/core/inline-highlight';
import type { ComponentType, SVGProps } from 'react';

type BenefitItem = {
  id?: string;
  title: string;
  desc: string;
  sub: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type BenefitsProps = {
  items?: BenefitItem[];
  options?: {
    buttonText?: string;
  };
  heading?: string;
  headingHighlight?: string;
  highlightedText?: string;
};

const Benefits = ({ items = [], heading, headingHighlight, highlightedText }: BenefitsProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-16 px-4 text-center sm:px-0">
      <FullBleedLines className="font-heading mx-auto w-full max-w-xl sm:max-w-2xl">
        <b className="text-4xl leading-none tracking-tighter sm:text-6xl">
          {heading ? (
            <HighlightedCmsText text={heading} highlightedText={headingHighlight || highlightedText} />
          ) : (
            <>
              <span>{`Benefits for `}</span> <InlineHighlight>{highlightedText}</InlineHighlight>
            </>
          )}
        </b>
      </FullBleedLines>

      <FullBleedLines className="w-full">
        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-2">
          {items.map((card, i) => (
            <div
              key={i}
              className="bg-background flex flex-col justify-between rounded-2xl p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:p-2"
            >
              <div className="flex w-full flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:gap-0 sm:p-8">
                <p className="text-2xl font-bold tracking-tight sm:text-4xl">{card.title}</p>
                {card.icon && <card.icon className="text-primary h-12 w-12 sm:h-18 sm:w-18" strokeWidth={1.5} />}
              </div>
              <div className="w-full max-w-full p-4 sm:max-w-xl sm:p-8">
                <p className="w-full text-left text-lg font-bold tracking-tight sm:text-xl">{card.desc}</p>
                <p className="pt-2 text-left text-sm tracking-tighter sm:text-base">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </FullBleedLines>
    </div>
  );
};

export default Benefits;
