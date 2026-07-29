import { getAllCmsCaseStudySlugs, getCmsCaseStudyBySlug, getCmsCaseStudyCards } from '@/lib/cms/case-study';

export type CaseStudyCardItem = {
  title: string;
  desc: string;
  image: string;
  imageFocus?: string;
  link: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  date: string;
  image: string;
  imageFocus?: string;
  desktopImageHeight?: string;
  content: string;
};

function hasCaseStudyCmsConfig() {
  return Boolean(process.env.WP_BASE_URL);
}

export async function getCaseStudyCards(): Promise<CaseStudyCardItem[]> {
  if (!hasCaseStudyCmsConfig()) return getFallbackCaseStudyCards();

  try {
    const cmsCards = await getCmsCaseStudyCards();
    if (cmsCards.length > 0) return cmsCards;
  } catch {
    // Fall back to local data when CMS is unavailable in local/dev environments.
  }

  return getFallbackCaseStudyCards();
}

function getFallbackCaseStudyCards(): CaseStudyCardItem[] {
  // All case study items flattened from the previous tabs data
  return [
    // Industry
    {
      title: 'Retail Case Study',
      desc: 'How retailer X reduced time-to-shelf',
      image: '/product/rectangle.webp',
      link: '/case-studies/retail',
    },
    {
      title: 'Pharma Case Study',
      desc: 'Regulatory-ready artwork at scale',
      image: '/product/rectangle.webp',
      link: '/case-studies/pharma',
    },
    {
      title: 'F&B Case Study',
      desc: 'Faster SKU launches and compliance',
      image: '/product/rectangle.webp',
      link: '/case-studies/fnb',
    },
    {
      title: 'Beauty Case Study',
      desc: 'Consistent global branding',
      image: '/product/rectangle.webp',
      link: '/case-studies/beauty',
    },
    // Roles
    {
      title: 'Designer Spotlight',
      desc: 'Creating compliant assets faster',
      image: '/product/rectangle.webp',
      link: '/case-studies/designer',
    },
    {
      title: 'Brand Manager',
      desc: 'Maintaining global consistency',
      image: '/product/rectangle.webp',
      link: '/case-studies/brand',
    },
    {
      title: 'Legal & Compliance',
      desc: 'Audit trails for approvals',
      image: '/product/rectangle.webp',
      link: '/case-studies/legal',
    },
    {
      title: 'Packaging Team',
      desc: 'Faster artwork iterations',
      image: '/product/rectangle.webp',
      link: '/case-studies/packaging',
    },
    // Use Cases
    {
      title: 'Artwork Management',
      desc: 'End-to-end artwork lifecycle',
      image: '/product/rectangle.webp',
      link: '/case-studies/artwork',
    },
    {
      title: 'Approval Workflow',
      desc: 'Faster sign-offs across teams',
      image: '/product/rectangle.webp',
      link: '/case-studies/approval',
    },
    {
      title: 'Globalization',
      desc: 'Localized assets at scale',
      image: '/product/rectangle.webp',
      link: '/case-studies/globalization',
    },
    {
      title: 'Print-Ready Assets',
      desc: 'Consistent files for suppliers',
      image: '/product/rectangle.webp',
      link: '/case-studies/print',
    },
  ];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!hasCaseStudyCmsConfig()) return null;

  try {
    const cmsCaseStudy = await getCmsCaseStudyBySlug(slug);
    if (cmsCaseStudy) return cmsCaseStudy;
  } catch {
    // Fall back to null when CMS is unavailable.
  }
  const cmsCaseStudy = await getCmsCaseStudyBySlug(slug);
  if (cmsCaseStudy) return cmsCaseStudy;
  return null;
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!hasCaseStudyCmsConfig()) return [];

  try {
    const cmsSlugs = await getAllCmsCaseStudySlugs();
    if (cmsSlugs.length > 0) return cmsSlugs;
  } catch {
    // Fall back to no dynamic slugs when CMS is unavailable.
  }
  const cmsSlugs = await getAllCmsCaseStudySlugs();
  if (cmsSlugs.length > 0) return cmsSlugs;
  return [];
}
