import { getCmsWebinarCards } from '@/lib/cms/webinar';

export type WebinarCardItem = {
  title: string;
  desc: string;
  image: string;
  link: string;
  buttonLabel?: string;
};

function hasWebinarsCmsConfig() {
  return Boolean(process.env.WP_BASE_URL);
}

function getFallbackWebinarCards(): WebinarCardItem[] {
  return [
    {
      title: 'Unlock 30% better quality control',
      desc: 'Discover proven strategies to enhance product data accuracy and labeling processes, ensuring 100% compliance.',
      image: '/resources/Webinar_Cover-1-Secure_Food.png',
      link: 'https://www.event.5flowtech.com/fr/webinaire-securefood',
      buttonLabel: 'Watch now',
    },
  ];
}

export async function getWebinarCards(): Promise<WebinarCardItem[]> {
  if (!hasWebinarsCmsConfig()) return getFallbackWebinarCards();

  try {
    const cmsCards = await getCmsWebinarCards();
    return cmsCards.length > 0 ? cmsCards : getFallbackWebinarCards();
  } catch {
    return getFallbackWebinarCards();
  }
}
