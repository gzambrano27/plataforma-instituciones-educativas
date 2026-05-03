import Link from 'next/link';
import { DemoApiError, fetchDemoApi } from '../lib/demo-api';

export const dynamic = 'force-dynamic';

type DashboardPayload = {
  metrics: {
    institutions: number;
    users: number;
    activeUsers: number;
    roles: number;
  };
  institutions: Array<{
    id: string;
    name: string;
    slug: string;
    activeSchoolYearLabel?: string | null;
  }>;
  recentUsers: Array<{
    id: string;
    fullName: string;
    email: string;
    status: string;
    institutionName?: string | null;
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
  const { dashboard, error } = await loadDashboard();
  const trackedUsers = dashboard?.recentUsers.length ?? 0;
  const institutionCoverage = dashboard?.institutions.length ?? 0;

  return (
    <main className="space-y-8 pb-10">
      <section className="glass-panel px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Panel administrativo</p>
              <span className="info-chip">Operación del día</span>
            </div>
            <h1 className="section-title">Centro operativo con lectura inmediata de instituciones, accesos y actividad reciente</h1>
            <p className="section-copy max-w-3xl">
              El panel reorganiza la información clave en métricas grandes, listas limpias y bloques de seguimiento para facilitar decisiones rápidas desde rectorado, coordinación y administración.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="dark-metric-card">
              <p className="text-sm font-medium text-slate-300">Cobertura institucional</p>
              <p className="mt-4 text-4xl font-semibold tracking-tight">{institutionCoverage}</p>
              <p className="mt-3 text-sm text-slate-300">Instituciones visibles en el tablero actual.</p>
            </div>
            <div className="section-grid-card">
              <p className="text-sm font-semibold text-slate-900">Actividad reciente</p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{trackedUsers}</p>
              <p className="mt-3 text-sm text-slate-500">Usuarios recientes monitoreados por el panel.</p>
            </div>
          </div>
        </div>
      </section>

      {error || !dashboard ? (
        <div className="surface-panel px-5 py-4 text-sm text-rose-700">{error ?? 'No hay datos del panel.'}</div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Instituciones" value={dashboard.metrics.institutions} helper="Unidades activas en la plataforma" />
            <MetricCard label="Usuarios" value={dashboard.metrics.users} helper="Cuentas registradas" />
            <MetricCard label="Usuarios activos" value={dashboard.metrics.activeUsers} helper="Accesos operativos habilitados" />
            <MetricCard label="Roles" value={dashboard.metrics.roles} helper="Perfiles de gobierno disponibles" />
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="section-grid-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Cursos y rendimiento</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Panorama pedagógico simulado para lectura ejecutiva</h2>
                </div>
                <span className="info-chip">Actualizado hoy</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="surface-muted p-4">
                  <p className="text-sm text-slate-500">Cursos monitoreados</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">36</p>
                  <p className="mt-2 text-sm text-slate-600">Distribuidos entre básica, bachillerato y trayectos complementarios.</p>
                </div>
                <div className="surface-muted p-4">
                  <p className="text-sm text-slate-500">Promedio de evaluaciones</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">8.9/10</p>
                  <p className="mt-2 text-sm text-slate-600">Resultado consolidado para seguimiento de rendimiento.</p>
                </div>
                <div className="surface-muted p-4 md:col-span-2">
                  <p className="text-sm text-slate-500">Actividades priorizadas</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">Apertura de periodo, revisión de accesos y validación institucional</p>
                </div>
              </div>
            </div>

            <div className="table-shell">
              <div className="soft-divider flex items-center justify-between px-6 py-5">
                <div>
                  <p className="eyebrow">Instituciones recientes</p>
                  <p className="mt-2 text-sm text-slate-500">Lectura rápida de las unidades institucionales activas.</p>
                </div>
                <span className="info-chip">{dashboard.institutions.length} visibles</span>
              </div>
              <div className="table-header-row grid-cols-[minmax(0,1.2fr)_180px]">
                <span>Institución</span>
                <span>Ciclo activo</span>
              </div>
              <div>
                {dashboard.institutions.map((institution) => (
                  <article key={institution.id} className="table-data-row grid-cols-[minmax(0,1.2fr)_180px]">
                    <div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">{institution.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{institution.slug}</p>
                      </div>
                    </div>
                    <span className="info-chip h-fit">{institution.activeSchoolYearLabel ?? 'Año por definir'}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="table-shell lg:col-span-2">
              <div className="soft-divider flex items-center justify-between px-6 py-5">
                <div>
                  <p className="eyebrow">Usuarios recientes</p>
                  <p className="mt-2 text-sm text-slate-500">Personas con acceso creadas recientemente.</p>
                </div>
                <span className="info-chip">{dashboard.recentUsers.length} visibles</span>
              </div>
              <div className="table-header-row grid-cols-[minmax(0,1fr)_220px_160px]">
                <span>Usuario</span>
                <span>Institución</span>
                <span>Estado</span>
              </div>
              <div>
                {dashboard.recentUsers.map((user) => (
                  <article key={user.id} className="table-data-row grid-cols-[minmax(0,1fr)_220px_160px]">
                    <div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">{user.fullName}</h3>
                        <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{user.institutionName ?? 'Acceso global sin institución'}</p>
                    <span className="info-chip h-fit">{translateUserStatus(user.status)}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
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

function MetricCard({ label, value, helper }: { label: string; value: number; helper: string }) {
  return (
    <div className="metric-card">
      <p className="eyebrow">{label}</p>
      <p className="stat-value mt-3">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{helper}</p>
    </div>
  );
}
