'use client';

import Image from 'next/image';
import { useState } from 'react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Card } from '@/components/ui/card';
import DownloadLeadForm from '@/components/page/resources/DownloadLeadForm';
import type { DownloadCardItem } from '@/lib/resources/downloads';

type DownloadsSectionProps = {
  items: DownloadCardItem[];
};

export default function DownloadsSection({ items }: DownloadsSectionProps) {
  const [selectedItem, setSelectedItem] = useState<DownloadCardItem | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-8 px-4 sm:px-0">
      <FullBleedLines>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="relative flex h-full min-h-[28rem] flex-1 flex-col gap-0 rounded-2xl border p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-[20px] bg-primary/80 sm:h-65">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: item.imageFocus || 'center' }}
                  />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col px-2 py-4">
                <div className="flex flex-1 flex-col items-start gap-4">
                  <div className="flex w-full flex-col gap-2">
                    <b className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">{item.title}</b>
                    <div className="text-base leading-tight tracking-tight sm:text-lg">{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto inline-flex h-8 items-center px-4 text-sm font-semibold transition-colors"
                  >
                    {item.buttonLabel || 'Download now'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </FullBleedLines>
      {selectedItem ? <DownloadLeadForm item={selectedItem} onClose={() => setSelectedItem(null)} /> : null}
    </div>
  );
}
