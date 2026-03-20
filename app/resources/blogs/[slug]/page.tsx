import { getBlogBySlug, getBlogSlugs } from '@/lib/resources/blogs';
import HtmlContent from '@/components/core/html-content';
import Image from 'next/image';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return <div className="container mx-auto py-20">Post not found.</div>;

  return (
    <div className="relative">
      {post.image ? (
        <div className="relative h-[45vh] min-h-[320px] w-full md:h-[60vh] md:min-h-[520px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            style={{ objectPosition: post.imageFocus || 'center' }}
            priority
          />
          <div
            className="to-background pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <div className="container mx-auto mb-32">
        <div className="mx-auto max-w-3xl py-10 px-5 md:px-0">
          <h1 className="font-heading mb-6 text-3xl leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <div className="text-foreground/60 mb-8 text-sm">{new Date(post.date).toLocaleDateString()}</div>
          <HtmlContent html={post.content} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

