import type { Metadata } from 'next';
import * as LucideIcons from 'lucide-react';
import { getConsulting } from '@/lib/cms/consulting';
import { Contact } from '@/components/layout';
import InlineHighlight from '@/components/core/inline-highlight';
import Hero from '@/components/page/solutions/consulting/Hero';
import StrategySection from '@/components/page/solutions/consulting/StrategySection';
import PainPoints from '@/components/page/solutions/consulting/PainPoints';
import HowWeWork from '@/components/page/solutions/consulting/HowWeWork';
import DeliverySection from '@/components/page/solutions/consulting/DeliverySection';
import MetricsSection from '@/components/page/solutions/consulting/MetricsSection';
import ValueQuestions from '@/components/page/solutions/consulting/ValueQuestions';

export const metadata: Metadata = {
  title: 'Marketing Operations Consulting | 5Flow',
  description:
    '5Flow consulting helps marketing operations teams simplify workflows, scale content operations, and turn strategy into measurable execution.',
};

function toPascalCase(input: string) {
  return input
    .split(/[-_\s]+/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function resolveIconComponent(iconKey?: string) {
  if (!iconKey) return undefined;
  const name = toPascalCase(iconKey);
  return (LucideIcons as any)[name] as React.ElementType | undefined;
}

function withResolvedIcons<T extends { iconKey?: string; assetSrc?: string }>(items?: T[]) {
  return items?.map(item => ({
    ...item,
    icon: resolveIconComponent(item.iconKey),
  }));
}

export default async function Consulting() {
  let cms = null as Awaited<ReturnType<typeof getConsulting>> | null;
  try {
    cms = await getConsulting('consulting');
  } catch {}

  const contact = cms?.contact || {};

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <div className="flex flex-col gap-8 md:gap-16">
          <Hero {...cms?.hero} />
          <StrategySection {...cms?.strategy} />
          <PainPoints {...cms?.pain} />
          <HowWeWork {...cms?.how} items={withResolvedIcons(cms?.how?.items)} />
          <DeliverySection {...cms?.delivery} items={withResolvedIcons(cms?.delivery?.items)} />
          <MetricsSection {...cms?.metrics} />
          <ValueQuestions {...cms?.value} />
          <div id="consulting-contact" className="scroll-mt-28">
            <Contact
              className="md:gap-0"
              headingWrapperClassName="md:max-w-none md:px-0 md:pb-0"
              headingClassName="md:text-right"
              heading={
                <>
                  <span className="block">{contact.line1 || 'Tell us a bit about'}</span>
                  <span className="block">
                    {contact.line2Prefix || 'your'}{' '}
                    <InlineHighlight>{contact.highlight || 'challenges,'}</InlineHighlight>{' '}
                    {contact.line2Suffix || "we'll"}
                  </span>
                  <span className="block">{contact.line3 || 'follow up with next steps.'}</span>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
