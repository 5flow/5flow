import { NextRequest, NextResponse } from 'next/server';
import { LANGUAGE_COOKIE, isGermanPath, localizedHref } from './lib/i18n';
import { getPathLanguage } from './lib/cms/language';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const preferred = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const german = isGermanPath(pathname);
  const target = localizedHref(pathname, 'de');

  // Covers plain anchors, CMS links, footer links, and direct navigation too.
  if (!german && preferred === 'de' && target !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }

  const headers = new Headers(request.headers);
  headers.set('x-site-language', german || preferred === 'de' ? 'de' : 'en');
  headers.set('x-site-content-language', getPathLanguage(pathname));
  const response = NextResponse.next({ request: { headers } });
  if (german && preferred !== 'de') {
    response.cookies.set(LANGUAGE_COOKIE, 'de', {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.[^/]+$).*)'],
};
