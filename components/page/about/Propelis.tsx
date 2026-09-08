import InlineHighlight from '@/components/core/inline-highlight';
import FullBleedLines from '@/components/core/full-bleed-lines';
import HighlightedCmsText from '@/components/core/highlighted-cms-text';
import InlineCmsText from '@/components/core/inline-cms-text';

type PropelisProps = {
  title?: string;
  highlight?: string;
  propelisDescription?: string;
};

const Propelis = ({ title, highlight, propelisDescription }: PropelisProps) => {
  return (
    <FullBleedLines>
      <div className="flex w-full flex-col">
        <div className="px-6 pt-10 pb-6 sm:px-0 sm:pt-12 sm:pb-4">
          <h2 className="font-heading w-full max-w-full text-center text-4xl leading-none font-bold tracking-tight md:max-w-5xl md:text-left md:text-[64px]">
            {title ? (
              <HighlightedCmsText text={title} highlightedText={highlight} />
            ) : (
              <>
                <InlineHighlight>Powering</InlineHighlight>
                <br />
                the propelis group
              </>
            )}
          </h2>
        </div>

        <div className="px-6 py-4 sm:px-0 sm:py-4">
          <p className="text-foreground text-lg leading-normal tracking-tight md:text-xl lg:text-2xl">
            <InlineCmsText
              value={
                propelisDescription ||
                `We bring together decades of global brand expertise with the technology to define what's next. A powerful blend of creative mastery and intelligent automation that transforms the was brands move from concept to market.`
              }
            />
          </p>
        </div>
      </div>
    </FullBleedLines>
  );
};

export default Propelis;
