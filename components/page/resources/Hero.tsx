import React from 'react';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
}

const Hero = ({ title, subtitle, buttonLabel }: HeroProps) => {
  return (
    <div className="relative mt-10 flex w-full flex-col px-4 sm:px-0">
      {/* Product heading */}
      <div className="font-heading flex flex-col gap-8 sm:gap-14">
        <FullBleedLines>
          <div className="max-w-full sm:max-w-5xl">
            <b className="text-center text-4xl leading-tight tracking-tighter sm:text-8xl md:text-left md:leading-none">
              {title}
            </b>
          </div>
        </FullBleedLines>

        <FullBleedLines className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
          <div className="text-primary max-w-full text-center text-2xl leading-none tracking-tighter sm:max-w-5xl sm:text-left sm:text-5xl">
            <FullBleedLines>{subtitle}</FullBleedLines>
          </div>
          {/* {buttonLabel ? (
            <Link href="/contact">
              <Button
                size="lg"
                className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-center gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 sm:justify-start"
              >
                <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                  {buttonLabel}
                </span>
                <span
                  className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                  aria-hidden="true"
                >
                  <MoveUpRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          ) : null} */}
        </FullBleedLines>
      </div>
    </div>
  );
};

export default Hero;
