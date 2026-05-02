# Modelo inicial del dominio

## Núcleo institucional
- institucion
- anio_lectivo
- jornada
- nivel_educativo

## Identidad y acceso
- usuario
- rol
- permiso
- usuario_rol
- rol_permiso
- sesion
- auditoria

## Estructura académica
- curso
- paralelo
- aula
- materia
- asignacion_docente
- disponibilidad_docente

## Comunidad educativa
- docente
- estudiante
- representante
- estudiante_representante
- matricula

## Núcleo futuro por fases
- horario
- asistencia
- actividad
- entrega
- calificacion
- pago
- comprobante
- comunicado
- biblioteca
- archivo
- chat
- mensaje
- notificacion

## Reglas base
- todo dato operativo debe colgar de una institución
- toda consulta sensible debe poder filtrar por institución
- roles globales y roles institucionales deben distinguirse
- archivos no van a PostgreSQL, solo metadata
- auditoría obligatoria en acciones administrativas críticas
