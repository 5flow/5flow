import type { Metadata } from 'next';
import { Eye, Lightbulb, Scaling, WorkflowIcon } from 'lucide-react';
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
  title: 'Advanced Workflow Integration Platform | 5Flow',
  description: 'Connect packaging workflows, asset systems and approval tools seamlessly using 5Flow workflow integration solutions.',
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
  brandName: 'integration',
  logoSrc: '/logo.svg',
  logoAlt: '5Flow logo',
  title: 'Connected workflows, less copy and paste',
  subtitle: 'Integration that keeps your business in flow.',
  description:
    '5Flow’s Integration solution connects your PIM, DAM, ERP, and design tools into one unified workflow. No more copy-pasting, duplicate files, or disconnected systems. Just data flowing smoothly across your ecosystem.',
  buttonText: 'See it in Action',
  buttonLink: '/contact',
  imageSrc: '/solutions/integration.png',
  imageAlt: 'Integration preview',
  mobileImageSrc: '/solutions/integration-mobile.png',
};

const howData = [
  {
    heading: 'Integration',
    title: 'Open APIs',
    subtitle: 'Easy connection to any system',
    description: 'Flexible APIs connect 5Flow to PIM, DAM, ERP, and creative tools with minimal effort.',
    buttonText: 'Discover APIs',
    imageSrc: '/solutions/6-1.svg',
    iconName: 'ScreenShare',
  },
  {
    title: 'Real-time sync',
    subtitle: 'Data flows instantly',
    description: 'Updates push across systems automatically, ensuring everyone works with the latest information.',
    buttonText: 'Discover Sync',
    imageSrc: '/solutions/6-2.svg',
    iconName: 'RefreshCcw',
  },
  {
    title: 'Scalable architecture',
    subtitle: 'Built to handle complexity',
    description: 'Integration scales from a few systems to enterprise-wide ecosystems across global teams.',
    buttonText: 'Discover Scalability',
    imageSrc: '/solutions/6-3.svg',
    iconName: 'Scaling',
  },
  {
    title: 'Secure connections',
    subtitle: 'Protected. Compliant. End-to-end.',
    description: 'Enterprise-grade security ensures integrations are safe, compliant, and reliable.',
    buttonText: 'Discover Security',
    imageSrc: '/solutions/6-4.svg',
    iconName: 'ShieldCheck',
  },
];

const whyData = [
  {
    heading: 'Integration',
    title: 'Ecosystem efficiency',
    subtitle: 'Every tool working together',
    description: 'Seamless integrations keep workflows moving without manual intervention.',
    icon: WorkflowIcon,
  },
  {
    title: 'Reduced manual work',
    subtitle: 'Less copy-pasting, fewer errors',
    description: 'Automated data flow eliminates human error and saves hours of repetitive effort.',
    icon: Lightbulb,
  },
  {
    title: 'Greater visibility',
    subtitle: 'One view across systems',
    description: 'Connected systems give managers a clear picture of project status and risks.',
    icon: Eye,
  },
  {
    title: 'Flexibility at scale',
    subtitle: 'Adapt to any tech landscape',
    description: 'Open architecture means integration works with your current tools, not against them.',
    icon: Scaling,
  },
];

export default async function Integration() {
  let cms = null as Awaited<ReturnType<typeof getSolution>> | null;
  if (features.enabled) {
    try {
      cms = await getSolution('integration');
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
          imageSrc: (item as any).imageUrl || (item as any).image_url || `/solutions/6-${idx + 1}.svg`,
          iconName: toPascalCase(((item as any).iconName || (item as any).iconKey || (item as any).icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map((item, i) => ({
          heading: i === 0 ? (item as any).heading || 'Integration' : undefined,
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || (item as any).body_html || (item as any).description || '',
          icon: resolveIconComponent((item as any).iconKey || (item as any).icon_key) || WorkflowIcon,
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
        <PageHeader title="integration" />

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
          <Contact leadingText="Ready to connect your " highlightedText="artwork systems?" />
        </div>
      </div>
    </div>
  );
}


