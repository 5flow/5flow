import { ArrowUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';

type VisionProps = {
  visionTitle?: string;
  visionText?: string;
};

const Vision = ({ visionTitle, visionText }: VisionProps) => {
  return (
    <FullBleedLines>
      <div className="flex w-full flex-col gap-0 sm:flex-row">
        {/* Left Box - Vision Title */}
        <div
          className="flex flex-col items-start justify-end p-10 sm:h-[460px] sm:w-[420px] sm:px-12"
          style={{ backgroundColor: '#d1dafd' }}
        >
          <div className="flex items-end gap-4 md:gap-6">
            <h2 className="font-heading text-foreground text-5xl leading-[1] font-bold tracking-tight md:text-6xl lg:text-7xl">
              The
              <br />
              Vision
            </h2>
            <ArrowUpRight
              className="text-foreground h-16 w-16 translate-x-10 translate-y-2 md:h-24 md:w-24 md:translate-x-7 md:translate-y-3 lg:h-28 lg:w-28"
              strokeWidth={1}
            />
          </div>
        </div>

        {/* Right Box - Content */}
        <div className="flex flex-col justify-center gap-4 px-6 py-10 sm:w-[60%] sm:pr-0 sm:pl-16 md:gap-5 md:py-20">
          <h3 className="font-heading text-foreground ml-auto max-w-[300px] text-right text-xl leading-tight font-bold tracking-tight md:text-2xl">
            {visionTitle || 'Cloud-smart solutions built for faster brand execution'}
          </h3>
          <p className="text-foreground ml-auto max-w-[560px] text-right text-sm leading-relaxed md:text-base lg:text-lg">
            {visionText ||
              'To develop innovative cloud-smart solutions for brand owners supercharged by data, tech, and AI in order to streamline and accelerate the GTM process from ideation to implementation so brand owners can adapt to changes faster.'}
          </p>
        </div>
      </div>
    </FullBleedLines>
  );
};

export default Vision;
