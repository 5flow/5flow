import {
  ShieldCheck,
  History,
  Languages,
  ClockAlert,
  MapPinPlus,
  EyeOff,
  CircleCheckBig,
  Files,
  CircleGauge,
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
  title: 'Packaging control for complex product lines',
  subtitle: 'Built for consumer goods brands managing scale and variety',
  description:
    'Consumer goods brands deal with endless SKUs, multi-part packaging, and global supply chains. 5Flow keeps packaging accurate, workflows connected, and launches on schedule — no matter the scale.',
  imageSrc: '/applications/industries/fmcg.jpg',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/applications/industries/fmcg-mobile.jpg',
};

const challengeItems = [
  {
    id: 'multi-part-packaging',
    title: 'Multi-part packaging stalls launches',
    desc: 'Leaflet approved, label delayed, carton missing updates',
    sub: '5Flow links every component in one workflow so labels, cartons, and inserts move forward together.',
    icon: History,
    buttonText: 'See How 5Flow Helps Consumer Goods Brands',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'language-heavy-packs',
    title: 'Copy-heavy packs drive reprints',
    desc: 'Multilingual detergent or appliance packs rarely pass error-free',
    sub: 'Centralized translation and version control ensure approved text flows into every SKU variant without manual copy-paste errors.',
    icon: Languages,
    buttonText: 'See How 5Flow Helps Consumer Goods Brands',
    buttonLink: '/solutions/content-management',
  },
  {
    id: 'regional-promo-packs',
    title: 'Regional promo packs overwhelm sourcing',
    desc: 'Holiday or event packaging fragments supplier timelines',
    sub: 'Automated workflows align suppliers and vendors on promo pack assets, cutting delays and misprints.',
    icon: ClockAlert,
    buttonText: 'See How 5Flow Helps Consumer Goods Brands',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'global-sku-compliance',
    title: 'Global SKUs lack local compliance',
    desc: 'Same product, different labeling rules by region',
    sub: 'Market-specific workflows adapt global packs to local labeling requirements while preserving brand consistency.',
    icon: MapPinPlus,
    buttonText: 'See How 5Flow Helps Consumer Goods Brands',
    buttonLink: '/solutions/automated-artwork',
  },
  {
    id: 'zero-visibility',
    title: 'Zero visibility into bottlenecks',
    desc: 'One late component delays the entire launch',
    sub: 'Dashboards give real-time status on every carton, leaflet, and label, so managers can unblock projects early.',
    icon: EyeOff,
    buttonText: 'See How 5Flow Helps Consumer Goods Brands',
    buttonLink: '/solutions/artwork-management',
  },
];

const howData = [
  {
    heading: 'Consumer Goods Brands',
    title: 'Launch multi-component packs on time by connecting cartons, leaflets, and inserts in one workflow.',
    description: 'Streamline seasonal and promotional packs with automated supplier workflows.',
    iconName: 'Workflow',
    imageSrc: '/applications/5-1.svg',
    buttonText: 'Discover Artwork Management',
    buttonLink: '/solutions/artwork-management',
  },
  {
    title: 'Monitor every component’s progress with real-time dashboards.',
    description: 'Manage multilingual packaging with centralized translation libraries.',
    iconName: 'ChartArea',
    imageSrc: '/applications/5-2.svg',
    buttonText: 'Discover Content Management',
    buttonLink: '/solutions/content-management',
  },
  {
    title: 'Adapt global SKUs to local regulatory requirements without rework.',
    description: 'Reduce reprints by ensuring suppliers only access validated content.',
    iconName: 'MapPinCheckInside',
    imageSrc: '/applications/5-3.svg',
    buttonText: 'Discover Content Management',
    buttonLink: '/solutions/content-management',
  },
];

const benefitItems = [
  {
    id: 'launch-reliability',
    title: 'Launch reliability',
    desc: 'No delays, no last-minute surprises',
    sub: 'With every packaging component linked and tracked, launches run predictably, protecting revenue and shelf commitments.',
    icon: CircleCheckBig,
  },
  {
    id: 'portfolio-scalability',
    title: 'Portfolio scalability',
    desc: 'Growth without losing control',
    sub: 'Whether it’s 50 SKUs or 5,000, 5Flow scales with your product portfolio and keeps complexity in check.',
    icon: Files,
  },
  {
    id: 'supply-chain-trust',
    title: 'Supply chain trust',
    desc: 'Vendors and partners always aligned',
    sub: 'Direct supplier access to validated files builds trust, reduces disputes, and keeps global vendors in sync.',
    icon: ShieldCheck,
  },
  {
    id: 'sustainable-efficiency',
    title: 'Sustainable efficiency',
    desc: 'Less rework, less waste',
    sub: 'By reducing misprints and reprints, 5Flow saves costs while also helping meet sustainability targets.',
    icon: CircleGauge,
  },
];

export default async function ConsumerGoods() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('consumer-goods');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || History,
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
          imageSrc: (it as any).imageUrl || (it as any).image_url || `/applications/5-${idx + 1}.svg`,
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
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || CircleCheckBig,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="consumer goods" />

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
          <Benefits items={benefitItemsFinal} highlightedText={cms?.benefits?.highlightedText || 'Consumer Goods'} />
          <Contact leadingText="The " highlightedText="Best Software" trailingText=" For Consumer Goods Brands" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
