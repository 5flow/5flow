import Image from 'next/image';
import InlineHighlight from '@/components/core/inline-highlight';

type WorkflowProps = { introText?: string; isoText?: string; images?: string[] };

const Workflow = ({ introText, isoText, images }: WorkflowProps) => {
  const defaultImages = [
    { src: '/about/workflow1.png', width: 370, height: 120, alt: 'Workflow security process 2' },
    { src: '/about/workflow2.png', width: 226, height: 120, alt: 'Workflow security process 1' },
    { src: '/about/workflow3.png', width: 526, height: 120, alt: 'Workflow security process 3' },
  ];

  const displayImages =
    images && images.length >= 3
      ? images.slice(0, 3).map((src, i) => ({
          src,
          width: defaultImages[i]?.width || 200,
          height: defaultImages[i]?.height || 120,
          alt: `Workflow security process ${i + 1}`,
        }))
      : defaultImages;

  return (
    <div className="relative w-full py-12 md:py-16" style={{ backgroundColor: '#f2f2f7' }}>
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center md:gap-12 md:px-6 lg:gap-14">
        {/* Title */}
        <h2 className="font-heading text-foreground text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
          Trust built into every
          <br />
          <InlineHighlight className="text-background">workflow.</InlineHighlight>
        </h2>

        {/* Intro Text */}
        <p className="text-foreground max-w-4xl text-base leading-relaxed md:text-lg lg:text-xl">
          {introText ||
            `At 5Flow, security is the foundation of how we work. Every workflow, every approval, every piece of data is protected with enterprise-grade security standards.`}
        </p>

        {/* Certification Badges */}
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:gap-12">
          {displayImages.map((image, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                className="object-contain"
                style={{ height: '60px', width: 'auto' }}
                width={image.width}
                height={image.height}
                alt={image.alt}
                src={image.src}
              />
            </div>
          ))}
        </div>

        {/* ISO Text */}
        <p className="text-foreground max-w-6xl text-base leading-relaxed md:text-lg lg:text-xl">
          {isoText ||
            `We're ISO 27001 certified, but we go beyond compliance. Our Information Security Management System (ISMS) continuously monitors risks, applies preventive measures, and evolves to stay ahead of emerging threats.`}
        </p>
      </div>
    </div>
  );
};

export default Workflow;
