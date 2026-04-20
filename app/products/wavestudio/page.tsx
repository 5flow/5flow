import { CalendarClock, CalendarX2, FileXIcon, History, Lightbulb, Rocket, Scaling, ShieldCheck } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getProduct } from '@/lib/cms/product';
import { Contact } from '@/components/layout';
import Who from '@/components/page/home/Who';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/product/Hero';
import How from '@/components/page/product/How';
import Need from '@/components/page/product/Need';
import What from '@/components/page/product/What';
import Why from '@/components/page/product/Why';
import Workflow from '@/components/page/product/Workflow';
import InlineHighlight from '@/components/core/inline-highlight';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Asset Management Software Tool | 5Flow',
  description: 'Manage creative production efficiently with WaveStudio. A creative asset management software for collaboration, approvals and content workflows.',
};
// Fallback data in case CMS is unavailable
const heroData = {
  logoSrc: '/product/wave-studio.svg',
  logoAlt: 'Wave Brand',
  title: 'Big ideas. Bigger execution',
  subtitle: 'Scale your artwork production without scaling your team',
  description:
    'WaveStudio combines automation with creative expertise. We turn endless artwork requests into fast, accurate, on-brand outputs so you can keep creating without burning out.',
  imageSrc: '/product/Solution_Banner_WAVESTUDIO.jpg',
  mobileImageSrc: '/product/Solution_Banner_WAVESTUDIO_mobile.jpg',
  buttonText: 'Start a Project',
  imageWidth: 677,
  imageAlt: 'rectangle',
};

const whatData = [
  [
    {
      title: 'Endless resizing requests',
      subtitle: 'The same design, 100 times over',
      description: 'Creative teams lose days resizing and adapting assets instead of focusing on new ideas.',
      buttonLink: '/solutions/automated-artwork',
      icon: History,
    },
    {
      title: 'Inconsistent outputs',
      subtitle: 'Assets that look off brand',
      description: 'Without guardrails, production work drifts, creating quality issues and brand headaches.',
      buttonLink: '/solutions/automated-artwork',
      icon: FileXIcon,
    },
  ],
  [
    {
      title: 'Bottlenecked studios',
      subtitle: 'Too much work, not enough people',
      description: 'In house teams get stuck in production loops instead of doing creative work.',
      buttonLink: '/solutions/artwork-management',
      icon: CalendarClock,
    },
    {
      title: 'Slow campaign rollouts',
      subtitle: 'Missed deadlines, missed moments',
      description: 'Manual production slows launches, leaving marketing out of sync with market demand.',
      buttonLink: '/solutions/artwork-management',
      icon: CalendarX2,
    },
  ],
];

const howData = [
  {
    title: 'Smart automation',
    subtitle: 'Automation handles the repetitive stuff',
    description: "Our tech automates resizing, formatting, and versioning so your designers don't have to.",
    buttonText: 'Discover Automation',
    buttonLink: '/solutions/automated-artwork',
    imageSrc: '/product/4-1.svg',
    iconName: 'Settings',
  },
  {
    title: 'Creative consistency',
    subtitle: 'Guardrails built into every file',
    description: 'Templates, brand rules, and quality checks keep everything looking sharp and on brand.',
    buttonText: 'Discover Asset Hub',
    buttonLink: '/solutions/automated-artwork',
    imageSrc: '/product/4-2.svg',
    iconName: 'RefreshCcw',
  },
  {
    title: 'Scalable capacity',
    subtitle: 'More output without more headcount',
    description:
      'We extend your team with production firepower so you can handle ten times the work without the stress.',
    buttonText: 'Discover Scale',
    buttonLink: '/solutions/artwork-management',
    imageSrc: '/product/4-3.svg',
    iconName: 'Scaling',
  },
  {
    title: 'Faster delivery',
    subtitle: 'Campaigns go live on time',
    description: 'Agile workflows and parallel production cycles mean deadlines are always met.',
    buttonText: 'Discover Speed',
    buttonLink: '/solutions/artwork-management',
    imageSrc: '/product/4-4.svg',
    iconName: 'Zap',
  },
];

const whyData = [
  {
    title: 'Time back for creativity',
    desc: 'Free your team from production grind',
    sub: 'Designers focus on ideas, not endless adaptations. More energy for the work that matters.',
    icon: Lightbulb,
  },
  {
    title: 'Confidence in quality',
    desc: 'Every asset, on brand',
    sub: 'Automated checks and smart templates mean fewer mistakes and more consistent results.',
    icon: ShieldCheck,
  },
  {
    title: 'Faster campaigns',
    desc: 'Market ready in record time',
    sub: 'Roll out campaigns across markets in days, not weeks, without cutting corners.',
    icon: Rocket,
  },
  {
    title: 'Scalable production',
    desc: 'Grow without the growing pains',
    sub: 'Handle big bursts of work, seasonal peaks, and global rollouts without adding headcount.',
    icon: Scaling,
  },
];

const workflowData = {
  title: 'Faster rollouts, fewer headaches',
  subtitle: 'Retailers and consumer brands rely on WaveStudio to scale artwork production without scaling',
  buttonText: 'See Case Studies',
  statsData: [
    {
      value: '60%',
      label: 'faster artwork turnaround',
    },
    {
      value: '90%',
      label: 'first-time accuracy',
    },
    {
      value: '1M+',
      label: 'designs created',
    },
    {
      value: '50K+',
      label: 'active users',
    },
  ],
};

const workflowTitleFallback = (
  <>
    <InlineHighlight>Faster</InlineHighlight> rollouts, <InlineHighlight>fewer </InlineHighlight> headaches
  </>
);

const needData = {
  title1: '',
  highlightTitle: 'Pay',
  title2: ' for what you need',
  subtitle: 'Pricing that cares about you',
  description:
    'From one-off projects to ongoing production, WaveStudio adapts to your workload. Pricing scales with output so you only pay for what you need.',
  buttonText: 'Talk to Us',
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

export default async function Wavestudio() {
  let cms = null as Awaited<ReturnType<typeof getProduct>> | null;
  if (features.enabled) {
    try {
      cms = await getProduct('wavestudio');
    } catch {}
  }

  const heroProps = {
    ...heroData,
    title: cms?.hero?.title || heroData.title,
    subtitle: cms?.hero?.subtitle || heroData.subtitle,
    description: cms?.hero?.bodyHtml || heroData.description,
    ctaText: cms?.hero?.ctaText || '/contact',
    imageSrc: cms?.hero?.imageUrl || heroData.imageSrc,
    mobileImageSrc: cms?.hero?.mobileImageUrl || heroData.mobileImageSrc,
  };

  const mappedWhat = (cms?.what?.items?.length ? cms!.what!.items : null) as any[] | null;
  const whatDataFinal = mappedWhat
    ? [
        mappedWhat.slice(0, 2).map((item, idx) => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || item.body_html || item.description || '',
          buttonLink: item.linkUrl || item.link_url || undefined,
          icon: resolveIconComponent(item.iconKey || item.icon_key) || (idx === 0 ? History : FileXIcon),
        })),
        mappedWhat.slice(2, 4).map((item, idx) => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || item.body_html || item.description || '',
          buttonLink: item.linkUrl || item.link_url || undefined,
          icon: resolveIconComponent(item.iconKey || item.icon_key) || (idx === 0 ? CalendarClock : CalendarX2),
        })),
      ]
    : whatData;

  const howDataFinal = (
    cms?.how?.items?.length
      ? cms!.how!.items.map(item => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || item.body_html || item.description || '',
          buttonText: 'Learn more',
          buttonLink: item.buttonLink || item.linkUrl || item.link_url || undefined,
          imageSrc: item.imageSrc || item.imageUrl || item.image_url || '/product/4-1.svg',
          iconName: toPascalCase((item.iconName || item.iconKey || item.icon_key || 'BadgeCheck') as string),
        }))
      : howData
  ) as typeof howData;

  const whyDataFinal = (
    cms?.why?.items?.length
      ? cms!.why!.items.map(item => ({
          title: item.title || '',
          desc: item.subtitle || '',
          sub: item.bodyHtml || item.body_html || item.description || '',
          icon: resolveIconComponent(item.iconKey || item.icon_key) || ShieldCheck,
        }))
      : whyData
  ) as typeof whyData;

  const workflowStatsFinal = cms?.workflow?.stats?.length ? cms.workflow.stats : workflowData.statsData;
  const workflowSubtitleFinal = cms?.workflow?.subtitle || workflowData.subtitle;
  let workflowTitleFinal: React.ReactNode = workflowTitleFallback;
  if (cms?.workflow?.title?.trim()) {
    const rawTitle = cms.workflow.title!.trim();
    const highlight = cms.workflow.highlight?.trim();
    if (highlight) {
      const idx = rawTitle.indexOf(highlight);
      if (idx !== -1) {
        const before = rawTitle.slice(0, idx);
        const after = rawTitle.slice(idx + highlight.length);
        workflowTitleFinal = (
          <>
            {before}
            <InlineHighlight>{highlight}</InlineHighlight>
            {after}
          </>
        );
      } else {
        workflowTitleFinal = (
          <>
            {rawTitle} <InlineHighlight>{highlight}</InlineHighlight>
          </>
        );
      }
    } else {
      workflowTitleFinal = rawTitle;
    }
  }

  const needFinal = {
    title1: cms?.need?.title1 ?? needData.title1,
    highlightTitle: cms?.need?.highlightTitle ?? needData.highlightTitle,
    title2: cms?.need?.title2 ?? needData.title2,
    subtitle: cms?.need?.subtitle ?? needData.subtitle,
    description: cms?.need?.bodyHtml ?? needData.description,
    buttonText: cms?.need?.buttonText ?? needData.buttonText,
  };

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="wavestudio" />

        <div className="mt-12 flex flex-col gap-10 md:gap-32">
          <Hero {...heroProps} />
          <What whatData={whatDataFinal as any} />
          <How howData={howDataFinal as any} />
          <Why
            sectionTitle={
              <>
                <span className="text-foreground">Why You Need</span>
                <InlineHighlight className="text-background">WaveStudio</InlineHighlight>
              </>
            }
            whyData={whyDataFinal as any}
          />
          <Need
            title1={needFinal.title1}
            highlightTitle={needFinal.highlightTitle}
            title2={needFinal.title2}
            subtitle={needFinal.subtitle}
            description={needFinal.description}
            buttonText={needFinal.buttonText}
          />
          {(() => {
            const cmsClients = (cms?.who?.clients || []).filter(c => c.imageUrl);
            return cmsClients.length ? <Who title={cms?.who?.title} clients={cmsClients} /> : null;
          })()}
          <Workflow title={workflowTitleFinal} subtitle={workflowSubtitleFinal} statsData={workflowStatsFinal} />
          <Contact leadingText="Ready to make " highlightedText="more" trailingText=" with less?" />
        </div>
      </div>
    </div>
  );
}


