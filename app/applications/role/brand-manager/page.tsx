import {
  Eye,
  ShieldCheck,
  FileStack,
  CircleCheckBig,
  FileText,
  ShieldQuestionMark,
  RefreshCcw,
  Rocket,
  ChartArea,
} from 'lucide-react';
import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getApplication } from '@/lib/cms/application';
import PageHeader from '@/components/core/page-header';
import InlineHighlight from '@/components/core/inline-highlight';
import Hero from '@/components/page/applications/Hero';
import Workflow from '@/components/page/applications/Workflow';
import Challenges from '@/components/page/applications/Challenges';
import Benefits from '@/components/page/applications/Benefits';

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

function renderWorkflowTitle(title: string, highlight?: string) {
  if (!highlight) return title;
  const parts = title.split(highlight);
  console.log(parts);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length && <InlineHighlight>{highlight}</InlineHighlight>}
        </span>
      ))}
    </>
  );
}

// Fallback data in case CMS is unavailable
const heroFallback = {
  title: 'Brand control at speed',
  subtitle: 'Solutions built for brand managers who need speed and scale',
  description:
    'As a brand manager, you deal with exploding SKUs, endless approvals, and pressure to hit launch dates. 5Flow centralizes workflows, content, and artwork so you can keep projects moving and your brand consistent across markets.',
  imageSrc: '/applications/icp/BrandManager.jpg',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/applications/icp/BrandManager-mobile.jpg',
  ctaText: `See What's Possible`,
};

const challengeItems = [
  {
    title: 'SKU overload',
    desc: 'Too many variants to keep track of',
    sub: '5Flow unifies artwork, claims, and content in one platform so every SKU stays visible, aligned, and on brand.',
    icon: FileStack,
    buttonText: 'See How It Helps Brand Managers',
    buttonLink: '/solutions/artwork-management',
  },
  {
    title: 'Approval bottlenecks',
    desc: 'Reviews drag out launch cycle',
    sub: 'Automated workflows route tasks to the right people, track approvals, and cut wasted time.',
    icon: CircleCheckBig,
    buttonText: 'See How It Helps Brand Managers',
    buttonLink: '/solutions/online-proofing',
  },
  {
    title: 'Content drift',
    desc: 'Inconsistent claims across markets',
    sub: 'A central content hub ensures approved copy flows into every artwork and market without manual errors.',
    icon: FileText,
    buttonText: 'See How It Helps Brand Managers',
    buttonLink: '/solutions/content-management',
  },
  {
    title: 'No visibility',
    desc: 'You can’t see where projects stall',
    sub: 'Dashboards highlight bottlenecks and delays so you can act early and keep launches on track.',
    icon: Eye,
    buttonText: 'See How It Helps Brand Managers',
    buttonLink: '/solutions/artwork-management',
  },
  {
    title: 'Risk of compliance errors',
    desc: 'A single mistake costs millions',
    sub: 'Built-in version control and audit trails ensure only validated files make it to market.',
    icon: ShieldQuestionMark,
    buttonText: 'See How It Helps Brand Managers',
    buttonLink: '/solutions/artwork-management',
  },
];

const benefitItems = [
  {
    id: 'consistency',
    title: 'Consistency across markets',
    desc: 'Every SKU speaks the same brand language',
    sub: 'With centralized content and artwork, your brand identity stays intact globally while adapting locally.',
    icon: RefreshCcw,
  },
  {
    id: 'speed',
    title: 'Faster go-to-market',
    desc: 'Hit launch dates every time',
    sub: 'Automated workflows and clear approvals reduce cycle times and accelerate product rollouts.',
    icon: Rocket,
  },
  {
    id: 'reduced-risk',
    title: 'Reduced risk',
    desc: 'Compliance built into the process',
    sub: 'Audit-ready records and version control protect you from errors and fines.',
    icon: ShieldCheck,
  },
  {
    id: 'data',
    title: 'Data-backed decisions',
    desc: 'See exactly where to act',
    sub: 'Analytics show delays, capacity, and trends, helping you fix problems proactively.',
    icon: ChartArea,
  },
];

const workflowFallback = {
  title: (
    <>
      Trusted by <InlineHighlight>Brand Managers</InlineHighlight> Across The Globe
    </>
  ),
  subtitle: 'Success stories that resonate.',
  statsData: [
    { label: 'leading global brands', value: '130+' },
    { label: 'projects annually', value: '2M+' },
    { label: 'turnaround reduction times', value: '52%' },
  ],
};

export default async function BrandManager() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('brand-manager');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map(it => ({
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || FileStack,
          buttonText: 'Learn More',
          buttonLink: (it as any).linkUrl || (it as any).link_url || undefined,
        }))
      : challengeItems
  ) as typeof challengeItems;

  const benefitItemsFinal = (
    cms?.benefits?.items?.length
      ? cms.benefits.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || RefreshCcw,
        }))
      : benefitItems
  ) as typeof benefitItems;

  console.log(cms?.workflow);

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="brand manager" />

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
          <Benefits items={benefitItemsFinal} highlightedText={cms?.benefits?.highlightedText || 'Brand Managers'} />
          <Workflow
            title={
              cms?.workflow?.title
                ? renderWorkflowTitle(cms.workflow.title, cms.workflow.highlightedText)
                : workflowFallback.title
            }
            subtitle={cms?.workflow?.subtitle || workflowFallback.subtitle}
            statsData={cms?.workflow?.stats?.length ? cms.workflow.stats : workflowFallback.statsData}
          />
          <Contact leadingText="Trusted by Brand Managers" highlightedText=" Who Deliver" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
