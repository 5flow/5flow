import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import { Button } from '@/components/ui/button';
import PodcastNotificationPopup from '@/components/page/resources/PodcastNotificationPopup';

const spotifyHref = 'https://open.spotify.com/';
const youtubeHref = 'https://www.youtube.com/';

function PodcastButton({ href, label, compact = false }: { href: string; label: string; compact?: boolean }) {
  return (
    <Button
      asChild
      size={compact ? 'sm' : 'lg'}
      className={`group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2 ${compact ? 'gap-2' : 'gap-3'}`}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <span
          className={`bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex items-center transition-all duration-300 ease-[var(--easing-smooth)] ${compact ? 'h-9 px-4 text-[13px] leading-none group-hover/cta-hero:px-5' : 'h-10 px-4 text-sm group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7'}`}
        >
          {label}
        </span>
        <span
          className={`bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
          aria-hidden="true"
        >
          <MoveUpRight className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        </span>
      </Link>
    </Button>
  );
}

function EpisodeArtwork({ className = '' }: { className?: string }) {
  return <div className={`bg-primary rounded-2xl ${className}`} aria-hidden="true" />;
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
            <p className="max-w-3xl py-2 text-sm leading-5 tracking-tight md:text-base">
              From artwork managers to regulatory leaders and brand operators:
              <br />
              Under Review explores the realities behind approvals, compliance, AI &amp;
              <br className="hidden sm:block" /> automation, and what&apos;s actually broken across
              organizations.
            </p>
          </FullBleedLines>

          <div className="flex flex-wrap items-center gap-3">
            <PodcastButton href={youtubeHref} label="Watch on YouTube" />
            <PodcastButton href={spotifyHref} label="Listen on Spotify" />
          </div>
        </section>

        <section className="mt-32 flex flex-col gap-8 md:mt-40">
          <FullBleedLines>
            <article className="grid min-h-[22rem] grid-cols-1 overflow-hidden rounded-2xl border md:grid-cols-2">
              <EpisodeArtwork className="m-1 min-h-72 md:min-h-full" />
              <div className="flex flex-col items-start gap-3 p-7">
                <h2 className="font-heading text-xl font-bold tracking-tight">Latest Episode 01</h2>
                <p className="text-sm tracking-tight md:text-base">Short problem-led summary (3-4 lines)</p>
                <div className="flex flex-col items-start gap-2">
                  <PodcastButton href={youtubeHref} label="Watch on YouTube" compact />
                  <PodcastButton href={spotifyHref} label="Listen on Spotify" compact />
                </div>
              </div>
            </article>
          </FullBleedLines>
        </section>

        <section className="pt-52 pb-24 md:pt-72 md:pb-40">
          <div className="mx-auto max-w-5xl">
            <div className="font-heading mb-14 flex items-end gap-5 md:ml-52">
              <ArrowDown className="text-accent1 h-14 w-14 shrink-0" strokeWidth={1.8} />
              <h2 className="text-4xl leading-[0.9] font-bold tracking-tighter md:text-5xl">
                <InlineHighlight>Trusted</InlineHighlight> by the people
                <br />
                inside the process
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
      </div>
    </div>
  );
}
