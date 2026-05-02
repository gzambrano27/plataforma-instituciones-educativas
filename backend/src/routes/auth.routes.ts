import { Router } from 'express';
import { z } from 'zod';
import { successResponse } from '../utils/api.js';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const seededUser = {
  id: 'user-demo-superadmin',
  fullName: 'Guiller JR',
  email: 'admin@educa.local',
  role: 'superadmin',
  institutionId: null,
};

router.post('/login', (request, response) => {
  const payload = loginSchema.parse(request.body);

  if (payload.email !== seededUser.email || payload.password !== 'Educa2026!') {
    return response.status(401).json({ success: false, message: 'Credenciales inválidas.' });
  }

  return response.json(successResponse('Login successful', {
    accessToken: 'bootstrap-token-educa',
    refreshToken: 'bootstrap-refresh-educa',
    user: seededUser,
  }));
});

router.get('/me', (_request, response) => {
  return response.json(successResponse('Current user loaded', seededUser));
});

export default router;
