# BLUEPRINT - Plataforma de instituciones educativas

## Dominio público objetivo
- `educa.hacktrickstore.com`
- DNS actual: `A -> 148.230.84.244`

## Objetivo de publicación temprana
Publicar cuanto antes una base visible del producto para revisar avances sobre un entorno real, sin esperar a tener todos los módulos completos.

## Estrategia recomendada
Construir por capas sobre un monorepo serio y desplegar una primera versión navegable con:

- shell de producto profesional
- autenticación base
- panel administrativo base
- entidades núcleo
- estructura multiinstitución
- dominio académico inicial

## Stack final recomendado
- Frontend: Next.js + React + TypeScript + Tailwind + shadcn/ui
- Backend: NestJS + Prisma + PostgreSQL + Redis + BullMQ + Socket.IO
- Auth: JWT + refresh + sesiones seguras + RBAC
- Archivos: almacenamiento local con abstracción compatible con S3/R2/MinIO
- Reportes: PDF/CSV/Excel por fase
- Tiempo real: Socket.IO
- Monorepo: pnpm workspaces
- Infra: Docker Compose para desarrollo, systemd + nginx para producción inicial

## Estructura propuesta

```text
plataforma-instituciones-educativas/
  apps/
    web/
    api/
  packages/
    config/
    ui/
    types/
    eslint-config/
  infrastructure/
    docker/
    nginx/
    systemd/
  docs/
  scripts/
```

## Fase visible inicial para educa.hacktrickstore.com

### V0 visible
- landing privada o login
- layout administrativo
- dashboard inicial
- módulo de instituciones
- módulo de usuarios/roles
- módulo académico base:
  - niveles
  - cursos
  - paralelos
  - aulas
- base visual responsive y profesional

### V1 operable
- estudiantes
- representantes
- docentes
- matrículas
- materias
- períodos académicos
- asistencia base
- actividades y entregas base

## Requisitos de despliegue inicial
- nginx reverse proxy para `educa.hacktrickstore.com`
- frontend publicado con build estable
- backend en servicio systemd
- PostgreSQL con esquema inicial
- variables de entorno separadas por app
- CORS y cookies configurados para subdominio real

## Riesgos a controlar desde el día 1
- mezclar demasiado frontend y backend sin límites claros
- modelar mal multiinstitución
- meter horarios inteligentes demasiado pronto
- meter pagos antes de consolidar matrícula
- no diseñar bien archivos, auditoría y permisos

## Primer entregable técnico recomendado
1. monorepo
2. frontend Next.js
3. backend NestJS
4. Prisma + PostgreSQL
5. auth base
6. entidades núcleo multiinstitución
7. dashboard + módulos CRUD iniciales
8. deploy inicial a `educa.hacktrickstore.com`

## Nota operativa
La publicación real en `educa.hacktrickstore.com` requerirá de nuevo la parte privilegiada del VPS:
- nginx
- certificados
- servicios systemd
- restart/reload

Pero desde aquí sí se puede dejar:
- proyecto
- código
- build
- artefactos de despliegue
- checklist exacto
