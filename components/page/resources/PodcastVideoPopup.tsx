import { getYoutubeVideoId } from '@/lib/cms/podcast';

type PodcastVideoPopupProps = {
  youtubeUrl?: string;
  title?: string;
};

export default function PodcastVideoPopup({
  youtubeUrl = 'https://www.youtube.com/watch?v=1dUPMP1-VzE',
  title = 'Rebuilding packaging workflows with AI',
}: PodcastVideoPopupProps = {}) {
  const videoId = getYoutubeVideoId(youtubeUrl) || '1dUPMP1-VzE';

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black md:aspect-auto md:h-full md:min-h-[21rem]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
