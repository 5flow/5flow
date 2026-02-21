  import Link from 'next/link';
  import Image from 'next/image';
  import { ArrowUpRight, Shuffle } from 'lucide-react';
  import * as Lucide from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import FullBleedLines from '@/components/core/full-bleed-lines';
  import InlineHighlight from '@/components/core/inline-highlight';

  type WhyCard = { title: string; iconKey?: string; link?: string };
  type WhyProps = { title?: string; bodyHtml?: string; cards?: WhyCard[] };

  function toPascalCase(key: string): string {
    return key
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  const fallbackCards: WhyCard[] = [
    { title: 'From fragmented workflows → to connected systems', iconKey: 'shuffle', link: '/contact' },
    { title: 'From slow cycles → to agile execution', iconKey: 'zap', link: '/contact' },
    { title: 'From manual work → to brand enablement at scale', iconKey: 'scaling', link: '/contact' },
  ];

  const Why = ({ title, bodyHtml, cards }: WhyProps) => {
    const sectionTitle = title || 'Redefining the way brands create, scale, and deliver.';
    const data = cards && cards.length > 0 ? cards : fallbackCards;
    return (
      <div className="flex flex-col gap-4 md:gap-8">
        <FullBleedLines className="font-heading mx-auto w-full max-w-4xl gap-16 px-2 py-8">
          <p className="text-center text-4xl leading-none font-bold tracking-tight md:text-[64px]">
            {sectionTitle.split(' ').map((word, i) => {
              const highlightWords = ['create,', 'scale,', 'deliver.'];
              return highlightWords.includes(word) ? (
                <span key={i}><InlineHighlight>{word.replace(/[,\.]/, '')}</InlineHighlight> </span>
              ) : (
                <span key={i}>{word} </span>
              );
            })}
          </p>
        </FullBleedLines>

        <FullBleedLines>
          <div className="w-full">
            <div className="bg-primary flex w-full flex-col items-start justify-between gap-6 rounded-2xl py-8 md:flex-row md:items-center md:gap-0 md:py-0">
              <Image
                className="mr-10 hidden h-45 w-44 object-cover sm:h-36 sm:w-36 md:flex md:h-[460px] md:w-[450px]"
                width={450}
                height={450}
                alt="rings showcasing brand identity"
                src="/svg/rings.svg"
              />

              <div className="flex flex-col gap-8 p-2 md:pr-8">
                <p className="text-background max-w-4xl px-4 text-center text-sm font-medium tracking-tight sm:text-base md:px-0 md:text-left md:text-base">
                  {bodyHtml ||
                    '5FLOW started as a cloud-smart technology spin-off of the Matthews International Group in 2011. Now, part of the Propelis Group, 5FLOW combines over 150 years of creative, packaging, and brand production leadership with a technology-driven edge.'}
                </p>

                <div className="w-full">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {data.map((card, idx) => {
                      const Icon = (() => {
                        if (!card.iconKey) return Shuffle;
                        const pascal = toPascalCase(card.iconKey);
                        const Dynamic = (Lucide as Record<string, any>)[pascal];
                        return Dynamic || Shuffle;
                      })();

                      // Per-icon responsive sizes (mobile first)
                      const iconSizeClass = (() => {
                        switch (card.iconKey) {
                          case 'shuffle':
                            // smaller on mobile, larger on md+
                            return 'h-8 w-8 md:h-12 md:w-12';
                          case 'zap':
                            return 'h-8 w-8 md:h-10 md:w-10';
                          case 'scaling':
                            return 'h-8 w-8 md:h-8 md:w-8';
                          default:
                            return 'h-8 w-8 md:h-10 md:w-10';
                        }
                      })();

                      // Reduce left padding for the last (third) card only
                      // Apply smaller left padding on mobile and md+
                      const leftPad = idx === data.length - 1 ? 'pl-4 md:pl-2' : '';

                      const isWide = idx === data.length - 1; // last card spans columns when 3 fallback cards
                      return (
                        <div
                          key={idx}
                          className={`bg-background flex flex-col items-start justify-between gap-4 rounded-lg p-3 ${leftPad} ${
                            isWide ? 'md:col-span-2 md:flex-row md:items-center' : 'md:flex-row md:items-center'
                          }`}
                        >
                          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
                            <p className="max-w-72 text-base leading-none font-bold tracking-tight md:text-xl">
                              {card.title}
                            </p>
                          </div>
                          {card.link && (
                            <Link href={card.link}>
                              <Button
                                className="bg-primary hover:ring-primary/50 hover:ring-offset-background mt-2 size-12 origin-center cursor-pointer rounded-none px-2 py-1 transition-all duration-300 ease-[var(--easing-smooth)] hover:translate-x-[1px] hover:scale-[0.92] hover:ring-4 hover:ring-offset-2 active:scale-[0.9] active:ring-6 md:mt-0 md:ml-auto md:size-16 md:px-4 md:py-2"
                                aria-label="Contact"
                              >
                                <ArrowUpRight className="size-6 sm:size-8" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex w-full justify-center md:justify-end">
                  <Button
                    asChild
                    className="group/cta active:ring-primary/50 active:ring-offset-background inline-flex origin-left items-center justify-start gap-0 rounded-none !bg-transparent px-0 py-0 font-semibold tracking-tight transition-all duration-150 ease-[var(--easing-smooth)] active:translate-x-[1px] active:scale-[0.99] active:ring-2 active:ring-offset-2 has-[>svg]:px-0"
                  >
                    <Link href="/about" aria-label="About 5Flow">
                      <span className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 inline-flex h-9 items-center px-4 transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:px-3">
                        Read About Us
                      </span>
                      <span
                        className="bg-success text-success-foreground group-hover/cta:bg-success/90 group-active/cta:bg-success/80 ml-0 inline-flex h-9 w-9 items-center justify-center transition-all duration-300 ease-[var(--easing-smooth)] group-hover/cta:ml-2"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FullBleedLines>
      </div>
    );
  };

  export default Why;
