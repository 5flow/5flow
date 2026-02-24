import InlineHighlight from '@/components/core/inline-highlight';
import FullBleedLines from '@/components/core/full-bleed-lines';

type PropelisProps = {
  propelisDescription?: string;
};

const Propelis = ({ propelisDescription }: PropelisProps) => {
  return (
    <FullBleedLines>
      <div className="flex w-full flex-col">
        {/* Title Row */}
        <div className="px-6 pb-6 pt-10 sm:px-0 sm:pb-4 sm:pt-12">
          <h2 className="font-heading text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <InlineHighlight>Powering</InlineHighlight>
            <br />
            The Propelis group
          </h2>
        </div>

        {/* Content Row */}
        <div className="px-6 py-4 sm:px-0 sm:py-4">
          {/* Description */}
          <p className="text-foreground text-lg leading-normal tracking-tight md:text-xl lg:text-2xl">
            {propelisDescription ||
              `We bring together decades of global brand expertise with the technology to define what's next. A powerful blend of creative mastery and intelligent automation that transforms the was brands move from concept to market.`}
          </p>
        </div>
      </div>
    </FullBleedLines>
  );
};

export default Propelis;
