'use client';

import Link from '@/components/core/localized-link';
import { ArrowUp } from 'lucide-react';
import CtaPixelGrid from '@/components/core/cta-pixel-grid';
import { useSiteLanguage } from '@/components/core/site-language';
import { QUICK_LINK_GROUPS } from '@/lib/quick-links';
import type { QuickLinkLabels } from '@/lib/cms/quick-links';
import InlineCmsText from '@/components/core/inline-cms-text';

const GERMAN_GROUP_TITLES: Record<string, string> = {
  'Jump In': 'Über uns',
  Product: 'Produkte',
  Solution: 'Lösungen',
  Application: 'Anwendungen',
  Industry: 'Branchen',
  Resources: 'Ressourcen',
};

const GERMAN_LINK_LABELS: Record<string, string> = {
  '/about': 'Über uns',
  '/contact': 'Kontakt',
  '/solutions/artwork-management': 'Artwork-Management',
  '/solutions/online-proofing': 'Online-Proofing',
  '/solutions/content-management': 'Content-Management',
  '/solutions/asset-library': 'Asset-Bibliothek',
  '/solutions/automated-artwork': 'Automatisiertes Artwork',
  '/solutions/integration': 'Integration',
  '/solutions/data-analysis': 'Datenanalyse',
  '/ai-solutions': 'KI-Lösungen',
  '/solutions/consulting': 'Beratung',
  '/applications/role/brand-manager': 'Brand Manager',
  '/applications/role/quality-regulatory': 'Qualität & Regulatory',
  '/applications/role/creative-studio': 'Kreativstudio',
  '/applications/role/procurement-sourcing': 'Einkauf & Beschaffung',
  '/applications/industry/retail': 'Einzelhandel',
  '/applications/industry/health-pharma': 'Gesundheit & Pharma',
  '/applications/industry/food-beverages': 'Lebensmittel & Getränke',
  '/applications/industry/beauty-cosmetics': 'Beauty & Kosmetik',
  '/applications/industry/consumer-goods': 'Konsumgüter',
  '/resources/blogs': 'Blog',
  '/resources/case-studies': 'Fallstudien',
  '/resources/webinars': 'Webinare',
  '/resources/downloads': 'Downloads',
  '/resources/podcast': 'Podcast',
};

export function CtaV2({ labels }: { labels?: QuickLinkLabels }) {
  const { language } = useSiteLanguage();
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
          {QUICK_LINK_GROUPS.map(group => (
            <div key={group.title} className="flex flex-col gap-4">
              <span className="font-bold">
                {language === 'de' ? GERMAN_GROUP_TITLES[group.title] || group.title : group.title}
              </span>
              <div className="flex flex-col gap-3">
                {group.links.map(link => (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    <InlineCmsText
                      value={
                        labels?.[language]?.[link.href] ||
                        (language === 'de' ? GERMAN_LINK_LABELS[link.href] : undefined) ||
                        link.label
                      }
                    />
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
