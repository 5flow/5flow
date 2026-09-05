import Image from 'next/image';
import Link from 'next/link';
import parse, {
  domToReact,
  type DOMNode,
  type Element as HtmlElement,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import { Play } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Contact } from '@/components/layout';
import { Button } from '@/components/ui/button';
import type { PodcastEpisode } from '@/lib/cms/podcast';
import PodcastVideoPopup from './PodcastVideoPopup';

function PodcastQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto my-14 aspect-[700/190] w-full max-w-[700px] md:my-20">
      <Image
        src="/resources/Quotes Placeholder Podcast.png"
        alt=""
        fill
        sizes="(min-width: 768px) 700px, 100vw"
        className="object-contain"
      />
      <blockquote className="font-heading relative z-10 flex h-full items-center px-[21%] pr-[7%] text-lg leading-snug font-bold tracking-tight md:text-[21px]">
        {children}
      </blockquote>
    </div>
  );
}

const bodyParserOptions: HTMLReactParserOptions = {
  replace(node: DOMNode) {
    if (node.type !== 'tag') return undefined;
    const element = node as HtmlElement;
    const children = domToReact(element.children as DOMNode[], bodyParserOptions);

    if (element.name === 'h2') {
      return <h2 className="font-heading mt-14 text-xl font-bold tracking-tight first:mt-0 md:text-2xl">{children}</h2>;
    }
    if (element.name === 'p') return <p className="mt-5">{children}</p>;
    if (element.name === 'blockquote') return <PodcastQuote>{children}</PodcastQuote>;
    if (element.name === 'br') return <br />;
    return undefined;
  },
};

function renderPodcastBody(content: string) {
  if (!content) return null;
  try {
    return parse(content, bodyParserOptions);
  } catch {
    return (
      <p>
        {content
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()}
      </p>
    );
  }
}

function SpotifyButton({ href }: { href: string }) {
  if (!href) return null;
  return (
    <Button
      asChild
      size="lg"
      className="group/spotify active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 transition-all duration-300 hover:gap-0 active:ring-2 active:ring-offset-2"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <span className="bg-primary inline-flex h-[46px] w-[174px] items-center gap-2 px-3 text-white transition-all duration-300 group-hover/spotify:px-4">
          <Image
            src="/resources/spotify-logo.svg"
            width={36}
            height={36}
            alt=""
            aria-hidden
            className="h-[35px] w-[35px] shrink-0"
          />
          <span className="flex flex-col items-start leading-none">
            <span className="text-[16px] leading-[0.8] font-semibold">Listen on</span>
            <span className="text-[22px] leading-[0.78] font-bold text-[#32D430]">Spotify</span>
          </span>
        </span>
        <span
          className="bg-primary text-primary-foreground inline-flex h-[46px] w-[46px] items-center justify-center"
          aria-hidden
        >
          <Play className="h-6 w-6 fill-current" />
        </span>
      </Link>
    </Button>
  );
}

export default function PodcastEpisodeCmsPage({ episode }: { episode: PodcastEpisode }) {
  return (
    <div className="font-heading relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-0">
        <FullBleedLines className="mt-32 flex w-full justify-end gap-8 md:mt-50">
          <b className="text-foreground text-4xl leading-none tracking-tight md:text-5xl">podcast</b>
          <div className="bg-primary h-10 w-10" />
        </FullBleedLines>

        <section className="mt-16 md:mt-24">
          <FullBleedLines>
            <article className="grid items-start overflow-hidden rounded-2xl border md:grid-cols-[1.55fr_1fr]">
              <PodcastVideoPopup youtubeUrl={episode.youtubeUrl} title={episode.title} />
              <div className="flex flex-col items-start gap-3 p-5 md:p-6">
                <div>
                  <p className="text-lg font-bold tracking-tight">{episode.episodeNumber}</p>
                  <h1 className="mt-1 text-3xl leading-[0.96] font-bold tracking-tight md:text-4xl">{episode.title}</h1>
                </div>
                <p className="font-body text-base leading-snug tracking-tight md:text-xl">
                  with {episode.guestName}
                  <br />[{episode.guestRole}]
                </p>
                <p className="font-body text-sm leading-relaxed tracking-tight md:text-base">
                  {episode.heroDescription}
                </p>
                <SpotifyButton href={episode.spotifyUrl} />
              </div>
            </article>
          </FullBleedLines>
        </section>

        <main className="mx-auto max-w-6xl py-16 md:py-24">
          <article className="font-body text-sm leading-5 tracking-tight md:text-[20px] md:leading-[28px]">
            {episode.topics.length ? (
              <section>
                <h2 className="font-heading text-xl font-bold tracking-tight md:text-2xl">Topics discussed:</h2>
                <ul className="mt-5 list-disc space-y-2 pl-6">
                  {episode.topics.map(topic => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            <div className="mt-14">{renderPodcastBody(episode.content)}</div>
          </article>
        </main>

        <section className="pb-24 md:pb-40">
          <Contact headingWrapperClassName="hidden" />
        </section>
      </div>
    </div>
  );
}
