'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import CtaPixelGrid from '@/components/core/cta-pixel-grid';

const linkGroups = [
  {
    title: 'Jump In',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Product',
    links: [
      { href: '/products/wave', label: 'Wave' },
      { href: '/products/dragonfly', label: 'Dragonfly' },
      { href: '/products/mediabox', label: 'Mediabox' },
      { href: '/products/wavestudio', label: 'Wave Studio' },
    ],
  },
  {
    title: 'Solution',
    links: [
      { href: '/solutions/artwork-management', label: 'Artwork Management' },
      { href: '/solutions/online-proofing', label: 'Online Proofing' },
      { href: '/solutions/content-management', label: 'Content Management' },
      { href: '/solutions/asset-library', label: 'Asset Library' },
      { href: '/solutions/automated-artwork', label: 'Automated Artwork' },
      { href: '/solutions/integration', label: 'Integration' },
      { href: '/solutions/data-analysis', label: 'Data Analysis' },
      { href: '/solutions/consulting', label: 'Consulting' },
      { href: '/ai-solutions', label: 'AI Solutions' },
    ],
  },
  {
    title: 'Application',
    links: [
      { href: '/applications/role/brand-manager', label: 'Brand Manager' },
      { href: '/applications/role/quality-regulatory', label: 'Quality & Regulatory' },
      { href: '/applications/role/creative-studio', label: 'Creative / Studio' },
      { href: '/applications/role/procurement-sourcing', label: 'Procurement & Sourcing' },
    ],
  },
  {
    title: 'Industry',
    links: [
      { href: '/applications/industry/retail', label: 'Retail' },
      { href: '/applications/industry/health-pharma', label: 'Health & Pharma' },
      { href: '/applications/industry/food-beverages', label: 'Food & Beverages' },
      { href: '/applications/industry/beauty-cosmetics', label: 'Beauty & Cosmetics' },
      { href: '/applications/industry/consumer-goods', label: 'Consumer Goods' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources/blogs', label: 'Blog' },
      { href: '/resources/case-studies', label: 'Case Studies' },
      { href: '/resources/webinars', label: 'Webinars' },
      { href: '/resources/downloads', label: 'Downloads' },
      { href: '/resources/podcast', label: 'Podcast' },
    ],
  },
];

export function CtaV2() {
  const pixelPattern = [
    ['background', 'background', 'accent1', 'background', 'background', 'background', 'background'],
    ['background', 'success', 'primary', 'warning', 'background', 'background', 'background'],
    ['background', 'primary', 'background', 'background', 'success', 'background', 'background'],
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass =
    'text-background/80 hover:text-success transition-all duration-500 ease-[var(--easing-smooth)] text-sm md:text-base';

  return (
    <section className="relative w-full overflow-hidden">
      {/* Pixel grid */}
      <div className="relative z-10 ml-0 flex justify-start px-4 py-6 sm:ml-[-20px] md:ml-[-40px] md:px-16 md:py-10">
        {/* Mobile: smaller pixels */}
        <div className="block w-full max-w-4xl overflow-hidden pb-6.5 md:hidden">
          <div className="origin-left scale-90 transform">
            <CtaPixelGrid
              pattern={pixelPattern}
              pixelSize="64px"
              icon={{
                row: 1,
                col: 1,
                element: (
                  <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="flex h-full w-full items-center justify-center transition-transform hover:scale-110 active:scale-95"
                  >
                    <ArrowUp size={30} className="text-foreground" />
                  </button>
                ),
              }}
            />
          </div>
        </div>

        {/* Desktop / tablet: original pixels */}
        <div className="hidden w-full max-w-none overflow-hidden md:block">
          <div className="origin-left scale-100 transform">
            <CtaPixelGrid
              pattern={pixelPattern}
              pixelSize="128px"
              icon={{
                row: 1,
                col: 1,
                element: (
                  <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="flex h-full w-full items-center justify-center transition-transform hover:scale-110 active:scale-95"
                  >
                    <ArrowUp size={60} className="text-foreground" />
                  </button>
                ),
              }}
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-accent1 relative z-0 mt-[-120px] flex w-full flex-col px-6 pt-[160px] pb-20 md:mt-[-168px] md:px-38 md:pt-[200px] md:pb-[7.5rem]">
        <div className="text-background grid w-full grid-cols-2 gap-x-8 gap-y-10 md:flex md:flex-wrap md:justify-between md:gap-8">
          {linkGroups.map(group => (
            <div key={group.title} className="flex flex-col gap-4">
              <span className="font-bold">{group.title}</span>
              <div className="flex flex-col gap-3">
                {group.links.map(link => (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
