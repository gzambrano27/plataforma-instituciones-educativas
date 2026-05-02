# Plataforma de instituciones educativas

## Objetivo
Construir una plataforma web multiinstitución para la gestión integral de colegios, escuelas, academias e institutos, con foco en seguridad, escalabilidad, mantenibilidad y operación real.

## Alcance inicial
Se diseñará una base seria para soportar:

- multiinstitución
- usuarios, roles y permisos granulares
- matrícula y estructura académica
- horarios
- actividades, entregas, calificaciones y asistencia
- pagos y cobranza
- biblioteca y comunicados
- chat interno
- archivos seguros
- auditoría, reportes y panel administrativo

## Stack recomendado

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Zustand solo para estado local puntual
- Socket.IO client para chat/notificaciones en tiempo real

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Socket.IO
- JWT + sesiones seguras con refresh strategy controlada
- Zod o DTOs + class-validator según capa, priorizando consistencia tipada

### Infraestructura
- Docker / Docker Compose para desarrollo
- almacenamiento local abstraído con driver compatible con S3/R2/MinIO
- Nginx o proxy reverso en producción
- observabilidad básica con logs estructurados

## Decisión arquitectónica
Se recomienda separar claramente frontend y backend:

- `apps/web` → frontend Next.js
- `apps/api` → backend NestJS
- `packages/*` → contratos, utilidades, config compartida, tipos comunes

Esto permite:
- crecimiento real
- despliegue independiente
- mejor escalabilidad
- separación entre UI, dominio y procesos asíncronos

## Módulos principales
1. Identidad, usuarios, roles y permisos
2. Instituciones y configuración académica
3. Estructura académica: niveles, cursos, paralelos, aulas
4. Docentes, estudiantes y representantes
5. Matrícula e inscripción
6. Materias y asignaciones
7. Horarios inteligentes
8. Actividades, tareas, exámenes y entregas
9. Calificaciones y boletines
10. Asistencia
11. Pagos, mensualidades y comprobantes
12. Biblioteca digital
13. Comunicados institucionales
14. Chat interno
15. Reportes y analítica
16. Auditoría y seguridad
17. Archivos y almacenamiento
18. Notificaciones

## Capas afectadas
- frontend web
- backend API
- base de datos PostgreSQL
- redis / colas
- almacenamiento de archivos
- tiempo real
- auth
- reportes

## Riesgos principales
- exceso de alcance si se intenta construir todo a la vez
- reglas complejas de permisos multiinstitución
- conflictos de horarios y asignación docente
- diseño incorrecto del dominio académico
- chat y archivos sin restricciones finas de acceso
- deuda técnica si se mezcla lógica institucional con lógica global

## Principios de diseño
- multiinstitución desde el modelo base
- aislamiento por institución
- permisos por rol + permiso granular
- archivos fuera de PostgreSQL, solo metadata en BD
- auditoría fuerte en operaciones sensibles
- procesos pesados por colas
- validación estricta frontend + backend
- contratos claros entre módulos
- evitar acoplar el core académico con el proveedor de almacenamiento o notificación

## Fases recomendadas

### Fase 0
- arquitectura
- modelo de datos base
- scaffold del monorepo
- auth y roles base
- multiinstitución

### Fase 1
- instituciones
- usuarios
- aulas / cursos / paralelos
- materias
- docentes
- estudiantes / representantes
- matrículas

### Fase 2
- períodos académicos
- actividades
- entregas
- calificaciones
- asistencia
- boletines

### Fase 3
- horarios inteligentes
- pagos
- comprobantes
- biblioteca
- comunicados

### Fase 4
- chat interno
- notificaciones
- reportes
- importación/exportación
- cierre de año lectivo

### Fase 5
- hardening productivo
- pruebas e2e
- observabilidad
- despliegue

## Checklist previo antes de implementar
- objetivo confirmado
- alcance de la primera entrega definido
- entidades núcleo identificadas
- límites entre módulos definidos
- reglas multiinstitución claras
- estrategia de auth definida
- estrategia de almacenamiento definida
- plan por fases definido

## Siguiente paso
Crear:
- blueprint técnico completo
- modelo relacional inicial
- estructura del monorepo
- backlog por fases
