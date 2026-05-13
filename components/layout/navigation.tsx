'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SimpleLink = { href: string; label: string };

type DropdownMenuConfig = {
  items?: SimpleLink[];
  offsetClass?: string;
  itemWidthClass?: string;
  columns?: number; // default 1
  groups?: { heading: string; items: SimpleLink[] }[];
};

type NavItemLink = {
  type: 'link';
  href: string;
  label: string;
  keyId?: string;
};

type NavItemDropdown = {
  type: 'dropdown';
  href: string;
  label: string;
  keyId?: string;
  menu: DropdownMenuConfig;
};

type NavItem = NavItemLink | NavItemDropdown;

export type NavigationProps = {
  labels?: Record<string, string>;
};

// Fallback navigation items
const NAV_ITEMS: NavItem[] = [
  { type: 'link', href: '/about', label: 'ABOUT', keyId: 'about' },
  {
    type: 'dropdown',
    href: '/products/wave',
    label: 'PRODUCTS',
    keyId: 'products',
    menu: {
      items: [
        { href: '/products/wave', label: 'WAVE' },
        { href: '/products/dragonfly', label: 'DRAGONFLY' },
        { href: '/products/mediabox', label: 'MEDIABOX' },
        { href: '/products/wavestudio', label: 'WAVESTUDIO' },
      ],
      offsetClass: 'ml-36',
      itemWidthClass: 'w-72',
      columns: 1,
    },
  },
  {
    type: 'dropdown',
    href: '/solutions/artwork-management',
    label: 'SOLUTIONS',
    keyId: 'solutions',
    menu: {
      items: [
        { href: '/solutions/artwork-management', label: 'ARTWORK MANAGEMENT' },
        { href: '/solutions/online-proofing', label: 'ONLINE PROOFING' },
        { href: '/solutions/content-management', label: 'CONTENT MANAGEMENT' },
        { href: '/solutions/asset-library', label: 'ASSET LIBRARY' },
        { href: '/solutions/automated-artwork', label: 'AUTOMATED ARTWORK' },
        { href: '/solutions/integration', label: 'INTEGRATION' },
        { href: '/solutions/data-analysis', label: 'DATA ANALYSIS' },
      ],
      offsetClass: 'ml-76',
      itemWidthClass: 'w-112',
      columns: 1,
    },
  },
  {
    type: 'dropdown',
    href: '/applications/role/brand-manager',
    label: 'APPLICATIONS',
    keyId: 'applications',
    menu: {
      groups: [
        {
          heading: 'ROLE',
          items: [
            { href: '/applications/role/brand-manager', label: 'BRAND MANAGER' },
            { href: '/applications/role/quality-regulatory', label: 'QUALITY & REGULATORY' },
            { href: '/applications/role/creative-studio', label: 'CREATIVE / STUDIO' },
            { href: '/applications/role/procurement-sourcing', label: 'PROCUREMENT & SOURCING' },
          ],
        },
        {
          heading: 'INDUSTRY',
          items: [
            { href: '/applications/industry/retail', label: 'RETAIL' },
            { href: '/applications/industry/health-pharma', label: 'HEALTH & PHARMA' },
            { href: '/applications/industry/food-beverages', label: 'FOOD & BEVERAGES' },
            { href: '/applications/industry/beauty-cosmetics', label: 'BEAUTY & COSMETICS' },
            { href: '/applications/industry/consumer-goods', label: 'CONSUMER GOODS' },
          ],
        },
      ],
      offsetClass: 'ml-0',
      itemWidthClass: 'w-120',
      columns: 2,
    },
  },
  {
    type: 'dropdown',
    href: '/resources/blogs',
    label: 'RESOURCES',
    keyId: 'resources',
    menu: {
      items: [
        { href: '/resources/blogs', label: 'BLOGS' },
        { href: '/resources/case-studies', label: 'CASE STUDIES' },
        { href: '/resources/webinars', label: 'WEBINARS' },
        // Temporarily hidden.
        // { href: '/resources/downloads', label: 'DOWNLOADS' },
      ],
      offsetClass: 'ml-36',
      itemWidthClass: 'w-72',
      columns: 1,
    },
  },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.type === 'link') return pathname === item.href;
  // Active when on parent base route or any child route
  if (pathname === item.href || pathname.startsWith(item.href + '/')) return true;

  // Check flat items if present
  if (item.menu.items && item.menu.items.some(i => pathname === i.href || pathname.startsWith(i.href + '/'))) {
    return true;
  }

  // Check grouped items if present
  if (
    item.menu.groups &&
    item.menu.groups.some(group => group.items.some(i => pathname === i.href || pathname.startsWith(i.href + '/')))
  ) {
    return true;
  }

  return false;
}

export function Navigation({ labels }: NavigationProps) {
  const pathname = usePathname();
  const activeMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const item of NAV_ITEMS) {
      map.set(item.href, isActive(pathname, item));
    }
    return map;
  }, [pathname]);

  const [footerVisible, setFooterVisible] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  // New: track which dropdown is expanded in mobile menu (only one open at a time)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleExpanded = (key: string) => {
    setExpanded(prev => {
      const isOpen = !!prev[key];
      // if currently open, close it; otherwise open this one and close others
      return isOpen ? {} : { [key]: true };
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Hide nav only when a significant portion of the footer is visible
          setFooterVisible(entry.intersectionRatio >= 0.5);
        });
      },
      { root: null, threshold: 0.5 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    // reset expanded on route change
    setExpanded({});
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={cn(
        'bg-background border-border fixed top-0 z-[999] flex w-full items-center justify-between border-[1px] border-b border-solid transition-transform duration-500 ease-[var(--easing-smooth)]',
        footerVisible ? '-translate-y-[120%]' : 'translate-y-0',
        'h-16 px-4 py-2 sm:h-20 sm:px-6 md:h-[88px] md:px-28 md:py-4'
      )}
      aria-hidden={footerVisible}
    >
      {/* Logo */}
      <Link href="/" className="cursor-pointer">
        <Image src="/brand.svg" width={103} height={24} alt="5Flow Brand Logo" />
      </Link>

      {/* Mobile menu button (visible on small screens) */}
      <div className="md:hidden">
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(prev => !prev)}
          className="text-foreground hover:bg-muted inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent bg-transparent transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Nav links - hidden on small screens */}
      <div className="hidden gap-6 md:flex">
        {NAV_ITEMS.map(item => {
          const itemActive = activeMap.get(item.href) ?? false;

          if (item.type === 'dropdown') {
            const { menu } = item;
            const columns = menu.columns ?? 1;
            const listLayoutClass = menu.groups
              ? 'grid grid-cols-2 gap-4'
              : columns > 1
                ? 'grid grid-cols-' + columns
                : 'flex flex-col';
            const offsetClass = menu.offsetClass ?? '';
            const itemWidthClass = menu.itemWidthClass ?? '';
            const displayLabel = item.keyId && labels && labels[item.keyId] ? labels[item.keyId] : item.label;

            return (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn('nav-pill px-4', itemActive && 'nav-pill--active')}
                    aria-current={itemActive ? 'page' : undefined}
                  >
                    <span className="leading-[150%] font-bold tracking-tight">{displayLabel}</span>
                  </Link>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className={cn(
                    'z-[999] mt-10 translate-y-2 p-2 opacity-0 transition-all duration-300 ease-[var(--easing-smooth)] data-[state=open]:translate-y-0 data-[state=open]:opacity-100',
                    listLayoutClass,
                    offsetClass
                  )}
                >
                  {menu.groups
                    ? // Render grouped columns with headings
                      menu.groups.map(group => (
                        <div key={group.heading} className="flex flex-col">
                          <div className="border-accent1 mb-4 border-l-4 bg-[#F4F4F5] p-2">
                            <div className="bg-background">
                              <DropdownMenuLabel className="text-accent1 text-base font-semibold tracking-tight">
                                {group.heading}
                              </DropdownMenuLabel>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            {group.items.map(({ href, label }) => (
                              <DropdownMenuItem asChild key={href}>
                                <Link
                                  href={href}
                                  className={cn(
                                    'group/item active:ring-primary/50 active:ring-offset-background flex h-12 cursor-pointer items-stretch overflow-hidden bg-[#F4F4F5] p-0 no-underline transition-all duration-200 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.98] active:ring-2 active:ring-offset-2 active:outline-none',
                                    itemWidthClass
                                  )}
                                >
                                  <div className="bg-primary text-background flex h-full shrink-0 grow-0 basis-12 items-center justify-center transition-all duration-500 ease-[var(--easing-smooth)] group-hover/item:basis-1/2">
                                    <ArrowUpRight className="text-background !h-8 !w-8" strokeWidth={2} />
                                  </div>
                                  <span className="text-foreground bg-background flex h-full min-w-0 flex-1 items-center justify-start px-3 text-left font-semibold tracking-tight">
                                    {label}
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </div>
                      ))
                    : (menu.items ?? []).map(({ href, label }) => (
                        <DropdownMenuItem asChild key={href}>
                          <Link
                            href={href}
                            className={cn(
                              'group/item active:ring-primary/50 active:ring-offset-background flex h-12 cursor-pointer items-stretch overflow-hidden bg-[#F4F4F5] p-0 no-underline transition-all duration-200 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.98] active:ring-2 active:ring-offset-2 active:outline-none',
                              itemWidthClass
                            )}
                          >
                            <div className="bg-primary text-background flex h-full shrink-0 grow-0 basis-12 items-center justify-center transition-all duration-500 ease-[var(--easing-smooth)] group-hover/item:basis-1/2">
                              <ArrowUpRight className="text-background !h-8 !w-8" strokeWidth={2} />
                            </div>
                            <span className="text-foreground bg-background flex h-full min-w-0 flex-1 items-center justify-start px-3 text-left font-semibold tracking-tight">
                              {label}
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          const displayLabel = item.keyId && labels && labels[item.keyId] ? labels[item.keyId] : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('nav-pill px-4', itemActive && 'nav-pill--active')}
              aria-current={itemActive ? 'page' : undefined}
            >
              <span className="leading-[150%] font-bold tracking-tight">{displayLabel}</span>
            </Link>
          );
        })}
      </div>

      {/* Cta - hidden on small screens */}
      <div className="hidden md:inline-flex">
        <Button
          asChild
          className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 has-[>svg]:px-0"
        >
          <Link href="/contact" aria-label="Book a demo">
            <span className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-9 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3">
              Book A Demo
            </span>
            <span
              className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="border-border bg-background fixed inset-x-0 top-16 z-[998] max-h-[calc(100vh-4rem)] overflow-auto border-t p-4 md:top-[88px] md:hidden"
          role="menu"
        >
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map(item => {
              if (item.type === 'link') {
                const displayLabel = item.keyId && labels && labels[item.keyId] ? labels[item.keyId] : item.label;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-2 text-base font-semibold no-underline',
                      activeMap.get(item.href) && 'bg-muted'
                    )}
                  >
                    {displayLabel}
                  </Link>
                );
              }

              // For dropdowns: show a toggle button; children hidden until expanded
              const menu = item.menu;
              const isExpanded = !!expanded[item.href];
              const displayLabel = item.keyId && labels && labels[item.keyId] ? labels[item.keyId] : item.label;

              return (
                <div key={item.href} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.href)}
                    aria-expanded={isExpanded}
                    className="hover:bg-muted flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-semibold no-underline"
                  >
                    <span>{displayLabel}</span>
                    <ChevronDown className={cn('h-5 w-5 transition-transform', isExpanded && 'rotate-180')} />
                  </button>
                  {isExpanded && (
                    <div className="ml-3 flex flex-col gap-2">
                      {/* Flat items */}
                      {menu.items && (
                        <div className="flex flex-col gap-1">
                          {menu.items.map(({ href, label }) => (
                            <Link
                              key={href}
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className="text-foreground/90 block rounded-md px-3 py-2 text-sm no-underline"
                            >
                              {label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* grouped items */}
                      {menu.groups &&
                        menu.groups.map(group => (
                          <div key={group.heading} className="flex flex-col gap-1">
                            <div className="text-accent1 text-xs font-semibold">{group.heading}</div>
                            {group.items.map(({ href, label }) => (
                              <Link
                                key={href}
                                href={href}
                                onClick={() => setMobileOpen(false)}
                                className="text-foreground/90 block rounded-md px-3 py-2 text-sm no-underline"
                              >
                                {label}
                              </Link>
                            ))}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="bg-success text-success-foreground inline-flex w-full items-center justify-center rounded px-4 py-2 text-sm font-semibold"
              >
                Book A Demo
              </Link>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
