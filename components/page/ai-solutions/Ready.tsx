import { Check } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

const bullets = ['Packaging-specific validations', 'Continuously updated rulesets', 'Multiple markets and categories'];

type ReadyProps = {
  title?: string;
  description?: string;
  items?: string[];
  humanTitle?: string;
  humanDescription?: string;
  finalTitle?: string;
  finalDescription?: string;
  highlights?: string[];
};

function renderHighlights(title: string, highlights: string[]) {
  const activeHighlights = highlights.filter(Boolean).sort((a, b) => b.length - a.length);
  if (!activeHighlights.length) return title;
  const escaped = activeHighlights.map(highlight => highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = title.split(new RegExp(`(${escaped.join('|')})`, 'g'));
  return parts.map((part, index) =>
    activeHighlights.includes(part) ? <InlineHighlight key={`${part}-${index}`}>{part}</InlineHighlight> : part
  );
}

export default function Ready({
  title = 'Built for packaging.',
  description = 'Most AI tools are designed for everything. QC Assist is designed for packaging reviews. Built around packaging-specific rules, regulatory requirements and quality validations that help teams stay compliant while moving faster.',
  items,
  humanTitle = 'AI assists. Humans decide.',
  humanDescription = 'Every finding is visible. Every decision stays with your team. QC Assist helps reviewers identify risks faster while keeping humans in control of every approval decision.',
  finalTitle = 'Ready to see QC Assist in action?',
  finalDescription = 'See how AI-powered quality intelligence can help your team simplify artwork reviews, reduce compliance risk and approve with confidence.',
  highlights = ['Ready', 'in action?'],
}: ReadyProps) {
  const displayBullets = items?.length ? items : bullets;
  return (
    <section className="flex w-full flex-col gap-20 px-4 sm:px-6 md:px-0">
      <FullBleedLines>
        <div className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-x-clip bg-[#F2F2F7]">
          <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1fr] md:px-0 md:py-16">
            <div>
              <h2 className="font-heading text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
                {title}
              </h2>
              <p className="mt-10 max-w-xl text-base leading-6 tracking-normal text-[#262626] md:text-xl md:leading-7">
                {description}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-8">
              {displayBullets.map(item => (
                <div key={item} className="flex items-center gap-6">
                  <Check className="text-success h-9 w-9 shrink-0" strokeWidth={2.2} />
                  <p className="text-primary text-2xl leading-tight font-bold tracking-normal">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FullBleedLines>

      <FullBleedLines className="text-center">
        <h2 className="font-heading text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
          {humanTitle}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-6 tracking-normal text-[#262626] md:text-xl md:leading-7">
          {humanDescription}
        </p>
      </FullBleedLines>

      <FullBleedLines className="text-center">
        <h2 className="font-heading text-[40px] leading-tight font-bold tracking-normal md:text-[54px]">
          {renderHighlights(finalTitle, highlights)}
        </h2>
        <p className="text-primary mx-auto mt-8 max-w-4xl text-xl leading-7 tracking-normal md:text-2xl md:leading-8">
          {finalDescription}
        </p>
      </FullBleedLines>
    </section>
  );
}
