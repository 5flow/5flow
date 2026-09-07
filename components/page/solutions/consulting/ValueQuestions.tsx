import FullBleedLines from '@/components/core/full-bleed-lines';
import InlineHighlight from '@/components/core/inline-highlight';
import InlineCmsText from '@/components/core/inline-cms-text';

const questions = [
  'Where is value being lost, or left untapped?',
  'Where does your brand need to go next?',
  'Are your teams aligned on how to get there?',
  "What's holding growth back?",
];

type ValueQuestionsProps = {
  title?: string;
  highlight?: string;
  body?: string;
  introTitle?: string;
  introText?: string;
  questions?: string[];
};

function renderHighlightedTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) return <InlineCmsText value={title} />;
  const [before, ...rest] = title.split(highlight);
  return (
    <>
      <InlineCmsText value={before} />
      <InlineHighlight>{highlight}</InlineHighlight>
      <InlineCmsText value={rest.join(highlight)} />
    </>
  );
}

export default function ValueQuestions({
  title = 'Where is value being left on the table?',
  highlight = 'value',
  body = "Often it's hiding in plain sight. As organizations scale, marketing operations tend to get ... complicated. Workflows fragment. Processes slow down. Teams work harder, but not always better. We can help you simplify, align, and get things flowing again.",
  introTitle = 'Start with clarity.',
  introText = 'The right questions unlock the right answers:',
  questions: questionsProp,
}: ValueQuestionsProps) {
  const displayQuestions = questionsProp?.length ? questionsProp : questions;

  return (
    <section className="px-4 sm:px-6 md:px-0">
      <FullBleedLines className="py-12 md:py-16 lg:py-20">
        <h2 className="font-heading max-w-3xl text-4xl leading-none font-bold tracking-tighter md:text-[64px] md:leading-[64px]">
          {renderHighlightedTitle(title, highlight)}
        </h2>
        <div className="mt-8 max-w-5xl text-base leading-relaxed tracking-tight md:mt-10 md:text-lg">
          <p>
            <InlineCmsText value={body} />
          </p>
          <p className="mt-6 text-xl font-bold">
            <InlineCmsText value={introTitle} />
          </p>
          <p className="mt-5">
            <InlineCmsText value={introText} />
          </p>
        </div>

        <ul className="mt-8 flex list-disc flex-col gap-4 pl-6 text-base font-bold tracking-tight md:text-xl">
          {displayQuestions.map(question => (
            <li key={question} className="pl-2">
              <InlineCmsText value={question} />
            </li>
          ))}
        </ul>
      </FullBleedLines>
    </section>
  );
}
