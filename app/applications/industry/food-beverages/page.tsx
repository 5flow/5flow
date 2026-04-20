import type { Metadata } from 'next';
import {
  ShieldCheck,
  ListRestart,
  ShieldAlert,
  CircleCheckBig,
  GlobeLock,
  History,
  ShieldUser,
  ClockPlus,
  RefreshCcw,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getApplication } from '@/lib/cms/application';
import { Contact } from '@/components/layout';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/applications/Hero';
import Challenges from '@/components/page/applications/Challenges';
import Benefits from '@/components/page/applications/Benefits';
import How from '@/components/page/applications/How';


export const metadata: Metadata = {
  title: 'Food Packaging Artwork Workflow Software | 5Flow',
  description: 'Ensure food labeling compliance and packaging accuracy with automated artwork workflow software built for F&B brands.',
};

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
  title: 'Packaging that keeps pace with change',
  subtitle: 'Built for the fast-moving food and beverage industry',
  description:
    'In F&B, packaging changes never stop. From recipe updates to allergen disclosures to sustainability claims, 5Flow keeps every update accurate, traceable, and ready for market. That means, your products stay compliant and your launches stay on time.',
  imageSrc: '/applications/industries/beverages.jpg',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/applications/industries/beverages-mobile.jpg',
};

const challengeItems = [
  {
    id: 'constant-reformulations',
    title: 'Constant recipe reformulations',
    desc: 'Packaging can’t keep up',
    sub: '5Flow centralizes ingredient data and pushes updates into artwork automatically, keeping labels accurate.',
    icon: ListRestart,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/content-management',
  },
  {
    id: 'allergen-nutrition-risks',
    title: 'Allergen and nutritional labeling risks',
    desc: 'Small errors create big recalls',
    sub: 'Automated validation rules check allergen and nutrition panels to prevent mislabeling.',
    icon: ShieldAlert,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'sustainability-claims',
    title: 'Sustainability and \ncompliance claims',
    desc: 'Green messaging often inconsistent',
    sub: 'Content hubs manage sustainability claims and certifications, ensuring consistent and compliant messaging.',
    icon: CircleCheckBig,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/content-management',
  },
  {
    id: 'regional-regulations',
    title: 'Regional packaging regulations',
    desc: 'One product, multiple standards',
    sub: 'Multi-language and regional workflows adapt packaging for each market without losing control.',
    icon: GlobeLock,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/content-management',
  },
  {
    id: 'slow-approvals',
    title: 'Slow approvals delay launches',
    desc: 'Campaigns miss their shelf window',
    sub: 'Automated workflows streamline approvals across marketing, regulatory, and suppliers, cutting delays.',
    icon: History,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/artwork-management',
  },
];

const howData = [
  {
    heading: 'F&B',
    title: 'Keep ingredient and allergen labeling accurate with automated updates.',
    description: 'Manage sustainability claims consistently across SKUs.',
    iconName: 'RotateCcwSquare',
    imageSrc: '/applications/3-1.svg',
    buttonText: 'Discover Content Management',
    buttonLink: '/solutions/content-management',
  },
  {
    title: 'Speed up reformulation launches with automated workflows.',
    description: 'Validate nutrition panels and prevent costly misprints.',
    iconName: 'Rocket',
    imageSrc: '/applications/3-2.svg',
    buttonText: 'Discover Artwork Management',
    buttonLink: '/solutions/artwork-management',
  },
  {
    title: 'Adapt packaging for regional regulations and multi-language markets.',
    description: 'Maintain full traceability for audits and recalls.',
    iconName: 'Languages',
    imageSrc: '/applications/3-3.svg',
    buttonText: 'Discover Content Management',
    buttonLink: '/solutions/content-management',
  },
];

const benefitItems = [
  {
    id: 'consumer-safety',
    title: 'Consumer safety',
    desc: 'Labels you can trust',
    sub: 'Automated validation and version control ensure allergen and nutritional information is always accurate.',
    icon: ShieldUser,
  },
  {
    id: 'faster-reformulations',
    title: 'Faster reformulation rollouts',
    desc: 'Updates hit shelves on time',
    sub: 'Ingredient changes flow directly into packaging, cutting delays in product relaunches.',
    icon: ClockPlus,
  },
  {
    id: 'consistent-sustainability',
    title: 'Consistent sustainability claims',
    desc: 'Build consumer trust',
    sub: 'Centralized content keeps packaging claims clear, compliant, and aligned across markets.',
    icon: RefreshCcw,
  },
  {
    id: 'regulatory-confidence',
    title: 'Regulatory confidence',
    desc: 'Compliance built into packaging',
    sub: 'From allergen labeling to local regulations, workflows ensure every SKU is audit ready.',
    icon: ShieldCheck,
  },
];

export default async function FoodBeverages() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('food-beverages');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || ListRestart,
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
          imageSrc: (it as any).imageUrl || (it as any).image_url || `/applications/3-${idx + 1}.svg`,
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
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || ShieldUser,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="food beverages" />

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
          <Benefits items={benefitItemsFinal} highlightedText={cms?.benefits?.highlightedText || 'Food & Beverages'} />
          <Contact leadingText="The " highlightedText="Best Software" trailingText=" For Food & Beverage Brands" />
        </div>
      </div>
    </div>
  );
}


