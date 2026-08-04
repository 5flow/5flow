'use client';

import Link from 'next/link';
import Image from 'next/image';
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const socialLinks = [
  { href: 'https://www.linkedin.com/company/5flow-wave/', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://www.youtube.com/@5flowgmbh', label: 'Youtube', Icon: YoutubeIcon },
  { href: 'https://www.instagram.com/5flow_gmbh/', label: 'Instagram', Icon: InstagramIcon },
];

const visitUsLinks = [
  { href: 'https://propelis.com/', label: 'propelis.com' },
  { href: 'https://makemarks.com/', label: 'makemarks.com' },
  { href: 'https://equator-design.com/', label: 'equator-design.com' },
  { href: 'https://sgxgraphics.com/', label: 'sgxgraphics.com' },
  { href: 'https://timetocollide.com/', label: 'timetocollide.com' },
];

const infosLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/imprint', label: 'Imprint' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/quality', label: 'Quality' },
];

export function Footer() {
  const linkClass =
    'text-background/80 hover:text-success transition-all duration-500 ease-[var(--easing-smooth)] text-sm';

  return (
    <footer className="bg-primary px-4 py-12 sm:px-6 sm:py-16 md:px-36 md:py-20">
      <div className="mx-auto flex flex-col gap-12">
        {/* Main Content */}
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Left Side - Logo & Social */}
          <div className="flex flex-col gap-12">
            <Image src="/brand-mini.svg" alt="5Flow Logo" width={32} height={32} className="h-8 w-8" />
            <div className="flex flex-col gap-4">
              <span className="text-background font-bold">Stay Connected</span>
              <div className="flex gap-4">
                {socialLinks.map(s => {
                  const Icon = s.Icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="text-background/80 hover:text-success transition-all duration-500 ease-[var(--easing-smooth)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-background font-bold tracking-wide uppercase">Visit Us</span>
              <div className="flex flex-col gap-3">
                {visitUsLinks.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-background font-bold tracking-wide uppercase">Infos</span>
              <div className="flex flex-col gap-3">
                {infosLinks.map(link => (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright & Disclaimer */}
        <div className="border-background/20 flex flex-col gap-4 border-t pt-8">
          <p className="text-background text-sm font-medium">
            © 5Flow GmbH {new Date().getFullYear()}. All Right Reserved.
          </p>
          <p className="text-background/60 max-w-4xl text-xs leading-relaxed">
            5Flow® is a registered trademark of Propelis Group. All product and company names are trademarks TM or
            registered ® trademarks of their respective holders. Use of these third-party trademarks does not imply any
            affiliation with or endorsement by their holders. All specifications are subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
