import { features } from '@/lib/features';
import { getHomepage } from '@/lib/cms/homepage';
import { getHeroSections } from '@/lib/cms/hero';
import Hero from './Hero';

interface ServerHeroProps {
  slug?: string;
}

export default async function ServerHero({ slug }: ServerHeroProps) {
  if (!features.enabled) {
    return <Hero />;
  }

  try {
    // Preferred: homepage CPT meta
    const homepage = await getHomepage(slug);
    if (homepage?.hero?.title || homepage?.hero?.bodyHtml) {
      return (
        <Hero
          title={homepage.hero?.title}
          subTitle={homepage.hero?.subtitle}
          bodyHtml={homepage.hero?.bodyHtml}
          buttonText={homepage.hero?.ctaText}
          buttonUrl={homepage.hero?.ctaUrl}
        />
      );
    }
    // Fallback: legacy hero sections
    const sections = await getHeroSections('home');
    const first = sections?.[0];
    if (first) {
      return (
        <Hero
          title={first.title}
          subTitle={first.subtitle}
          bodyHtml={first.bodyHtml}
          buttonText={first.cta?.buttonText}
        />
      );
    }
    return <Hero />;
  } catch {
    return <Hero />;
  }
}
