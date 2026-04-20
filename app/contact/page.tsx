import PageHeader from '@/components/core/page-header';
import Form from '@/components/page/contact/Form';
import Hero from '@/components/page/contact/Hero';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { features } from '@/lib/features';
import { getGenericPageBySlug } from '@/lib/cms/page';

type ContactCopy = {
  title: string;
  heroHeadline: string;
  heroHighlightWords: number;
  supporting: [string, string];
};

const FALLBACK_COPY: ContactCopy = {
  title: "let's talk.",
  heroHeadline: 'Ready when you are.',
  heroHighlightWords: 1,
  supporting: [
    `We're here to help you move faster, smarter, and with less complexity`,
    `Whether you want a product demo, a pricing discussion, or just answers to your workflow questions, the 5Flow team is ready. Let's bring your vision to life.`,
  ],
};

export default async function Contact() {
  const copy = await resolveContactCopy();

  return (
    <div className="relative">
      <div className="container mx-auto mb-32">
        <PageHeader title={copy.title} />
        <div className="mt-8 flex flex-col gap-14 md:mt-0">
          <Hero headline={copy.heroHeadline} highlightWords={copy.heroHighlightWords} />
          <Form />
          <div className="flex flex-col gap-8">
            <FullBleedLines className="text-primary font-heading max-w-5xl text-xl leading-none tracking-tight md:text-5xl">
              {copy.supporting[0]}
            </FullBleedLines>
            <FullBleedLines className="max-w-2xl text-sm md:text-base">{copy.supporting[1]}</FullBleedLines>
          </div>
        </div>
      </div>
    </div>
  );
}

async function resolveContactCopy(): Promise<ContactCopy> {
  if (!features.enabled) return FALLBACK_COPY;
  try {
    const page = await getGenericPageBySlug('contact');
    if (!page) return FALLBACK_COPY;
    const heroHeadline = extractHeroHeadline(page.bodyHtml) || FALLBACK_COPY.heroHeadline;
    const paragraphs = splitParagraphs(page.bodyHtml);
    const supporting = ensureSupporting(paragraphs.slice(0, 2) as [string | undefined, string | undefined]);

    return {
      title: page.title || FALLBACK_COPY.title,
      heroHeadline,
      heroHighlightWords: FALLBACK_COPY.heroHighlightWords,
      supporting,
    };
  } catch {
    return FALLBACK_COPY;
  }
}

function ensureSupporting(values: [string | undefined, string | undefined]): [string, string] {
  return [values[0]?.trim() || FALLBACK_COPY.supporting[0], values[1]?.trim() || FALLBACK_COPY.supporting[1]];
}

function decodeEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => decodeCodePoint(hex, 16))
    .replace(/&#(\d+);/g, (_, code) => decodeCodePoint(code, 10));
}

function decodeCodePoint(value: string, base: number): string {
  const code = parseInt(value, base);
  if (Number.isNaN(code)) return '';
  try {
    return String.fromCodePoint(code);
  } catch {
    return '';
  }
}

function splitParagraphs(html: string): string[] {
  if (!html) return [];
  const cleaned = html
    .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, '')
    .replace(/<blockquote[^>]*>[\s\S]*?<\/blockquote>/gi, '');
  return cleaned
    .replace(/\n+/g, ' ')
    .split(/<p[^>]*>/i)
    .map(p => decodeEntities(p.replace(/<\/p>/gi, '').trim()))
    .filter(Boolean);
}

function extractHeroHeadline(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return null;
  const text = match[1].replace(/<br\s*\/?>(\s*)/gi, ' ').replace(/<[^>]+>/g, ' ');
  const normalized = decodeEntities(text).replace(/\s+/g, ' ').trim();
  return normalized || null;
}

