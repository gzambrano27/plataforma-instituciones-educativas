import Link from 'next/link';
import { DashboardOverviewChart } from '../../components/dashboard-overview-chart';
import { getCurrentUser, getPrimaryRoleLabel, hasSomeRole } from '../../lib/current-user';
import { DemoApiError, fetchDemoApi } from '../lib/demo-api';

export const dynamic = 'force-dynamic';

type DashboardPayload = {
  scope: {
    institutionId: string | null;
    userRoles: string[];
    isSuperAdmin: boolean;
  };
  metrics: {
    institutions: number;
    users: number;
    activeUsers: number;
    roles: number;
    academicLevels: number;
    academicGrades: number;
    academicSections: number;
    teachers: number;
    students: number;
    enrollments: number;
    activeEnrollments: number;
    subjects: number;
    academicAssignments: number;
    evaluations: number;
    evaluationGrades: number;
    attendanceRecords: number;
    averageGrade: number;
  };
  distributions: {
    attendanceByStatus: Array<{ status: string; total: number }>;
    studentsByStatus: Array<{ status: string; total: number }>;
    teachersByStatus: Array<{ status: string; total: number }>;
  };
  institutions: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  recentUsers: Array<{
    id: string;
    fullName: string;
    email: string;
    status: string;
    institutionName?: string | null;
    roleCodes: string[];
  }>;
};

async function loadDashboard() {
  try {
    const dashboard = await fetchDemoApi<DashboardPayload>('/system/dashboard');
    return { dashboard, error: null };
  } catch (error) {
    if (error instanceof DemoApiError) {
      return { dashboard: null as DashboardPayload | null, error: error.message };
    }

    return { dashboard: null as DashboardPayload | null, error: 'No fue posible cargar el dashboard.' };
  }
}

export default async function PanelPage() {
  const [{ dashboard, error }, { user }] = await Promise.all([loadDashboard(), getCurrentUser()]);
  const trackedUsers = dashboard?.recentUsers.length ?? 0;
  const institutionCoverage = dashboard?.institutions.length ?? 0;
  const canManageUsers = hasSomeRole(user, ['superadmin', 'admin_institucional']);
  const canManageAcademic = hasSomeRole(user, ['superadmin', 'admin_institucional', 'docente']);
  const chartData = dashboard
    ? [
        { key: 'students', label: 'Estudiantes', value: dashboard.metrics.students, color: '#2563EB' },
        { key: 'teachers', label: 'Docentes', value: dashboard.metrics.teachers, color: '#0F766E' },
        { key: 'enrollments', label: 'Matrículas', value: dashboard.metrics.enrollments, color: '#7C3AED' },
        { key: 'evaluations', label: 'Evaluaciones', value: dashboard.metrics.evaluations, color: '#EA580C' },
        { key: 'attendance', label: 'Asistencias', value: dashboard.metrics.attendanceRecords, color: '#16A34A' },
      ]
    : [];

  return (
    <main className="space-y-6">
      <section className="panel-card overflow-hidden rounded-[18px] border border-[#EEF1F5] bg-white p-5 shadow-soft lg:p-6">
        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr] xl:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge badge-blue">Panel operativo</span>
              <span className="info-chip">{getPrimaryRoleLabel(user)}</span>
            </div>
            <h1 className="mt-4 text-[24px] font-extrabold leading-tight text-ink sm:text-[28px]">Lectura inmediata de operación, accesos y actividad real</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-[15px]">
              El panel ahora prioriza datos reales de la base institucional, filtra el alcance según el rol logueado y reduce bloques decorativos para enfocarse en operación útil.
            </p>
          </div>

          <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-2xl border border-line bg-brand-50/60 p-4">
              <p className="tiny-label">Sedes visibles</p>
              <p className="mt-2 text-[28px] font-extrabold leading-none text-ink">{institutionCoverage}</p>
              <p className="mt-2 text-xs leading-5 text-muted">Estructura alcanzada por tu sesión.</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="tiny-label">Actividad reciente</p>
              <p className="mt-2 text-[28px] font-extrabold leading-none text-ink">{trackedUsers}</p>
              <p className="mt-2 text-xs leading-5 text-muted">Usuarios recientes dentro del alcance visible.</p>
            </div>
            <div className="rounded-2xl border border-dashed border-line bg-[#FAFBFC] p-4 sm:col-span-2 xl:col-span-1">
              <p className="tiny-label">Promedio académico</p>
              <p className="mt-2 text-[28px] font-extrabold leading-none text-ink">{dashboard?.metrics.averageGrade ?? 0}</p>
              <p className="mt-2 text-xs leading-5 text-muted">Promedio real calculado desde calificaciones registradas.</p>
            </div>
          </aside>
        </div>
      </section>

      {error || !dashboard ? (
        <div className="surface-panel px-5 py-4 text-sm text-rose-700">{error ?? 'No hay datos del panel.'}</div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Estudiantes" value={dashboard.metrics.students} helper="Registros visibles" accent="blue" />
            <MetricCard label="Matrículas activas" value={dashboard.metrics.activeEnrollments} helper="Periodo operativo" accent="green" />
            <MetricCard label="Docentes" value={dashboard.metrics.teachers} helper="Planta académica" accent="violet" />
            <MetricCard label="Asistencias" value={dashboard.metrics.attendanceRecords} helper="Control diario" accent="amber" />
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="table-shell overflow-hidden">
              <div className="table-toolbar soft-divider">
                <div>
                  <p className="eyebrow">Volumen operativo</p>
                  <h2 className="table-title">Gráfica real del sistema</h2>
                  <p className="table-subtitle">Comparativa viva entre estudiantes, docentes, matrículas, evaluaciones y asistencia.</p>
                </div>
                <span className="info-chip">Base de datos real</span>
              </div>
              <div className="p-5">
                <DashboardOverviewChart data={chartData} />
              </div>
            </div>

            <div className="table-shell">
              <div className="table-toolbar soft-divider">
                <div>
                  <p className="eyebrow">Operación prioritaria</p>
                  <h2 className="table-title">Indicadores reales del periodo</h2>
                  <p className="table-subtitle">Resumen útil del comportamiento actual sin cards de texto de relleno.</p>
                </div>
                <span className="info-chip">Tiempo real</span>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                <MiniMetric label="Promedio de notas" value={String(dashboard.metrics.averageGrade)} helper="Calculado desde calificaciones" />
                <MiniMetric label="Usuarios activos" value={String(dashboard.metrics.activeUsers)} helper="Sesiones habilitadas" />
                <MiniMetric label="Evaluaciones" value={String(dashboard.metrics.evaluations)} helper="Instrumentos creados" />
                <MiniMetric label="Calificaciones" value={String(dashboard.metrics.evaluationGrades)} helper="Notas registradas" />
              </div>
            </div>

            <div className="table-shell">
              <div className="table-toolbar soft-divider">
                <div>
                  <p className="eyebrow">Estructura institucional</p>
                  <h2 className="table-title">Sedes visibles recientemente</h2>
                  <p className="table-subtitle">Acceso rápido a la estructura disponible del colegio.</p>
                </div>
                <span className="info-chip">{dashboard.institutions.length} visibles</span>
              </div>
              <div className="table-scroller">
                <table className="data-table min-w-[520px]">
                  <thead>
                    <tr>
                      <th>Registro</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.institutions.map((institution) => (
                      <tr key={institution.id}>
                        <td>
                          <p className="font-semibold text-slate-950">{institution.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{institution.slug}</p>
                        </td>
                        <td>
                          <div className="table-actions">
                            <Link href="/sistema/instituciones" className="compact-button">Gestionar</Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-shell lg:col-span-2">
              <div className="table-toolbar soft-divider">
                <div>
                  <p className="eyebrow">Usuarios recientes</p>
                  <h2 className="table-title">Accesos creados recientemente</h2>
                  <p className="table-subtitle">Personas habilitadas para la operación institucional.</p>
                </div>
                <span className="info-chip">{dashboard.recentUsers.length} visibles</span>
              </div>
              <div className="table-scroller">
                <table className="data-table min-w-[900px]">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Sede</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <p className="font-semibold text-slate-950">{user.fullName}</p>
                          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                        </td>
                        <td>
                          <p className="text-sm text-slate-600">{user.institutionName ?? 'Sin sede asociada'}</p>
                          <p className="mt-1 text-xs text-slate-400">{user.roleCodes.join(', ')}</p>
                        </td>
                        <td>
                          <span className="info-chip h-fit">{translateUserStatus(user.status)}</span>
                        </td>
                        <td>
                          <div className="table-actions">
                            {canManageUsers ? <Link href="/sistema/usuarios" className="compact-button">Gestionar</Link> : <span className="text-xs text-slate-400">Solo lectura</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {canManageAcademic ? (
            <section className="table-shell overflow-hidden">
              <div className="table-toolbar soft-divider">
                <div>
                  <p className="eyebrow">Accesos directos</p>
                  <h2 className="table-title">Módulos habilitados para tu perfil</h2>
                  <p className="table-subtitle">Atajos de trabajo reales según el rol logueado.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 p-5">
                <Link href="/sistema/academico" className="compact-button">Académico</Link>
                <Link href="/sistema/estudiantes" className="compact-button">Estudiantes</Link>
                <Link href="/sistema/evaluaciones" className="compact-button">Evaluaciones</Link>
                <Link href="/sistema/asistencia" className="compact-button">Asistencia</Link>
                <Link href="/sistema/materias" className="compact-button">Materias</Link>
                {canManageUsers ? <Link href="/sistema/usuarios" className="compact-button">Usuarios</Link> : null}
              </div>
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}

function translateUserStatus(status: string) {
  if (status === 'active') return 'Activo';
  if (status === 'pending') return 'Pendiente';
  if (status === 'blocked') return 'Bloqueado';
  return status;
}

function MetricCard({ label, value, helper, accent }: { label: string; value: number; helper: string; accent: 'blue' | 'green' | 'violet' | 'amber' }) {
  const tones = {
    blue: 'bg-blue-50 border-blue-100',
    green: 'bg-emerald-50 border-emerald-100',
    violet: 'bg-violet-50 border-violet-100',
    amber: 'bg-amber-50 border-amber-100',
  } as const;

  return (
    <div className={`rounded-2xl border p-4 ${tones[accent]}`}>
      <p className="summary-label">{label}</p>
      <p className="mt-2 text-[28px] font-extrabold leading-none text-slate-950">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{helper}</p>
    </div>
  );
}

function MiniMetric({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{helper}</p>
    </div>
  );
}
