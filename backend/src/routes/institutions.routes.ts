import { Router } from 'express';
import { z } from 'zod';
import { successResponse } from '../utils/api.js';

const router = Router();

const institutionSchema = z.object({
  name: z.string().min(3).max(180),
  slug: z.string().min(3).max(120),
  institutionType: z.enum(['publica', 'privada']),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  activeSchoolYearLabel: z.string().optional().or(z.literal('')),
});

const institutions: Array<{
  id: string;
  name: string;
  slug: string;
  institutionType: 'publica' | 'privada';
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  activeSchoolYearLabel?: string;
}> = [
  {
    id: 'inst-demo-001',
    name: 'Unidad Educativa Demo Educa',
    slug: 'unidad-educativa-demo-educa',
    institutionType: 'privada',
    contactEmail: 'info@educa.demo',
    contactPhone: '+593000000000',
    address: 'Quito, Ecuador',
    activeSchoolYearLabel: '2026-2027',
  },
];

router.get('/', (_request, response) => {
  return response.json(successResponse('Institutions loaded', institutions));
});

router.post('/', (request, response) => {
  const payload = institutionSchema.parse(request.body);
  const created = {
    id: `inst-${Date.now()}`,
    name: payload.name,
    slug: payload.slug,
    institutionType: payload.institutionType,
    contactEmail: payload.contactEmail || undefined,
    contactPhone: payload.contactPhone || undefined,
    address: payload.address || undefined,
    activeSchoolYearLabel: payload.activeSchoolYearLabel || undefined,
  };
  institutions.unshift(created);
  return response.status(201).json(successResponse('Institution created', created));
});

export default router;
