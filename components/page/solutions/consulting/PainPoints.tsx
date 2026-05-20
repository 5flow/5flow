import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';

const painPoints = [
  'Content complexity scaling faster than governance',
  'Rising production costs with limited visibility into ROI',
  'AI tools introduced without clear validation or measurable impact',
  'Fragmented workflows across regions, teams, and agency partners',
  'Scaling output without scalable operational foundations',
];

type PainPointsProps = {
  titleLine1?: string;
  titleLine2Prefix?: string;
  highlight?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  items?: string[];
  summaryLine1?: string;
  summaryLine2?: string;
};

export default function PainPoints({
  titleLine1 = 'When marketing',
  titleLine2Prefix = 'operations',
  highlight = 'stop scaling',
  descriptionLine1 = 'As ecosystems grow, complexity has a way of sneaking in.',
  descriptionLine2 = 'More markets. More content. More stakeholders. More tools. But somehow... less visibility.',
  items,
  summaryLine1 = 'Hidden capital rarely announces itself. It usually shows up as duplicated effort, disconnected',
  summaryLine2 = 'processes, approval bottlenecks, and teams working harder just to keep things moving.',
}: PainPointsProps) {
  const displayItems = items?.length ? items : painPoints;

  return (
    <section className="px-4 sm:px-6 md:px-0">
      <FullBleedLines className="font-heading py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl">
          <h2 className="font-heading text-4xl leading-[0.95] font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
            {titleLine1}
            <br />
            {titleLine2Prefix} <InlineHighlight>{highlight}</InlineHighlight>
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed tracking-tight md:mt-8 md:text-lg">
            {descriptionLine1}
            <br className="hidden sm:block" />
            {descriptionLine2}
          </p>
          <ul className="mt-6 flex flex-col gap-3 pl-6 text-base leading-snug font-bold tracking-tight md:gap-4 md:text-xl">
            {displayItems.map(point => (
              <li key={point} className="list-disc">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="font-heading mt-8 w-full text-[20px] leading-[28px] font-bold tracking-tight md:mt-10 md:text-[30px] md:leading-[33px]">
          <span className="block">
            {summaryLine1}
          </span>
          <span className="block">
            {summaryLine2}
          </span>
        </p>
      </FullBleedLines>
    </section>
  );
}
