import type { Metadata } from 'next';
import { Contact } from '@/components/layout';
import { getBlogCards } from '@/lib/resources/blogs';
import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/resources/Hero';
import FilterSection from '@/components/page/resources/FilterSection';


export const metadata: Metadata = {
  title: 'Artwork Workflow & Packaging Insights Blog | 5Flow',
  description: 'Explore insights on artwork automation, packaging compliance, digital asset management and workflow optimization.',
};

export default async function Blogs() {
  const blogItems = await getBlogCards();

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title="blogs" />

        <div className="flex flex-col gap-32">
          <Hero
            title="Insights & ideas for you"
            subtitle="Stay ahead with expert insights, industry news, and best practices from the 5Flow team."
            buttonLabel="Contact us"
          />
          <FilterSection variant="blogs" blogItems={blogItems} />

          <Contact leadingText="Want to put these insights into  " highlightedText="practice" trailingText="?" />
        </div>
      </div>
    </div>
  );
}

