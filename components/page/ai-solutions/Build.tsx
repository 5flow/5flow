import Image from 'next/image';
import Link from 'next/link';
import { Check, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullBleedLines from '@/components/core/full-bleed-lines';

const checks = [
  {
    title: 'No separate workflow',
    desc: 'Quality checks happen directly inside the review process.',
  },
  {
    title: 'No extra review step',
    desc: 'Keep approvals moving without adding complexity.',
  },
  {
    title: 'No loss of control',
    desc: 'AI assists. Humans decide.',
  },
];

export default function Build() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-4 text-center sm:px-6 md:px-0">
      <FullBleedLines>
        <h2 className="font-heading text-[42px] leading-tight font-bold tracking-normal md:text-[56px]">
          Built into your review process.
        </h2>
        <p className="text-primary mt-6 text-[34px] leading-tight tracking-normal md:text-[44px]">
          AI support where you actually need it.
        </p>
        <p className="mx-auto mt-6 max-w-4xl text-base leading-6 tracking-normal text-[#262626] md:text-xl md:leading-7">
          QC Assist embeds AI-assisted quality intelligence directly into artwork reviews, helping teams identify
          potential issues without introducing additional tools, workflows or review steps.
        </p>
      </FullBleedLines>

      <FullBleedLines className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative min-h-[430px]">
          <Image
            src="/ai%20solutions/QC_Assist_Label.webp"
            alt="QC Assist label review with spelling, barcode and regulatory findings"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-contain"
          />
        </div>

        <article className="bg-background mx-auto flex w-full max-w-[460px] flex-col gap-8 rounded-lg p-8 text-left shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]">
          {checks.map(item => (
            <div key={item.title} className="flex gap-5">
              <Check className="mt-1 h-9 w-9 shrink-0 text-success" strokeWidth={2.2} />
              <div>
                <h3 className="text-primary text-2xl leading-tight font-bold tracking-normal">{item.title}</h3>
                <p className="mt-1 text-xl leading-7 tracking-normal text-[#262626]">{item.desc}</p>
              </div>
            </div>
          ))}

          <Button
            asChild
            size="lg"
            className="group/cta-hero active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-3 self-start rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-300 ease-[var(--easing-smooth)] hover:gap-0 active:translate-x-px active:scale-[0.99] active:ring-2 active:ring-offset-2"
          >
            <Link href="/contact" aria-label="Book a demo">
              <span className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 items-center px-6 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta-hero:px-7">
                Book a Demo
              </span>
              <span
                className="bg-primary text-primary-foreground group-hover/cta-hero:bg-primary/90 group-active/cta-hero:bg-primary/80 inline-flex h-10 w-10 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)]"
                aria-hidden="true"
              >
                <MoveUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </article>
      </FullBleedLines>
    </section>
  );
}
