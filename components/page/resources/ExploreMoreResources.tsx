'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const resourceLinks = [
  {
    href: '/resources/blogs',
    label: 'Blog',
    description: 'Expert insights and best practices',
  },
  {
    href: '/resources/case-studies',
    label: 'Case Studies',
    description: 'Real workflow success stories',
  },
  {
    href: '/resources/webinars',
    label: 'Webinars',
    description: 'Sessions and practical discussions',
  },
];

export default function ExploreMoreResources() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  function queueClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 300);
  }

  function openOnDesktopHover(event: React.PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    cancelClose();
    setOpen(true);
  }

  function closeOnDesktopLeave(event: React.PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    queueClose();
  }

  return (
    <section className="relative -mb-8 px-4 sm:px-0 md:-mb-24">
      <FullBleedLines className="py-10 md:py-12">
        <div className="font-heading flex flex-col items-start gap-5 md:ml-[44%]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-4xl leading-none font-bold tracking-tight sm:text-5xl md:text-6xl">
            <ArrowDown className="text-accent1 h-11 w-11 shrink-0 md:h-14 md:w-14" strokeWidth={1.8} />
            <span className="bg-accent1 text-background px-2">Explore</span>
            <span>more resources</span>
          </div>

          <p className="font-body text-foreground/80 max-w-2xl text-sm leading-6 tracking-normal sm:text-base">
            Discover case studies, expert insights, and webinars to keep learning and uncover new ways to optimize your
            operations.
          </p>

          <div className="relative z-20">
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onPointerEnter={openOnDesktopHover}
                  onPointerLeave={closeOnDesktopLeave}
                  className="group/resource active:ring-primary/50 active:ring-offset-background inline-flex rounded-none font-semibold tracking-tight transition-all duration-200 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
                >
                  <span className="bg-primary text-primary-foreground group-hover/resource:bg-primary/90 inline-flex h-9 items-center px-3 text-xs transition-colors">
                    Select resource
                  </span>
                  <span className="bg-primary text-primary-foreground group-hover/resource:bg-primary/90 ml-1 inline-flex h-9 w-9 items-center justify-center transition-colors">
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/resource:rotate-180" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                onPointerEnter={openOnDesktopHover}
                onPointerLeave={closeOnDesktopLeave}
                className="border-border bg-background w-[min(22rem,calc(100vw-2rem))] rounded-none border p-2 shadow-xl"
              >
                {resourceLinks.map(resource => (
                  <DropdownMenuItem asChild key={resource.href}>
                    <Link
                      href={resource.href}
                      className="group/item hover:bg-muted focus:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-none p-3 transition-colors"
                    >
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-heading text-foreground text-sm font-bold tracking-tight">
                          {resource.label}
                        </span>
                        <span className="text-muted-foreground font-body text-xs leading-4">{resource.description}</span>
                      </span>
                      <span className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5">
                        <ArrowUpRight className="!text-primary-foreground h-4 w-4" />
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </FullBleedLines>
    </section>
  );
}
