import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/require-auth.js';
import { successResponse } from '../utils/api.js';

const router = Router();

const userSchema = z.object({
  institutionId: z.string().uuid().nullable().optional(),
  fullName: z.string().min(3).max(180),
  email: z.string().email(),
  password: z.string().min(8),
  status: z.enum(['pending', 'active', 'blocked']).default('active'),
  roleCodes: z.array(z.string().min(3)).min(1),
});

router.get('/', requireAuth, async (_request, response) => {
  const result = await pool.query(
    `
      SELECT
        u.id,
        u.institution_id AS "institutionId",
        i.name AS "institutionName",
        u.full_name AS "fullName",
        u.email,
        u.status,
        COALESCE(array_agg(r.code) FILTER (WHERE r.code IS NOT NULL), '{}') AS "roleCodes",
        u.created_at AS "createdAt"
      FROM edu_users u
      LEFT JOIN edu_institutions i ON i.id = u.institution_id
      LEFT JOIN edu_user_roles ur ON ur.user_id = u.id
      LEFT JOIN edu_roles r ON r.id = ur.role_id
      GROUP BY u.id, i.name
      ORDER BY u.created_at DESC
    `,
  );

  return response.json(successResponse('Usuarios cargados.', result.rows));
});

router.post('/', requireAuth, async (request, response) => {
  const payload = userSchema.parse(request.body);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const insertedUser = await client.query(
      `
        INSERT INTO edu_users (
          institution_id,
          full_name,
          email,
          password_hash,
          status
        ) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5)
        RETURNING id, institution_id AS "institutionId", full_name AS "fullName", email, status, created_at AS "createdAt"
      `,
      [payload.institutionId ?? null, payload.fullName, payload.email, payload.password, payload.status],
    );

    const createdUser = insertedUser.rows[0] as {
      id: string;
      institutionId: string | null;
      fullName: string;
      email: string;
      status: string;
      createdAt: string;
    };

    const roleRows = await client.query(
      `SELECT id, code FROM edu_roles WHERE code = ANY($1::text[])`,
      [payload.roleCodes],
    );

    if (roleRows.rows.length !== payload.roleCodes.length) {
      await client.query('ROLLBACK');
      return response.status(400).json({ success: false, message: 'Uno o más roles no existen.' });
    }

    for (const role of roleRows.rows) {
      await client.query(
        `INSERT INTO edu_user_roles (user_id, role_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [createdUser.id, role.id],
      );
    }

    await client.query('COMMIT');

    return response.status(201).json(successResponse('Usuario creado.', {
      ...createdUser,
      roleCodes: roleRows.rows.map((row) => row.code),
    }));
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});

router.get('/roles', requireAuth, async (_request, response) => {
  const result = await pool.query(
    `
      SELECT
        id,
        code,
        name,
        is_system AS "isSystem",
        created_at AS "createdAt"
      FROM edu_roles
      ORDER BY is_system DESC, name ASC
    `,
  );

  return response.json(successResponse('Roles cargados.', result.rows));
});

export default router;
