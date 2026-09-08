import { ArrowDownLeft } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import HighlightedCmsText from '@/components/core/highlighted-cms-text';

interface WhyCard {
  title: string;
  desc: string;
  sub: string;
  icon: React.ElementType;
}

interface WhyProps {
  sectionTitle: React.ReactNode;
  sectionTitleText?: string;
  whyData: WhyCard[];
}

const Why = ({ sectionTitle, sectionTitleText, whyData }: WhyProps) => {
  return (
    <div className="font-heading flex w-full flex-col gap-6 px-4 sm:gap-8 sm:px-6 md:px-0">
      <FullBleedLines className="flex flex-1 items-center justify-between sm:flex-row sm:items-start">
        <div className="relative h-auto w-full max-w-full text-left sm:h-32 sm:max-w-lg">
          <b className="font-heading text-4xl leading-tight tracking-tighter sm:text-6xl sm:leading-none">
            {sectionTitleText ? (
              <HighlightedCmsText text={sectionTitleText} highlightFirstWord highlightClassName="text-background" />
            ) : (
              sectionTitle
            )}
            <br className="sm:hidden" />
          </b>
        </div>
        <ArrowDownLeft className="text-accent1 size-24 sm:size-32" strokeWidth={1.5} />
      </FullBleedLines>

      <FullBleedLines className="grid flex-1 grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-2 md:p-2">
        {whyData.map((card, i) => (
          <div
            key={i}
            className="bg-background flex flex-col justify-between rounded-2xl p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:p-2"
          >
            <div className="flex w-full flex-col justify-between p-4 sm:flex-row sm:p-8">
              <b className="text-2xl tracking-tight sm:text-4xl">{card.title}</b>
              {card.icon && <card.icon className="text-primary mt-4 size-12 sm:mt-0 md:size-18" strokeWidth={1.5} />}
            </div>
            <div className="w-full max-w-full p-4 sm:max-w-xl sm:p-8">
              <b className="w-full max-w-full text-xl tracking-tight sm:max-w-96 sm:text-2xl">{card.desc}</b>
              <p className="pt-2 text-base tracking-tighter sm:text-xl">{card.sub}</p>
            </div>
          </div>
        ))}
      </FullBleedLines>
    </div>
  );
};

export default Why;
