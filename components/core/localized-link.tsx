'use client';

import { forwardRef, type ComponentProps } from 'react';
import Link from 'next/link';
import { localizedHref } from '@/lib/i18n';
import { useSiteLanguage } from './site-language';

// Use translated URLs for navigation, prefetching, and opening links in new tabs.
const LocalizedLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(function LocalizedLink(
  { href, ...props },
  ref
) {
  const { language } = useSiteLanguage();
  const localized =
    typeof href === 'string'
      ? localizedHref(href, language)
      : href.pathname && !href.host && !href.hostname && !href.protocol
        ? { ...href, pathname: localizedHref(href.pathname, language) }
        : href;
  return <Link {...props} href={localized} ref={ref} />;
});

export default LocalizedLink;
