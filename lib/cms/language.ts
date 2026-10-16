// WordPress language folders may include regional codes, e.g. /pt-br/.
export function getPathLanguage(path: string): string {
  const prefix = path.split('/').filter(Boolean)[0] || '';
  return /^[a-z]{2,3}(?:[-_][a-z0-9]{2,8})*$/i.test(prefix) ? prefix.replaceAll('_', '-').toLowerCase() : 'en';
}
