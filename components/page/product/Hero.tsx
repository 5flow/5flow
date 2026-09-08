import React from 'react';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import FullBleedLines from '@/components/core/full-bleed-lines';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import InlineCmsText from '@/components/core/inline-cms-text';

export interface HeroProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  mobileImageSrc?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageWidth: number;
  imageAlt?: string;
}

const Hero = ({
  logoSrc,
  logoAlt,
  title,
  subtitle,
  description,
  imageSrc,
  mobileImageSrc,
  buttonText,
  buttonUrl = '/contact',
  imageWidth,
  imageAlt = '',
}: HeroProps) => {
  return (
    <div className="relative w-full flex-col px-4 sm:px-6 md:px-0">
      {/* Product logo */}
      <FullBleedLines className="flex h-20 justify-center px-24 sm:justify-start md:px-0">
        <Image className="relative h-20" width={imageWidth} height={80} alt={logoAlt} src={logoSrc} />
      </FullBleedLines>

      {/* Product headling */}
      <div className="font-heading mt-8 flex flex-col gap-4 text-center sm:text-left md:mt-14">
        <FullBleedLines>
          <div className="max-w-full sm:max-w-5xl">
            <b className="text-4xl leading-tight tracking-tighter sm:text-8xl sm:leading-none">
              <InlineCmsText value={title} />
            </b>
          </div>
        </FullBleedLines>
        <div className="text-primary text-2xl leading-tight tracking-tighter sm:text-5xl sm:leading-none">
          <FullBleedLines>
            <InlineCmsText value={subtitle} />
          </FullBleedLines>
        </div>
      </div>

      {/* Product details */}
      <div className="relative mt-8 w-full text-center text-sm leading-[150%] tracking-tight sm:mt-14 sm:w-[642px] sm:text-left sm:text-base">
        <FullBleedLines>
          <InlineCmsText value={description} />
        </FullBleedLines>
      </div>

      <FullBleedLines className="mt-8 flex justify-center sm:mt-14 sm:justify-start">
        <Link href={buttonUrl}>
          <Button
            size="lg"
            className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-3 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2"
          >
            <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7">
              {buttonText || `Let’s Talk Transformation`}
            </span>
            <span
              className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
              aria-hidden="true"
            >
              <MoveUpRight className="h-4 w-4" />
            </span>
          </Button>
        </Link>
      </FullBleedLines>

      {/* Product image */}
      <FullBleedLines className="mt-8 sm:mt-16">
        {mobileImageSrc ? (
          <>
            {/* Mobile image */}
            <Image
              className="relative h-auto w-full rounded-[10px] sm:hidden"
              width={1520}
              height={480}
              alt={imageAlt}
              src={mobileImageSrc}
              sizes="100vw"
              priority
            />
            {/* Desktop+ image */}
            <Image
              className="relative hidden h-auto w-full rounded-[10px] sm:block sm:rounded-[20px]"
              width={1520}
              height={480}
              alt={imageAlt}
              src={imageSrc}
              sizes="(min-width: 640px) 100vw, 100vw"
              priority
            />
          </>
        ) : (
          <Image
            className="relative h-auto w-full rounded-[10px] sm:rounded-[20px]"
            width={1520}
            height={480}
            alt={imageAlt}
            src={imageSrc}
            sizes="100vw"
            priority
          />
        )}
      </FullBleedLines>
    </div>
  );
};

export default Hero;
