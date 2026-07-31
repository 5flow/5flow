import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownLeft, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InlineHighlight from '@/components/core/inline-highlight';

type WhyCard = { title: string; iconKey?: string; link?: string };
type WhyProps = { title?: string; bodyHtml?: string; cards?: WhyCard[] };

const Why = (_props: WhyProps) => {
  void _props;

  return (
    <section className="text-foreground w-full px-2 py-10 md:py-16">
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-heading text-[42px] leading-[1.05] font-bold tracking-normal sm:text-5xl md:text-[64px]">
              Built for packaging.
              <br />
              <InlineHighlight>Powered by AI.</InlineHighlight>
            </h2>
            <ArrowDownLeft className="text-accent1 mt-4 hidden h-24 w-24 shrink-0 lg:block" strokeWidth={1.6} />
          </div>

          <p className="mt-10 max-w-[860px] text-xl leading-7 font-semibold tracking-normal text-[#262626]">
            AI only matters when it solves real packaging challenges. That&apos;s why we build AI into the workflows
            where delays, errors and compliance risks happen.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1fr] lg:items-stretch">
            <div className="bg-background flex min-h-[330px] flex-col rounded-lg p-8 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
              <h3 className="font-heading text-[42px] leading-[1.05] font-bold tracking-normal text-[#262626]">
                QC Assist
              </h3>
              <p className="text-primary mt-8 max-w-[520px] text-[30px] leading-[1.16] font-bold tracking-normal">
                Catch issues before they become approval delays.
              </p>
              <p className="mt-6 max-w-[540px] text-xl leading-7 font-semibold tracking-normal text-[#303030]">
                Identify spelling, barcode and compliance issues earlier with AI-assisted quality checks embedded
                directly into your review workflow.
              </p>

              <Button
                asChild
                size="lg"
                className="group/cta-hero active:ring-primary/50 active:ring-offset-background mt-8 inline-flex origin-left items-center justify-start gap-3 self-start rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-px active:scale-[0.99] active:ring-2 active:ring-offset-2"
              >
                <Link href="/contact" aria-label="Learn more about QC Assist">
                  <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-9 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7 sm:h-10 sm:px-6">
                    Learn more
                  </span>
                  <span
                    className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] sm:h-10 sm:w-10"
                    aria-hidden="true"
                  >
                    <MoveUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </div>

            <div className="relative min-h-[330px] overflow-hidden rounded-lg shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
              <Image
                src="/home/QC_Assist_Screen_Grafik.webp"
                alt="QC Assist screen showing AI-assisted packaging quality review"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
