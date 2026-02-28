import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import InlineHighlight from '@/components/core/inline-highlight';
import { Button } from '@/components/ui/button';

type ResultsProps = {
  title?: string;
  description?: string;
};

const Results = ({ title, description }: ResultsProps) => {
  return (
    <div className="isolate relative z-50 w-full translate-y-0 pt-1 md:translate-y-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:items-end md:gap-8 md:px-6 lg:gap-10">
        <h2 className="font-heading text-foreground text-center text-4xl leading-tight font-bold tracking-tight md:text-right md:text-5xl lg:text-6xl">
          {title || (
            <>
              Real <InlineHighlight className="text-background">results</InlineHighlight>
              <br />
              real execution.
            </>
          )}
        </h2>

        <p className="text-foreground max-w-3xl text-center text-base leading-relaxed md:text-right md:text-lg lg:text-xl">
          {description || (
            <>
              Discover how enterprise teams reduce launch time,
              <br />
              improve compliance, and scale operations with 5Flow.
            </>
          )}
        </p>

        <div className="flex items-center gap-4">
          <Link href="/resources/case-studies" className="flex">
            <Button
              size="lg"
              className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-px active:scale-[0.99] active:ring-2 active:ring-offset-2"
            >
              <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-9 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7 sm:h-10 sm:px-6">
                Read case studies
              </span>
              <span
                className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] sm:h-10 sm:w-10"
                aria-hidden="true"
              >
                <MoveUpRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
