import Image from 'next/image';
import Link from 'next/link';
import { MoveUpRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InlineHighlight from '@/components/core/inline-highlight';
import { getCmsBlogs } from '@/lib/cms/blog';
import { getCmsCaseStudyCards } from '@/lib/cms/case-study';
import { getCmsWebinarCards } from '@/lib/cms/webinar';
import { getCmsPodcastCards } from '@/lib/cms/podcast';

type ResourceCard = {
  title: string;
  desc?: string;
  image: string;
  link: string;
  buttonLabel: string;
  date?: string;
  imageFocus?: string;
  icon?: 'play';
};

const podcastYoutubeVideoId = '1dUPMP1-VzE';
const getYoutubeThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
const getPodcastImage = (videoId: string, localImage?: string) => localImage || getYoutubeThumbnail(videoId);

const staticCards: ResourceCard[] = [
  {
    title: 'Rebuilding packaging workflows with AI',
    desc: 'Designed to Win: AI and the Future of Packaging with Sriram Upadhyayula.',
    date: '2026-07-13',
    image: getPodcastImage(podcastYoutubeVideoId, '/home/podcast_tumb.webp'),
    link: '/resources/podcast/episode-1',
    buttonLabel: 'Watch now',
    icon: 'play',
  },
  {
    title: 'Driving 50% capacity growth in artwork operations with WAVE',
    desc: 'Managing high-volume packaging artwork across multiple brands and SKUs.',
    date: '2026-07-24',
    image: '/resources/how-we-saved.png',
    link: '/resources/case-studies',
    buttonLabel: 'Read case study',
  },
  {
    title: 'Packaging regulations do not have to slow your team down',
    desc: 'Discover practical ways to keep packaging reviews moving with more control.',
    date: '2026-04-20',
    image: '/resources/Webinar_Cover-1-Secure_Food.png',
    link: '/resources/webinars',
    buttonLabel: 'Watch now',
    icon: 'play',
  },
  {
    title: 'Why time-to-market still stalls even after your tech stack upgrade',
    desc: 'A practical look at where packaging workflows slow down and how teams can move faster.',
    date: '2026-04-21',
    image: '/resources/when-final-isnt.jpg',
    link: '/resources/blogs',
    buttonLabel: 'Read more',
  },
];

async function getWordPressCards(): Promise<ResourceCard[]> {
  if (!process.env.WP_BASE_URL) return staticCards;

  try {
    const [podcasts, caseStudies, webinars, blogs] = await Promise.all([
      getCmsPodcastCards(),
      getCmsCaseStudyCards(),
      getCmsWebinarCards(),
      getCmsBlogs(),
    ]);

    const cards: ResourceCard[] = [
      podcasts[0]
        ? {
            title: podcasts[0].title,
            desc: podcasts[0].desc,
            date: podcasts[0].date,
            image: podcasts[0].image,
            link: podcasts[0].link,
            buttonLabel: 'Watch now',
            icon: 'play',
          }
        : staticCards[0],
      caseStudies[0]
        ? {
            title: caseStudies[0].title,
            desc: caseStudies[0].desc,
            date: caseStudies[0].date,
            image: caseStudies[0].image,
            imageFocus: caseStudies[0].imageFocus,
            link: caseStudies[0].link,
            buttonLabel: 'Read case study',
          }
        : staticCards[1],
      webinars[0]
        ? {
            title: webinars[0].title,
            desc: webinars[0].desc,
            date: webinars[0].date,
            image: webinars[0].image,
            link: webinars[0].link,
            buttonLabel: webinars[0].buttonLabel || 'Watch now',
            icon: 'play',
          }
        : staticCards[2],
      blogs[0]
        ? {
            title: blogs[0].title,
            desc: blogs[0].desc,
            date: blogs[0].date,
            image: blogs[0].image,
            imageFocus: blogs[0].imageFocus,
            link: blogs[0].link,
            buttonLabel: 'Read more',
          }
        : staticCards[3],
    ];

    return cards;
  } catch {
    return staticCards;
  }
}

function formatDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  const [year, month, day] = parsed.toISOString().slice(0, 10).split('-');
  return `${day}-${month}-${year}`;
}

function ResourceButton({ href, label, icon }: { href: string; label: string; icon?: 'play' }) {
  return (
    <Button
      asChild
      size="sm"
      className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-2 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2"
    >
      <Link href={href} aria-label={label}>
        <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-8 items-center px-3 text-xs transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-4">
          {label}
        </span>
        <span
          className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-8 w-8 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
          aria-hidden="true"
        >
          {icon === 'play' ? <Play className="h-3.5 w-3.5 fill-current" /> : <MoveUpRight className="h-3.5 w-3.5" />}
        </span>
      </Link>
    </Button>
  );
}

function Card({ item }: { item: ResourceCard }) {
  return (
    <article className="bg-background flex h-full min-h-[380px] flex-col overflow-hidden rounded-lg shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
      <div className="relative aspect-video w-full overflow-hidden bg-[#eef1fb]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top"
          style={{ objectPosition: 'center top' }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {item.date ? (
          <p className="text-muted-foreground text-xs leading-5 tracking-normal">{formatDate(item.date)}</p>
        ) : null}
        <h3 className="font-heading mt-2 text-xl leading-[1.12] font-bold tracking-normal text-[#111827]">
          {item.title}
        </h3>
        {item.desc ? (
          <p className="mt-3 line-clamp-3 text-sm leading-5 font-medium tracking-normal text-[#303030]">{item.desc}</p>
        ) : null}

        <div className="mt-auto pt-5">
          <ResourceButton href={item.link} label={item.buttonLabel} icon={item.icon} />
        </div>
      </div>
    </article>
  );
}

type NewProps = {
  title?: string;
  description?: string;
};

function renderTitle(title: string) {
  const highlight = "What's new";
  if (!title.toLowerCase().startsWith(highlight.toLowerCase())) return title;
  return (
    <>
      <InlineHighlight>{title.slice(0, highlight.length)}</InlineHighlight>
      {title.slice(highlight.length)}
    </>
  );
}

export default async function New({
  title = "What's new at 5Flow",
  description = "From AI-powered product updates to expert perspectives on packaging operations and compliance, stay connected to what's shaping the future of packaging.",
}: NewProps) {
  const cards = await getWordPressCards();

  return (
    <section className="text-foreground w-full px-2 py-12 md:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="font-heading text-[44px] leading-[1.05] font-bold tracking-normal md:text-[64px]">
          {renderTitle(title)}
        </h2>
        <p className="mt-7 max-w-4xl text-xl leading-7 font-semibold tracking-normal text-[#303030] md:text-[24px] md:leading-9">
          {description}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(item => (
          <Card key={`${item.buttonLabel}-${item.link}`} item={item} />
        ))}
      </div>
    </section>
  );
}
