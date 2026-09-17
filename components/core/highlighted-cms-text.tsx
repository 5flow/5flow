import InlineCmsText from '@/components/core/inline-cms-text';
import InlineHighlight from '@/components/core/inline-highlight';
import type { ReactNode } from 'react';

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

function getFallbackTargets(target: string) {
  const separatedTargets = target
    .split(/[,;\n|]+/)
    .map(part => part.trim())
    .filter(Boolean);

  const targets = separatedTargets.length > 1 ? separatedTargets : target.split(/\s+/).filter(Boolean);

  return Array.from(new Set(targets)).sort((a, b) => b.length - a.length);
}

function findHighlightRanges(text: string, target: string) {
  const directIndex = findHighlightIndex(text, target);
  if (directIndex >= 0) {
    return [{ index: directIndex, length: getOriginalMatchLength(text, directIndex, target) }];
  }

  const ranges = getFallbackTargets(target)
    .map(part => {
      const index = findHighlightIndex(text, part);
      if (index < 0) return null;
      return { index, length: getOriginalMatchLength(text, index, part) };
    })
    .filter((range): range is { index: number; length: number } => Boolean(range))
    .sort((a, b) => a.index - b.index);

  return ranges.reduce<{ index: number; length: number }[]>((validRanges, range) => {
    const previous = validRanges[validRanges.length - 1];
    if (previous && range.index < previous.index + previous.length) return validRanges;
    validRanges.push(range);
    return validRanges;
  }, []);
}

export default function HighlightedCmsText({
  text,
  highlightedText,
  highlightFirstWord = false,
  highlightClassName,
}: HighlightedCmsTextProps) {
  const target = highlightedText?.trim() || (highlightFirstWord ? text.trim().match(/^\S+/)?.[0] : undefined);

  if (!target) return <InlineCmsText value={text} />;

  const ranges = findHighlightRanges(text, target);
  if (!ranges.length) return <InlineCmsText value={text} />;

  const parts: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, rangeIndex) => {
    if (range.index > cursor) {
      parts.push(<InlineCmsText key={`text-${rangeIndex}`} value={text.slice(cursor, range.index)} />);
    }

    parts.push(
      <InlineHighlight key={`highlight-${rangeIndex}`} className={highlightClassName}>
        <InlineCmsText value={text.slice(range.index, range.index + range.length)} />
      </InlineHighlight>,
    );

    cursor = range.index + range.length;
  });

  if (cursor < text.length) {
    parts.push(<InlineCmsText key="text-tail" value={text.slice(cursor)} />);
  }

  return <>{parts}</>;
}
