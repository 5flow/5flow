import {
  ShieldCheck,
  ZapIcon,
  ShieldAlert,
  FileStack,
  FileSearch2,
  ShieldQuestionMark,
  History,
  SquareCheckBig,
} from 'lucide-react';
import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getApplication } from '@/lib/cms/application';
import InlineHighlight from '@/components/core/inline-highlight';
import PageHeader from '@/components/core/page-header';
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
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <InlineHighlight>{highlight}</InlineHighlight>}
        </span>
      ))}
    </>
  );
}

// Fallback data in case CMS is unavailable
const heroFallback = {
  title: 'Move Fast. Stay Compliant. Never Compromise.',
  subtitle: 'Tools built for regulatory and quality descers who can’t afford mistakes',
  description:
    'Regulatory and quality managers need accuracy at every step. From label updates to final approvals, 5Flow ensures complete traceability, audit-ready workflows, and risk-free compliance.',
  imageSrc: '/applications/icp/Quality.jpg',
  imageAlt: 'Artwork management preview',
  ctaText: 'Get a Live Demo',
  mobileImageSrc: '/applications/icp/Quality-mobile.jpg',
};

const challengeItems = [
  {
    id: 'high-compliance-risk',
    title: 'High compliance risk',
    desc: 'A single missed warning can trigger fines',
    sub: '5Flow provides audit-ready workflows with version control and approval trails, so nothing slips through.',
    icon: ShieldAlert,
    buttonText: 'See How It Helps Regulatory Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'cascading-label-updates',
    title: 'Cascading label updates',
    desc: 'One change creates errors across markets',
    sub: 'Centralized content management pushes validated updates consistently into every SKU and region.',
    icon: FileStack,
    buttonText: 'See How It Helps Regulatory Teams',
    buttonLink: '/solutions/content-management',
  },
  {
    id: 'lack-of-traceability',
    title: 'Lack of traceability',
    desc: 'Approvals get lost in email chains',
    sub: 'All approvals are tracked, timestamped, and linked directly to artwork, giving you end-to-end visibility.',
    icon: FileSearch2,
    buttonText: 'See How It Helps Regulatory Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'fragmented-documentation',
    title: 'Fragmented documentation',
    desc: 'Teams can’t prove compliance quickly',
    sub: 'With built-in records, reports are generated instantly for audits and inspections.',
    icon: ShieldQuestionMark,
    buttonText: 'See How It Helps Regulatory Teams',
    buttonLink: '/solutions/data-analysis',
  },
  {
    id: 'slow-manual-processes',
    title: 'Slow, manual processes',
    desc: 'Delays put launches at risk',
    sub: 'Automated workflows move files faster while maintaining full accuracy and compliance checks.',
    icon: History,
    buttonText: 'See How It Helps Regulatory Teams',
    buttonLink: '/solutions/artwork-management',
  },
];

const benefitItems = [
  {
    id: 'risk-reduction',
    title: 'Risk reduction',
    desc: 'Compliance built into every workflow',
    sub: 'With approvals and traceability hardwired into the system, you protect your brand from costly mistakes.',
    icon: ShieldCheck,
  },
  {
    id: 'audit-readiness',
    title: 'Audit readiness',
    desc: 'Be prepared at any moment',
    sub: 'Automatic documentation means audit trails are always up to date, cutting stress and prep time.',
    icon: SquareCheckBig,
  },
  {
    id: 'faster-approvals',
    title: 'Faster approvals',
    desc: 'Compliance without delays',
    sub: 'Clear, automated approvals keep compliance strong while accelerating time to market.',
    icon: ZapIcon,
  },
  {
    id: 'confidence-scale',
    title: 'Confidence at scale',
    desc: 'Manage thousands of SKUs accurately',
    sub: 'Even in complex global portfolios, accuracy stays consistent across every product and market.',
    icon: FileStack,
  },
];

const workflowFallback = {
  title: (
    <>
      Trusted in <InlineHighlight>regulated </InlineHighlight>industries
    </>
  ),
  subtitle: 'Proven with pharma, healthcare, and FMCG.',
  statsData: [
    { label: 'leading global brands', value: '130+' },
    { label: 'projects annually', value: '2M+' },
    { label: 'turnaround reduction times', value: '52%' },
  ],
};

export default async function QualityRegulatory() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('quality-regulatory');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || ShieldAlert,
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
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || ShieldCheck,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="quality regulatory" />

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
          <Benefits
            items={benefitItemsFinal}
            highlightedText={cms?.benefits?.highlightedText || 'Quality & Regulatory'}
          />
          <Workflow
            title={
              cms?.workflow?.title
                ? renderWorkflowTitle(cms.workflow.title, cms.workflow.highlightedText)
                : workflowFallback.title
            }
            subtitle={cms?.workflow?.subtitle || workflowFallback.subtitle}
            statsData={cms?.workflow?.stats?.length ? cms.workflow.stats : workflowFallback.statsData}
          />
          <Contact leadingText="The Best Software For " highlightedText="Regulatory & Quality Managers" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
