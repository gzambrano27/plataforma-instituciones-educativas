import Link from 'next/link';

type AuthBootstrap = {
  mode: string;
  sessionStrategy: string;
  currentStatus: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4100/api';

async function getAuthBootstrap(): Promise<AuthBootstrap | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/system/auth/bootstrap`, { cache: 'no-store' });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data?: AuthBootstrap };
    return payload.data ?? null;
  } catch {
    return null;
  }
}

const quickModules = [
  {
    href: '/panel',
    title: 'Panel ejecutivo',
    description: 'Lectura inmediata del estado institucional, usuarios y operación general.',
  },
  {
    href: '/instituciones',
    title: 'Instituciones',
    description: 'Registro institucional, datos principales y seguimiento del año lectivo activo.',
  },
  {
    href: '/usuarios',
    title: 'Usuarios y roles',
    description: 'Accesos, estados, asignación institucional y perfiles operativos.',
  },
];

const highlights = [
  {
    title: 'Autoridades',
    description: 'Indicadores visibles, contexto ejecutivo y acceso rápido a los módulos más usados.',
  },
  {
    title: 'Gestión diaria',
    description: 'Procesos de alta y consulta con menos ruido visual y mejor legibilidad.',
  },
  {
    title: 'Comunidad educativa',
    description: 'Una base visual profesional para seguir creciendo hacia servicios estudiantiles.',
  },
];

export default async function HomePage() {
  const authBootstrap = await getAuthBootstrap();

  return (
    <main className="space-y-8 pb-10">
      <section className="glass-panel px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">Software educativo institucional</span>
              <span className="info-chip">Frontend rediseñado</span>
            </div>
            <div className="space-y-4">
              <h1 className="section-title max-w-5xl">
                Un dashboard educativo claro, ejecutivo y contundente para dirigir instituciones con mejor lectura visual.
              </h1>
              <p className="section-copy max-w-3xl">
                Educa reorganiza cursos, estudiantes, evaluaciones, actividad diaria y administración en un entorno blanco, sobrio y profesional,
                pensado tanto para autoridades como para equipos operativos y comunidad estudiantil.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="dark-metric-card">
                <p className="text-sm font-medium text-slate-300">Retención académica</p>
                <p className="mt-4 text-5xl font-semibold tracking-tight">94%</p>
                <p className="mt-3 text-sm text-slate-300">Seguimiento consolidado de asistencia, continuidad y soporte.</p>
              </div>
              <div className="metric-card">
                <p className="eyebrow">Cursos</p>
                <p className="stat-value mt-3">128</p>
                <p className="mt-3 text-sm text-slate-500">Oferta académica visible por nivel, coordinación y periodo.</p>
              </div>
              <div className="metric-card">
                <p className="eyebrow">Estudiantes</p>
                <p className="stat-value mt-3">2.4k</p>
                <p className="mt-3 text-sm text-slate-500">Lectura institucional clara para crecimiento y carga operativa.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/panel" className="primary-button">
                Entrar al panel principal
              </Link>
              <Link href="/instituciones" className="secondary-button">
                Administrar instituciones
              </Link>
              <Link href="/usuarios" className="secondary-button">
                Gestionar usuarios
              </Link>
            </div>
          </div>

          <aside className="section-grid-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Acceso de demostración</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Operación lista para pruebas</h2>
              </div>
              <span className="info-chip">Base activa</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="surface-muted p-4">
                <p className="text-sm text-slate-500">Correo institucional</p>
                <p className="mt-2 font-semibold text-slate-950">admin@educa.local</p>
              </div>
              <div className="surface-muted p-4">
                <p className="text-sm text-slate-500">Clave temporal</p>
                <p className="mt-2 font-semibold text-slate-950">Educa2026!</p>
              </div>
              <div className="surface-muted p-4">
                <p className="text-sm text-slate-500">Autenticación</p>
                <p className="mt-2 text-sm text-slate-700">
                  {authBootstrap ? `${authBootstrap.currentStatus} · ${authBootstrap.sessionStrategy}` : 'Sin información disponible.'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {quickModules.map((module) => (
          <Link key={module.href} href={module.href} className="section-grid-card transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_20px_46px_rgba(14,165,233,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Módulo principal</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{module.title}</h3>
              </div>
              <span className="rounded-2xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">Activo</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{module.description}</p>
            <span className="mt-8 inline-flex text-sm font-semibold text-slate-950">Abrir módulo</span>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="section-grid-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Bloques educativos</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">Cursos, evaluaciones y actividad en una sola vista</h3>
            </div>
            <span className="info-chip">Lectivo 2026-2027</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Cursos</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">Planificación por nivel y sección</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Estudiantes</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">Seguimiento de matrícula y permanencia</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Evaluaciones</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">Resultados visibles para coordinación y rectorado</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Actividades</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">Agenda operativa y acciones pendientes</p>
            </div>
          </div>
        </div>

        <div className="section-grid-card">
          <p className="eyebrow">Rendimiento institucional</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">Resumen ejecutivo de la operación educativa</h3>
          <div className="mt-6 space-y-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <div>
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
