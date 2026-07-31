import { Check } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

const bullets = ['Packaging-specific validations', 'Continuously updated rulesets', 'Multiple markets and categories'];

export default function Ready() {
  return (
    <section className="flex w-full flex-col gap-20 px-4 sm:px-6 md:px-0">
      <FullBleedLines>
        <div className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-x-clip bg-[#F2F2F7]">
          <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1fr] md:px-0 md:py-16">
            <div>
              <h2 className="font-heading text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
                Built for packaging.
              </h2>
              <p className="mt-10 max-w-xl text-base leading-6 tracking-normal text-[#262626] md:text-xl md:leading-7">
                Most AI tools are designed for everything. QC Assist is designed for packaging reviews. Built around
                packaging-specific rules, regulatory requirements and quality validations that help teams stay compliant
                while moving faster.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-8">
              {bullets.map(item => (
                <div key={item} className="flex items-center gap-6">
                  <Check className="h-9 w-9 shrink-0 text-success" strokeWidth={2.2} />
                  <p className="text-primary text-2xl leading-tight font-bold tracking-normal">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FullBleedLines>

      <FullBleedLines className="text-center">
        <h2 className="font-heading text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
          AI assists. Humans decide.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-6 tracking-normal text-[#262626] md:text-xl md:leading-7">
          Every finding is visible.
          <br />
          Every decision stays with your team.
          <br />
          QC Assist helps reviewers identify risks faster while keeping humans in control of every approval decision.
        </p>
      </FullBleedLines>

      <FullBleedLines className="text-center">
        <h2 className="font-heading text-[40px] leading-tight font-bold tracking-normal md:text-[54px]">
          <InlineHighlight>Ready</InlineHighlight> to see QC Assist <InlineHighlight>in action?</InlineHighlight>
        </h2>
        <p className="text-primary mx-auto mt-8 max-w-4xl text-xl leading-7 tracking-normal md:text-2xl md:leading-8">
          See how AI-powered quality intelligence can help your team simplify artwork reviews, reduce compliance risk
          and approve with confidence.
        </p>
      </FullBleedLines>
    </section>
  );
}
