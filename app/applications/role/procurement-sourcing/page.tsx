import {
  ShieldCheck,
  CircleDollarSign,
  History,
  EyeOff,
  Repeat2,
  ShieldAlert,
  CircleCheckBig,
  LaptopMinimalCheck,
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
  title: 'Procurement made predictable',
  subtitle: 'Accuracy and efficiency across your supply chain',
  description:
    'Procurement teams are tasked with cutting costs and ensuring supplier efficiency — but artwork errors, misaligned assets, and reprints eat into budgets. 5Flow gives you control over assets, workflows, and approvals, so suppliers always receive the right files the first time.',
  imageSrc: '/applications/icp/Procurement.jpg',
  imageAlt: 'Artwork management preview',
  ctaText: 'See What’s Possible',
  mobileImageSrc: '/applications/icp/Procurement-mobile.jpg',
};

const challengeItems = [
  {
    id: 'costly-reprints',
    title: 'Costly reprints',
    desc: 'Errors drive wasted spend',
    sub: '5Flow ensures suppliers receive the right, validated files every time, eliminating costly mistakes and reprints.',
    icon: CircleDollarSign,
    buttonText: 'See How 5Flow Helps Procurement Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'supply-chain-delays',
    title: 'Supply chain delays',
    desc: 'Wrong files stall production',
    sub: 'A centralized asset library gives suppliers direct access to approved artwork and cutter guides, keeping timelines intact.',
    icon: History,
    buttonText: 'See How 5Flow Helps Procurement Teams',
    buttonLink: '/solutions/asset-library',
  },
  {
    id: 'lack-of-visibility',
    title: 'Lack of visibility',
    desc: 'No clarity on project status or supplier readiness',
    sub: 'Dashboards show procurement teams where projects stand, so supplier alignment is proactive, not reactive.',
    icon: EyeOff,
    buttonText: 'See How 5Flow Helps Procurement Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'manual-back-and-forth',
    title: 'Manual back-and-forth',
    desc: 'Email overload with suppliers',
    sub: 'Integrated communication reduces supplier emails by structuring feedback, clarifications, and approvals in one system.',
    icon: Repeat2,
    buttonText: 'See How 5Flow Helps Procurement Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'inconsistent-quality',
    title: 'Inconsistent quality',
    desc: 'Errors slip through fragmented workflows',
    sub: 'Automated checks and traceability ensure suppliers work only with approved, accurate files.',
    icon: ShieldAlert,
    buttonText: 'See How 5Flow Helps Procurement Teams',
    buttonLink: '/solutions/online-proofing',
  },
];

const benefitItems = [
  {
    id: 'predictable-supply',
    title: 'Predictable supply chain',
    desc: 'No surprises, fewer delays',
    sub: 'With validated files and structured workflows, suppliers receive exactly what they need, when they need it.',
    icon: CircleCheckBig,
  },
  {
    id: 'cost-efficiency',
    title: 'Cost efficiency',
    desc: 'Save budgets by eliminating waste',
    sub: 'Fewer reprints and less manual rework directly reduce costs across production.',
    icon: CircleDollarSign,
  },
  {
    id: 'supplier-alignment',
    title: 'Supplier alignment',
    desc: 'A single source of truth for partners',
    sub: 'Centralized access ensures suppliers always work with approved artwork and assets.',
    icon: LaptopMinimalCheck,
  },
  {
    id: 'risk-reduction',
    title: 'Risk reduction',
    desc: 'Compliance built into procurement',
    sub: 'Every file is tracked and validated, minimizing risks from errors or outdated materials.',
    icon: ShieldCheck,
  },
];

const workflowFallback = {
  title: (
    <>
      The <InlineHighlight>Best Software </InlineHighlight> for Procurement & Sourcing
    </>
  ),
  subtitle: 'Proven results across industries.',
  statsData: [
    { label: 'leading global brands', value: '130+' },
    { label: 'projects annually', value: '2M+' },
    { label: 'turnaround reduction times', value: '52%' },
  ],
};

export default async function ProcurementSourcing() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('procurement-sourcing');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || CircleDollarSign,
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
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || CircleCheckBig,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="procurement sourcing" />

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
            highlightedText={cms?.benefits?.highlightedText || 'Procurement & Sourcing'}
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
          <Contact leadingText="The Best Software For " highlightedText="Procurement & Sourcing Teams" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
