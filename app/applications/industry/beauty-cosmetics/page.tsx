import {
  Grid2X2,
  LayoutDashboard,
  GlobeLock,
  History,
  MessageCircleQuestionMark,
  RefreshCcw,
  Rocket,
  Star,
  Scaling,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getApplication } from '@/lib/cms/application';
import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/applications/Hero';
import Challenges from '@/components/page/applications/Challenges';
import Benefits from '@/components/page/applications/Benefits';
import How from '@/components/page/applications/How';

// Utility
function toPascalCase(input: string) {
  return input
    .split(/[-_\s]+/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function resolveIconComponent(iconKey?: string) {
  if (!iconKey) return null;
  const name = toPascalCase(iconKey);
  const Icon = (LucideIcons as any)[name] as React.ElementType | undefined;
  return Icon || null;
}

// Fallback data in case CMS is unavailable
const heroFallback = {
  title: 'Beauty packaging without the chaos',
  subtitle: 'Built for brands managing endless variants and shade launches',
  description:
    'In beauty, packaging complexity grows fast. New shades, finish updates, local claims, and regional rules. 5Flow helps cosmetics brands manage rapid product cycles with workflows that protect consistency, speed up launches, and keep every claim compliant.',
  imageSrc: '/applications/industries/beauty.png',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/applications/industries/beauty-mobile.png',
};

const challengeItems = [
  {
    id: 'high-sku-velocity',
    title: 'High SKU velocity',
    desc: 'Deadlines missed for seasonal launches',
    sub: 'Automated approvals and real-time dashboards keep new launches and promos shelf-ready on time.',
    icon: History,
    buttonText: 'See How 5Flow Helps Beauty Brands',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'shade-finish-launches',
    title: 'Variants overwhelm workflows',
    desc: 'Multiple variants lead to lower quality',
    sub: '5Flow automates variant artwork creation so new shades and finishes roll out consistently across packaging lines.',
    icon: LayoutDashboard,
    buttonText: 'See How 5Flow Helps Beauty Brands',
    buttonLink: '/solutions/automated-artwork',
  },
  {
    id: 'inconsistent-claims',
    title: 'Inconsistent claims',
    desc: 'Marketing and packaging out of sync',
    sub: 'Centralized content hubs keep approved claims aligned across regions, SKUs, and campaigns.',
    icon: Grid2X2,
    buttonText: 'See How 5Flow Helps Beauty Brands',
    buttonLink: '/solutions/content-management',
  },
  {
    id: 'fragmented-collaboration',
    title: 'Fragmented collaboration',
    desc: 'Teams and suppliers working in silos',
    sub: 'Integrated workflows connect brand, design, regulatory, and suppliers in one traceable system.',
    icon: MessageCircleQuestionMark,
    buttonText: 'See How 5Flow Helps Beauty Brands',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'regional-labeling',
    title: 'Regional labeling rules',
    desc: 'One product, many standards',
    sub: 'Multi-language workflows adapt labels for each region while preserving brand consistency.',
    icon: GlobeLock,
    buttonText: 'See How 5Flow Helps Beauty Brands',
    buttonLink: '/solutions/content-management',
  },
];

const howData = [
  {
    title: 'Roll out shade and finish variants with automated artwork generation.',
    description: 'Adapt labels for multi-language and region-specific regulations.',
    iconName: 'Files',
    imageSrc: '/applications/4-1.svg',
    buttonText: 'Discover Automated Artwork',
    buttonLink: '/solutions/automated-artwork',
  },
  {
    title: 'Reduce errors and reprints with centralized asset libraries.',
    description: 'Keep packaging and marketing claims consistent across SKUs.',
    iconName: 'Images',
    imageSrc: '/applications/4-2.svg',
    buttonText: 'Discover Asset Library',
    buttonLink: '/solutions/asset-library',
  },
  {
    title: 'Manage seasonal launches with automated workflows and dashboards.',
    description: 'Collaborate seamlessly with design, regulatory, and suppliers.',
    iconName: 'Workflow',
    imageSrc: '/applications/4-3.svg',
    buttonText: 'Discover Artwork Management',
    buttonLink: '/solutions/artwork-management',
  },
];

const benefitItems = [
  {
    id: 'consistency-variants',
    title: 'Consistency across variants',
    desc: 'Shades and finishes stay on brand',
    sub: 'Automation ensures brand identity is protected across thousands of variants.',
    icon: RefreshCcw,
  },
  {
    id: 'faster-launches',
    title: 'Faster launches',
    desc: 'Keep pace with beauty trends',
    sub: 'Automated workflows and dashboards cut delays, keeping seasonal launches and new collections on track.',
    icon: Rocket,
  },
  {
    id: 'stronger-brand-trust',
    title: 'Stronger brand trust',
    desc: 'Claims accurate in every region',
    sub: 'Centralized content guarantees compliance and consistency for consumers worldwide.',
    icon: Star,
  },
  {
    id: 'scalable-operations',
    title: 'Scalable operations',
    desc: 'Handle growth without added chaos',
    sub: 'From a few products to thousands of SKUs, 5Flow scales as your beauty brand expands globally.',
    icon: Scaling,
  },
];

export default async function BeautyCosmetics() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('beauty-cosmetics');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || LayoutDashboard,
          buttonText: 'Learn More',
          buttonLink: (it as any).linkUrl || (it as any).link_url || undefined,
        }))
      : challengeItems
  ) as typeof challengeItems;

  const howDataFinal = (
    cms?.how?.items?.length
      ? cms.how.items.map((it, idx) => ({
          title: it.title || '',
          description: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          iconName: toPascalCase(((it as any).iconName || (it as any).iconKey || (it as any).icon_key || 'BadgeCheck') as string),
          imageSrc: (it as any).imageUrl || (it as any).image_url || `/applications/4-${idx + 1}.svg`,
          buttonText: 'Learn More',
          buttonLink: (it as any).linkUrl || (it as any).link_url || undefined,
        }))
      : howData
  ) as typeof howData;

  const benefitItemsFinal = (
    cms?.benefits?.items?.length
      ? cms.benefits.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || RefreshCcw,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="beauty cosmetics" />

        <div className="flex flex-col gap-10 md:gap-32">
          {(() => {
            const heroProps = {
              title: cms?.hero?.title || heroFallback.title,
              subtitle: cms?.hero?.subtitle || heroFallback.subtitle,
              description: cms?.hero?.bodyHtml || heroFallback.description,
              ctaText: cms?.hero?.ctaText || (heroFallback as any)?.ctaText,
              imageSrc: cms?.hero?.imageUrl || heroFallback.imageSrc,
              mobileImageSrc: cms?.hero?.mobileImageUrl || heroFallback.mobileImageSrc,
              imageAlt: cms?.hero?.imageAlt || heroFallback.imageAlt || '',
            };
            return <Hero {...heroProps} />;
          })()}
          <Challenges items={challengeItemsFinal} />
          <How howData={howDataFinal} />
          <Benefits
            items={benefitItemsFinal}
            highlightedText={cms?.benefits?.highlightedText || 'Beauty & Cosmetics'}
          />
          <Contact leadingText="The " highlightedText="Best Software" trailingText=" For Beauty & Cosmetics Brands" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
