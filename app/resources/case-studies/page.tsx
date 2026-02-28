import { Contact } from '@/components/layout';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/resources/Hero';
import FilterSection from '@/components/page/resources/FilterSection';
import { getCaseStudyCards } from '@/lib/resources/case-studies';

export default async function CaseStudies() {
  const caseStudyItems = await getCaseStudyCards();

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="case studies" />

        <div className="flex flex-col gap-32">
          <Hero
            title="See how leading brands use 5Flow"
            subtitle="Explore real-world success stories from Retail, Pharma, F&B, Beauty, and Consumer Goods."
            buttonLabel="Contact Us"
          />
          <FilterSection variant="case-studies" caseStudyItems={caseStudyItems} />

          <Contact leadingText="Ready to write your own " highlightedText="success" trailingText=" story?" />
        </div>
      </div>
    </div>
  );
}
