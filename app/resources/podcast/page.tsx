import type { Metadata } from 'next';
import PodcastPage from '@/components/page/resources/PodcastPage';

export const metadata: Metadata = {
  title: 'Under Review Podcast | 5Flow',
  description: 'Real conversations with the people who make packaging and brand execution happen.',
};

export default function Podcast() {
  return <PodcastPage />;
}
