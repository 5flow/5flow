import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, MoveUpRight, Play } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import { Button } from '@/components/ui/button';
import PodcastNotificationPopup from '@/components/page/resources/PodcastNotificationPopup';
import PodcastVideoPopup from '@/components/page/resources/PodcastVideoPopup';
import { Contact } from '@/components/layout';

const youtubeHref = '/resources/sub-podcast';

function WatchButton({ compact = false }: { compact?: boolean }) {
  return (
    <Button
      asChild
      size={compact ? 'sm' : 'lg'}
      className={`group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2 ${compact ? 'gap-2' : 'gap-3'}`}
    >
      <Link href={youtubeHref} target="_blank" rel="noopener noreferrer" aria-label="Watch now">
        <span
          className={`bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex items-center transition-all duration-300 ease-[var(--easing-smooth)] ${compact ? 'h-9 px-4 text-[13px] leading-none group-hover/cta-hero:px-5' : 'h-10 px-4 text-sm group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7'}`}
        >
          Watch now
        </span>
        <span
          className={`bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
          aria-hidden="true"
        >
          <Play className={compact ? 'h-3.5 w-3.5 fill-current' : 'h-4 w-4 fill-current'} />
        </span>
      </Link>
    </Button>
  );
}

export default function PodcastPage() {
  return (
    <div className="font-heading relative overflow-hidden">
      <PodcastNotificationPopup />
      <div className="container mx-auto px-4 sm:px-0">
        <FullBleedLines className="mt-32 flex w-full justify-end gap-8 md:mt-50">
          <b className="text-foreground text-4xl leading-none tracking-tight md:text-5xl">podcast</b>
          <div className="bg-primary h-10 w-10" />
        </FullBleedLines>

        <section className="mt-12 flex flex-col gap-8 md:mt-10">
          <FullBleedLines>
            <Image
              src="/resources/5flow-podcast-logo-title-only.png"
              width={834}
              height={516}
              alt="Under Review"
              priority
              className="h-auto w-full max-w-[30rem] object-contain md:max-w-[30rem]"
            />
          </FullBleedLines>

          <FullBleedLines>
            <p className="font-heading text-primary max-w-5xl text-3xl leading-[0.95] tracking-tighter md:text-5xl">
              Real conversations with the people who make packaging and brand execution happen.
            </p>
          </FullBleedLines>

          <FullBleedLines>
            <p className="font-body max-w-3xl py-2 text-sm leading-5 tracking-tight md:text-[20px] md:leading-[28px]">
              From artwork managers to regulatory leaders and brand operators:
              <br />
              Under Review explores the realities behind approvals, compliance, AI &amp;
              <br className="hidden sm:block" /> automation, and what&apos;s actually broken across
              organizations.
            </p>
          </FullBleedLines>

          <WatchButton />
        </section>

        <section className="mt-32 flex flex-col gap-8 md:mt-40">
          <FullBleedLines>
            <article className="grid min-h-[22rem] grid-cols-1 gap-4 overflow-hidden rounded-2xl border p-2 md:grid-cols-2 md:gap-6">
              <PodcastVideoPopup />
              <div className="flex flex-col items-start gap-4 p-5 md:p-6">
                <div>
                  <p className="text-lg tracking-tight font-bold">Episode 01</p>
                  <h2 className="font-heading mt-2 text-2xl leading-tight font-bold tracking-tight md:text-3xl">
                    Rebuilding packaging workflows with AI
                  </h2>
                </div>
                <WatchButton compact />
                <p className="font-body max-w-xl text-sm leading-relaxed tracking-tight md:text-[16px] md:leading-[28px]">
                  Designed to Win: AI and the Future of Packaging with Sriram Upadhyayula, CTO of Propelis
                </p>
                <p className="font-body max-w-xl text-sm leading-relaxed tracking-tight md:text-[16px] md:leading-[28px]">
                  “AI isn&apos;t coming to packaging. It&apos;s already here.” In this episode, Sriram breaks down
                  why the real gains come from rebuilding workflows, not adding tools, and how AI can take the
                  “dirty work” off packaging teams so they can focus on what actually matters.
                </p>
              </div>
            </article>
          </FullBleedLines>
        </section>

        <section className="pt-24 md:pt-40">
          <FullBleedLines className="relative w-full">
            <div className="bg-primary flex flex-col gap-10 rounded-2xl px-6 py-10 sm:gap-14 sm:py-16 sm:pl-8">
              <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
                <div className="font-heading flex flex-col gap-4 text-center sm:text-left">
                  <h2 className="text-background max-w-4xl text-4xl leading-tight font-bold tracking-tight sm:text-6xl sm:leading-none">
                    <InlineHighlight>Turn</InlineHighlight>insights into
                    <br/>
                     impact with WAVE
                  </h2>
                  <p className="text-success text-2xl leading-tight tracking-tight sm:text-5xl sm:leading-none">
                    From expert perspectives to operational execution.
                  </p>
                </div>
                <ArrowUpRight
                  className="text-background hidden h-32 w-32 shrink-0 sm:block"
                  strokeWidth={1}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col gap-6 text-center sm:gap-4 sm:text-left">
                <p className="font-body text-background max-w-3xl text-sm leading-5 tracking-tight md:text-[20px] md:leading-[28px]">
                  Discover how WAVE helps you translate artwork and content processes at scale. Bring more
                  structure, visibility, and control to your operations — whether across teams, markets, or complex
                  product portfolios.
                </p>
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="group/cta-hero active:ring-success/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
                  >
                    <span className="bg-success text-success-foreground group-hover/cta-hero:bg-success/90 group-active/cta-hero:bg-success/80 inline-flex h-10 items-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7">
                      Talk to Us
                    </span>
                    <span
                      className="bg-success text-success-foreground group-hover/cta-hero:bg-success/90 group-active/cta-hero:bg-success/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                      aria-hidden="true"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </FullBleedLines>
        </section>

        <section className="pt-52 pb-24 md:pt-72 md:pb-40">
          <div className="mx-auto max-w-6xl">
            <div className="font-heading mb-14 flex items-end gap-5 md:ml-52">
              <ArrowDown className="text-accent1 h-14 w-14 shrink-0" strokeWidth={1.8} />
              <h2 className="text-4xl leading-none font-bold tracking-tighter md:text-[60px] md:leading-[60px]">
                <InlineHighlight>Real</InlineHighlight> Voices. Real Insights.
                <br />
                From the podcast.
              </h2>
            </div>

            <div className="relative mx-auto aspect-[800/360] w-full max-w-[800px] bg-[url('/resources/quotes-podcast-2-sriram.png')] bg-contain bg-center bg-no-repeat">
              <blockquote className="absolute top-[40%] left-[16.5%] max-w-[60%] -translate-y-1/2 text-[clamp(0.8rem,3.1vw,2rem)] leading-[1.18] tracking-tight">
                The shift isn&apos;t coming, it is already here.
                
                We need to move now.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-40">
          <Contact headingWrapperClassName="hidden" />
        </section>
      </div>
    </div>
  );
}
