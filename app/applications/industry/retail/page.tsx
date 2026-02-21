import { Files, History, FileStack, LaptopMinimalCheck, EyeOff, RotateCw, Share2 } from 'lucide-react';
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
  title: 'Retail moves fast. Keep your brand ahead.',
  subtitle: 'Tools built for retailers dealing with high SKU velocity and seasonal pressure',
  description:
    'Retailers juggle thousands of SKUs, constant refreshes, and time-sensitive promotions. 5Flow helps you simplify workflows, reduce delays, and keep every campaign on shelf, on time, and on brand.',
  imageSrc: '/applications/industries/retail.jpg',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/applications/industries/retail-mobile.jpg',
  ctaText: 'See What’s Possible',
};

const challengeItems = [
  {
    id: 'sku-refresh-overload',
    title: 'SKU refresh overload',
    desc: 'Too much volume, no control',
    sub: '5Flow centralizes artwork and content so retailers can manage SKU refreshes at scale without losing consistency.',
    icon: Files,
    buttonText: 'See How 5Flow Helps Retail',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'seasonal-promos-slip',
    title: 'Seasonal promos slip',
    desc: 'Campaigns miss the shelf date',
    sub: 'Automated workflows move approvals faster and give teams full visibility into promo deadlines.',
    icon: History,
    buttonText: 'See How 5Flow Helps Retail',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'private-label-growth',
    title: 'Private-label packaging growth',
    desc: 'More complexity, tighter timelines',
    sub: 'Dedicated workflows manage private-label artwork alongside branded products without confusion.',
    icon: FileStack,
    buttonText: 'See How 5Flow Helps Retail',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'fragmented-suppliers',
    title: 'Fragmented supplier collaboration',
    desc: 'Errors multiply across vendors',
    sub: 'Suppliers access validated assets directly from 5Flow, cutting misprints and delays.',
    icon: LaptopMinimalCheck,
    buttonText: 'See How 5Flow Helps Retail',
    buttonLink: '/solutions/asset-library',
  },
  {
    id: 'lack-of-visibility',
    title: 'Lack of visibility',
    desc: 'Retailers can’t see where campaigns stall',
    sub: 'Dashboards and analytics show bottlenecks in real time, helping managers act before deadlines slip.',
    icon: EyeOff,
    buttonText: 'See How 5Flow Helps Retail',
    buttonLink: '/solutions/data-analysis',
  },
];

const howData = [
  {
    title: 'Minimize SKU refresh chaos with automated workflows.',
    description: 'Keep promotions on schedule using centralized timelines.',
    imageSrc: '/applications/1.svg',
    iconName: 'Workflow',
    buttonLink: '/solutions/artwork-management',
    buttonText: 'Discover Artwork Management',
  },
  {
    title: 'Ensure brand consistency with one secure asset library.',
    description: 'Capture approvals with online annotations and version control.',
    imageSrc: '/applications/2.svg',
    iconName: 'RefreshCcw',
    buttonLink: '/solutions/asset-library',
    buttonText: 'Discover Asset Library',
  },
  {
    title: 'Cut manual work by integrating with PIM and ERP systems.',
    description: 'Gain visibility with real-time dashboards and alerts.',
    imageSrc: '/applications/3.svg',
    iconName: 'MonitorCog',
    buttonLink: '/solutions/integration',
    buttonText: 'Discover Integration',
  },
];

const benefitItems = [
  {
    id: 'on-shelf-availability',
    title: 'On-shelf availability',
    desc: 'Campaigns hit stores on schedule',
    sub: 'Automated workflows keep promos and seasonal launches shelf-ready without delays.',
    icon: History,
  },
  {
    id: 'brand-consistency',
    title: 'Brand consistency',
    desc: 'Every SKU on message',
    sub: 'Centralized content and assets keep promotions aligned across channels and regions.',
    icon: RotateCw,
  },
  {
    id: 'scalable-operations',
    title: 'Scalable operations',
    desc: 'Handle thousands of SKUs with clarity',
    sub: '5Flow scales with retail complexity, managing massive SKU volumes without added overhead.',
    icon: Files,
  },
  {
    id: 'operational-agility',
    title: 'Operational agility',
    desc: 'Adapt to market shifts quickly',
    sub: 'Real-time visibility into workflows helps retailers pivot faster to seasonal and competitive demands.',
    icon: Share2,
  },
];

export default async function Retail() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('retail');
    } catch {}
  }

  const heroProps = {
    title: cms?.hero?.title || heroFallback.title,
    subtitle: cms?.hero?.subtitle || heroFallback.subtitle,
    description: cms?.hero?.bodyHtml || heroFallback.description,
    imageSrc: cms?.hero?.imageUrl || heroFallback.imageSrc,
    mobileImageSrc: cms?.hero?.mobileImageUrl || heroFallback.mobileImageSrc,
    imageAlt: cms?.hero?.imageAlt || heroFallback.imageAlt || '',
    ctaText: cms?.hero?.ctaText || heroFallback.ctaText || 'Learn More',
  };

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon:
            resolveIconComponent((it as any).iconKey || (it as any).icon_key) ||
            [Files, FileStack, LaptopMinimalCheck, EyeOff, History][i % 5],
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
          imageSrc: (it as any).imageUrl || (it as any).image_url || `/applications/${idx + 1}.svg`,
          iconName: toPascalCase(((it as any).iconName || (it as any).iconKey || (it as any).icon_key || 'BadgeCheck') as string),
          buttonLink: (it as any).linkUrl || (it as any).link_url || undefined,
          buttonText: 'Learn More',
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
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || History,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="retail" />

        <div className="flex flex-col gap-10 md:gap-32">
          <Hero {...heroProps} />
          <Challenges items={challengeItemsFinal} />
          <How howData={howDataFinal} />
          <Benefits items={benefitItemsFinal} highlightedText={cms?.benefits?.highlightedText || 'Retail'} />
          <Contact leadingText="The " highlightedText="Leading Workflow Platform" trailingText=" For Retailers" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
