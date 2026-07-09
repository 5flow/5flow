import type { Metadata } from 'next';
import EpisodeOnePage from '@/components/page/resources/EpisodeOnePage';

export const metadata: Metadata = {
  title: 'Rebuilding Packaging Workflows with AI | Under Review',
  description:
    'Sriram Upadhyayula discusses how AI is reshaping packaging workflows, quality control, and enterprise adoption.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EpisodeOne() {
  return <EpisodeOnePage />;
}
