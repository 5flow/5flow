'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    _hsq?: unknown[];
  }
}

export function HubSpotPageTracker() {
  const pathname = usePathname();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    window._hsq = window._hsq || [];
    window._hsq.push(['setPath', `${pathname}${window.location.search}`]);
    window._hsq.push(['trackPageView']);
  }, [pathname]);

  return null;
}

