'use client';

import { ACCESS_TOKEN_COOKIE } from '../../lib/auth-session';

export async function getAccessToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${ACCESS_TOKEN_COOKIE}=`))
    ?.split('=')
    .slice(1)
    .join('=');

  if (!cookieValue) {
    throw new Error('Tu sesión no está disponible. Inicia sesión nuevamente.');
  }

  return decodeURIComponent(cookieValue);
}
