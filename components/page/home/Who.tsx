'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

const CLIENT_IMAGE_FILENAMES = [
  'loreal.webp',
  'Mondelez_internationa.webp',
  'ludwig-schokolade.webp',
  'Kroger.webp',
  'gropper.webp',
  'lanxess.webp',
  'maurer-and-wirtz.webp',
  'vitakraft.webp',
  'Anheuser_Busch.webp',
  'Albertsons.webp',
  'Chick-fil-A_Logo.webp',
  'LVMH-black.webp',
  'Purina.webp',
  'Renault.webp',
];

interface WhoClient {
  imageUrl: string;
  altText?: string;
}
interface WhoProps {
  path?: string;
  clients?: WhoClient[];
  title?: string;
}

const DEFAULT_CLIENTS: WhoClient[] = CLIENT_IMAGE_FILENAMES.map(name => ({ imageUrl: name }));

const Who = ({ path = 'home', clients = DEFAULT_CLIENTS, title }: WhoProps) => {
  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="flex w-full flex-col gap-4 md:gap-8">
      <FullBleedLines>
        <div className="flex items-center justify-center gap-2 px-4 sm:gap-8 sm:px-8">
          <ArrowDown className="text-accent1 h-16 w-16 shrink-0 sm:h-20 sm:w-20 md:h-28 md:w-28" aria-hidden />
          <p className="font-heading text-center text-4xl leading-tight font-bold tracking-tight sm:text-6xl sm:leading-none md:text-[64px]">
            <InlineHighlight>{(title || 'Who Do We Solve It For?').split(' ')[0]}</InlineHighlight>{' '}
            {(title || 'Who Do We Solve It For?').split(' ').slice(1).join(' ')}
          </p>
        </div>
      </FullBleedLines>

      <FullBleedLines>
        <div className="group relative overflow-hidden">
          {/* Left fade gradient */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[50px] bg-gradient-to-r from-white to-transparent" />
          {/* Right fade gradient */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[50px] bg-gradient-to-l from-white to-transparent" />

          <div className="animate-marquee flex w-max gap-2 group-hover:[animation-play-state:paused]">
            {duplicatedClients.map((item, i) => (
              <div
                className="bg-background flex h-32 min-w-50 flex-col items-center justify-center rounded-2xl p-2 md:h-38 md:min-w-76"
                key={i}
              >
                <div className="flex w-full items-center justify-center p-8">
                  <Image
                    src={item.imageUrl?.startsWith('http') ? item.imageUrl : `/${path}/${item.imageUrl}`}
                    alt={item.altText || 'Client Logo'}
                    width={150}
                    height={75}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FullBleedLines>
    </div>
  );
};

export default Who;
