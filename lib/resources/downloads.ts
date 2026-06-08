import { getCmsDownloadCards } from '@/lib/cms/download';

export type DownloadCardItem = {
  title: string;
  desc: string;
  image?: string;
  imageFocus?: string;
  href: string;
  buttonLabel?: string;
};

function hasDownloadsCmsConfig() {
  return Boolean(process.env.WP_BASE_URL);
}

function getFallbackDownloadCards(): DownloadCardItem[] {
  return [
    {
      title: 'Is your artwork process managing you?',
      desc: "Most teams know something's not working. This checklist helps you see exactly where and how much it's actually costing you.",
      image: '/resources/Downloads_Card_Cover-Checklist.webp',
      href: '#',
      buttonLabel: 'Download now',
    },
    {
      title: 'Geo Resource Commitment',
      desc: 'Discover how to guarantee system availability, even in worst-case scenarios. Learn how to recover in under 24 hours and minimize data loss with dedicated geo-redundant infrastructure.',
      image: '/resources/Downloads_Card_Cover-GeoResourceCommitment.webp',
      href: '#',
      buttonLabel: 'Download now',
    },
  ];
}

export async function getDownloadCards(): Promise<DownloadCardItem[]> {
  if (!hasDownloadsCmsConfig()) return getFallbackDownloadCards();

  try {
    const cmsCards = await getCmsDownloadCards();
    return cmsCards.length > 0 ? cmsCards : getFallbackDownloadCards();
  } catch {
    return getFallbackDownloadCards();
  }
}
