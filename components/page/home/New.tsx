import Image from 'next/image';
import Link from 'next/link';
import { MoveUpRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InlineHighlight from '@/components/core/inline-highlight';

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

const staticCards: ResourceCard[] = [
  {
    title: 'Rebuilding packaging workflows with AI',
    desc: 'Designed to Win: AI and the Future of Packaging with Sriram Upadhyayula.',
    image: '/resources/5flow-podcast-logo-title-only.png',
    link: '/resources/podcast/episode-1',
    buttonLabel: 'Watch now',
    icon: 'play',
  },
  {
    title: 'Driving 50% capacity growth in artwork operations with WAVE',
    desc: 'Managing high-volume packaging artwork across multiple brands and SKUs.',
    image: '/resources/how-we-saved.png',
    link: '/resources/case-studies',
    buttonLabel: 'Read case study',
  },
  {
    title: 'Packaging regulations do not have to slow your team down',
    desc: 'Discover practical ways to keep packaging reviews moving with more control.',
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

function formatDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toISOString().slice(0, 10);
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
    <article className="bg-background flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
      <div className="relative h-[150px] w-full overflow-hidden bg-[#eef1fb]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          style={{ objectPosition: item.imageFocus || 'center' }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {item.date ? <p className="text-muted-foreground text-xs leading-5 tracking-normal">{formatDate(item.date)}</p> : null}
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

export default function New() {
  return (
    <section className="text-foreground w-full px-2 py-12 md:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="font-heading text-[44px] leading-[1.05] font-bold tracking-normal md:text-[64px]">
          <InlineHighlight>What&apos;s new</InlineHighlight> at 5Flow
        </h2>
        <p className="mt-7 max-w-4xl text-xl leading-7 font-semibold tracking-normal text-[#303030] md:text-[24px] md:leading-9">
          From AI-powered product updates to expert perspectives on packaging operations and compliance, stay connected
          to what&apos;s shaping the future of packaging.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {staticCards.map(item => (
          <Card key={`${item.buttonLabel}-${item.link}`} item={item} />
        ))}
      </div>
    </section>
  );
}
