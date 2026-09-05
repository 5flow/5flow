import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EpisodeOnePage from '@/components/page/resources/EpisodeOnePage';
import PodcastEpisodeCmsPage from '@/components/page/resources/PodcastEpisodeCmsPage';
import { getCmsPodcastEpisodeBySlug } from '@/lib/cms/podcast';

type PodcastEpisodeRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PodcastEpisodeRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getCmsPodcastEpisodeBySlug(slug);

  if (!episode && slug === 'episode-1') {
    return {
      title: 'Rebuilding Packaging Workflows with AI | Under Review',
      description:
        'Sriram Upadhyayula discusses how AI is reshaping packaging workflows, quality control, and enterprise adoption.',
    };
  }

  return {
    title: episode ? `${episode.title} | Under Review` : 'Podcast Episode | Under Review',
    description: episode?.excerpt || episode?.heroDescription,
  };
}

export default async function PodcastEpisodeRoute({ params }: PodcastEpisodeRouteProps) {
  const { slug } = await params;
  const episode = await getCmsPodcastEpisodeBySlug(slug);

  if (episode) return <PodcastEpisodeCmsPage episode={episode} />;
  if (slug === 'episode-1') return <EpisodeOnePage />;
  notFound();
}
