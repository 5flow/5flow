type HubSpotIdentifyProperties = {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
};

declare global {
  interface Window {
    _hsq?: unknown[];
  }
}

export function identifyHubSpotVisitor(properties: HubSpotIdentifyProperties) {
  if (typeof window === 'undefined') return;

  window._hsq = window._hsq || [];
  window._hsq.push(['identify', properties]);
  window._hsq.push(['trackPageView']);
}
