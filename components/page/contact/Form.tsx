'use client';

import Image from 'next/image';
import FullBleedLines from '@/components/core/full-bleed-lines';
import LeadForm from '@/components/page/contact/LeadForm';

const Form = () => {
  return (
    <FullBleedLines className="w-full">
      <div className="bg-primary border-border flex w-full flex-col items-center justify-between rounded-2xl border py-12 md:flex-row md:pr-8">
        <div className="flex-1">
          <Image
            className="hidden object-cover md:flex"
            width={450}
            height={450}
            alt="Rings showcasing brand identity"
            src="/svg/rings.svg"
          />
        </div>

        <LeadForm
          className="flex-1 p-4 md:gap-8 md:p-0"
          title={
            <b className="text-success font-heading flex w-full text-4xl leading-none tracking-tight sm:text-5xl md:text-6xl">
              Contact Us
            </b>
          }
        />
      </div>
    </FullBleedLines>
  );
};

export default Form;
