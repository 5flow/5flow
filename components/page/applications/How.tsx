'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDownLeft, BadgeCheck, MoveUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import HighlightedCmsText from '@/components/core/highlighted-cms-text';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HowFeature {
  title: string;
  description: string;
  imageSrc: string;
  iconName?: string;
  buttonLink?: string; // Added prop for the button link
  buttonText?: string; // Added prop for the button text
}

interface HowProps {
  howData: HowFeature[];
  sectionTitle?: string;
  headingHighlight?: string;
}

const How = ({ howData, sectionTitle, headingHighlight }: HowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLarge, setIsLarge] = useState(false);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  // Track viewport size to only enable the scroll effect on large screens
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLarge(mq.matches);
    update();
    // Safari fallback
    if (mq.addEventListener) {
      mq.addEventListener('change', update);
    } else {
      mq.addListener(update);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', update);
      } else {
        // do nothing
      }
    };
  }, []);

  // Compute active section on scroll/resize using rAF for smoothness
  useLayoutEffect(() => {
    // Disable scroll effect for small screens
    if (!isLarge) {
      setActiveIndex(0);
      return;
    }
    let frame: number | null = null;
    const initialized = { current: false } as { current: boolean };

    const computeActive = () => {
      const viewportCenter = window.innerHeight / 2;
      const bandHalf = Math.max(1, window.innerHeight * 0.12); // ~24% band height total

      let closestIdx = 0;
      let closestDist = Number.POSITIVE_INFINITY;
      let inBandIdx: number | null = null;
      let inBandDist = Number.POSITIVE_INFINITY;

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);

        // Track absolute closest regardless of band
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }

        // If within the center band, consider it eligible
        if (dist <= bandHalf) {
          if (dist < inBandDist) {
            inBandDist = dist;
            inBandIdx = i;
          }
        }
      });

      // Prefer an index that is currently inside the center band
      if (inBandIdx !== null) {
        initialized.current = true;
        setActiveIndex(prev => (prev === inBandIdx! ? prev : inBandIdx!));
        return;
      }

      // On first run, if nothing is yet in band, fall back to closest
      if (!initialized.current) {
        initialized.current = true;
        setActiveIndex(prev => (prev === closestIdx ? prev : closestIdx));
      }
    };

    const onScroll = () => {
      if (frame != null) return;
      frame = requestAnimationFrame(() => {
        computeActive();
        frame = null;
      });
    };

    const onResize = () => {
      if (frame != null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        computeActive();
        frame = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Compute once after refs are likely set and layout is stable
    const init = requestAnimationFrame(computeActive);

    return () => {
      if (frame != null) cancelAnimationFrame(frame);
      cancelAnimationFrame(init);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [howData.length, isLarge]);

  return (
    <div className="font-heading relative flex w-full flex-col gap-4 md:gap-14">
      <div className="bg-background/70 supports-[backdrop-filter]:bg-background/60 z-20 backdrop-blur lg:sticky lg:top-22">
        <FullBleedLines className="flex w-full items-center justify-between p-4">
          <div className="relative flex h-32 w-full max-w-sm items-center pr-4 md:pr-0">
            <b className="font-heading text-4xl leading-none tracking-tighter lg:text-6xl">
              {sectionTitle ? (
                <HighlightedCmsText
                  text={sectionTitle}
                  highlightedText={headingHighlight}
                  highlightFirstWord
                  highlightClassName="text-background"
                />
              ) : (
                <>
                  <InlineHighlight className="text-background">How</InlineHighlight>
                  <span className="text-foreground"> Does it Work?</span>
                </>
              )}
            </b>
          </div>
          <ArrowDownLeft className="text-accent1 size-24 sm:size-32" strokeWidth={1.5} />
        </FullBleedLines>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col">
          {howData.map((feature, index) => (
            <section
              key={index}
              ref={el => {
                sectionRefs.current[index] = el;
              }}
              data-index={index}
              className="flex w-full flex-col justify-center gap-4 px-2 lg:min-h-[70vh] lg:pr-0"
            >
              <div className="flex items-center gap-6 p-6">
                {(() => {
                  const Icon = feature.iconName
                    ? (LucideIcons[feature.iconName as keyof typeof LucideIcons] as React.ElementType) || BadgeCheck
                    : BadgeCheck;
                  return <Icon className="text-foreground !h-24 !w-24 md:!h-28 md:!w-28" strokeWidth={1.5} />;
                })()}
                <div className="flex flex-col gap-2">
                  <b className="relative text-2xl leading-none tracking-tight sm:text-3xl lg:text-4xl">
                    {feature.title}
                  </b>
                </div>
              </div>
              <div className="flex flex-col gap-6 p-6 text-base lg:text-xl">
                <p className="relative leading-snug tracking-tight">{feature.description}</p>
                <Link href={feature.buttonLink ?? '/contact'}>
                  <Button
                    size="sm"
                    className="group/cta-hero active:ring-primary/50 active:ring-offset-background mt-6 inline-flex w-fit origin-left items-center justify-center gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 sm:justify-start"
                  >
                    <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                      {feature.buttonText ?? 'Learn More'}
                    </span>
                    <span
                      className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                      aria-hidden="true"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
                {/* Inline image for small screens (no sticky gallery) */}
                <div className="lg:hidden">
                  <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#E8ECFE]">
                    <Image
                      className="h-full w-full origin-center scale-[1.2] transform-gpu"
                      fill
                      sizes="100vw"
                      alt={feature.title}
                      src={feature.imageSrc}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="relative -my-40 hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="relative aspect-[16/9] w-[min(38rem,85%)] overflow-hidden rounded-2xl bg-[#E8ECFE]">
              {howData[activeIndex] && (
                <Image
                  key={activeIndex}
                  className="h-full w-full origin-center scale-[1.2] transform-gpu"
                  fill
                  sizes="(min-width: 1024px) 38rem, 100vw"
                  alt=""
                  src={howData[activeIndex].imageSrc}
                  priority={activeIndex === 0}
                />
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default How;
