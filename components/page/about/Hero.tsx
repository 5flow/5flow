import Image from 'next/image';
import FullBleedLines from '@/components/core/full-bleed-lines';

type HeroProps = { description?: string; images?: string[] };

const Hero = ({ description, images }: HeroProps) => {
  const defaultTopRowImages = ['/about/about1.png', '/about/about2.png', '/about/about3.png'];
  const defaultBottomRowImages = ['/about/about5.png', '/about/about6.png'];
  const defaultSideImage = '/about/about4.png';

  const topRowImages = images?.slice(0, 3) || defaultTopRowImages;
  const sideImage = images?.[3] || defaultSideImage;
  const bottomRowImages = images?.slice(4, 6) || defaultBottomRowImages;

  return (
    <>
      {/* Content */}
      <div className="flex flex-col gap-14 pb-4 md:pb-0">
        {/* Logo */}
        <FullBleedLines className="px-2">
          <Image
            width={356}
            height={80}
            sizes="100vw"
            alt="5Flow Brand"
            src="/brand.svg"
            className="flex w-full justify-center px-24 md:w-auto md:justify-start md:p-0"
          />
        </FullBleedLines>

        {/* Images */}
        <FullBleedLines className="flex w-full flex-col gap-4 sm:flex-row sm:gap-0">
          <div className="flex w-full flex-col">
            {/* Top row: 5 columns at sm+ */}
            <div className="bg-accent1 grid grid-cols-2 sm:grid-cols-5">
              {topRowImages.map((src, index) => (
                <Image
                  key={index}
                  className="relative h-48 w-full object-cover sm:h-72"
                  width={304}
                  height={295}
                  alt={`About image ${index + 1}`}
                  src={src}
                />
              ))}
              <div className="3xl:block 3xl:h-72 relative hidden h-48 w-full" />
              <Image
                className="relative h-48 w-full object-cover sm:h-72"
                width={304}
                height={295}
                alt="About image 4"
                src={sideImage}
              />
            </div>

            {/* Bottom row: 4 columns at sm+; 5 at 3xl to include accent */}
            <div className="bg-primary 3xl:grid-cols-5 grid w-full grid-cols-1 sm:grid-cols-4">
              <div className="relative h-48 w-full sm:col-span-2 sm:h-74">
                <div className="text-background flex h-full w-full flex-col justify-center gap-6 px-4 py-6 sm:w-140 sm:px-6 md:py-0">
                  <div className="font-heading text-4xl leading-snug font-semibold tracking-tight sm:leading-none">
                    We are 5Flow.
                  </div>

                  <div className="text-lg leading-snug tracking-tighter sm:text-xl sm:leading-tight">
                    {description ||
                      `The technology backbone for modern brand execution. Our intelligent platform services simplify complexity, connect workflows, and give brands the speed, accuracy and agility to thrive in today's fast moving world.`}
                  </div>
                </div>
              </div>
              <div className="bg-accent2 3xl:block relative hidden h-48 w-full sm:h-74" />
              {bottomRowImages.map((src, index) => (
                <Image
                  key={index}
                  className="relative h-48 w-full object-cover sm:h-74"
                  width={304}
                  height={295}
                  sizes="100vw"
                  alt={`Gallery image ${index + 5}`}
                  src={src}
                />
              ))}
            </div>
          </div>
        </FullBleedLines>
      </div>
    </>
  );
};

export default Hero;
