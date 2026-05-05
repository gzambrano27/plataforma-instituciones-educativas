"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { LogoutButton } from './logout-button';

const navigationItems = [
  { href: '/sistema/panel', label: 'Dashboard', icon: '🏫', description: 'Centro institucional' },
  { href: '/sistema/estudiantes', label: 'Estudiantes', icon: '🧑‍🎓', description: 'Gestión y matrículas' },
  { href: '/sistema/docentes', label: 'Docentes', icon: '👩‍🏫', description: 'Planta académica' },
  { href: '/sistema/materias', label: 'Materias', icon: '📘', description: 'Oferta curricular' },
  { href: '/sistema/academico', label: 'Académico', icon: '🗓️', description: 'Niveles, grados y secciones' },
  { href: '/sistema/evaluaciones', label: 'Calificaciones', icon: '📝', description: 'Evaluación continua' },
  { href: '/sistema/asistencia', label: 'Asistencia', icon: '📊', description: 'Control diario' },
  { href: '/sistema/matriculas', label: 'Matrículas', icon: '📣', description: 'Inscripciones activas' },
  { href: '/sistema/asignaciones-academicas', label: 'Asignaciones', icon: '🔗', description: 'Docente, materia y curso' },
  { href: '/sistema/usuarios', label: 'Configuración', icon: '⚙️', description: 'Usuarios y acceso' },
];

const pageMeta: Record<string, { title: string; subtitle: string; quickAction: string }> = {
  '/sistema': {
    title: 'Dashboard',
    subtitle: 'Panel principal de gestión educativa',
    quickAction: 'Resumen institucional y seguimiento diario',
  },
  '/sistema/panel': {
    title: 'Dashboard',
    subtitle: 'Panel principal de gestión educativa',
    quickAction: 'Resumen institucional y seguimiento diario',
  },
  '/sistema/instituciones': {
    title: 'Institución',
    subtitle: 'Datos base, sedes y contacto operativo',
    quickAction: 'Información central de la institución',
  },
  '/sistema/academico': {
    title: 'Académico',
    subtitle: 'Niveles, cursos, secciones y estructura escolar',
    quickAction: 'Orden académico de una sola institución',
  },
  '/sistema/docentes': {
    title: 'Docentes',
    subtitle: 'Planta docente y asignación académica',
    quickAction: 'Seguimiento de carga y responsables',
  },
  '/sistema/estudiantes': {
    title: 'Estudiantes',
    subtitle: 'Altas, consulta, seguimiento y ubicación escolar',
    quickAction: 'Gestión estudiantil centralizada',
  },
  '/sistema/matriculas': {
    title: 'Matrículas',
    subtitle: 'Inscripciones por periodo, curso y sección',
    quickAction: 'Control del flujo de matrícula',
  },
  '/sistema/materias': {
    title: 'Materias',
    subtitle: 'Oferta curricular institucional',
    quickAction: 'Base académica por nivel y curso',
  },
  '/sistema/asignaciones-academicas': {
    title: 'Asignaciones',
    subtitle: 'Relación entre docentes, materias y estructura',
    quickAction: 'Cruce operativo académico',
  },
  '/sistema/evaluaciones': {
    title: 'Calificaciones',
    subtitle: 'Evaluaciones, instrumentos y resultados',
    quickAction: 'Seguimiento del rendimiento',
  },
  '/sistema/asistencia': {
    title: 'Asistencia',
    subtitle: 'Control diario por fecha y sección',
    quickAction: 'Monitoreo de presencia escolar',
  },
  '/sistema/usuarios': {
    title: 'Configuración',
    subtitle: 'Usuarios, perfiles y seguridad operativa',
    quickAction: 'Gobierno de acceso institucional',
  },
};

const topStats = [
  { label: 'Estudiantes activos', value: '1,842', delta: '+5.8%', deltaTone: 'text-green-600', note: 'vs. último mes', icon: '🎓', iconTone: 'bg-brand-50 text-brand-700' },
  { label: 'Docentes registrados', value: '126', delta: '-1.2%', deltaTone: 'text-red-500', note: 'rotación del mes', icon: '👩‍🏫', iconTone: 'bg-blue-50 text-blue-600' },
  { label: 'Asistencia promedio', value: '94.7%', delta: '+2.1%', deltaTone: 'text-green-600', note: 'última semana', icon: '✅', iconTone: 'bg-sky-50 text-sky-600' },
  { label: 'Satisfacción general', value: '91.3%', delta: '+3.4%', deltaTone: 'text-green-600', note: 'encuestas recientes', icon: '⭐', iconTone: 'bg-indigo-50 text-indigo-600' },
];

const admissionsRows = [
  { id: '1', code: '#ED10234', student: 'Amaya Véliz', courseIcon: '📘', course: '8vo EGB', level: 'Básica Superior', payment: '$100', status: 'En revisión', badge: 'badge-warn' },
  { id: '2', code: '#ED10235', student: 'Sebastián Adams', courseIcon: '🧪', course: '1ro Bachillerato', level: 'Bachillerato', payment: '$75', status: 'Procesando', badge: 'badge-blue' },
  { id: '3', code: '#ED10236', student: 'Suzanne Bright', courseIcon: '💻', course: '10mo EGB', level: 'Básica Superior', payment: '$150', status: 'Completado', badge: 'badge-success' },
  { id: '4', code: '#ED10237', student: 'Peter Howl', courseIcon: '🎨', course: 'Inicial 2', level: 'Inicial', payment: '$60', status: 'Pendiente', badge: 'badge-red' },
  { id: '5', code: '#ED10238', student: 'Anita Singh', courseIcon: '🌍', course: '9no EGB', level: 'Básica Superior', payment: '$90', status: 'Confirmado', badge: 'badge-warn' },
];

const recentActivity = [
  ['🧾', 'Maureen Steel', 'registró 2 nuevos estudiantes en', 'Inicial 2', '10:30 AM'],
  ['📢', '', 'Se publicó un comunicado para representantes sobre evaluaciones parciales.', '', '9:45 AM'],
  ['⭐', 'Vincent Laurent', 'dejó una evaluación de 5 estrellas para la experiencia académica.', '', '8:20 AM'],
  ['⚠️', '', 'El inventario de', 'material didáctico', '7:30 AM'],
  ['🔄', 'Damian Ugo', 'cambió de “Pendiente” a “Procesando”.', '', '7:00 AM'],
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname() ?? '/sistema';
  const activePage = pageMeta[pathname] ?? pageMeta['/sistema'];
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileSidebarOpen(false);
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileSidebarOpen]);

  const dashboardView = useMemo(() => pathname === '/sistema' || pathname === '/sistema/panel', [pathname]);

  return (
    <div className="edu-system-shell app-layout">
      <div className={`sidebar-overlay ${mobileSidebarOpen ? 'show' : ''}`} onClick={() => setMobileSidebarOpen(false)} />

      <aside id="sidebar" className={`sidebar px-4 py-5 flex flex-col ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between pb-5">
          <Link href="/sistema/panel" className="flex items-center gap-3" onClick={() => setMobileSidebarOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 text-white font-extrabold shadow-soft">
              E
            </div>
            <div>
              <h1 className="text-[18px] font-extrabold leading-none text-ink">EduSmart</h1>
              <p className="mt-1 text-[11px] font-medium text-muted">Gestión institucional</p>
            </div>
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-gray-500 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Cerrar navegación"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 rounded-xl border border-line bg-white p-3 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 font-extrabold text-brand-700">AG</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-gray-800">Administración general</p>
              <p className="text-[11px] font-medium text-muted">Rectorado y operación</p>
            </div>
          </div>
        </div>

        <nav className="soft-scroll space-y-1.5 overflow-y-auto pr-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/sistema/panel' && pathname === '/sistema');

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`menu-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? 'active' : 'text-gray-600'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="divider-h my-4"></div>

          <Link href="/" onClick={() => setMobileSidebarOpen(false)} className="menu-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600">
            <span>🌐</span>
            <span>Sitio público</span>
          </Link>

          <button className="menu-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600">
            <span>❓</span>
            <span>Ayuda</span>
          </button>
        </nav>

        <div className="mt-auto pt-6">
          <div className="sidebar-footer-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold">Sistema activo</p>
                <p className="mt-1 text-xs text-white/80">Periodo académico 2026</p>
              </div>
              <span className="mt-1 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_0_5px_rgba(110,231,183,.18)]"></span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/15 bg-white/12 p-2">
                <p className="text-[10px] font-bold text-white/65">Módulos</p>
                <p className="text-lg font-extrabold">12</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/12 p-2">
                <p className="text-[10px] font-bold text-white/65">Uptime</p>
                <p className="text-lg font-extrabold">99%</p>
              </div>
            </div>

            <Link href="/sistema/panel" className="mt-4 flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-brand-800 transition hover:bg-brand-50">
              Ver estado
            </Link>
          </div>
        </div>
      </aside>

      <main className="main-content min-h-screen bg-soft">
        <header className="sticky top-0 z-40 border-b border-line bg-white/95 px-4 py-4 backdrop-blur sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line bg-white text-gray-600 transition hover:bg-brand-50 lg:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Abrir navegación"
              >
                ☰
              </button>

              <div>
                <h2 className="text-[26px] font-extrabold leading-none text-ink sm:text-[30px]">{activePage.title}</h2>
                <p className="mt-1 text-sm text-muted">{activePage.subtitle}</p>
              </div>
            </div>

            <div className="header-actions flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <input className="top-search h-[42px] w-full rounded-xl border border-line bg-[#FAFBFC] pl-10 pr-4 text-sm sm:w-[270px]" placeholder="Buscar estudiante, curso, docente..." />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>

              <select className="top-select h-[42px] rounded-xl border border-line bg-[#FAFBFC] px-3 text-sm text-gray-700">
                <option>Periodo 2026</option>
                <option>Periodo 2025</option>
              </select>

              <div className="header-buttons flex items-center gap-3">
                <button className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line bg-white text-gray-500 transition hover:bg-brand-50">🔔</button>
                <button className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-line bg-white text-gray-500 transition hover:bg-brand-50">💬</button>

                <div className="flex items-center gap-3 pl-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-800 font-bold text-white">AG</div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-bold leading-none text-gray-800">Administración general</p>
                    <p className="mt-1 text-[11px] text-muted">Rectorado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-padding p-5 lg:p-6">
          {dashboardView ? <DashboardTemplate /> : children}
        </div>
      </main>
    </div>
  );
}

function DashboardTemplate() {
  return (
    <>
      <div className="stats-grid grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((item) => (
          <div key={item.label} className="stat-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="tiny-label">{item.label}</p>
                <p className="kpi-value mt-2">{item.value}</p>
              </div>
              <div className={`icon-box ${item.iconTone}`}>{item.icon}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className={`font-bold ${item.deltaTone}`}>{item.delta}</span>
              <span className="text-gray-400">{item.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid mt-4 grid grid-cols-[1.6fr_1fr_0.95fr] gap-4">
        <section className="panel-card min-w-0 p-4">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="section-title">Analítica de rendimiento académico</h3>
              <p className="mt-1 text-xs text-muted">Promedio general vs. índice de asistencia</p>
            </div>
            <button className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-700">Últimos 8 días</button>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-[#F1F3F6] bg-[#FCFCFD] p-3">
            <svg viewBox="0 0 720 280" className="h-[250px] w-full">
              <g className="chart-grid">
                <line x1="55" y1="20" x2="55" y2="230" />
                <line x1="55" y1="230" x2="690" y2="230" />
                <line x1="55" y1="190" x2="690" y2="190" />
                <line x1="55" y1="150" x2="690" y2="150" />
                <line x1="55" y1="110" x2="690" y2="110" />
                <line x1="55" y1="70" x2="690" y2="70" />
                <line x1="55" y1="30" x2="690" y2="30" />
              </g>
              <g fill="#A3AAB5" fontSize="11" fontWeight="600">
                <text x="18" y="234">0</text>
                <text x="8" y="194">20</text>
                <text x="8" y="154">40</text>
                <text x="8" y="114">60</text>
                <text x="8" y="74">80</text>
                <text x="0" y="34">100</text>
                <text x="80" y="255">12 Ago</text>
                <text x="160" y="255">13 Ago</text>
                <text x="240" y="255">14 Ago</text>
                <text x="320" y="255">15 Ago</text>
                <text x="400" y="255">16 Ago</text>
                <text x="480" y="255">17 Ago</text>
                <text x="560" y="255">18 Ago</text>
                <text x="640" y="255">19 Ago</text>
              </g>
              <rect x="360" y="35" width="60" height="195" fill="#EEF6FF" rx="8" />
              <path d="M80 150C120 115, 140 130, 170 140 C210 154, 240 118, 260 106 C290 92, 330 98, 360 110 C380 118, 400 92, 430 100 C470 110, 500 140, 530 136 C560 130, 590 90, 620 98 C645 102, 660 112, 680 116" fill="none" stroke="#1468E0" strokeWidth="4" strokeLinecap="round" />
              <path d="M80 175 C110 195, 140 192, 170 166 C210 132, 245 175, 270 168 C300 160, 340 122, 370 132 C400 144, 430 202, 455 186 C490 164, 520 154, 545 170 C575 190, 610 168, 680 180" fill="none" stroke="#8CC0FF" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 7" />
              <circle cx="390" cy="100" r="5.5" fill="#fff" stroke="#1468E0" strokeWidth="3" />
              <g transform="translate(355,52)">
                <rect width="72" height="34" rx="9" fill="#ffffff" stroke="#E8EDF3" />
                <text x="36" y="14" textAnchor="middle" fontSize="8.5" fill="#9CA3AF" fontWeight="700">Promedio</text>
                <text x="36" y="24" textAnchor="middle" fontSize="12" fill="#171717" fontWeight="800">91.2%</text>
              </g>
              <g fontSize="11" fontWeight="700">
                <line x1="58" y1="12" x2="82" y2="12" stroke="#1468E0" strokeWidth="3" />
                <text x="88" y="15" fill="#9CA3AF">Rendimiento</text>
                <line x1="170" y1="12" x2="194" y2="12" stroke="#8CC0FF" strokeWidth="3" strokeDasharray="6 6" />
                <text x="200" y="15" fill="#9CA3AF">Asistencia</text>
              </g>
            </svg>
          </div>
        </section>

        <section className="panel-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Meta mensual</h3>
              <p className="mt-1 text-xs text-muted">Objetivo de matrículas</p>
            </div>
            <button className="font-bold text-gray-400">···</button>
          </div>

          <div className="flex flex-col items-center pt-2">
            <div className="semi-donut">
              <div className="absolute inset-x-0 bottom-3 z-10 text-center">
                <p className="text-[32px] font-extrabold leading-none text-ink">85%</p>
                <p className="mt-1 text-[11px] font-bold text-green-600">+8.0% respecto al mes anterior</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="font-bold text-gray-800">¡Buen progreso!</p>
              <p className="mt-1 text-xs text-muted">Se alcanzó gran parte de la meta institucional del mes.</p>
            </div>

            <div className="mt-4 grid w-full grid-cols-2 gap-3">
              <div className="rounded-xl bg-brand-50 px-3 py-3 text-center">
                <p className="text-[11px] font-bold text-muted">Meta</p>
                <p className="mt-1 text-sm font-extrabold text-gray-800">600</p>
              </div>
              <div className="rounded-xl bg-brand-50 px-3 py-3 text-center">
                <p className="text-[11px] font-bold text-muted">Logrado</p>
                <p className="mt-1 text-sm font-extrabold text-gray-800">510</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Niveles educativos</h3>
              <p className="mt-1 text-xs text-muted">Distribución de estudiantes</p>
            </div>
            <button className="text-xs font-bold text-brand-700">Ver todo</button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="donut"></div>
              <div className="donut-center flex flex-col items-center justify-center">
                <p className="text-[11px] font-semibold text-gray-400">Total estudiantes</p>
                <p className="text-[30px] font-extrabold leading-none text-ink">1,842</p>
              </div>
            </div>

            <div className="mt-5 w-full space-y-3 text-sm">
              {[
                ['bg-brand-600', 'Inicial y Básica', '720'],
                ['bg-brand-400', 'Secundaria', '560'],
                ['bg-brand-200', 'Bachillerato', '392'],
                ['bg-brand-100', 'Programas especiales', '170'],
              ].map(([tone, label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${tone}`}></span>
                    <span className="text-gray-600">{label}</span>
                  </div>
                  <span className="font-bold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="dashboard-grid mt-4 grid grid-cols-[1fr_1.25fr_0.85fr] gap-4">
        <section className="panel-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Usuarios activos</h3>
              <p className="mt-1 text-xs text-muted">Interacción por tipo de usuario</p>
            </div>
            <button className="font-bold text-gray-400">···</button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[32px] font-extrabold leading-none">2,758</p>
              <p className="mt-1 text-xs text-muted">Usuarios en plataforma</p>
            </div>
            <span className="badge badge-success">+8.02%</span>
          </div>

          <div className="space-y-4">
            {[
              ['Estudiantes', '58%'],
              ['Docentes', '24%'],
              ['Padres de familia', '12%'],
              ['Administrativos', '6%'],
            ].map(([label, width]) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-gray-600">
                  <span>{label}</span>
                  <span>{width}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-brand-50">
                  <div className="mini-bar" style={{ width }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Embudo de admisión</h3>
              <p className="mt-1 text-xs text-muted">Seguimiento de aspirantes</p>
            </div>
            <button className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-700">Esta semana</button>
          </div>

          <div className="mt-2 grid grid-cols-5 gap-3">
            {[
              ['Leads', '420', '+9%', 'text-green-600'],
              ['Entrevista', '240', '+5%', 'text-green-600'],
              ['Evaluación', '180', '+4%', 'text-green-600'],
              ['Aprobados', '132', '+7%', 'text-green-600'],
              ['No completados', '48', '-5%', 'text-red-500'],
            ].map(([label, value, delta, deltaTone]) => (
              <div key={label} className="text-center">
                <p className="text-[11px] font-bold text-gray-400">{label}</p>
                <p className="mt-1 text-[30px] font-extrabold text-ink">{value}</p>
                <p className={`text-xs font-bold ${deltaTone}`}>{delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex h-[150px] items-end gap-3">
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[70%] w-full"></div></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[42%] w-full opacity-90"></div></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[32%] w-full opacity-85"></div></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[22%] w-full opacity-80"></div></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[16%] w-full bg-gradient-to-b from-brand-500 to-brand-700"></div></div>
          </div>
        </section>

        <section className="panel-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Fuentes de captación</h3>
              <p className="mt-1 text-xs text-muted">Origen de aspirantes</p>
            </div>
            <button className="font-bold text-gray-400">···</button>
          </div>

          <div className="flex h-8 overflow-hidden rounded-xl bg-brand-50">
            <div className="h-full bg-brand-100" style={{ width: '40%' }}></div>
            <div className="h-full bg-brand-300" style={{ width: '25%' }}></div>
            <div className="h-full bg-brand-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-brand-700" style={{ width: '10%' }}></div>
            <div className="h-full bg-brand-900" style={{ width: '5%' }}></div>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            {[
              ['bg-brand-100', 'Referidos', '40%'],
              ['bg-brand-300', 'Redes sociales', '25%'],
              ['bg-brand-500', 'Web institucional', '20%'],
              ['bg-brand-700', 'Ferias educativas', '10%'],
              ['bg-brand-900', 'Email campañas', '5%'],
            ].map(([tone, label, value]) => (
              <div key={label} className="flex justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${tone}`}></span>
                  <span>{label}</span>
                </div>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid mt-4 grid grid-cols-[1.75fr_0.85fr] gap-4">
        <section className="panel-card min-w-0 p-4">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="section-title">Registros recientes</h3>
              <p className="mt-1 text-xs text-muted">Últimas matrículas y movimientos académicos</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <input className="h-[38px] rounded-lg border border-line bg-[#FAFBFC] pl-9 pr-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-100" placeholder="Buscar estudiante o curso" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">🔎</span>
              </div>

              <button className="h-[38px] rounded-lg bg-brand-600 px-3 text-sm font-bold text-white transition hover:bg-brand-700">Todos los cursos</button>
            </div>
          </div>

          <div className="soft-scroll overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="bg-brand-50 text-xs uppercase tracking-wide text-gray-600">
                  <th className="rounded-l-xl px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Código</th>
                  <th className="px-4 py-3 text-left">Estudiante</th>
                  <th className="px-4 py-3 text-left">Curso</th>
                  <th className="px-4 py-3 text-left">Nivel</th>
                  <th className="px-4 py-3 text-left">Pago</th>
                  <th className="rounded-r-xl px-4 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                {admissionsRows.map((row) => (
                  <tr key={row.code} className="transition hover:bg-[#FAFBFC]">
                    <td className="px-4 py-3 text-gray-500">{row.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-700">{row.code}</td>
                    <td className="px-4 py-3">{row.student}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">{row.courseIcon}</span>
                        <span>{row.course}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{row.level}</td>
                    <td className="px-4 py-3">{row.payment}</td>
                    <td className="px-4 py-3"><span className={`badge ${row.badge}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <div>Copyright © 2026 EduSmart</div>
            <div className="flex items-center gap-4">
              <span>Privacidad</span>
              <span>Términos</span>
              <span>Contacto</span>
            </div>
          </div>
        </section>

        <section className="panel-card p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Actividad reciente</h3>
              <p className="mt-1 text-xs text-muted">Últimos eventos del sistema</p>
            </div>
            <button className="font-bold text-gray-400">···</button>
          </div>

          <div className="space-y-4">
            {recentActivity.map(([icon, actor, text, emphasis, time], index) => (
              <div key={`${time}-${index}`} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">{icon}</div>
                <div>
                  <p className="text-sm leading-snug text-gray-700">
                    {actor ? <span className="font-semibold">{actor}</span> : null}
                    {actor ? ' ' : ''}
                    {text}{' '}
                    {emphasis ? <span className="font-semibold">{emphasis}</span> : null}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">{time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <span>Ⓕ</span>
              <span>Ⓧ</span>
              <span>◎</span>
              <span>▶</span>
              <span>in</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
