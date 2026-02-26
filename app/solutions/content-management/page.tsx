import { ClockPlus, RefreshCcw, Share2Icon, ShieldCheck } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getSolution } from '@/lib/cms/solution';
import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import InlineHighlight from '@/components/core/inline-highlight';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/solutions/Hero';
import How from '@/components/page/product/How';
import Why from '@/components/page/solutions/Why';
import Workflow from '@/components/page/product/Workflow';

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

// Fallback Data in case CMS is unavailable
const heroData = {
  brandName: 'content management',
  logoSrc: '/logo.svg',
  logoAlt: '5Flow logo',
  title: 'Content under control',
  subtitle: 'One source of truth for every market and channel',
  description:
    '5Flow’s Content Management solution centralizes product data, claims, translations, and packaging content. No more copy-pasting across spreadsheets or chasing the latest version — just accurate content ready for every artwork, label, and market.',
  buttonText: 'See it in Action',
  buttonLink: '/contact',
  imageSrc: '/solutions/content-management.png',
  imageAlt: 'Content management preview',
  mobileImageSrc: '/solutions/content-management-mobile.png',
};

const howData = [
  {
    heading: 'Content Management',
    title: 'Centralized content hub',
    subtitle: 'One place for every claim and translation',
    description: 'Product data, claims, and text live in a single repository connected to artwork workflows.',
    buttonText: 'Discover the Hub',
    imageSrc: '/solutions/3-1.svg',
    iconName: 'FileText',
  },
  {
    title: 'Structured workflows',
    subtitle: 'Content validated at the source',
    description: 'Approval processes ensure every line of copy is validated before reaching design or production.',
    buttonText: 'Discover Workflows',
    imageSrc: '/solutions/3-2.svg',
    iconName: 'Workflow',
  },
  {
    title: 'Version history',
    subtitle: 'Track every change across markets',
    description: 'Every edit is logged and accessible, giving teams confidence they’re using the latest content.',
    buttonText: 'Discover Version Control',
    imageSrc: '/solutions/3-3.svg',
    iconName: 'SearchCheck',
  },
  {
    title: 'Integration ready',
    subtitle: 'Connect with PIM, DAM, and ERP',
    description: 'Open APIs link content directly into your ecosystem, eliminating manual re-entry.',
    buttonText: 'Discover Integrations',
    imageSrc: '/solutions/3-4.svg',
    iconName: 'Import',
  },
];

const whyData = [
  {
    heading: 'Content Management',
    title: 'Consistent brand voice',
    subtitle: 'Aligned across products and markets',
    description:
      'With one source of truth, brand voice stays clear and consistent globally, no matter the SKU or channel.',
    icon: RefreshCcw,
  },
  {
    title: 'Reduced compliance risk',
    subtitle: 'Always accurate, always validated',
    description: 'Content approvals ensure regulatory accuracy in every market, reducing exposure to costly fines.',
    icon: ShieldCheck,
  },
  {
    title: 'Creative efficiency',
    subtitle: 'Designers focus on design, not copy hunts',
    description:
      'Approved content flows directly into artwork, letting creative teams produce faster with fewer errors.',
    icon: ClockPlus,
  },
  {
    title: 'Operational agility',
    subtitle: 'Handle changes without chaos',
    description:
      'Ingredient updates, new claims, or product launches are rolled out instantly across all packaging and markets.',
    icon: Share2Icon,
  },
];

export default async function ContentManagement() {
  let cms = null as Awaited<ReturnType<typeof getSolution>> | null;
  if (features.enabled) {
    try {
      cms = await getSolution('content-management');
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
          imageSrc: (item as any).imageUrl || (item as any).image_url || `/solutions/3-${idx + 1}.svg`,
          iconName: toPascalCase(((item as any).iconName || (item as any).iconKey || (item as any).icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map((item, i) => ({
          heading: i === 0 ? (item as any).heading || 'Content Management' : undefined,
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
        <PageHeader title="content management" />

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
          <Contact leadingText="Prepared to " highlightedText="start feeling" trailingText=" content?" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
