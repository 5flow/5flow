import { features } from '@/lib/features';
import { getGenericPageBySlug } from '@/lib/cms/page';
import Hero from './Hero';
import Vision from './Vision';
import Mission from './Mission';
import Propelis from './Propelis';
import Workflow from './Workflow';
import Apart from './Apart';
import Performance from './Performance';
import Results from './Results';

// Very simple paragraph splitter from WP bodyHtml
function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractImages(html: string): string[] {
  const images: string[] = [];
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (match[1]) images.push(match[1]);
  }
  return images;
}

function splitParagraphs(html: string): string[] {
  if (!html) return [];
  // Remove headings and blockquotes entirely
  const cleaned = html
    .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, '')
    .replace(/<blockquote[^>]*>[\s\S]*?<\/blockquote>/gi, '');
  // Strip newlines, split on <p> tags, decode entities
  const parts = cleaned
    .replace(/\n+/g, ' ')
    .split(/<p[^>]*>/i)
    .map(p => {
      let text = p.replace(/<\/p>/gi, '');
      text = text.replace(/<[^>]+>/g, ''); // Strip all HTML tags
      return decodeEntities(text.trim());
    })
    .filter(Boolean);

  // Fallback if no p tags found but content exists
  if (parts.length === 0 && cleaned.trim().length > 0) {
    const text = cleaned.replace(/<[^>]+>/g, '');
    const decoded = decodeEntities(text.trim());
    if (decoded) return [decoded];
  }

  return parts;
}

export default async function AboutServerSections() {
  if (!features.enabled) {
    return (
      <>
        <Hero />
        <Vision />
        <Mission />
        <Propelis />
        <Apart />
        <Workflow />
        <Performance />
        <Results />
      </>
    );
  }

  try {
    const page = await getGenericPageBySlug('about');
    if (!page) {
      return (
        <>
          <Hero />
          <Vision />
          <Mission />
          <Propelis />
          <Apart />
          <Workflow />
          <Performance />
          <Results />
        </>
      );
    }

    let heroImages = page.heroImages || [];
    let workflowImages: string[] = [];

    if (heroImages.length === 0 && page.bodyHtml) {
      const allImages = extractImages(page.bodyHtml);
      heroImages = allImages.slice(0, 6);
      workflowImages = allImages.slice(6, 9);
    } else if (page.bodyHtml) {
      // If hero images are set via ACF, try to get workflow images from body
      // assuming they might be after the hero images if they were all in body,
      // but here we just grab from start if hero is already satisfied by ACF?
      // Actually, if hero is satisfied by ACF, the body might still contain the workflow images.
      // Let's just grab all images from body and use them for workflow if hero is already set.
      const allImages = extractImages(page.bodyHtml);
      // If the body contains ALL images (including hero ones that are also in ACF),
      // we might be grabbing hero images again.
      // But typically if using ACF for hero, body might only have the rest.
      // Let's just take the first 3 for workflow if hero is already set.
      workflowImages = allImages.slice(0, 3);
    }

    const paras = splitParagraphs(page.bodyHtml);
    // Naive mapping of paragraphs to sections
    const heroDesc = paras[0];
    const propelisDescription = paras[1];
    const visionTitle = paras[2];
    const visionText = paras[3];
    const missionTitle = paras[4];
    const missionText = paras[5];
    const workflowIntro = paras[6];
    const workflowIso = paras[7];
    const apartFeatureParas = paras.slice(8, 12); // up to 4 features
    const features = apartFeatureParas.map(p => {
      // Split first sentence as title (approx)
      const firstPeriod = p.indexOf('.') !== -1 ? p.indexOf('.') + 1 : p.length;
      const title = p.slice(0, firstPeriod).trim();
      const description = p.slice(firstPeriod).trim() || title;
      return { title, description };
    });
    return (
      <>
        <Hero description={heroDesc} images={heroImages} />
        <Vision visionTitle={visionTitle} visionText={visionText} />
        <Mission missionTitle={missionTitle} missionText={missionText} />
        <Propelis propelisDescription={propelisDescription} />
        <Apart features={features} />
        <Workflow introText={workflowIntro} isoText={workflowIso} images={workflowImages} />
        <Performance />
        <Results />
      </>
    );
  } catch (e) {
    return (
      <>
        <Hero />
        <Vision />
        <Mission />
        <Propelis />
        <Apart />
        <Workflow />
        <Performance />
        <Results />
      </>
    );
  }
}
