'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight } from 'lucide-react';
import CtaPixelGrid from '@/components/core/cta-pixel-grid';
import { Button } from '@/components/ui/button';

interface CtaProps {
  leftTitle: string;
  leftSubtitle: string;
  rightTitle: string;
  rightDesc: string;
  buttonText: string;
}

export function Cta({ leftTitle, leftSubtitle, rightTitle, rightDesc, buttonText }: CtaProps) {
  const pixelPattern = [
    ['background', 'background', 'accent1', 'background', 'background', 'background', 'background'],
    ['background', 'success', 'primary', 'warning', 'background', 'background', 'background'],
    ['background', 'primary', 'background', 'background', 'success', 'background', 'background'],
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Pixel grid */}
      <div className="relative z-10 ml-0 flex justify-start px-4 py-6 sm:ml-[-20px] md:ml-[-40px] md:px-16 md:py-10">
        {/* Mobile: smaller pixels */}
        <div className="block w-full max-w-4xl overflow-hidden pb-6.5 md:hidden">
          <div className="origin-left scale-90 transform">
            <CtaPixelGrid
              pattern={pixelPattern}
              pixelSize="64px"
              icon={{ row: 1, col: 1, element: <ArrowUp size={20} className="text-foreground" /> }}
            />
          </div>
        </div>

        {/* Desktop / tablet: original pixels */}
        <div className="hidden w-full max-w-none overflow-hidden md:block">
          <div className="origin-left scale-100 transform">
            <CtaPixelGrid
              pattern={pixelPattern}
              pixelSize="128px"
              icon={{ row: 1, col: 1, element: <ArrowUp size={36} className="text-foreground" /> }}
            />
          </div>
        </div>
      </div>

      {/* Cta */}
      <div className="bg-accent1 relative z-0 mt-[-120px] flex min-h-[200px] w-full flex-col items-center justify-center px-4 pt-[160px] pb-20 md:mt-[-168px] md:min-h-[320px] md:px-48 md:pt-[200px] md:pb-[7.5rem]">
        <div className="text-background relative flex w-full flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex w-full max-w-md flex-col md:ml-56 md:gap-3">
            <b className="text-center text-3xl tracking-tighter sm:text-4xl md:text-left md:text-5xl">{leftTitle}</b>
            <div className="flex items-center justify-center md:justify-between">
              <ArrowRight className="hidden size-8 sm:size-[40px] md:flex" />
              <b className="text-3xl tracking-tighter sm:text-4xl md:text-5xl">{leftSubtitle}</b>
            </div>
            <ArrowDown className="flex size-8 w-full justify-center md:hidden" />
          </div>

          <div className="flex w-full flex-col items-end justify-center gap-4 lg:max-w-xl">
            <b className="w-full text-center text-3xl tracking-tighter sm:text-4xl md:text-right md:text-5xl">
              {rightTitle}
            </b>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:justify-end">
              <p className="w-full max-w-xs text-center tracking-tight sm:max-w-96 sm:text-right">{rightDesc}</p>
              <Button
                asChild
                className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
              >
                <Link href="/contact" aria-label="Book a demo">
                  <span className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-9 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3">
                    {buttonText}
                  </span>
                  <span
                    className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
