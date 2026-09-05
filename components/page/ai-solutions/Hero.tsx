import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullBleedLines from '@/components/core/full-bleed-lines';
import HtmlContent from '@/components/core/html-content';

type HeroProps = {
  title?: string;
  subtitle?: string;
  bodyHtml?: string;
  ctaText?: string;
  ctaUrl?: string;
};

export default function Hero({
  title = 'Catch what reviewers might miss.',
  subtitle = 'Approve faster. Reduce risk.<br>Stay in control.',
  bodyHtml,
  ctaText = 'Book a Demo',
  ctaUrl = '/contact',
}: HeroProps) {
  const subtitleLines = subtitle.split(/<br\s*\/?>/i);
  return (
    <section className="relative mt-32 flex w-full flex-col gap-14 px-4 sm:px-6 md:px-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <FullBleedLines>
          <h2 className="font-heading max-w-xl text-[44px] leading-[1.12] font-bold tracking-normal md:text-[56px]">
            {title}
          </h2>
        </FullBleedLines>

        <FullBleedLines>
          <div className="flex max-w-xl flex-col items-start">
            <p className="font-heading text-primary text-[34px] leading-[1.15] tracking-normal md:text-[42px]">
              {subtitleLines.map((line, index) => (
                <span className="block" key={`${line}-${index}`}>
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-4 text-xl leading-7 tracking-normal text-[#262626]">
              {bodyHtml ? (
                <HtmlContent html={bodyHtml} />
              ) : (
                <>
                  QC Assist uses AI-assisted quality checks to help packaging teams identify potential issues earlier
                  while keeping every decision in human hands.
                </>
              )}
            </div>

            <Button
              asChild
              size="lg"
              className="group/cta-hero active:ring-primary/50 active:ring-offset-background mt-6 inline-flex origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-px active:scale-[0.99] active:ring-2 active:ring-offset-2"
            >
              <Link href={ctaUrl} aria-label={ctaText}>
                <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7">
                  {ctaText}
                </span>
                <span
                  className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                  aria-hidden="true"
                >
                  <MoveUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        </FullBleedLines>
      </div>
    </section>
  );
}
