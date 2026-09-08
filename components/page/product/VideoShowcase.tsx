'use client';

import React from 'react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

interface VideoShowcaseProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  highlightedWord?: string;
  videoUrl: string;
}

const VideoShowcase = ({ title, subtitle, highlightedWord, videoUrl }: VideoShowcaseProps) => {
  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (typeof subtitle === 'string' && highlightedWord) {
      const parts = subtitle.split(highlightedWord);
      return (
        <>
          {parts[0]}
          <InlineHighlight>{highlightedWord}</InlineHighlight>
          {parts[1]}
        </>
      );
    }

    return <>{subtitle}</>;
  };

  return (
    <div className="relative w-full flex-col px-4 sm:px-6 md:px-0">
      {/* Header */}
      <div className="font-heading mt-8 flex flex-col gap-4 text-center sm:text-left md:mt-14">
        <FullBleedLines>
          <div className="max-w-full sm:max-w-4xl">
            <b className="text-4xl leading-tight tracking-tight sm:text-6xl sm:leading-none">{title}</b>
          </div>
        </FullBleedLines>
        {subtitle && (
          <div className="text-primary text-2xl leading-tight tracking-tight sm:text-5xl sm:leading-none">
            <FullBleedLines>{renderSubtitle()}</FullBleedLines>
          </div>
        )}
      </div>

      {/* Video */}
      <FullBleedLines className="mt-8 sm:mt-16">
        <div className="relative w-full overflow-hidden rounded-[10px] sm:rounded-[20px]">
          <video className="h-auto w-full" autoPlay loop muted playsInline preload="metadata" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </FullBleedLines>
    </div>
  );
};

export default VideoShowcase;
