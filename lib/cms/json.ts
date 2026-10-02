/** Parse CMS textarea JSON without changing valid content or punctuation. */
export function parseCmsJson(value: string): unknown {
  const trimmed = value.trim();
  const parse = (candidate: string): unknown => {
    try {
      return JSON.parse(candidate);
    } catch {
      return undefined;
    }
  };

  const original = parse(trimmed);
  if (original !== undefined) return original;

  // Recover a missing closing quote only on a single-line string property
  // followed by another property. Do not guess at arbitrary broken JSON.
  const repaired = trimmed.replace(
    /^(\s*"(?:[^"\\]|\\.)+"\s*:\s*"(?:[^"\\\r\n]|\\.)*),[ \t]*(\r?\n)(?=\s*"(?:[^"\\]|\\.)+"\s*:)/gm,
    '$1",$2'
  );
  const normalized = repaired
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/,\s*([}\]])/g, '$1');
  const candidates = [
    repaired,
    normalized,
    normalized.replace(/'/g, '"'),
    normalized.startsWith('[') && !normalized.endsWith(']') ? `${normalized}]` : '',
    normalized.startsWith('{') && !normalized.endsWith('}') ? `${normalized}}` : '',
    !normalized.startsWith('[') && /}\s*,\s*{/.test(normalized) ? `[${normalized}]` : '',
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const parsed = parse(candidate);
    if (parsed !== undefined) return parsed;
  }
  return null;
}
