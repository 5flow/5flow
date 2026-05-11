import { getCmsDownloadCards } from '@/lib/cms/download';

export type DownloadCardItem = {
  title: string;
  desc: string;
  image: string;
  imageFocus?: string;
  href: string;
  buttonLabel?: string;
};

function hasDownloadsCmsConfig() {
  return Boolean(process.env.WP_BASE_URL);
}

export async function getDownloadCards(): Promise<DownloadCardItem[]> {
  if (!hasDownloadsCmsConfig()) return [];

  try {
    return await getCmsDownloadCards();
  } catch {
    return [];
  }
}
