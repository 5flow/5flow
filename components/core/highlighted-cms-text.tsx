import InlineCmsText from '@/components/core/inline-cms-text';
import InlineHighlight from '@/components/core/inline-highlight';

type HighlightedCmsTextProps = {
  text: string;
  highlightedText?: string;
  highlightFirstWord?: boolean;
  highlightClassName?: string;
};

function normalizeMatchValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:!?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase();
}

function findHighlightIndex(text: string, target: string) {
  const normalizedTarget = normalizeMatchValue(target);
  if (!normalizedTarget) return -1;

  const directIndex = text.toLocaleLowerCase().indexOf(target.toLocaleLowerCase());
  if (directIndex >= 0) return directIndex;

  const normalizedText = normalizeMatchValue(text);
  const normalizedIndex = normalizedText.indexOf(normalizedTarget);
  if (normalizedIndex < 0) return -1;

  let normalizedCursor = 0;
  let previousWasSpace = true;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const normalizedChar = normalizeMatchValue(char);
    if (!normalizedChar) continue;

    if (normalizedChar === ' ') {
      if (previousWasSpace) continue;
      previousWasSpace = true;
    } else {
      previousWasSpace = false;
    }

    if (normalizedCursor === normalizedIndex) return i;
    normalizedCursor += normalizedChar.length;
  }

  return -1;
}

function getOriginalMatchLength(text: string, index: number, target: string) {
  const normalizedTarget = normalizeMatchValue(target);
  let normalizedCursor = 0;
  let previousWasSpace = true;

  for (let i = index; i < text.length; i += 1) {
    const normalizedChar = normalizeMatchValue(text[i]);
    if (!normalizedChar) continue;

    if (normalizedChar === ' ') {
      if (previousWasSpace) continue;
      previousWasSpace = true;
    } else {
      previousWasSpace = false;
    }

    normalizedCursor += normalizedChar.length;
    if (normalizedCursor >= normalizedTarget.length) return i - index + 1;
  }

  return target.length;
}

export default function HighlightedCmsText({
  text,
  highlightedText,
  highlightFirstWord = false,
  highlightClassName,
}: HighlightedCmsTextProps) {
  const target = highlightedText?.trim() || (highlightFirstWord ? text.trim().match(/^\S+/)?.[0] : undefined);

  if (!target) return <InlineCmsText value={text} />;

  const index = findHighlightIndex(text, target);
  if (index < 0) return <InlineCmsText value={text} />;
  const matchLength = getOriginalMatchLength(text, index, target);

  return (
    <>
      <InlineCmsText value={text.slice(0, index)} />
      <InlineHighlight className={highlightClassName}>
        <InlineCmsText value={text.slice(index, index + matchLength)} />
      </InlineHighlight>
      <InlineCmsText value={text.slice(index + matchLength)} />
    </>
  );
}
