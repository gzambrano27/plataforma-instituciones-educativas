export const ACCESS_TOKEN_COOKIE = 'educa_access_token';
export const REFRESH_TOKEN_COOKIE = 'educa_refresh_token';

export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 8;

export function buildInstitutionalEmail(identifier: string) {
  const normalized = identifier.trim().toLowerCase();

  if (!normalized) return '';
  if (normalized.includes('@')) return normalized;

  return `${normalized}@educa.local`;
}
