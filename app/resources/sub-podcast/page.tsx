import type { Metadata } from 'next';
import SubPodcastPage from '@/components/page/resources/SubPodcastPage';

export const metadata: Metadata = {
  title: 'Rebuilding Packaging Workflows with AI | Under Review',
  description:
    'Sriram Upadhyayula discusses how AI is reshaping packaging workflows, quality control, and enterprise adoption.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubPodcast() {
  return <SubPodcastPage />;
}
