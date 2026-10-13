export type SiteLanguage = 'en' | 'de';
export const LANGUAGE_COOKIE = '5flow-language';

// Only publish links to translations that actually have a route.
export const GERMAN_PATHS = new Set([
  '/',
  '/about',
  '/ai-solutions',
  '/products/wave',
  '/products/dragonfly',
  '/products/mediabox',
  '/products/wavestudio',
  '/solutions/artwork-management',
  '/solutions/online-proofing',
  '/solutions/content-management',
  '/solutions/asset-library',
  '/solutions/automated-artwork',
  '/solutions/integration',
  '/solutions/data-analysis',
  '/applications/role/brand-manager',
  '/applications/role/quality-regulatory',
  '/applications/role/creative-studio',
  '/applications/role/procurement-sourcing',
  '/applications/industry/retail',
  '/applications/industry/health-pharma',
  '/applications/industry/food-beverages',
  '/applications/industry/beauty-cosmetics',
  '/applications/industry/consumer-goods',
]);

export function isGermanPath(path: string): boolean {
  return path === '/de' || path.startsWith('/de/');
}

export function englishPath(path: string): string {
  const withoutLanguage = isGermanPath(path) ? path.slice(3) || '/' : path;
  return withoutLanguage.length > 1 ? withoutLanguage.replace(/\/$/, '') : withoutLanguage;
}

export function localizedHref(href: string, language: SiteLanguage): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const suffixIndex = href.search(/[?#]/);
  const path = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? '' : href.slice(suffixIndex);
  const base = englishPath(path);
  if (language === 'en') return base + suffix;
  return GERMAN_PATHS.has(base) ? (base === '/' ? '/de' : `/de${base}`) + suffix : href;
}
