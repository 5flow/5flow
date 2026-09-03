import { CircleDollarSign, Rocket, Scaling, ShieldCheck } from 'lucide-react';
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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artwork Management & Compliance Software | 5Flow',
  description: 'Centralize artwork workflows and ensure packaging compliance using 5Flow artwork management software designed for regulated industries.',
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

// Fallback Data in case CMS is unavailable
const heroData = {
  title: 'Artwork management without the chaos',
  subtitle: 'Centralize, streamline, and simplify every artwork project',
  description:
    'Our Artwork Management ensures that brands, retailers, and producers finally get one source of truth. No more version hunts, long email threads, or missed deadlines. Just a clear, connected workflow that keeps projects accurate and on time.',
  imageSrc: '/solutions/artwork-management.png',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/solutions/artwork-management-mobile.png',
};

const howData = [
  {
    heading: 'Artwork Management',
    title: 'Centralized platform',
    subtitle: 'One hub for every file',
    description:
      'Artwork files, cutter guides, and declarations all live in one place. No more scattered assets across teams.',
    buttonText: 'Discover Centralization',
    imageSrc: '/solutions/1.svg',
    iconName: 'MonitorCog',
  },
  {
    title: 'Automated workflows',
    subtitle: 'Work moves without bottlenecks',
    description: 'Approvals, reviews, and updates route automatically to the right person, keeping projects on track.',
    icon: '/solutions/rectangle.png',
    buttonText: 'Discover Automation',
    imageSrc: '/solutions/2.svg',
    iconName: 'Workflow',
  },
  {
    title: 'Clear Briefs',
    subtitle: 'Intelligence begins with a clear brief.',
    description: 'Start projects with clear information from the beginning, aligned to your personal preferences',
    icon: '/solutions/rectangle.png',
    buttonText: 'Discover Clear Briefs',
    imageSrc: '/solutions/3.svg',
    iconName: 'SearchCheck',
  },
  {
    title: 'Dashboards',
    subtitle: 'Your project. All in one view.',
    description:
      'See all of your activity at once. Our customized widgets allow you to view on-going projects, tasks and deadlines with direct access to hot projects, files pending approval, and more.',
    icon: '/solutions/rectangle.png',
    buttonText: 'Discover Dashboards',
    imageSrc: '/solutions/4.svg',
    iconName: 'MessageSquarePlus',
  },
];

const whyData = [
  {
    heading: 'Artwork Management',
    title: 'Faster launches',
    subtitle: 'Products reach shelves on time',
    description:
      'Automated workflows and clear approvals cut cycle time, helping brands stay ahead in fast-moving markets.',
    icon: Rocket,
  },
  {
    title: 'Lower costs',
    subtitle: 'Less waste, fewer errors',
    description: 'Accurate artwork reduces reprints, saves money, and improves supplier efficiency.',
    icon: CircleDollarSign,
  },
  {
    title: 'Stronger compliance',
    subtitle: 'Built-in audit readiness',
    description: 'Track every update and approval for audit-ready records that protect against compliance risks.',
    icon: ShieldCheck,
  },
  {
    title: 'Scale with clarity',
    subtitle: 'Manage thousands of artworks easily',
    description: 'From ten SKUs to ten thousand, the system scales with your business without adding complexity.',
    icon: Scaling,
  },
];

export async function ArtworkManagementPage({ cmsSlug = 'artwork-management' }: { cmsSlug?: string } = {}) {
  let cms = null as Awaited<ReturnType<typeof getSolution>> | null;
  if (features.enabled) {
    try {
      cms = await getSolution(cmsSlug);
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
          description: item.bodyHtml || item.body_html || item.description || '',
          buttonText: 'Book A Demo',
          buttonLink: item.linkUrl || item.link_url || undefined,
          imageSrc: item.imageUrl || item.image_url || `/solutions/${idx + 1}.svg`,
          iconName: toPascalCase((item.iconName || item.iconKey || item.icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map((item, i) => ({
          heading: i === 0 ? item.heading || 'Artwork Management' : undefined,
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || item.body_html || item.description || '',
          icon: resolveIconComponent(item.iconKey || item.icon_key) || ShieldCheck,
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
  const workflowSubtitleFinal = cms?.workflow?.subtitle || '';

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="artwork management" />

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
          <Contact leadingText="Ready to " highlightedText="simplify" trailingText=" artwork management?" />
        </div>
      </div>
    </div>
  );
}

export default async function ArtworkManagement() {
  return <ArtworkManagementPage />;
}


