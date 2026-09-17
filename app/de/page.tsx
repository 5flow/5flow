import { HomePage } from '@/app/page';
import type { Metadata } from 'next';

const GERMAN_HOME_SLUG = 'home-3';

export const metadata: Metadata = {
  title: '5Flow | Startseite',
  description: "German homepage powered by the WordPress translation entry for 5Flow's home page.",
};

export default function GermanHome() {
  return <HomePage cmsSlug={GERMAN_HOME_SLUG} />;
}
