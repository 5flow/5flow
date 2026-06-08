import Link from 'next/link';
import { ArrowDown, MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import { Button } from '@/components/ui/button';

const spotifyHref = 'https://open.spotify.com/';

const episodes = [
  { title: 'Episode 03', desc: 'Short problem-led summary (3-4 lines)' },
  { title: 'Episode 02', desc: 'Short problem-led summary (3-4 lines)' },
  { title: 'Episode 01', desc: 'Short problem-led summary (3-4 lines)' },
];

function SpotifyButton({ compact = false }: { compact?: boolean }) {
  return (
    <Button
      asChild
      size={compact ? 'sm' : 'lg'}
      className={`group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2 ${compact ? 'gap-1.5' : 'gap-3'}`}
    >
      <Link href={spotifyHref} target="_blank" rel="noopener noreferrer" aria-label="Listen on Spotify">
        <span
          className={`bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex items-center transition-all duration-300 ease-[var(--easing-smooth)] ${compact ? 'h-8 px-3 text-[11px] group-hover/cta-hero:px-4' : 'h-10 px-4 text-xs group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7'}`}
        >
        Listen on Spotify
        </span>
        <span
          className={`bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}
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
      <div className="container mx-auto px-4 sm:px-0">
        <FullBleedLines className="mt-32 flex w-full justify-end gap-8 md:mt-50">
          <b className="text-foreground text-4xl leading-none tracking-tight md:text-5xl">podcast</b>
          <div className="bg-primary h-10 w-10" />
        </FullBleedLines>

        <section className="mt-12 flex flex-col gap-8 md:mt-10">
          <FullBleedLines>
            <h1 className="font-heading max-w-4xl text-5xl leading-none font-bold tracking-tighter md:text-7xl">
              Under Review
            </h1>
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

          <SpotifyButton />
        </section>

        <section className="mt-32 flex flex-col gap-8 md:mt-40">
          <FullBleedLines>
            <article className="grid min-h-[22rem] grid-cols-1 overflow-hidden rounded-2xl border md:grid-cols-2">
              <EpisodeArtwork className="m-1 min-h-72 md:min-h-full" />
              <div className="flex flex-col items-start gap-3 p-7">
                <h2 className="font-heading text-xl font-bold tracking-tight">Latest Episode 04</h2>
                <p className="text-sm tracking-tight md:text-base">Short problem-led summary (3-4 lines)</p>
                <SpotifyButton />
              </div>
            </article>
          </FullBleedLines>

          <FullBleedLines>
            <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-3">
              {episodes.map(episode => (
                <article key={episode.title} className="flex min-h-[22rem] flex-col rounded-2xl border p-1">
                  <EpisodeArtwork className="h-56 w-full md:h-52" />
                  <div className="flex flex-col items-start gap-2 p-2 pb-4">
                    <h2 className="font-heading text-lg font-bold tracking-tight">{episode.title}</h2>
                    <p className="text-sm tracking-tight">{episode.desc}</p>
                    <SpotifyButton compact />
                  </div>
                </article>
              ))}
            </div>
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

            <div className="relative mx-auto max-w-4xl">
              <div className="bg-secondary min-h-72 rounded-4xl px-8 py-14 md:px-24 md:py-20">
                <span className="text-primary font-serif text-8xl leading-8 font-bold" aria-hidden="true">
                  ”
                </span>
                <blockquote className="font-heading mt-2 max-w-2xl text-2xl leading-tight tracking-tight md:text-3xl">
                  The shift isn&apos;t coming, it is already here. <br />We need to move now.
                </blockquote>
              </div>

              <div className="mt-5 flex justify-end pr-4 md:pr-24">
                <p className="text-primary text-base leading-tight md:text-xl">
                  <b className="block">Sriram Upadhyayula</b>
                  Chief Technology Officer 5Flow
                </p>
              </div>

              <div
                className="pointer-events-none absolute right-0 bottom-0 hidden h-[23rem] w-[16rem] bg-[url('/resources/podcast/sriram-upadhyayula.png')] bg-contain bg-bottom bg-no-repeat md:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
