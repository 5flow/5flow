'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { englishPath, isGermanPath, LANGUAGE_COOKIE, localizedHref, type SiteLanguage } from '@/lib/i18n';

const LanguageContext = createContext<{ language: SiteLanguage; chooseLanguage: (language: SiteLanguage) => void }>({
  language: 'en',
  chooseLanguage: () => {},
});

export function SiteLanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: SiteLanguage;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [preferredLanguage, setPreferredLanguage] = useState(initialLanguage);
  const language = isGermanPath(pathname) ? 'de' : preferredLanguage;

  useEffect(() => {
    if (isGermanPath(pathname)) setPreferredLanguage('de');
    document.documentElement.lang = isGermanPath(pathname) ? 'de' : 'en';
  }, [pathname]);

  function chooseLanguage(next: SiteLanguage) {
    setPreferredLanguage(next);
    document.cookie = `${LANGUAGE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
    const base = englishPath(pathname);
    const target = localizedHref(base, next);
    // On an untranslated page, selecting German opens the German homepage.
    const destination = next === 'de' && target === base ? '/de' : target;
    router.push(destination + window.location.search + window.location.hash);
  }

  return <LanguageContext.Provider value={{ language, chooseLanguage }}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  return useContext(LanguageContext);
}

function LanguageFlag({ language }: { language: SiteLanguage }) {
  return (
    <svg
      viewBox="0 0 60 40"
      aria-hidden="true"
      className="size-6 !h-4 !w-6 shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10"
    >
      {language === 'de' ? (
        <>
          <path fill="#171717" d="M0 0h60v14H0z" />
          <path fill="#DD0000" d="M0 14h60v13H0z" />
          <path fill="#FFCE00" d="M0 27h60v13H0z" />
        </>
      ) : (
        <>
          <path fill="#012169" d="M0 0h60v40H0z" />
          <path stroke="#fff" strokeWidth="8" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#C8102E" strokeWidth="3" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#fff" strokeWidth="13" d="M30 0v40M0 20h60" />
          <path stroke="#C8102E" strokeWidth="8" d="M30 0v40M0 20h60" />
        </>
      )}
    </svg>
  );
}

export function LanguageSelector() {
  const { language, chooseLanguage } = useSiteLanguage();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={language === 'de' ? 'Sprache wählen: Deutsch' : 'Choose language: English'}
          onPointerEnter={event => {
            if (event.pointerType !== 'mouse') return;
            cancelClose();
            openedByHover.current = true;
            setOpen(true);
          }}
          onPointerLeave={event => {
            if (event.pointerType === 'mouse') scheduleClose();
          }}
          onPointerDown={event => {
            cancelClose();
            openedByHover.current = false;
            // Clicking an already hover-open trigger should keep the choices visible.
            if (open && event.pointerType === 'mouse' && event.button === 0) event.preventDefault();
          }}
          onKeyDown={() => {
            openedByHover.current = false;
            cancelClose();
          }}
          className="text-foreground hover:bg-accent1/10 data-[state=open]:bg-accent1/10 inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <LanguageFlag language={language} />
          <span>{language.toUpperCase()}</span>
          <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        onPointerEnter={cancelClose}
        onPointerLeave={event => {
          if (event.pointerType === 'mouse') scheduleClose();
        }}
        onCloseAutoFocus={event => {
          if (openedByHover.current) event.preventDefault();
        }}
        className="bg-background z-[1000] min-w-40 rounded-lg border border-gray-100 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        {(
          [
            { code: 'en', name: 'English' },
            { code: 'de', name: 'Deutsch' },
          ] as const
        ).map(option => (
          <DropdownMenuItem
            key={option.code}
            aria-current={language === option.code ? 'true' : undefined}
            onSelect={() => {
              cancelClose();
              setOpen(false);
              chooseLanguage(option.code);
            }}
            className={`text-foreground focus:bg-accent1/15 focus:text-foreground flex h-11 cursor-pointer items-center gap-3 rounded-md px-3 text-sm font-semibold ${language === option.code ? 'bg-accent1/10' : 'bg-background'}`}
          >
            <LanguageFlag language={option.code} />
            <span>{option.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
