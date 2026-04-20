import type { Metadata } from 'next';
import { CircleGauge, RefreshCcw, ShieldCheck, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getSolution } from '@/lib/cms/solution';
import { Contact } from '@/components/layout';
import InlineHighlight from '@/components/core/inline-highlight';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/solutions/Hero';
import How from '@/components/page/product/How';
import Why from '@/components/page/solutions/Why';
import Workflow from '@/components/page/product/Workflow';


export const metadata: Metadata = {
  title: 'Centralized Digital Asset Library Software | 5Flow',
  description: 'Organize brand assets with a centralized digital asset library. Improve collaboration and access using 5Flow asset management tools.',
};

// utility
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

// Fallback Data in case CMS is unavailable
const heroData = {
  brandName: 'asset library',
  logoSrc: '/logo.svg',
  logoAlt: '5Flow logo',
  title: 'One library for every asset',
  subtitle: 'Centralize, search, and share with confidence',
  description:
    '5Flow’s Asset Library brings every artwork, cutter guide, logo, and marketing file into one secure, searchable hub. No more Dropbox chaos, email attachments, or outdated files — just the right asset, always ready.',
  buttonText: 'See it in Action',
  buttonLink: '/contact',
  imageSrc: '/solutions/asset-library.png',
  imageAlt: 'Asset library preview',
  mobileImageSrc: '/solutions/asset-library-mobile.png',
};

const howData = [
  {
    heading: 'Asset Library',
    title: 'Centralized repository',
    subtitle: 'Every file in one hub',
    description: 'Logos, artworks, cutter guides, and more stored securely with access controls.',
    buttonText: 'Discover Repository',
    imageSrc: '/solutions/4-1.svg',
    iconName: 'LayoutDashboard',
  },
  {
    title: 'Advanced search',
    subtitle: 'Find assets instantly',
    description: 'Metadata tagging and filters make searching fast and accurate.',
    buttonText: 'Discover Search',
    imageSrc: '/solutions/4-2.svg',
    iconName: 'ScanSearch',
  },
  {
    title: 'Access control',
    subtitle: 'The right file for the right user',
    description: 'Role-based permissions ensure stakeholders only see what they need.',
    buttonText: 'Discover Access Control',
    imageSrc: '/solutions/4-3.svg',
    iconName: 'LockKeyhole',
  },
  {
    title: 'Connected to workflows',
    subtitle: 'Assets always in sync',
    description: 'Linked directly to artwork and content management for accuracy and speed.',
    buttonText: 'Discover Integration',
    imageSrc: '/solutions/4-4.svg',
    iconName: 'Route',
  },
];

const whyData = [
  {
    heading: 'Asset Library',
    title: 'Brand consistency',
    subtitle: 'The right asset every time',
    description: 'One central library ensures teams and suppliers always use approved assets.',
    icon: RefreshCcw,
  },
  {
    title: 'Productivity boost',
    subtitle: 'Less searching, more doing',
    description: 'Teams save hours by finding assets instantly, freeing time for high-value work.',
    icon: Zap,
  },
  {
    title: 'Supply chain efficiency',
    subtitle: 'Faster collaboration with partners',
    description: 'Suppliers and printers access validated files directly, cutting delays and rework.',
    icon: CircleGauge,
  },
  {
    title: 'Risk reduction',
    subtitle: 'Eliminate errors from outdated files',
    description: 'Always-on version control ensures outdated or unapproved assets never reach production.',
    icon: ShieldCheck,
  },
];

export default async function AssetLibrary() {
  let cms = null as Awaited<ReturnType<typeof getSolution>> | null;
  if (features.enabled) {
    try {
      cms = await getSolution('asset-library');
    } catch {}
  }

  const heroProps = {
    ...heroData,
    title: cms?.hero?.title || heroData.title,
    subtitle: cms?.hero?.subtitle || heroData.subtitle,
    description: cms?.hero?.bodyHtml || heroData.description,
    buttonText: cms?.hero?.ctaText,
    imageSrc: cms?.hero?.imageUrl || heroData.imageSrc,
    mobileImageSrc: cms?.hero?.mobileImageUrl || heroData.mobileImageSrc,
  };

  const howDataFinal = (
    cms?.how?.items?.length
      ? cms!.how!.items.map((item, idx) => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || (item as any).body_html || (item as any).description || '',
          buttonText: 'Book A Demo',
          buttonLink: (item as any).linkUrl || (item as any).link_url || undefined,
          imageSrc: (item as any).imageUrl || (item as any).image_url || `/solutions/4-${idx + 1}.svg`,
          iconName: toPascalCase(((item as any).iconName || (item as any).iconKey || (item as any).icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map((item, i) => ({
          heading: i === 0 ? (item as any).heading || 'Asset Library' : undefined,
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || (item as any).body_html || (item as any).description || '',
          icon: resolveIconComponent((item as any).iconKey || (item as any).icon_key) || ShieldCheck,
        }))
      : whyData
  ) as typeof whyData;

  const workflowStatsFinal = cms?.workflow?.stats?.length
    ? cms.workflow.stats
    : [
        { label: 'leading global brands', value: '130+' },
        { label: 'projects annually', value: '2M+' },
        { label: 'unique users', value: '140K' },
      ];
  const workflowSubtitleFinal = cms?.workflow?.subtitle || 'Numbers that matter';

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="asset library" />

        <div className="flex flex-col gap-32">
          <Hero {...heroProps} />
          <How howData={howDataFinal as any} />
          <Why whyData={whyDataFinal as any} />
          <Workflow
            title={
              <>
                Trusted by <InlineHighlight>global leaders</InlineHighlight>
              </>
            }
            subtitle={workflowSubtitleFinal}
            statsData={workflowStatsFinal}
          />
          <Contact leadingText="Time to turn your packaging liabilities into " highlightedText="assets" />
        </div>
      </div>
    </div>
  );
}


