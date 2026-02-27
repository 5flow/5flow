import { ArrowLeft } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';

type MissionProps = {
  missionTitle?: string;
  missionText?: string;
};

const Mission = ({ missionTitle, missionText }: MissionProps) => {
  return (
    <FullBleedLines>
      <div className="flex w-full flex-col gap-0 sm:flex-row">
        {/* Left Box - Content */}
        <div className="order-2 flex flex-col justify-center gap-4 px-6 py-10 sm:order-1 sm:w-[60%] sm:pr-16 sm:pl-0 md:gap-5 md:py-20">
          <h3 className="font-heading text-foreground max-w-[400px] text-xl leading-tight font-bold tracking-tight md:text-2xl">
            {missionTitle || 'Industry-leading tools powering the complete go-to-market funnel'}
          </h3>
          <p className="text-foreground max-w-[500px] text-sm leading-relaxed md:text-base lg:text-lg">
            {missionText ||
              'Develop industry leading tools across the entire GTM funnel, ultimately becoming a platform used by all manufacturers, brand owners, and retailers.'}
          </p>
        </div>

        {/* Right Box - Mission Title */}
        <div
          className="relative order-1 flex flex-col items-end justify-end p-10 sm:order-2 sm:h-[460px] sm:w-[420px] sm:p-12 md:p-16"
          style={{ backgroundColor: '#e1daf5' }}
        >
          <ArrowLeft
            className="text-foreground absolute top-10 left-2 h-16 w-16 sm:top-12 sm:left-4 md:top-16 md:left-6 md:h-24 md:w-24 lg:h-28 lg:w-28"
            strokeWidth={1}
          />
          <h2 className="font-heading text-foreground text-right text-5xl leading-[1] font-bold tracking-tight md:text-6xl lg:text-7xl">
            The
            <br />
            Mission
          </h2>
        </div>
      </div>
    </FullBleedLines>
  );
};

export default Mission;
