'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MoveUpRight,
  CalendarDays,
  Briefcase,
  Users,
  Target,
  Package,
  ShieldCheck,
  PenTool,
  Zap,
  Link as LinkIcon,
  Play,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import type { BlogCardItem } from '@/lib/resources/blogs';
import type { CaseStudyCardItem } from '@/lib/resources/case-studies';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import FullBleedLines from '@/components/core/full-bleed-lines';

interface TabItem {
  title: string;
  desc: string;
  image?: string;
  link?: string;
  buttonLabel?: string;
  date?: string;
}

interface TabData {
  value: string;
  label: string;
  icon?: string;
  items: TabItem[];
}

type FilterVariant = 'tabs' | 'blogs' | 'case-studies';

const FilterSection = ({
  tabsData,
  variant = 'tabs',
  blogItems,
  caseStudyItems,
}: {
  tabsData?: TabData[];
  variant?: FilterVariant;
  blogItems?: BlogCardItem[];
  caseStudyItems?: CaseStudyCardItem[];
}) => {
  return (
    <div className="relative w-full flex-col">
      {variant === 'blogs' ? (
        <BlogsGrid items={blogItems ?? []} />
      ) : variant === 'case-studies' ? (
        <CaseStudiesGrid items={caseStudyItems ?? []} />
      ) : (
        <TabsWrapper tabsData={tabsData ?? []} />
      )}
    </div>
  );
};

const ICONS = {
  briefcase: Briefcase,
  users: Users,
  target: Target,
  package: Package,
  shieldCheck: ShieldCheck,
  penTool: PenTool,
  zap: Zap,
  link: LinkIcon,
  calendarDays: CalendarDays,
  play: Play,
  bookOpen: BookOpen,
  lightbulb: Lightbulb,
} as const;

const TabsWrapper = ({ tabsData }: { tabsData: TabData[] }) => {
  const [active, setActive] = useState<string>(tabsData?.[0]?.value ?? 'industry');

  return (
    <Tabs value={active} onValueChange={setActive} className="flex w-full flex-col gap-8 px-4 sm:px-0">
      <FullBleedLines className="overflow-hidden">
        {/* Mobile dropdown (visible < sm), Tabs list hidden */}
        <div className="sm:hidden">
          <label htmlFor="resource-tab-select" className="sr-only">
            Select a category
          </label>
          <select
            id="resource-tab-select"
            value={active}
            onChange={e => setActive(e.target.value)}
            className="bg-foreground/5 text-foreground/90 focus-visible:ring-primary focus-visible:ring-offset-background h-11 w-full cursor-pointer rounded-sm px-3 py-2 text-base transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {tabsData.map(tab => (
              <option key={tab.value} value={tab.value}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop/Tablet tabs (hidden on mobile) */}
        <TabsList className="bg-foreground/5 hidden min-h-16 gap-5 overflow-x-auto rounded-none px-3 py-2 whitespace-nowrap sm:flex sm:overflow-visible">
          {tabsData.map(tab => {
            const Icon = tab.icon ? ICONS[tab.icon as keyof typeof ICONS] : undefined;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-primary data-[state=active]:ring-primary data-[state=active]:bg-background flex min-h-11 min-w-8 cursor-pointer items-center gap-2 px-6 py-3 text-base data-[state=active]:rounded-sm data-[state=active]:ring-2 sm:px-8 sm:py-3 sm:text-lg"
              >
                {Icon ? <Icon className="h-5 w-5" /> : null}
                <span className="leading-none">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </FullBleedLines>

      <FullBleedLines>
        {tabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="p-2">
            <div className="flex flex-col gap-4 sm:gap-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tab.items.map((item, i) => (
                  <Card
                    key={`${tab.value}-${i}`}
                    className="relative flex flex-1 flex-col gap-0 rounded-2xl border p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-[20px] sm:h-65">
                      <Image
                        src={item.image ?? '/product/rectangle.png'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="px-2 py-4">
                      <div className="flex flex-1 flex-col items-start gap-4 sm:gap-6">
                        <div className="flex w-full flex-col gap-2">
                          <b className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">{item.title}</b>
                          <div className="text-base leading-tight tracking-tight sm:text-lg">{item.desc}</div>
                        </div>
                        <Link href={item.link ?? '/contact'}>
                          <Button
                            size="lg"
                            className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2"
                          >
                            <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                              {item.buttonLabel ?? 'Read case study'}
                            </span>
                            <span
                              className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                              aria-hidden="true"
                            >
                              <MoveUpRight className="h-4 w-4" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </FullBleedLines>
    </Tabs>
  );
};

export default FilterSection;

function BlogsGrid({ items }: { items: BlogCardItem[] }) {
  return (
    <div className="flex w-full flex-col gap-8 px-4 sm:px-0">
      <FullBleedLines>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Card
              key={`blog-${i}`}
              className="relative flex h-full flex-1 flex-col gap-0 rounded-2xl border p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-[20px] sm:h-65">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: item.imageFocus || 'center' }}
                />
              </div>

              <div className="flex flex-1 flex-col px-2 py-4">
                <div className="flex flex-1 flex-col items-start gap-4 sm:gap-6">
                  <div className="flex w-full flex-col gap-2">
                    <div className="text-foreground/70 inline-flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <b className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">{item.title}</b>
                    <div className="text-base leading-tight tracking-tight sm:text-lg">{item.desc}</div>
                  </div>
                  <Link href={item.link} className="mt-auto">
                    <Button
                      size="lg"
                      className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2"
                    >
                      <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                        Read more
                      </span>
                      <span
                        className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                        aria-hidden="true"
                      >
                        <MoveUpRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </FullBleedLines>
    </div>
  );
}

function CaseStudiesGrid({ items }: { items: CaseStudyCardItem[] }) {
  const item = items[0];
  if (!item) return null;

  return (
    <div className="flex w-full flex-col gap-8 px-4 sm:px-0">
      <FullBleedLines>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="relative flex h-full flex-1 flex-col gap-0 rounded-2xl border p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
            <div className="relative h-48 w-full overflow-hidden rounded-[20px] sm:h-65">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>

            <div className="flex flex-1 flex-col px-2 py-4">
              <div className="flex flex-1 flex-col items-start gap-4 sm:gap-6">
                <div className="flex w-full flex-col gap-2">
                  <b className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">{item.title}</b>
                  <div className="text-base leading-tight tracking-tight sm:text-lg">{item.desc}</div>
                </div>
                <Link href={item.link} className="mt-auto">
                  <Button
                    size="lg"
                    className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2"
                  >
                    <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                      Read case study
                    </span>
                    <span
                      className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                      aria-hidden="true"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </FullBleedLines>
    </div>
  );
}
