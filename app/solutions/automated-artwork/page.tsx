import type { Metadata } from 'next';
import { CircleDollarSign, FileStack, Lightbulb, Rocket } from 'lucide-react';
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
  title: 'Artwork Automation Platform for Packaging | 5Flow',
  description: 'Automate packaging artwork creation and approval workflows with 5Flow artwork automation platform for faster product launches.',
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
  brandName: 'automated artwork',
  logoSrc: '/logo.svg',
  logoAlt: '5Flow logo',
  title: 'Artwork at the speed of automation',
  subtitle: 'Design Once. Deliver Everywhere.',
  description:
    '5Flow’s Automated Artwork solution handles repetitive work, so you can focus on creativity.. From resizing to multilingual rollouts, it eliminates manual effort, minimizes errors, and accelerates delivery.',
  buttonText: 'See it in Action',
  buttonLink: '/contact',
  imageSrc: '/solutions/automated-artwork.png',
  imageAlt: 'Automated artwork preview',
  mobileImageSrc: '/solutions/automated-artwork-mobile.png',
};

const howData = [
  {
    heading: 'Automated Artwork',
    title: 'Template-driven design',
    subtitle: 'Automation built into templates',
    description: 'Predefined templates generate artwork variations quickly while keeping brand guidelines intact.',
    buttonText: 'Discover Templates',
    imageSrc: '/solutions/5-1.svg',
    iconName: 'LayoutList',
  },
  {
    title: 'Multilingual automation',
    subtitle: 'Translations applied instantly',
    description: 'Automated text handling applies approved translations across SKUs, cutting manual entry errors.',
    buttonText: 'Discover Language Tools',
    imageSrc: '/solutions/5-2.svg',
    iconName: 'Languages',
  },
  {
    title: 'Batch processing',
    subtitle: 'Scale without bottlenecks',
    description: 'Generate dozens or thousands of artworks at once, reducing turnaround from weeks to hours.',
    buttonText: 'Discover Batch Processing',
    imageSrc: '/solutions/5-3.svg',
    iconName: 'Layers',
  },
  {
    title: 'Validation rules',
    subtitle: 'Accuracy by default',
    description:
      'Built-in rules check barcodes, text placement, and compliance automatically before files go to print.',
    buttonText: 'Discover Validation',
    imageSrc: '/solutions/5-4.svg',
    iconName: 'ShieldCheck',
  },
];

const whyData = [
  {
    heading: 'Automated Artwork',
    title: 'Faster market entry',
    subtitle: 'Launch weeks earlier',
    description: 'Cut artwork turnaround from days to minutes, helping products and promos hit shelves faster.',
    icon: Rocket,
  },
  {
    title: 'Greater creative freedom',
    subtitle: 'Designers focus on ideas, not mechanics',
    description: 'Automation frees creative teams from repetitive edits so they can focus on innovation.',
    icon: Lightbulb,
  },
  {
    title: 'Precision at scale',
    subtitle: 'Consistency across thousands of SKUs',
    description: 'Automation eliminates human error, ensuring every adaptation is accurate and on brand.',
    icon: FileStack,
  },
  {
    title: 'Sustainable and low cost',
    subtitle: 'Less waste, fewer reprints',
    description: 'Automated accuracy reduces costly mistakes, reprints, and supplier delays.',
    icon: CircleDollarSign,
  },
];

export default async function AutomatedArtwork() {
  let cms = null as Awaited<ReturnType<typeof getSolution>> | null;
  if (features.enabled) {
    try {
      cms = await getSolution('automated-artwork');
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
          imageSrc: (item as any).imageUrl || (item as any).image_url || `/solutions/5-${idx + 1}.svg`,
          iconName: toPascalCase(((item as any).iconName || (item as any).iconKey || (item as any).icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map((item, i) => ({
          heading: i === 0 ? (item as any).heading || 'Automated Artwork' : undefined,
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || (item as any).body_html || (item as any).description || '',
          icon: resolveIconComponent((item as any).iconKey || (item as any).icon_key) || FileStack,
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
        <PageHeader title="automated artwork" />

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
          <Contact leadingText="Create artworks the " highlightedText="smart way" />
        </div>
      </div>
    </div>
  );
}


