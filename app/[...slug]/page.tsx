import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import HtmlContent from '@/components/core/html-content';
import { getCmsPageByPath } from '@/lib/cms/routed-page';
import { getMetadataForCmsUrl } from '@/lib/cms/seo';

type PageProps = { params: Promise<{ slug: string[] }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCmsPageByPath(`/${slug.join('/')}`);
  if (!page) notFound();
  return getMetadataForCmsUrl(page.link);
}

export default async function CmsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getCmsPageByPath(`/${slug.join('/')}`);
  if (!page) notFound();

  return (
    <article className="container mx-auto px-5 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading mb-8 text-3xl sm:text-4xl">
          {parse(page.title.rendered)}
        </h1>
        <HtmlContent html={page.content.rendered} />
      </div>
    </article>
  );
}
