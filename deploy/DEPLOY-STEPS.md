# Deploy inicial para educa.hacktrickstore.com

## Backend
- servicio sugerido en puerto `4100`
- proxy por nginx hacia `127.0.0.1:4100`

## Frontend
- servicio sugerido en puerto `3001`
- proxy por nginx hacia `127.0.0.1:3001`

## Base de datos
```bash
createdb plataforma_instituciones_educativas
psql postgres://postgres:postgres@localhost:5432/plataforma_instituciones_educativas -f /home/ubuntu/plataforma-instituciones-educativas/database/schema.sql
psql postgres://postgres:postgres@localhost:5432/plataforma_instituciones_educativas -f /home/ubuntu/plataforma-instituciones-educativas/database/seed.sql
```

## Build
```bash
cd /home/ubuntu/plataforma-instituciones-educativas/backend && npm install && npm run build
cd /home/ubuntu/plataforma-instituciones-educativas/frontend && npm install && npm run build
```

## Verificación
- `GET /api/system/health`
- `GET /api/system/bootstrap`
- home del frontend cargando correctamente
