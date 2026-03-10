import { getCmsCaseStudyCards } from '@/lib/cms/case-study';

export type CaseStudyCardItem = {
  title: string;
  desc: string;
  image: string;
  link: string;
};

export async function getCaseStudyCards(): Promise<CaseStudyCardItem[]> {
  const cmsCards = await getCmsCaseStudyCards();
  if (cmsCards.length > 0) return cmsCards;

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
