import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_COOKIE } from './lib/auth-session';
import { toSystemPath } from './lib/system-routes';

function buildLoginUrl(request: NextRequest, nextPath: string) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', nextPath);
  return loginUrl;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const systemPath = toSystemPath(pathname);

  if (systemPath && pathname !== systemPath) {
    if (!accessToken) {
      return NextResponse.redirect(buildLoginUrl(request, `${systemPath}${search}`));
    }

    return NextResponse.redirect(new URL(`${systemPath}${search}`, request.url));
  }

  if (pathname === '/sistema' || pathname.startsWith('/sistema/')) {
    if (!accessToken) {
      return NextResponse.redirect(buildLoginUrl(request, `${pathname}${search}`));
    }
  }

  if ((pathname === '/login' || pathname === '/registro') && accessToken) {
    const requestedNext = request.nextUrl.searchParams.get('next');
    const safeNext = requestedNext?.startsWith('/sistema') ? requestedNext : '/sistema';
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sistema/:path*',
    '/login',
    '/registro',
    '/panel',
    '/instituciones',
    '/usuarios',
    '/academico',
    '/docentes',
    '/estudiantes',
    '/matriculas',
    '/materias',
    '/asignaciones-academicas',
    '/evaluaciones',
    '/asistencia',
  ],
};
