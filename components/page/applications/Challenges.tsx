import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import FullBleedLines from '@/components/core/full-bleed-lines';
import HighlightedCmsText from '@/components/core/highlighted-cms-text';
import InlineHighlight from '@/components/core/inline-highlight';
import { Button } from '@/components/ui/button';
import { MoveUpRight } from 'lucide-react';
import React from 'react';

interface Item {
  title: string;
  desc: string;
  sub: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  buttonText?: string;
  buttonLink?: string; // Added prop for the button link
}

interface ChallengesProps {
  items: Item[];
  heading?: string;
  headingHighlight?: string;
}

const Challenges = ({ items = [], heading, headingHighlight }: ChallengesProps) => {
  return (
    <div className="flex w-full flex-col gap-16 px-4 text-center sm:px-0">
      <FullBleedLines className="font-heading mx-auto w-full max-w-md sm:max-w-lg">
        <b className="text-4xl leading-none tracking-tighter sm:text-6xl">
          {heading ? (
            <HighlightedCmsText text={heading} highlightedText={headingHighlight} />
          ) : (
            <>
              <span>{`Your `}</span> <InlineHighlight>Challenges,</InlineHighlight>
              Our <InlineHighlight>Solutions</InlineHighlight>
            </>
          )}
        </b>
      </FullBleedLines>

      <FullBleedLines>
        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-2">
          {items.map((card, i) => (
            <div
              key={i}
              className={`bg-background flex flex-col justify-between rounded-2xl p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)] sm:p-2 ${
                items.length === 5 && i === items.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex w-full flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:gap-0 sm:p-8">
                <p className="text-left text-2xl font-bold tracking-tight sm:text-4xl">
                  {card.title.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < card.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                {card.icon && <card.icon className="text-primary h-12 w-12 sm:h-18 sm:w-18" strokeWidth={1.5} />}
              </div>
              <div
                className={`w-full p-4 sm:p-8 ${
                  items.length === 5 && i === items.length - 1 ? 'sm:flex sm:items-end sm:justify-between' : ''
                }`}
              >
                <div>
                  <p className="w-full text-left text-lg font-bold tracking-tight sm:text-2xl">{card.desc}</p>
                  <p className="pt-2 text-left text-sm tracking-tighter sm:text-base">{card.sub}</p>
                </div>
                <div
                  className={`justify-left flex ${
                    items.length === 5 && i === items.length - 1 ? 'w-full justify-end' : ''
                  }`}
                >
                  <Link href={card.buttonLink ?? '/contact'}>
                    <Button
                      size="sm"
                      className="group/cta-hero active:ring-primary/50 active:ring-offset-background mt-6 inline-flex w-fit origin-left items-center justify-center gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 sm:justify-start"
                    >
                      <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                        {card.buttonText || 'Learn More'}
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
              </div>
            </div>
          ))}
        </div>
      </FullBleedLines>
    </div>
  );
};

export default Challenges;
