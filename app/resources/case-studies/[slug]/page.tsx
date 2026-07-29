import Image from 'next/image';
import type { CSSProperties } from 'react';
import HtmlContent from '@/components/core/html-content';
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/resources/case-studies';

export default async function CaseStudyPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getCaseStudyBySlug(slug);
  if (!post) return <div className="container mx-auto py-20">Post not found.</div>;

  return (
    <div className="relative">
      {post.image ? (
        <div
          className="relative h-[45vh] min-h-[320px] w-full md:h-[var(--case-study-hero-height)] md:min-h-[520px]"
          style={{ '--case-study-hero-height': post.desktopImageHeight || '60vh' } as CSSProperties}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            style={{ objectPosition: post.imageFocus || 'center' }}
            priority
          />
        </div>
      ) : null}

      <div className="container mx-auto mb-32">
        <div className="mx-auto max-w-3xl px-5 py-10 md:px-0">
          <h1 className="font-heading mb-6 text-3xl leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <div className="text-foreground/60 mb-8 text-sm">{new Date(post.date).toLocaleDateString()}</div>
          <div className="md:[&_p]:font-body md:[&_p]:text-[20px] md:[&_p]:leading-7 md:[&_p]:font-normal md:[&_p]:tracking-normal md:[&_p]:text-[#030712cc]">
            <HtmlContent html={post.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map(slug => ({ slug }));
}





