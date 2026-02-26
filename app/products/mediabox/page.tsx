import { CalendarClock, CircleDollarSign, EyeOff, Rocket, ShieldAlert, Target, Unplug } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getProduct } from '@/lib/cms/product';
import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import InlineHighlight from '@/components/core/inline-highlight';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/product/Hero';
import How from '@/components/page/product/How';
import Need from '@/components/page/product/Need';
import What from '@/components/page/product/What';
import Why from '@/components/page/product/Why';
import Workflow from '@/components/page/product/Workflow';
import Who from '@/components/page/home/Who';

// Fallback data in case CMS is unavailable
const heroData = {
  logoSrc: '/product/mediabox.svg',
  logoAlt: 'Wave Brand',
  title: 'Less Work. More Flow.',
  subtitle: 'Workflows made easy and accurate',
  description:
    'Mediabox is a web-based workflow management tool  that will empower you to bring your brand to life with ease and accuracy.. Mediabox unlocks efficiencies through workflow process, status visibility and online approval.',
  imageSrc: '/product/Solution_Banner_Mediabox.jpg',
  buttonText: 'Book A Demo',
  mobileImageSrc: '/product/Solution_Banner_Mediabox_mobile.jpg',
  imageWidth: 245,
  imageAlt: 'rectangle',
};

const whatData = [
  [
    {
      title: 'Fragmented systems',
      subtitle: 'Creative work scattered across platforms',
      description: 'Teams waste time moving between systems, losing files, and duplicating tasks.',
      icon: Unplug,
      buttonLink: '/solutions/integration',
    },
    {
      title: 'Approval bottlenecks',
      subtitle: 'Campaigns stuck in endless reviews',
      description: 'Delays build when feedback is unstructured and approvals are hard to track.',
      icon: CalendarClock,
      buttonLink: '/solutions/online-proofing',
    },
  ],
  [
    {
      title: 'Rigid tools',
      subtitle: 'Late or inaccurate assets impact campaigns',
      description: 'Wrong files, missed versions, or compliance slip-ups drive costly rework and missed deadlines.',
      icon: CircleDollarSign,
      buttonLink: '/solutions/asset-library',
    },
    {
      title: 'Lack of visibility',
      subtitle: 'No clarity on project status',
      description: 'Without transparent workflows, managers struggle to track progress, spot risks, or plan resources.',
      icon: EyeOff,
      buttonLink: '/solutions/artwork-management',
    },
  ],
];

const howData = [
  {
    title: 'Centralized platform',
    subtitle: 'One place for every asset',
    description: `Mediabox let's you stay on top of your project deadlines with the project management features.`,
    buttonText: 'Discover the Platform',
    buttonLink: '/solutions/artwork-management',
    imageSrc: '/product/3-1.svg',
    iconName: 'MonitorCloud',
  },
  {
    title: 'Streamlined approvals',
    subtitle: 'Faster, traceable reviews',
    description: 'Online approvals with version history and annotations keep projects clear, compliant, and on track.',
    buttonText: 'Discover Approvals',
    buttonLink: '/solutions/online-proofing',
    imageSrc: '/product/3-2.svg',
    iconName: 'CircleCheckBig',
  },
  {
    title: 'Error reduction',
    subtitle: 'Accuracy built into every step',
    description: 'Automated validation and structured workflows reduce mistakes, reprints, and compliance risks.',
    buttonText: 'Discover Accuracy',
    buttonLink: '/solutions/artwork-management',
    imageSrc: '/product/3-3.svg',
    iconName: 'ShieldAlert',
  },
  {
    title: 'Easy to search, fast to find',
    subtitle: 'Check, access, and share all documents from a single source of truth.',
    description: 'Dashboards and analytics give teams full visibility of project health, deadlines, and bottlenecks.',
    buttonText: 'Discover Data Analysis',
    buttonLink: '/solutions/data-analytics',
    imageSrc: '/product/3-4.svg',
    iconName: 'ChartNoAxesCombined',
  },
];

const whyData = [
  {
    title: 'Faster time-to-market',
    desc: 'Launch campaigns without delays',
    sub: 'Cut validation lead time by up to 67% with streamlined approvals and workflow automation.',
    icon: Rocket,
  },
  {
    title: 'Fewer errors',
    desc: 'Reduce costly mistakes and late files',
    sub: 'Up to 45% fewer errors and 50% fewer late assets keep campaigns accurate and reliable.',
    icon: ShieldAlert,
  },
  {
    title: 'Cost savings',
    desc: 'Do more with the same resources',
    sub: 'Lower error rates and faster cycles reduce rework, save on budgets, and maximize efficiency.',
    icon: CircleDollarSign,
  },
  {
    title: 'Team productivity',
    desc: 'Clear workflows, confident delivery',
    sub: 'Mediabox accelerates productivity with consistent workflow tasks and the ability to do on-the-fly changes.',
    icon: Target,
  },
];

const workflowData = {
  title: 'Trusted by global leaders',
  subtitle: 'Leading companies rely on Mediabox to keep creative workflows efficient and on brand.',
  buttonText: 'See Case Studies',
  statsData: [
    {
      value: '45%',
      label: 'reduction in errors',
    },
    {
      value: '67%',
      label: 'faster validation lead time',
    },
    {
      value: '2M+',
      label: 'projects annually',
    },
    {
      value: '60K+',
      label: 'active users worldwide',
    },
  ],
};

const workflowTitleFallback = (
  <>
    Trusted by <InlineHighlight>global brands</InlineHighlight>
  </>
);

const needData = {
  title1: '',
  highlightTitle: 'Pricing',
  title2: ' that grows with you',
  subtitle: 'Flexible options for every team size',
  description:
    'Whether you’re managing a small creative team or coordinating global campaigns, Mediabox offers flexible pricing tailored to your workflow needs.',
  buttonText: 'Talk to Us',
};

const clientData = [
  'Albertsons_logo.png',
  'Altria_Group.svg',
  'Dia_2019.png',
  'Diageo_Logo.png',
  'Energizer_holdings_inc_logo.svg',
  'Froneri_logopng.png',
  'Logo_Del_Monte.png',
  'LVMH-black.png',
  'Mazda_2024.png',
  'Purina-logo.png',
  'sobeys-logo-svg-vector.svg',
  'Taylor-farms_new_Logo.webp',
  'Topco-Logo-Vector.png',
];

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

export default async function Mediabox() {
  let cms = null as Awaited<ReturnType<typeof getProduct>> | null;
  if (features.enabled) {
    try {
      cms = await getProduct('mediabox');
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
          icon: resolveIconComponent(item.iconKey || item.icon_key) || (idx === 0 ? Unplug : CalendarClock),
        })),
        mappedWhat.slice(2, 4).map((item, idx) => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || item.body_html || item.description || '',
          buttonLink: item.linkUrl || item.link_url || undefined,
          icon: resolveIconComponent(item.iconKey || item.icon_key) || (idx === 0 ? CircleDollarSign : EyeOff),
        })),
      ]
    : whatData;

  const howDataFinal = (
    cms?.how?.items?.length
      ? cms!.how!.items.map(item => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.bodyHtml || item.body_html || item.description || '',
          buttonText: item.buttonText || item.button_text || 'Learn more',
          buttonLink: item.buttonLink || item.linkUrl || item.link_url || undefined,
          imageSrc: item.imageSrc || item.imageUrl || item.image_url || '/product/3-1.svg',
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
          icon: resolveIconComponent(item.iconKey || item.icon_key) || Target,
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

  console.log(cms?.why);

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="mediabox" />

        <div className="mt-12 flex flex-col gap-10 md:gap-32">
          <Hero {...heroProps} />
          <What whatData={whatDataFinal as any} />
          <How howData={howDataFinal as any} />
          <Why
            sectionTitle={
              <>
                <span className="text-foreground">Why You Need</span>
                <InlineHighlight className="text-background">Mediabox</InlineHighlight>
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
            return cmsClients.length ? (
              <Who title={cms?.who?.title} clients={cmsClients} />
            ) : (
              <Who path="product/mediabox-clients" clients={clientData.map(name => ({ imageUrl: name }))} />
            );
          })()}
          <Workflow title={workflowTitleFinal} subtitle={workflowSubtitleFinal} statsData={workflowStatsFinal} />
          <Contact leadingText="Ready for " highlightedText="flexible" trailingText=" creative workflows?" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
