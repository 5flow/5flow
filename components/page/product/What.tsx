import Link from 'next/link';
import { ArrowDownLeft, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import HighlightedCmsText from '@/components/core/highlighted-cms-text';

interface Problem {
  title: string;
  subtitle: string;
  description: string;
  buttonLink?: string; // Added prop for the button link
  buttonText?: string; // Added prop for the button text
  icon?: React.ElementType; // Added prop for the dynamic icon
}

interface WhatProps {
  whatData: Problem[][];
  sectionTitle?: string;
}

const What = ({ whatData, sectionTitle }: WhatProps) => {
  return (
    <div className="relative flex w-full flex-col gap-12 px-4 sm:gap-14 sm:px-6 md:px-0">
      <FullBleedLines className="flex w-full items-center justify-between sm:flex-row">
        <div className="relative h-auto w-full max-w-full text-left sm:h-32 sm:max-w-sm">
          <b className="font-heading text-4xl leading-tight tracking-tighter sm:text-6xl sm:leading-none">
            {sectionTitle ? (
              <HighlightedCmsText text={sectionTitle} highlightFirstWord highlightClassName="text-background" />
            ) : (
              <>
                <InlineHighlight className="text-background">What</InlineHighlight>
                <span className="text-foreground"> Do</span>
                <br className="sm:hidden" />
                <span className="text-foreground"> We Solve?</span>
              </>
            )}
          </b>
        </div>
        <ArrowDownLeft className="text-accent1 size-24 sm:size-32" strokeWidth={1.5} />
      </FullBleedLines>

      <FullBleedLines className="flex w-full flex-col gap-12 sm:gap-8">
        {whatData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full flex-col justify-between gap-12 p-4 sm:flex-row sm:gap-8">
            {row.map((problem, colIndex) => (
              <div key={colIndex} className="relative flex flex-1 flex-col justify-between gap-6 sm:gap-8">
                {problem.icon && <problem.icon className="text-primary h-8 w-8 sm:h-12 sm:w-12" strokeWidth={1.5} />}
                <b className="text-2xl leading-tight tracking-tight sm:text-4xl sm:leading-none">{problem.title}</b>
                <div className="flex flex-col justify-between gap-4 text-base sm:flex-row sm:gap-0 sm:text-xl">
                  <p className="max-w-full leading-tight tracking-tight sm:max-w-md sm:leading-none">
                    {problem.subtitle}
                    {'.'}
                    {problem.description}
                  </p>
                </div>
                <Link href={problem.buttonLink ?? '/contact'}>
                  <Button
                    size="sm"
                    className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
                  >
                    <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7">
                      {problem.buttonText ?? 'See the fix'}
                    </span>
                    <span
                      className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                      aria-hidden="true"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </FullBleedLines>
    </div>
  );
};

export default What;
