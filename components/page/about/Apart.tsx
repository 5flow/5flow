import { ShieldCheck, TrendingUp, Users, UserStar, Layers } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

type ApartFeature = { title: string; description: string; iconKey?: string };
type ApartProps = { features?: ApartFeature[]; titleOverride?: string };

const iconMap: Record<string, any> = {
  customer: UserStar,
  team: Users,
  scale: TrendingUp,
  security: ShieldCheck,
  backed: ShieldCheck,
  layers: Layers,
};

const fallbackFeatures: ApartFeature[] = [
  {
    title: 'Customer First',
    description:
      'We design around your needs, not ours. Every solution is built in partnership with the people who use it.',
    iconKey: 'customer',
  },
  {
    title: 'Strong & Experienced Team',
    description:
      'Decades of expertise in packaging, creative production, and workflow automation delivered by people who know how brands really work.',
    iconKey: 'team',
  },
  {
    title: 'Flexibility at Scale',
    description:
      'One size never fits all. Our platforms adapt to your workflows, with the ability to customize, scale, and integrate seamlessly.',
    iconKey: 'scale',
  },
  {
    title: 'Backed by Propelis',
    description:
      "As part of the Propelis Group, we're supported by the combined strength of global leaders SGK and SGS & Co.",
    iconKey: 'backed',
  },
];

const Apart = ({ features }: ApartProps) => {
  const data = features && features.length > 0 ? features : fallbackFeatures;

  return (
    <div className="text-foreground flex w-full flex-col gap-4 md:gap-8">
      <div className="px-2 py-8">
        <FullBleedLines className="flex w-full items-center justify-center">
          <p className="font-heading text-center text-4xl leading-none font-bold tracking-tight md:max-w-5xl md:text-left md:text-[64px]">
            <span>What sets us </span>
            <InlineHighlight>apart?</InlineHighlight>
          </p>
        </FullBleedLines>
      </div>

      <FullBleedLines>
        <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4">
          {data.map((feature, index) => {
            const Icon = feature.iconKey && iconMap[feature.iconKey] ? iconMap[feature.iconKey] : UserStar;
            return (
              <div
                key={index}
                className="bg-background box-border flex min-h-[280px] flex-col gap-4 rounded-2xl p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:p-6 lg:min-h-[320px]"
              >
                <div className="flex w-full items-start">
                  <Icon className="text-primary h-12 w-12 shrink-0 sm:h-14 sm:w-14" strokeWidth={1.5} />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <p className="text-lg font-bold leading-tight tracking-tight sm:text-xl lg:text-2xl">{feature.title}</p>
                  <p className="text-sm leading-relaxed tracking-tight sm:text-base">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </FullBleedLines>
    </div>
  );
};

export default Apart;
