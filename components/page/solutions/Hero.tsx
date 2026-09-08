import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Button } from '@/components/ui/button';
import InlineCmsText from '@/components/core/inline-cms-text';

export interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  mobileImageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const Hero = ({
  title,
  subtitle,
  description,
  mobileImageSrc,
  imageSrc,
  buttonText,
  buttonUrl = '/contact',
  imageAlt = '',
}: HeroProps) => {
  return (
    <div className="relative mt-32 flex w-full flex-col items-center text-center sm:items-start sm:text-left">
      <div className="flex w-full flex-col gap-4 sm:flex-row md:gap-14">
        {/* Product heading */}
        <div className="font-heading flex flex-1 justify-center sm:justify-start">
          <b className="max-w-full text-4xl leading-tight tracking-tighter sm:text-8xl sm:leading-none">
            <InlineCmsText value={title} />
          </b>
        </div>

        {/* Product details */}
        <div className="flex h-auto flex-1 flex-col items-center gap-8 sm:items-start sm:justify-between sm:gap-16">
          <p className="text-primary font-heading text-2xl leading-tight tracking-tighter sm:text-5xl sm:leading-none">
            <InlineCmsText value={subtitle} />
          </p>

          <div className="flex flex-col gap-6 sm:gap-8">
            <p className="relative text-sm leading-[150%] tracking-tight sm:text-base">
              <InlineCmsText value={description} />
            </p>
            <Link href={buttonUrl}>
              <Button
                size="lg"
                className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex w-fit origin-left items-center justify-center gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 sm:justify-start"
              >
                <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-5 sm:px-6 sm:group-hover/cta-hero:px-7">
                  {buttonText || `See What’s Possible`}
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
      </div>

      {/* Product image */}
      <FullBleedLines className="mt-16 w-full">
        {/* Mobile: square image */}
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[10px] bg-[#E8ECFE] sm:hidden">
          <Image
            src={mobileImageSrc ?? imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw"
            priority
          />
        </div>
        {/* Desktop+: original wide image */}
        <Image
          className="relative hidden w-full rounded-[10px] sm:block sm:rounded-[20px]"
          width={1520}
          height={480}
          alt={imageAlt}
          src={imageSrc}
          sizes="(min-width: 640px) 100vw"
          priority
        />
      </FullBleedLines>
    </div>
  );
};

export default Hero;
