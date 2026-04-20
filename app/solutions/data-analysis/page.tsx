import type { Metadata } from 'next';
import { AlarmClockCheck, Lightbulb, RefreshCcwDot, Settings } from 'lucide-react';
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
  title: 'Artwork Approval Analytics & Reporting | 5Flow',
  description: 'Gain insights with artwork approval analytics and real time reporting tools to optimize packaging workflows and compliance.',
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
  title: 'From Data to Direction',
  subtitle: 'Turn data into insight you can act on',
  description:
    'With Evaluate, transform raw data into real-time intelligence. Track every task, predict approval bottlenecks, and visualize performance through customizable dashboards—empowering faster decisions and ongoing process optimization driven with AI.',
  imageSrc: '/solutions/data-analysis.png',
  imageAlt: 'Data analysis preview',
  mobileImageSrc: '/solutions/data-analysis-mobile.png',
};

const howData = [
  {
    heading: 'Data Analysis',
    title: 'Real-time monitoring',
    subtitle: 'See progress as it happens',
    description:
      'Track every workflow and task in real time with dashboards that visualize project health and timelines.',
    buttonText: 'Discover Monitoring',
    imageSrc: '/solutions/7-1.svg',
    iconName: 'View',
  },
  {
    title: 'Predictive analytics',
    subtitle: 'Anticipate risks before they occur',
    description:
      'AI-driven algorithms identify patterns that indicate delays or approval loops, helping teams prevent them.',
    icon: '/solutions/rectangle.png',
    buttonText: 'Discover Analytics',
    imageSrc: '/solutions/7-2.svg',
    iconName: 'ChartNoAxesCombined',
  },
  {
    title: 'Custom dashboards',
    subtitle: 'Metrics that matter to your role',
    description:
      'Design dashboards for brand, regulatory, or design teams, so everyone sees what’s most relevant to them.',
    icon: '/solutions/rectangle.png',
    buttonText: 'Discover Dashboards',
    imageSrc: '/solutions/7-3.svg',
    iconName: 'LayoutDashboard',
  },
  {
    title: 'Continuous improvement',
    subtitle: 'Learn from every project',
    description: 'Analyze performance over time to identify improvement opportunities and benchmark progress.',
    icon: '/solutions/rectangle.png',
    buttonText: 'Discover Opportunities',
    imageSrc: '/solutions/7-4.svg',
    iconName: 'TrendingUp',
  },
];

const whyData = [
  {
    heading: 'Data Analysis',
    title: 'Visibility that drives control',
    subtitle: 'Always know where projects stand',
    description: 'Data clarity lets teams act fast, manage timelines, and prevent bottlenecks before they snowball.',
    icon: Settings,
  },
  {
    title: 'Smarter decision-making',
    subtitle: 'Strategy built on real performance data',
    description:
      'Turn raw workflow data into insight that helps teams plan resources and allocate time more effectively.',
    icon: Lightbulb,
  },
  {
    title: 'No late-stage panic',
    subtitle: 'Act before risks become problems',
    description: 'Improve launch-readiness by flagging issues before they cause chaos',
    icon: AlarmClockCheck,
  },
  {
    title: 'Continuous optimization',
    subtitle: 'Every project gets better',
    description: 'Refine workflows and build sustainable efficiency.',
    icon: RefreshCcwDot,
  },
];

export default async function DataAnalysis() {
  let cms = null as Awaited<ReturnType<typeof getSolution>> | null;
  if (features.enabled) {
    try {
      cms = await getSolution('data-analysis');
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
          imageSrc: (item as any).imageUrl || (item as any).image_url || `/solutions/7-${idx + 1}.svg`,
          iconName: toPascalCase(((item as any).iconName || (item as any).iconKey || (item as any).icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map((item, i) => ({
          heading: i === 0 ? (item as any).heading || 'Data Analysis' : undefined,
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || (item as any).body_html || (item as any).description || '',
          icon: resolveIconComponent((item as any).iconKey || (item as any).icon_key) || Settings,
        }))
      : whyData
  ) as typeof whyData;

  const workflowStatsFinal = cms?.workflow?.stats?.length
    ? cms.workflow.stats
    : [
        { label: 'leading global brands', value: '130+' },
        { label: 'projects annually', value: '2M+' },
        { label: 'turnaround reduction times', value: '52%' },
      ];
  const workflowSubtitleFinal = cms?.workflow?.subtitle || '';

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="data analysis" />

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
          <Contact leadingText="Ready to " highlightedText="turn data" trailingText=" into action?" />
        </div>
      </div>
    </div>
  );
}


