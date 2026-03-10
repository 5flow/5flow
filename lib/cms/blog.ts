import { wpFetch } from './client';
import { Blog, BlogCardItem } from '@/lib/resources/blogs';

export interface WpPost {
  id: number;
  date: string;
  slug: string;
  categories?: number[];
  title: { rendered: string };
  content: { rendered: string; raw?: string };
  excerpt: { rendered: string; raw?: string };
  acf?: {
    image_focus?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

type WpCategory = {
  id: number;
  slug: string;
};

const CASE_STUDIES_CATEGORY_SLUG = 'case-studies';

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch (e) {
    return dateString;
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#038;/g, '&')
    .replace(/&#039;/g, "'");
}

function parsePostData(post: WpPost) {
  const content = post.content.rendered;

  // Image priority: Featured Image > Fallback
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/product/rectangle.png';

  // Date priority: Post Date
  const date = formatDate(post.date);

  const imageFocus = post.acf?.image_focus;

  return {
    content,
    frontmatter: {},
    image,
    imageFocus,
    date,
    title: decodeHtmlEntities(post.title.rendered),
  };
}

async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    const categories = (await wpFetch(`/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`)) as WpCategory[];
    return categories[0]?.id ?? null;
  } catch (error) {
    console.error(`Error fetching category "${slug}":`, error);
    return null;
  }
}

export async function getCmsBlogs(): Promise<BlogCardItem[]> {
  try {
    const caseStudyCategoryId = await getCategoryIdBySlug(CASE_STUDIES_CATEGORY_SLUG);
    const categoryExclusion = caseStudyCategoryId ? `&categories_exclude=${caseStudyCategoryId}` : '';
    const posts = (await wpFetch(`/wp-json/wp/v2/posts?_embed&per_page=100${categoryExclusion}`)) as WpPost[];
    return posts.map(post => {
      const { image, imageFocus, date, title } = parsePostData(post);

      return {
        title,
        desc: '', // User requested no description
        date,
        image,
        imageFocus,
        link: `/resources/blogs/${post.slug}`,
      };
    });
  } catch (error) {
    console.error('Error fetching CMS blogs:', error);
    return [];
  }
}

export async function getCmsBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const posts = (await wpFetch(`/wp-json/wp/v2/posts?slug=${slug}&_embed`)) as WpPost[];
    if (posts.length === 0) return null;
    const post = posts[0];
    const caseStudyCategoryId = await getCategoryIdBySlug(CASE_STUDIES_CATEGORY_SLUG);
    if (caseStudyCategoryId && post.categories?.includes(caseStudyCategoryId)) return null;

    const { content, image, imageFocus, date, title } = parsePostData(post);

    return {
      slug: post.slug,
      title,
      date,
      image,
      imageFocus,
      content,
    };
  } catch (error) {
    console.error(`Error fetching CMS blog ${slug}:`, error);
    return null;
  }
}

export async function getAllCmsBlogSlugs(): Promise<string[]> {
  try {
    const caseStudyCategoryId = await getCategoryIdBySlug(CASE_STUDIES_CATEGORY_SLUG);
    const categoryExclusion = caseStudyCategoryId ? `&categories_exclude=${caseStudyCategoryId}` : '';
    const posts = (await wpFetch(`/wp-json/wp/v2/posts?per_page=100&_fields=slug${categoryExclusion}`)) as {
      slug: string;
    }[];
    return posts.map(p => p.slug);
  } catch (error) {
    console.error('Error fetching CMS blog slugs:', error);
    return [];
  }
}
