import Link from 'next/link';
import { ArrowUpRight, Cloud, MessageSquare, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HowItem = { title: string; desc: string; link?: string; iconKey?: string };
type HowProps = { title?: string; subtitle?: string; desc?: string; items?: HowItem[] };

const cards = [
  {
    title: 'WAVE Platform',
    lead: 'Bye bye artwork chaos.',
    body: (
      <>
        Centralize reviews, approvals and packaging workflows in one <strong>AI-powered platform.</strong>
      </>
    ),
    link: '/products/wave',
    icon: Cloud,
  },
  {
    title: 'Custom Solutions',
    lead: 'Built around your business.',
    body: (
      <>
        Tailored solutions designed for your <strong>systems, teams and unique requirements.</strong>
      </>
    ),
    link: '/products/mediabox',
    icon: Puzzle,
  },
  {
    title: 'Consulting',
    lead: 'Packaging expertise that drives change.',
    body: (
      <>
        Improve processes, eliminate bottlenecks and build <strong>workflows that scale.</strong>
      </>
    ),
    link: '/solutions/consulting',
    icon: MessageSquare,
  },
];

const How = (_props: HowProps) => {
  void _props;

  return (
    <section className="text-foreground w-full px-2 py-14 md:py-18">
      <div className="w-full">
        <div className="grid items-start gap-8 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <div>
            <h2 className="font-heading text-[40px] leading-[1.08] font-bold tracking-normal sm:text-5xl md:text-[56px]">
              Sound familiar?
            </h2>
            <p className="text-primary mt-3 text-[30px] leading-[1.12] font-normal tracking-normal sm:text-[38px] md:text-[42px]">
              That&apos;s exactly why 5Flow exists.
            </p>
          </div>

          <p className="font-heading max-w-[560px] text-2xl leading-[1.2] font-bold tracking-normal md:pt-9 md:text-[30px]">
            One partner. Three ways to
            <br />
            simplify packaging operations.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-2">
          {cards.map(({ title, lead, body, link, icon: Icon }) => (
            <article
              key={title}
              className="bg-background flex min-h-[232px] flex-col rounded-lg p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.102),0px_10px_15px_-3px_rgba(0,0,0,0.102)]"
            >
              <div className="flex items-center gap-5">
                <Icon className="text-primary h-11 w-11 shrink-0" strokeWidth={1.8} />
                <h3 className="text-[25px] leading-[1.08] font-bold tracking-normal text-[#111827]">{title}</h3>
              </div>

              <p className="text-primary mt-10 text-[22px] leading-7 font-bold tracking-normal">{lead}</p>
              <p className="font-body mt-5 max-w-[255px] text-base leading-tight font-normal tracking-tight text-[#030712cc] sm:text-xl sm:leading-none md:text-[20px] md:leading-7 md:tracking-normal [&_strong]:font-bold">
                {body}
              </p>

              <Link href={link} className="mt-auto self-end">
                <Button
                  className="bg-primary hover:ring-primary/50 hover:ring-offset-background size-12 origin-center cursor-pointer rounded-none px-2 py-1 transition-all duration-300 ease-[var(--easing-smooth)] hover:translate-x-[1px] hover:scale-[0.92] hover:ring-4 hover:ring-offset-2 active:scale-[0.9] active:ring-6"
                  aria-label={`Learn more about ${title}`}
                >
                  <ArrowUpRight className="size-6" />
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How;
