import { Router } from 'express';
import { successResponse } from '../utils/api.js';

const router = Router();

router.get('/health', (_request, response) => {
  return response.json(successResponse('Educa API healthy', {
    service: 'educa-api',
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));
});

router.get('/bootstrap', (_request, response) => {
  return response.json(successResponse('Bootstrap snapshot loaded', {
    project: 'plataforma-instituciones-educativas',
    phase: 'foundation',
    publicUrl: 'https://educa.hacktrickstore.com',
    modules: ['auth-base', 'instituciones', 'usuarios', 'roles', 'academico-base'],
  }));
});

router.get('/auth/bootstrap', (_request, response) => {
  return response.json(successResponse('Auth bootstrap loaded', {
    mode: 'credentials',
    sessionStrategy: 'jwt + refresh (planned)',
    currentStatus: 'base preparada, flujo real pendiente',
  }));
});

export default router;
