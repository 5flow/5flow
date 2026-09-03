import type { Metadata } from 'next';
import {
  SquareStack,
  Repeat2,
  EyeOff,
  MessageCircleQuestionMark,
  History,
  Lightbulb,
  MessagesSquare,
  FileStack,
  CircleCheckBig,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getApplication } from '@/lib/cms/application';
import { Contact } from '@/components/layout';
import InlineHighlight from '@/components/core/inline-highlight';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/applications/Hero';
import Workflow from '@/components/page/applications/Workflow';
import Challenges from '@/components/page/applications/Challenges';
import Benefits from '@/components/page/applications/Benefits';


export const metadata: Metadata = {
  title: 'Creative Collaboration Workflow Software | 5Flow',
  description: 'Simplify creative production with collaborative content management tools for studios handling packaging and brand assets.',
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
  title: 'More time to create, less time on admin',
  subtitle: 'Built for design teams who want to stay creative',
  description:
    'Creative studios should be focused on big ideas, not chasing files or juggling endless markups. 5Flow clears the clutter by automating production work, centralizing approvals, and giving designers back the time to design.',
  imageSrc: '/applications/icp/Marketing.jpg',
  imageAlt: 'Artwork management preview',
  ctaText: 'See Whatâ€™s Possible',
  mobileImageSrc: '/applications/icp/Marketing-mobile.jpg',
};

const challengeItems = [
  {
    title: 'Endless revisions',
    desc: 'Feedback chaos from multiple stakeholders',
    sub: '5Flow consolidates markups, comments, and approvals in one place, so designers act on clear direction instead of conflicting feedback.',
    icon: SquareStack,
    buttonText: 'See How It Helps Creatives',
    buttonLink: '/solutions/artwork-management',
  },
  {
    title: 'Repetitive production work',
    desc: 'Creativity lost to resizing and adaptations',
    sub: 'Automated artwork tools handle resizing, formatting, and multilingual rollouts, freeing teams to focus on design.',
    icon: Repeat2,
    buttonText: 'See How It Helps Creatives',
    buttonLink: '/solutions/automated-artwork',
  },
  {
    title: 'No version clarity',
    desc: 'Teams rework the wrong files',
    sub: 'Centralized version control ensures studios always work with the latest, approved artwork.',
    icon: EyeOff,
    buttonText: 'See How It Helps Creatives',
    buttonLink: '/solutions/asset-library',
  },
  {
    title: 'Fragmented collaboration',
    desc: 'File sharing across email, drives, and chats',
    sub: 'Integrated communication tools connect creative, brand, and regulatory teams directly to the artwork.',
    icon: MessageCircleQuestionMark,
    buttonText: 'See How It Helps Creatives',
    buttonLink: '/solutions/artwork-management',
  },
  {
    title: 'Bottlenecks stall campaigns',
    desc: 'Designers left waiting for approvals',
    sub: 'Automated workflows route files to the right stakeholders at the right time, keeping creative projects on schedule.',
    icon: History,
    buttonText: 'See How It Helps Creatives',
    buttonLink: '/solutions/artwork-management',
  },
];

const benefitItems = [
  {
    id: 'creative-focus',
    title: 'Creative focus restored',
    desc: 'More time for ideas, less time on admin',
    sub: 'By automating repetitive tasks, designers can focus on producing impactful creative work.',
    icon: Lightbulb,
  },
  {
    id: 'seamless-collab',
    title: 'Seamless collaboration',
    desc: 'Everyone aligned in one platform',
    sub: 'With integrated communication, creatives, brand managers, and regulators work together without silos or confusion.',
    icon: MessagesSquare,
  },
  {
    id: 'work-scales',
    title: 'Work that scales',
    desc: 'Handle 10 SKUs or 10,000',
    sub: 'Studios can manage high volumes of adaptations without breaking creative flow.',
    icon: FileStack,
  },
  {
    id: 'quality-holds',
    title: 'Quality that holds',
    desc: 'Consistent outputs across markets',
    sub: 'Automated checks and version control ensure design integrity, no matter how many adaptations are needed.',
    icon: CircleCheckBig,
  },
];

const workflowFallback = {
  title: (
    <>
      The <InlineHighlight>Best Software </InlineHighlight> for Creative & Design Studios
    </>
  ),
  subtitle: 'Proven results across industries.',
  statsData: [
    { label: 'leading global brands', value: '130+' },
    { label: 'projects annually', value: '2M+' },
    { label: 'turnaround reduction times', value: '52%' },
  ],
};

export async function CreativeStudioPage({ cmsSlug = 'creative-studio' }: { cmsSlug?: string } = {}) {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication(cmsSlug);
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map(it => ({
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || SquareStack,
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
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || Lightbulb,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="creative studio" />

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
          <Benefits items={benefitItemsFinal} highlightedText={cms?.benefits?.highlightedText || 'Creative Studios'} />
          <Workflow
            title={
              cms?.workflow?.title
                ? renderWorkflowTitle(cms.workflow.title, cms.workflow.highlightedText)
                : workflowFallback.title
            }
            subtitle={cms?.workflow?.subtitle || workflowFallback.subtitle}
            statsData={cms?.workflow?.stats?.length ? cms.workflow.stats : workflowFallback.statsData}
          />
          <Contact leadingText="Trusted by Top Creative and Design Studios " highlightedText="Worldwide" />
        </div>
      </div>
    </div>
  );
}

export default async function CreativeStudio() {
  return <CreativeStudioPage />;
}

