import { Router } from 'express';
import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/require-auth.js';
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
    phase: 'academic-7-asistencia',
    publicUrl: 'https://educa.hacktrickstore.com',
    modules: ['auth-base', 'instituciones', 'usuarios', 'roles', 'academico-base', 'docentes', 'estudiantes', 'matriculas', 'materias', 'asignaciones-academicas', 'evaluaciones', 'calificaciones', 'asistencia'],
  }));
});

router.get('/auth/bootstrap', (_request, response) => {
  return response.json(successResponse('Auth bootstrap loaded', {
    mode: 'credentials',
    sessionStrategy: 'jwt + refresh (planned)',
    currentStatus: 'base preparada, flujo real pendiente',
  }));
});

router.get('/dashboard', requireAuth, async (request, response) => {
  const institutionId = request.auth?.institutionId ?? null;
  const userRoles = request.auth?.roleCodes ?? [];
  const isSuperAdmin = userRoles.includes('superadmin');

  const scopeClause = isSuperAdmin || !institutionId ? '' : ' WHERE institution_id = $1';
  const scopeParams = isSuperAdmin || !institutionId ? [] : [institutionId];

  const [institutionsCount, usersCount, activeUsersCount, rolesCount, levelsCount, gradesCount, sectionsCount, teachersCount, studentsCount, enrollmentsCount, activeEnrollmentsCount, subjectsCount, academicAssignmentsCount, evaluationsCount, evaluationGradesCount, attendanceRecordsCount, institutions, users, attendanceByStatus, studentsByStatus, teacherByStatus, evaluationAverage] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_institutions`),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_users${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_users${scopeClause ? `${scopeClause} AND status = 'active'` : ` WHERE status = 'active'`}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_roles`),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_academic_levels${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_academic_grades${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_academic_sections${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_teachers${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_students${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_enrollments${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_enrollments${scopeClause ? `${scopeClause} AND status = 'active'` : ` WHERE status = 'active'`}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_subjects${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_academic_assignments${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_evaluations${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_evaluation_grades${scopeClause}`, scopeParams),
    pool.query(`SELECT COUNT(*)::int AS total FROM edu_attendance_records${scopeClause}`, scopeParams),
    pool.query(
      `SELECT id, name, slug, active_school_year_label AS "activeSchoolYearLabel"
       FROM edu_institutions
       ${isSuperAdmin || !institutionId ? '' : 'WHERE id = $1'}
       ORDER BY created_at DESC
       LIMIT 5`,
      isSuperAdmin || !institutionId ? [] : [institutionId],
    ),
    pool.query(
      `SELECT
        u.id,
        u.full_name AS "fullName",
        u.email,
        u.status,
        i.name AS "institutionName",
        COALESCE(array_agg(r.code) FILTER (WHERE r.code IS NOT NULL), '{}') AS "roleCodes"
      FROM edu_users u
      LEFT JOIN edu_institutions i ON i.id = u.institution_id
      LEFT JOIN edu_user_roles ur ON ur.user_id = u.id
      LEFT JOIN edu_roles r ON r.id = ur.role_id
      ${scopeClause.replace(/institution_id/g, 'u.institution_id')}
      GROUP BY u.id, i.name
      ORDER BY u.created_at DESC
      LIMIT 6`,
      scopeParams,
    ),
    pool.query(
      `SELECT attendance_status AS status, COUNT(*)::int AS total
       FROM edu_attendance_records
       ${scopeClause}
       GROUP BY attendance_status`,
      scopeParams,
    ),
    pool.query(
      `SELECT status, COUNT(*)::int AS total
       FROM edu_students
       ${scopeClause}
       GROUP BY status`,
      scopeParams,
    ),
    pool.query(
      `SELECT status, COUNT(*)::int AS total
       FROM edu_teachers
       ${scopeClause}
       GROUP BY status`,
      scopeParams,
    ),
    pool.query(
      `SELECT COALESCE(ROUND(AVG(score)::numeric, 2), 0)::float AS average
       FROM edu_evaluation_grades
       ${scopeClause}`,
      scopeParams,
    ),
  ]);

  return response.json(successResponse('Dashboard administrativo cargado.', {
    scope: {
      institutionId,
      userRoles,
      isSuperAdmin,
    },
    metrics: {
      institutions: institutionsCount.rows[0]?.total ?? 0,
      users: usersCount.rows[0]?.total ?? 0,
      activeUsers: activeUsersCount.rows[0]?.total ?? 0,
      roles: rolesCount.rows[0]?.total ?? 0,
      academicLevels: levelsCount.rows[0]?.total ?? 0,
      academicGrades: gradesCount.rows[0]?.total ?? 0,
      academicSections: sectionsCount.rows[0]?.total ?? 0,
      teachers: teachersCount.rows[0]?.total ?? 0,
      students: studentsCount.rows[0]?.total ?? 0,
      enrollments: enrollmentsCount.rows[0]?.total ?? 0,
      activeEnrollments: activeEnrollmentsCount.rows[0]?.total ?? 0,
      subjects: subjectsCount.rows[0]?.total ?? 0,
      academicAssignments: academicAssignmentsCount.rows[0]?.total ?? 0,
      evaluations: evaluationsCount.rows[0]?.total ?? 0,
      evaluationGrades: evaluationGradesCount.rows[0]?.total ?? 0,
      attendanceRecords: attendanceRecordsCount.rows[0]?.total ?? 0,
      averageGrade: evaluationAverage.rows[0]?.average ?? 0,
    },
    distributions: {
      attendanceByStatus: attendanceByStatus.rows,
      studentsByStatus: studentsByStatus.rows,
      teachersByStatus: teacherByStatus.rows,
    },
    institutions: institutions.rows,
    recentUsers: users.rows,
  }));
});

export default router;
