import {
  ShieldCheck,
  Languages,
  ShieldAlert,
  UserRoundPen,
  ListRestart,
  ShieldPlus,
  ShieldUser,
  LockKeyhole,
  GlobeLock,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { features } from '@/lib/features';
import { getApplication } from '@/lib/cms/application';
import { Contact } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/applications/Hero';
import Challenges from '@/components/page/applications/Challenges';
import Benefits from '@/components/page/applications/Benefits';
import How from '@/components/page/applications/How';

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

// Fallback data in case CMS is unavailable
const heroFallback = {
  title: 'Compliance you can trust',
  subtitle: 'Built for healthcare and pharma where accuracy saves lives',
  description:
    'In pharma and healthcare, a single label error can cause costly recalls and put patients at risk. 5Flow keeps every update traceable, every approval documented, and every product compliant with global regulations.',
  imageSrc: '/applications/industries/pharma.jpg',
  imageAlt: 'Artwork management preview',
  mobileImageSrc: '/applications/industries/pharma-mobile.jpg',
};

const challengeItems = [
  {
    id: 'multi-language-labeling',
    title: 'Multi-language labeling requirements',
    desc: 'One drug, dozens of SKUs',
    sub: '5Flow manages translations centrally and applies them consistently across markets, reducing the risk of mislabeling.',
    icon: Languages,
    buttonText: 'See How 5Flow Helps Pharma Teams',
  },
  {
    id: 'regulatory-pressure',
    title: '21 CFR and EMA compliance pressure',
    desc: 'Regulations change, workflows don’t',
    sub: 'Preconfigured compliance checklists and validation rules ensure every label meets FDA, EMA, and regional standards.',
    icon: ShieldAlert,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'documentation-burden',
    title: 'High documentation \nburden',
    desc: 'Audits require endless proof',
    sub: 'Every approval, annotation, and change is logged, creating an instant audit trail for inspections.',
    icon: UserRoundPen,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/online-proofing',
  },
  {
    id: 'frequent-reformulations',
    title: 'Frequent reformulations \nand recalls',
    desc: 'Updates overwhelm manual workflows',
    sub: 'Automated workflows distribute approved changes quickly, keeping packaging aligned with new formulations.',
    icon: ListRestart,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/artwork-management',
  },
  {
    id: 'patient-safety',
    title: 'Patient safety on the line',
    desc: 'Errors aren’t just costly, they’re dangerous',
    sub: 'Built-in validation rules flag missing warnings, dosage errors, or misplaced barcodes before files go to print.',
    icon: ShieldPlus,
    buttonText: 'See How 5Flow Helps Pharma Teams',
    buttonLink: '/solutions/artwork-management',
  },
];

const howData = [
  {
    heading: 'Health & Pharma',
    title: 'Manage multi-language packaging from one central hub.',
    description: 'Stay audit ready with automated approval logs and version control.',
    iconName: 'Languages',
    imageSrc: '/applications/2-1.svg',
    buttonLink: '/solutions/content-management',
    buttonText: 'Discover Content Management',
  },
  {
    title: 'Protect patient safety with built-in error detection tools.',
    description: 'Ensure FDA, EMA, and local compliance with rule-based validation.',
    iconName: 'ShieldUser',
    imageSrc: '/applications/2-2.svg',
    buttonLink: '/solutions/artwork-management',
    buttonText: 'Discover Artwork Management',
  },
  {
    title: 'Speed up reformulation updates with automated workflows.',
    description: 'Scale compliance globally without adding manual effort.',
    iconName: 'Workflow',
    imageSrc: '/applications/2-3.svg',
    buttonLink: '/solutions/artwork-management',
    buttonText: 'Discover Artwork Management',
  },
];

const benefitItems = [
  {
    id: 'patient-safety-protected',
    title: 'Patient safety protected',
    desc: 'Errors caught before they reach market',
    sub: 'With compliance and validation built in, every label is safe, accurate, and consistent.',
    icon: ShieldUser,
  },
  {
    id: 'regulatory-confidence',
    title: 'Regulatory confidence',
    desc: 'Always ready for FDA, EMA, and local audits',
    sub: 'Automatic documentation ensures full compliance evidence for every SKU and region.',
    icon: LockKeyhole,
  },
  {
    id: 'faster-approvals',
    title: 'Faster regulatory approvals',
    desc: 'Compliance without bottlenecks',
    sub: 'Structured workflows and automation speed up label approvals without sacrificing accuracy.',
    icon: ShieldCheck,
  },
  {
    id: 'global-scale-local',
    title: 'Global scale, local compliance',
    desc: 'Manage thousands of SKUs accurately',
    sub: 'From dosage warnings to language variants, 5Flow scales compliance across regions and product lines.',
    icon: GlobeLock,
  },
];

export default async function HealthPharma() {
  let cms = null as Awaited<ReturnType<typeof getApplication>> | null;
  if (features.enabled) {
    try {
      cms = await getApplication('health-pharma');
    } catch {}
  }

  const challengeItemsFinal = (
    cms?.challenges?.items?.length
      ? cms.challenges.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || Languages,
          buttonText: 'Learn More',
          buttonLink: (it as any).linkUrl || (it as any).link_url || undefined,
        }))
      : challengeItems
  ) as typeof challengeItems;

  const howDataFinal = (
    cms?.how?.items?.length
      ? cms.how.items.map((it, idx) => ({
          title: it.title || '',
          description: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          iconName: toPascalCase(((it as any).iconName || (it as any).iconKey || (it as any).icon_key || 'BadgeCheck') as string),
          imageSrc: (it as any).imageUrl || (it as any).image_url || `/applications/2-${idx + 1}.svg`,
          buttonLink: (it as any).linkUrl || (it as any).link_url || undefined,
          buttonText: 'Learn More',
        }))
      : howData
  ) as typeof howData;

  const benefitItemsFinal = (
    cms?.benefits?.items?.length
      ? cms.benefits.items.map((it, i) => ({
          id: String((it as any).id || i),
          title: it.title || '',
          desc: it.subtitle || '',
          sub: (it.bodyHtml || (it as any).body_html || (it as any).description || '') as string,
          icon: resolveIconComponent((it as any).iconKey || (it as any).icon_key) || ShieldUser,
        }))
      : benefitItems
  ) as typeof benefitItems;

  return (
    <div className="relative">
      <div className="container mx-auto gap-10 md:gap-32">
        <PageHeader title="health pharma" />

        <div className="flex flex-col gap-32">
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
          <How howData={howDataFinal} />
          <Benefits items={benefitItemsFinal} highlightedText={cms?.benefits?.highlightedText || 'Health & Pharma'} />
          <Contact leadingText="The " highlightedText="Best Software" trailingText=" For Healthcare & Pharma" />
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <CtaV2 />
      </div>
    </div>
  );
}
