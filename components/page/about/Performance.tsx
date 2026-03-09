import InlineHighlight from '@/components/core/inline-highlight';
import { ArrowDown } from 'lucide-react';

type PerformanceProps = {
  title?: string;
  description?: string;
  stats?: Array<{ value: string; label: string }>;
};

const Performance = ({ title, description, stats }: PerformanceProps) => {
  const defaultStats = [
    { value: '2M+', label: 'Projects annually' },
    { value: '140K', label: 'Active user' },
    { value: '200+', label: 'Experts' },
    { value: '5', label: 'Locations' },
    { value: '130+', label: 'Global clients' },
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-6 lg:gap-14">
        {/* Title Section */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
          <h2 className="font-heading text-foreground text-4xl leading-none font-bold tracking-tight md:text-5xl lg:text-6xl">
            Trusted to <InlineHighlight className="text-background">perform</InlineHighlight>
            <br />
            at scale
          </h2>
          <ArrowDown className="text-accent1 h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" strokeWidth={1.5} />
        </div>

        {/* Description */}
        <p className="text-foreground max-w-5xl text-base leading-relaxed md:text-lg lg:text-xl">
          {description ||
            'Behind every number is a global network of teams, technology, and expertise enabling smarter content and faster execution. Together, they represent the measurable momentum 5Flow brings to modern brand operations worldwide.'}
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-5">
            {displayStats.map((stat, index) => (
              <div
                key={index}
                className="bg-background flex h-48 flex-1 flex-col items-center justify-center gap-2 rounded-2xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:h-56"
              >
                <b className="font-body text-primary text-4xl sm:text-6xl">{stat.value}</b>
                <b className="relative text-center text-lg leading-tight sm:text-2xl sm:leading-none">{stat.label}</b>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
