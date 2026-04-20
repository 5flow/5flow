import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactLenis } from 'lenis/react';
import { centuryGothic, metropolis } from '@/lib/fonts';
import { hideTranslationWidget, customizeAccessibilityWidget } from '@/lib/accessibility-widget';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/layout';
import { CtaV2 } from '@/components/layout/cta-v2';
import { ServerNavigation } from '@/components/layout/navigation.server';
import PageTransition from '@/components/layout/page-transition';
import FixedActions from '@/components/layout/fixed-actions';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '5Flow | Brand & Artwork Management Solutions',
  description:
    'Your top service provider for artwork management solutions in Germany. Streamline tasks with brand and artwork management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MG3FF2TP');
        `}</Script>
        <Script
          src="https://cdn-cookieyes.com/client_data/2c83cea1e3263d53080b1b74/script.js"
          strategy="afterInteractive"
        ></Script>
      </head>
      <body
        className={`${centuryGothic.variable} ${metropolis.variable} bg-background text-foreground flex min-h-screen flex-col font-sans antialiased`}
      >
        {/* Google Tag Manager */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MG3FF2TP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Accessibility Scripts */}
        <Script
          id="easy-vision-app"
          src="https://cdn.sitecockpit.com/cdn/app.js"
          data-easy-vision-key="cce648a2-e780-43a6-a13d-4d4a9721b8f9"
          strategy="afterInteractive"
        />
        <Script id="hide-easy-vision-translation" strategy="afterInteractive">
          {hideTranslationWidget}
        </Script>
        <Script id="customize-accessibility-widget" strategy="afterInteractive">
          {customizeAccessibilityWidget}
        </Script>

        <ReactLenis root />
        <ServerNavigation />
        <main className="relative flex-1">
          {/* <PatternOverlay side="both" margin="container" containerAlign="outside" /> */}
          <PageTransition>{children}</PageTransition>
        </main>
        <CtaV2 />
        <Footer />

        {/* Fixed */}
        <Toaster />
        <FixedActions />
      </body>
    </html>
  );
}
