import InlineCmsText from '@/components/core/inline-cms-text';
import InlineHighlight from '@/components/core/inline-highlight';

type HighlightedCmsTextProps = {
  text: string;
  highlightedText?: string;
  highlightFirstWord?: boolean;
  highlightClassName?: string;
};

export default function HighlightedCmsText({
  text,
  highlightedText,
  highlightFirstWord = false,
  highlightClassName,
}: HighlightedCmsTextProps) {
  const target = highlightedText?.trim() || (highlightFirstWord ? text.trim().match(/^\S+/)?.[0] : undefined);

  if (!target) return <InlineCmsText value={text} />;

  const index = text.toLocaleLowerCase().indexOf(target.toLocaleLowerCase());
  if (index < 0) return <InlineCmsText value={text} />;

  return (
    <>
      <InlineCmsText value={text.slice(0, index)} />
      <InlineHighlight className={highlightClassName}>
        <InlineCmsText value={text.slice(index, index + target.length)} />
      </InlineHighlight>
      <InlineCmsText value={text.slice(index + target.length)} />
    </>
  );
}
