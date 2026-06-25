export default function PodcastVideoPopup() {
  return (
    <div className="relative m-1 aspect-video overflow-hidden rounded-2xl bg-black">
      <iframe
        className="absolute inset-0 h-full w-full"
        src="https://www.youtube.com/embed/1dUPMP1-VzE?rel=0"
        title="Rebuilding packaging workflows with AI"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
