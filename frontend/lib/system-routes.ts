export const legacySystemPaths = [
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
] as const;

export function toSystemPath(pathname: string) {
  if (pathname === '/sistema') return pathname;
  if (pathname.startsWith('/sistema/')) return pathname;
  if (legacySystemPaths.includes(pathname as (typeof legacySystemPaths)[number])) return `/sistema${pathname}`;
  return null;
}
