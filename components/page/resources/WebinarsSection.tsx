import Link from 'next/link';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type WebinarCardItem = {
  title: string;
  desc: string;
  image: string;
  link: string;
};

type WebinarsSectionProps = {
  items: WebinarCardItem[];
};

export default function WebinarsSection({ items }: WebinarsSectionProps) {
  return (
    <div className="flex w-full flex-col gap-8 px-4 sm:px-0">
      <FullBleedLines>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="relative flex h-full flex-1 flex-col gap-0 rounded-2xl border p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-[20px] sm:h-65">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              <div className="flex flex-1 flex-col px-2 py-4">
                <div className="flex flex-1 flex-col items-start gap-4 sm:gap-6">
                  <div className="flex w-full flex-col gap-2">
                    <b className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">{item.title}</b>
                    <div className="text-base leading-tight tracking-tight sm:text-lg">{item.desc}</div>
                  </div>
                  <Link href={item.link || '#'} className="mt-auto">
                    <Button
                      size="lg"
                      className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-0.5 active:scale-[0.99] active:ring-2 active:ring-offset-2"
                    >
                      <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                        Watch now
                      </span>
                      <span
                        className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                        aria-hidden="true"
                      >
                        <MoveUpRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </FullBleedLines>
    </div>
  );
}
