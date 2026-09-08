import PageHeader from '@/components/core/page-header';
import Hero from '@/components/page/about/Hero';
import Vision from '@/components/page/about/Vision';
import Mission from '@/components/page/about/Mission';
import Propelis from '@/components/page/about/Propelis';
import Apart from '@/components/page/about/Apart';
import Workflow from '@/components/page/about/Workflow';
import Performance from '@/components/page/about/Performance';
import Results from '@/components/page/about/Results';
import type { Metadata } from 'next';
import { features } from '@/lib/features';
import { getAbout } from '@/lib/cms/about';

export const metadata: Metadata = {
  title: 'Artwork Collaboration Platform for Brands | 5Flow',
  description:
    'Learn how 5Flow helps brands streamline artwork collaboration, automate workflows, maintain compliance and centralize creative assets across teams.',
};
export default async function About() {
  let cms = null as Awaited<ReturnType<typeof getAbout>> | null;
  if (features.enabled) {
    cms = await getAbout('about').catch(() => null);
  }

  const apartItems = cms?.apart?.items?.map(item => ({
    title: item.title || '',
    description: item.description || '',
    iconKey: item.iconKey || item.icon_key,
  }));

  const performanceStats = cms?.performance?.stats?.map(stat => ({
    value: stat.value || '',
    label: stat.label || '',
  }));

  return (
    <div className="relative">
      <div className="container mx-auto">
        <PageHeader title={cms?.pageHeaderTitle || 'we. are.'} />
        <div className="mt-0 flex flex-col gap-16 md:mt-8 md:gap-32">
          <Hero description={cms?.hero?.description} images={cms?.hero?.images} />
          <div className="flex flex-col gap-8 md:gap-16">
            <Vision visionTitle={cms?.vision?.title} visionText={cms?.vision?.text} />
            <Mission missionTitle={cms?.mission?.title} missionText={cms?.mission?.text} />
          </div>
          <Propelis
            title={cms?.propelis?.title}
            highlight={cms?.propelis?.highlight}
            propelisDescription={cms?.propelis?.description}
          />
          <Apart titleOverride={cms?.apart?.title} highlight={cms?.apart?.highlight} features={apartItems} />
        </div>
      </div>

      {/* Full-width sections outside container */}
      <div className="mt-16 flex flex-col gap-16 md:mt-32 md:gap-32">
        <Workflow
          title={cms?.workflow?.title}
          highlight={cms?.workflow?.highlight}
          introText={cms?.workflow?.introText}
          images={cms?.workflow?.images}
          isoText={cms?.workflow?.isoText}
        />
        <div className="relative container mx-auto">
          <Performance
            title={cms?.performance?.title}
            highlight={cms?.performance?.highlight}
            description={cms?.performance?.description}
            stats={performanceStats}
          />
          <Results
            title={cms?.results?.title}
            highlight={cms?.results?.highlight}
            description={cms?.results?.description}
            ctaText={cms?.results?.ctaText}
            ctaUrl={cms?.results?.ctaUrl}
          />
        </div>
      </div>
    </div>
  );
}
