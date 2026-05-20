'use client';

import Image from 'next/image';
import InlineHighlight from '@/components/core/inline-highlight';
import FullBleedLines from '@/components/core/full-bleed-lines';
import LeadForm from '@/components/page/contact/LeadForm';

type ContactProps = {
  leadingText?: string;
  highlightedText?: string;
  trailingText?: string;
  heading?: React.ReactNode;
  headingClassName?: string;
  className?: string;
  headingWrapperClassName?: string;
};

export function Contact({
  leadingText = 'Built for the way brands',
  highlightedText = 'work today.',
  trailingText = '',
  heading,
  headingClassName = '',
  className = '',
  headingWrapperClassName = '',
}: ContactProps) {
  return (
    <div className={`flex flex-col gap-4 md:gap-8 ${className}`}>
      <FullBleedLines className={`font-heading mx-auto w-full max-w-3xl gap-16 px-2 py-8 ${headingWrapperClassName}`}>
        <p className={`text-center text-4xl leading-none font-bold tracking-tight md:text-[64px] ${headingClassName}`}>
          {heading || (
            <>
              {leadingText} <InlineHighlight>{highlightedText}</InlineHighlight>
              {trailingText && <> {trailingText}</>}
            </>
          )}
        </p>
      </FullBleedLines>

      <FullBleedLines>
        <div className="relative w-full">
          <div className="bg-primary relative flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl px-4 py-8 md:flex-row md:items-center md:px-16 md:py-12">
            <LeadForm
              className="z-20 w-full items-start justify-center md:w-[64%]"
              buttonHeightClassName="h-12"
              fieldClassName="min-h-14 text-lg"
              fieldsClassName="w-full max-w-[700px] gap-4"
              progressClassName="w-full max-w-[700px]"
              footerClassName="w-full max-w-[700px]"
              titleClassName="flex w-full max-w-[700px] justify-center md:justify-end md:pr-6"
              title={
                <InlineHighlight className="bg-success">
                  <span className="font-heading text-foreground px-1 text-4xl leading-none font-bold tracking-tighter sm:text-5xl md:text-[64px]">
                    Contact us
                  </span>
                </InlineHighlight>
              }
            />

            <Image
              className="relative hidden h-full w-full object-cover pt-10 md:absolute md:top-0 md:right-0 md:flex md:h-full md:w-auto md:pt-0"
              width={1520}
              height={562}
              alt="vector"
              src="/img/contact-form.png"
            />
          </div>
        </div>
      </FullBleedLines>
    </div>
  );
}
