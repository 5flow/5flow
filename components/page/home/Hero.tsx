import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Button } from '@/components/ui/button';
import HtmlContent from '@/components/core/html-content';
import InlineHighlight from '@/components/core/inline-highlight';
import HeroLottieBg from './HeroLottieBg';

type Props = {
  title?: string;
  subTitle?: string;
  bodyHtml?: string;
  buttonText?: string;
  buttonUrl?: string;
};

const Hero = ({ title, subTitle, bodyHtml, buttonText, buttonUrl }: Props) => {
  return (
    <div className="relative flex min-h-dvh flex-col justify-center">
      <div className="pointer-events-none absolute top-16 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 sm:top-20 md:top-22">
        <HeroLottieBg />
      </div>

      {/* Hero content */}
      <div className="flex flex-col gap-[26px] px-4 sm:px-2">
        <div className="mt-12 flex flex-col gap-[26px] md:mt-24">
          <FullBleedLines>
            <p className="font-heading text-foreground max-w-full text-4xl leading-tight font-semibold tracking-tighter sm:max-w-2xl sm:text-8xl sm:leading-none md:max-w-2xl md:text-[80px]">
              {(title ?? 'Take brand vision to market reality').split(' ').map((word, i, arr) => {
                const highlightWords = ['reality'];
                const isLastWord = i === arr.length - 1;
                return highlightWords.includes(word.toLowerCase()) ? (
                  <span key={i}>
                    <InlineHighlight>{word}</InlineHighlight>
                    {!isLastWord && ' '}
                  </span>
                ) : (
                  <span key={i}>
                    {word}
                    {!isLastWord && ' '}
                  </span>
                );
              })}
            </p>
          </FullBleedLines>

          <FullBleedLines>
            <h1 className="font-heading text-primary text-2xl leading-tight tracking-tighter sm:text-5xl sm:leading-none md:text-[48px]">
              {subTitle ?? 'Faster. Smarter. At scale.'}
            </h1>
          </FullBleedLines>
        </div>
        <FullBleedLines>
          <div className="font-body text-foreground max-w-full text-sm leading-[150%] font-normal tracking-tight sm:max-w-2xl sm:text-base md:max-w-3xl md:text-[20px] md:leading-7 md:tracking-normal md:text-[#030712cc] [&_em]:font-normal [&_strong]:font-normal">
            {bodyHtml ? (
              <HtmlContent html={bodyHtml} />
            ) : (
              <>
                5FLOW helps global brands unify workflows, speed up execution, and keep every touchpoint consistent.
                With our expertise in packaging, content, and creative production powered by
                intelligent automation, we transform the way brands operate in today&apos;s connected world.
              </>
            )}
          </div>
        </FullBleedLines>
        <FullBleedLines>
          <Link href={buttonUrl ?? '/contact'} className="flex">
            <Button
              size="lg"
              className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-px active:scale-[0.99] active:ring-2 active:ring-offset-2"
            >
              <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-9 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7 sm:h-10 sm:px-6">
                {buttonText ?? 'Book a demo'}
              </span>
              <span
                className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] sm:h-10 sm:w-10"
                aria-hidden="true"
              >
                <MoveUpRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </FullBleedLines>
      </div>
    </div>
  );
};

export default Hero;
