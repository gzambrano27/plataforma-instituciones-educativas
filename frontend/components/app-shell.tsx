"use client";

import type { ReactNode } from "react";
import type { CurrentUser } from "../lib/current-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navigationItems = [
  { href: "/sistema/panel", label: "Dashboard", icon: "🏫", description: "Centro institucional", roles: ['superadmin', 'admin_institucional', 'docente', 'estudiante', 'representante'] },
  { href: "/sistema/estudiantes", label: "Estudiantes", icon: "🧑‍🎓", description: "Gestión y matrículas", roles: ['superadmin', 'admin_institucional', 'docente'] },
  { href: "/sistema/docentes", label: "Docentes", icon: "👩‍🏫", description: "Planta académica", roles: ['superadmin', 'admin_institucional'] },
  { href: "/sistema/materias", label: "Materias", icon: "📘", description: "Oferta curricular", roles: ['superadmin', 'admin_institucional', 'docente'] },
  { href: "/sistema/academico", label: "Académico", icon: "🗓️", description: "Niveles, grados y secciones", roles: ['superadmin', 'admin_institucional', 'docente'] },
  { href: "/sistema/evaluaciones", label: "Calificaciones", icon: "📝", description: "Evaluación continua", roles: ['superadmin', 'admin_institucional', 'docente', 'estudiante', 'representante'] },
  { href: "/sistema/asistencia", label: "Asistencia", icon: "📊", description: "Control diario", roles: ['superadmin', 'admin_institucional', 'docente', 'representante'] },
  { href: "/sistema/matriculas", label: "Matrículas", icon: "📣", description: "Inscripciones activas", roles: ['superadmin', 'admin_institucional'] },
  { href: "/sistema/asignaciones-academicas", label: "Asignaciones", icon: "🔗", description: "Docente, materia y curso", roles: ['superadmin', 'admin_institucional'] },
  { href: "/sistema/usuarios", label: "Configuración", icon: "⚙️", description: "Usuarios y acceso", roles: ['superadmin', 'admin_institucional'] },
] as const;

type PageMeta = {
  title: string;
  subtitle: string;
  quickAction: string;
};

const dashboardMeta: PageMeta = {
  title: "Dashboard",
  subtitle: "Panel principal de gestión educativa",
  quickAction: "Resumen institucional y seguimiento diario",
};

const pageMeta: Record<string, PageMeta> = {
  "/sistema": dashboardMeta,
  "/sistema/panel": dashboardMeta,
  "/sistema/instituciones": {
    title: "Institución",
    subtitle: "Datos base, sedes y contacto operativo",
    quickAction: "Información central de la institución",
  },
  "/sistema/academico": {
    title: "Académico",
    subtitle: "Niveles, cursos, secciones y estructura escolar",
    quickAction: "Orden académico de una sola institución",
  },
  "/sistema/docentes": {
    title: "Docentes",
    subtitle: "Planta docente y asignación académica",
    quickAction: "Seguimiento de carga y responsables",
  },
  "/sistema/estudiantes": {
    title: "Estudiantes",
    subtitle: "Altas, consulta, seguimiento y ubicación escolar",
    quickAction: "Gestión estudiantil centralizada",
  },
  "/sistema/matriculas": {
    title: "Matrículas",
    subtitle: "Inscripciones por periodo, curso y sección",
    quickAction: "Control del flujo de matrícula",
  },
  "/sistema/materias": {
    title: "Materias",
    subtitle: "Oferta curricular institucional",
    quickAction: "Base académica por nivel y curso",
  },
  "/sistema/asignaciones-academicas": {
    title: "Asignaciones",
    subtitle: "Relación entre docentes, materias y estructura",
    quickAction: "Cruce operativo académico",
  },
  "/sistema/evaluaciones": {
    title: "Calificaciones",
    subtitle: "Evaluaciones, instrumentos y resultados",
    quickAction: "Seguimiento del rendimiento",
  },
  "/sistema/asistencia": {
    title: "Asistencia",
    subtitle: "Control diario por fecha y sección",
    quickAction: "Monitoreo de presencia escolar",
  },
  "/sistema/usuarios": {
    title: "Configuración",
    subtitle: "Usuarios, perfiles y seguridad operativa",
    quickAction: "Gobierno de acceso institucional",
  },
};

const topStats = [
  { label: "Estudiantes activos", value: "1,842", delta: "+5.8%", deltaTone: "text-green-600", note: "vs. último mes", icon: "🎓", iconTone: "bg-brand-50 text-brand-700" },
  { label: "Docentes registrados", value: "126", delta: "-1.2%", deltaTone: "text-red-500", note: "rotación del mes", icon: "👩‍🏫", iconTone: "bg-blue-50 text-blue-600" },
  { label: "Asistencia promedio", value: "94.7%", delta: "+2.1%", deltaTone: "text-green-600", note: "última semana", icon: "✅", iconTone: "bg-sky-50 text-sky-600" },
  { label: "Satisfacción general", value: "91.3%", delta: "+3.4%", deltaTone: "text-green-600", note: "encuestas recientes", icon: "⭐", iconTone: "bg-indigo-50 text-indigo-600" },
];

const admissionsRows = [
  { id: "1", code: "#ED10234", student: "Amaya Véliz", courseIcon: "📘", course: "8vo EGB", level: "Básica Superior", payment: "$100", status: "En revisión", badge: "badge-warn" },
  { id: "2", code: "#ED10235", student: "Sebastián Adams", courseIcon: "🧪", course: "1ro Bachillerato", level: "Bachillerato", payment: "$75", status: "Procesando", badge: "badge-blue" },
  { id: "3", code: "#ED10236", student: "Suzanne Bright", courseIcon: "💻", course: "10mo EGB", level: "Básica Superior", payment: "$150", status: "Completado", badge: "badge-success" },
  { id: "4", code: "#ED10237", student: "Peter Howl", courseIcon: "🎨", course: "Inicial 2", level: "Inicial", payment: "$60", status: "Pendiente", badge: "badge-red" },
  { id: "5", code: "#ED10238", student: "Anita Singh", courseIcon: "🌍", course: "9no EGB", level: "Básica Superior", payment: "$90", status: "Confirmado", badge: "badge-warn" },
];

const recentActivity = [
  ["🧾", "Maureen Steel", "registró 2 nuevos estudiantes en", "Inicial 2", "10:30 AM"],
  ["📢", "", "Se publicó un comunicado para representantes sobre evaluaciones parciales.", "", "9:45 AM"],
  ["⭐", "Vincent Laurent", "dejó una evaluación de 5 estrellas para la experiencia académica.", "", "8:20 AM"],
  ["⚠️", "", "El inventario de", "material didáctico", "7:30 AM"],
  ["🔄", "Damian Ugo", "cambió de “Pendiente” a “Procesando”.", "", "7:00 AM"],
];

const panelCardClass = "panel-card min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm";
const statCardClass = "stat-card min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm";

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function getActivePage(pathname: string): PageMeta {
  const normalized = normalizePathname(pathname);
  const exactMatch = pageMeta[normalized];

  if (exactMatch) return exactMatch;

  const nestedMatch = Object.entries(pageMeta)
    .filter(([href]) => normalized === href || normalized.startsWith(`${href}/`))
    .sort(([firstHref], [secondHref]) => secondHref.length - firstHref.length)[0];

  return nestedMatch?.[1] ?? dashboardMeta;
}

function isActiveNavigationItem(pathname: string, href: string) {
  const normalized = normalizePathname(pathname);

  if (href === "/sistema/panel") {
    return normalized === "/sistema" || normalized === href || normalized.startsWith(`${href}/`);
  }

  return normalized === href || normalized.startsWith(`${href}/`);
}

export function AppShell({ children, currentUser }: Readonly<{ children: ReactNode; currentUser: CurrentUser | null }>) {
  const rawPathname = usePathname() ?? "/sistema";
  const pathname = useMemo(() => normalizePathname(rawPathname), [rawPathname]);
  const activePage = useMemo(() => getActivePage(pathname), [pathname]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileSidebarOpen(false);
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileSidebarOpen]);

  const dashboardView = useMemo(
    () => pathname === "/sistema" || pathname === "/sistema/panel" || pathname.startsWith("/sistema/panel/"),
    [pathname],
  );

  const allowedNavigationItems = useMemo(() => {
    if (!currentUser) return navigationItems.filter((item) => item.href === '/sistema/panel');
    return navigationItems.filter((item) => item.roles.some((role) => currentUser.roleCodes.includes(role)));
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900">
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <aside
        id="sidebar"
        aria-label="Navegación principal"
        className={`fixed inset-y-0 left-0 z-50 flex w-[288px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden border-r border-gray-200 bg-white px-4 py-5 shadow-2xl transition-transform duration-300 ease-out lg:translate-x-0 lg:shadow-none ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <Link href="/sistema/panel" className="flex min-w-0 items-center gap-3" onClick={() => setMobileSidebarOpen(false)}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 font-extrabold text-white shadow-soft">
              E
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-[18px] font-extrabold leading-none text-ink">EduSmart</h1>
              <p className="mt-1 truncate text-[11px] font-medium text-muted">Gestión institucional</p>
            </div>
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Cerrar navegación"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 shrink-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-extrabold text-brand-700">AG</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-gray-800">{currentUser?.fullName ?? 'Acceso institucional'}</p>
              <p className="truncate text-[11px] font-medium text-muted">{currentUser?.roleCodes?.[0] ?? 'Sesión activa'}</p>
            </div>
          </div>
        </div>

        <nav className="soft-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
          {allowedNavigationItems.map((item) => {
            const isActive = isActiveNavigationItem(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? "bg-brand-600 text-white shadow-soft" : "text-gray-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <span className="shrink-0 text-base leading-none">{item.icon}</span>
                <span className="min-w-0">
                  <span className="block truncate">{item.label}</span>
                  <span className={`hidden truncate text-[11px] font-medium xl:block ${isActive ? "text-white/75" : "text-gray-400"}`}>
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}

          <div className="my-4 h-px bg-gray-100" />

          <Link
            href="/"
            onClick={() => setMobileSidebarOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-brand-50 hover:text-brand-700"
          >
            <span>🌐</span>
            <span>Sitio público</span>
          </Link>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-brand-50 hover:text-brand-700"
          >
            <span>❓</span>
            <span>Ayuda</span>
          </button>
        </nav>

        <div className="shrink-0 pt-4">
          <div className="sidebar-footer-card rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 p-4 text-white shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold">Sistema activo</p>
                <p className="mt-1 text-xs text-white/80">Periodo académico 2026</p>
              </div>
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_0_5px_rgba(110,231,183,.18)]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/15 bg-white/10 p-2">
                <p className="text-[10px] font-bold text-white/65">Módulos</p>
                <p className="text-lg font-extrabold">12</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-2">
                <p className="text-[10px] font-bold text-white/65">Uptime</p>
                <p className="text-lg font-extrabold">99%</p>
              </div>
            </div>

            <Link
              href="/sistema/panel"
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-brand-800 transition hover:bg-brand-50"
              onClick={() => setMobileSidebarOpen(false)}
            >
              Ver estado
            </Link>
          </div>
        </div>
      </aside>

      <main className="min-h-screen min-w-0 overflow-x-hidden bg-[#F6F8FB] lg:pl-[288px]">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-5 lg:px-6">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-brand-50 lg:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Abrir navegación"
                aria-controls="sidebar"
                aria-expanded={mobileSidebarOpen}
              >
                ☰
              </button>

              <div className="min-w-0">
                <h2 className="truncate text-[22px] font-extrabold leading-tight text-ink sm:text-[28px]">{activePage.title}</h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">{activePage.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:flex-row xl:items-center">
              <div className="relative min-w-0 xl:w-[320px]">
                <input
                  className="h-[42px] w-full rounded-xl border border-gray-200 bg-[#FAFBFC] pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                  placeholder="Buscar estudiante, curso, docente..."
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <select className="h-[42px] w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 text-sm text-gray-700 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 sm:w-[155px]">
                  <option>Periodo 2026</option>
                  <option>Periodo 2025</option>
                </select>

                <div className="flex shrink-0 items-center justify-between gap-2 sm:justify-start">
                  <button
                    type="button"
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-brand-50"
                    aria-label="Ver notificaciones"
                  >
                    🔔
                  </button>
                  <button
                    type="button"
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-brand-50"
                    aria-label="Ver mensajes"
                  >
                    💬
                  </button>

                  <div className="flex min-w-0 items-center gap-3 pl-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-800 font-bold text-white">AG</div>
                    <div className="hidden min-w-0 sm:block">
                      <p className="truncate text-sm font-bold leading-none text-gray-800">{currentUser?.fullName ?? 'Acceso institucional'}</p>
                      <p className="mt-1 truncate text-[11px] text-muted">{currentUser?.roleCodes?.[0] ?? 'Sesión activa'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-5 lg:p-6">{dashboardView ? <DashboardTemplate /> : children}</div>
      </main>
    </div>
  );
}

function DashboardTemplate() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {topStats.map((item) => (
          <div key={item.label} className={`${statCardClass} p-4`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="tiny-label truncate">{item.label}</p>
                <p className="kpi-value mt-2">{item.value}</p>
              </div>
              <div className={`icon-box shrink-0 ${item.iconTone}`}>{item.icon}</div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <span className={`font-bold ${item.deltaTone}`}>{item.delta}</span>
              <span className="truncate text-gray-400">{item.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-[minmax(0,1.6fr)_minmax(260px,1fr)_minmax(260px,0.95fr)]">
        <section className={`${panelCardClass} p-4 xl:col-span-2 2xl:col-span-1`}>
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className="section-title">Analítica de rendimiento académico</h3>
              <p className="mt-1 text-xs text-muted">Promedio general vs. índice de asistencia</p>
            </div>
            <button type="button" className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-700">
              Últimos 8 días
            </button>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-[#FCFCFD] p-3">
            <svg viewBox="0 0 720 280" className="h-[230px] w-full sm:h-[250px]" role="img" aria-label="Gráfico de rendimiento académico y asistencia">
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

        <section className={`${panelCardClass} p-4`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Meta mensual</h3>
              <p className="mt-1 text-xs text-muted">Objetivo de matrículas</p>
            </div>
            <button type="button" className="font-bold text-gray-400" aria-label="Más opciones">···</button>
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

        <section className={`${panelCardClass} p-4`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Niveles educativos</h3>
              <p className="mt-1 text-xs text-muted">Distribución de estudiantes</p>
            </div>
            <button type="button" className="text-xs font-bold text-brand-700">Ver todo</button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="donut" />
              <div className="donut-center flex flex-col items-center justify-center">
                <p className="text-[11px] font-semibold text-gray-400">Total estudiantes</p>
                <p className="text-[30px] font-extrabold leading-none text-ink">1,842</p>
              </div>
            </div>

            <div className="mt-5 w-full space-y-3 text-sm">
              {[
                ["bg-brand-600", "Inicial y Básica", "720"],
                ["bg-brand-400", "Secundaria", "560"],
                ["bg-brand-200", "Bachillerato", "392"],
                ["bg-brand-100", "Programas especiales", "170"],
              ].map(([tone, label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone}`} />
                    <span className="truncate text-gray-600">{label}</span>
                  </div>
                  <span className="font-bold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-[minmax(260px,1fr)_minmax(0,1.25fr)_minmax(260px,0.85fr)]">
        <section className={`${panelCardClass} p-4`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Usuarios activos</h3>
              <p className="mt-1 text-xs text-muted">Interacción por tipo de usuario</p>
            </div>
            <button type="button" className="font-bold text-gray-400" aria-label="Más opciones">···</button>
          </div>

          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[32px] font-extrabold leading-none">2,758</p>
              <p className="mt-1 text-xs text-muted">Usuarios en plataforma</p>
            </div>
            <span className="badge badge-success shrink-0">+8.02%</span>
          </div>

          <div className="space-y-4">
            {[
              ["Estudiantes", "58%"],
              ["Docentes", "24%"],
              ["Padres de familia", "12%"],
              ["Administrativos", "6%"],
            ].map(([label, width]) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between gap-3 text-xs font-semibold text-gray-600">
                  <span className="truncate">{label}</span>
                  <span>{width}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-brand-50">
                  <div className="mini-bar h-full rounded-full" style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${panelCardClass} p-4 xl:col-span-2 2xl:col-span-1`}>
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="section-title">Embudo de admisión</h3>
              <p className="mt-1 text-xs text-muted">Seguimiento de aspirantes</p>
            </div>
            <button type="button" className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-700">Esta semana</button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["Leads", "420", "+9%", "text-green-600"],
              ["Entrevista", "240", "+5%", "text-green-600"],
              ["Evaluación", "180", "+4%", "text-green-600"],
              ["Aprobados", "132", "+7%", "text-green-600"],
              ["No completados", "48", "-5%", "text-red-500"],
            ].map(([label, value, delta, deltaTone]) => (
              <div key={label} className="rounded-xl bg-[#FAFBFC] p-3 text-center lg:bg-transparent lg:p-0">
                <p className="text-[11px] font-bold text-gray-400">{label}</p>
                <p className="mt-1 text-2xl font-extrabold text-ink lg:text-[30px]">{value}</p>
                <p className={`text-xs font-bold ${deltaTone}`}>{delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex h-[150px] items-end gap-2 sm:gap-3">
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[70%] w-full" /></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[42%] w-full opacity-90" /></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[32%] w-full opacity-85" /></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[22%] w-full opacity-80" /></div>
            <div className="flex h-full flex-1 items-end"><div className="funnel-step h-[16%] w-full bg-gradient-to-b from-brand-500 to-brand-700" /></div>
          </div>
        </section>

        <section className={`${panelCardClass} p-4`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Fuentes de captación</h3>
              <p className="mt-1 text-xs text-muted">Origen de aspirantes</p>
            </div>
            <button type="button" className="font-bold text-gray-400" aria-label="Más opciones">···</button>
          </div>

          <div className="flex h-8 overflow-hidden rounded-xl bg-brand-50">
            <div className="h-full bg-brand-100" style={{ width: "40%" }} />
            <div className="h-full bg-brand-300" style={{ width: "25%" }} />
            <div className="h-full bg-brand-500" style={{ width: "20%" }} />
            <div className="h-full bg-brand-700" style={{ width: "10%" }} />
            <div className="h-full bg-brand-900" style={{ width: "5%" }} />
          </div>

          <div className="mt-5 space-y-3 text-sm">
            {[
              ["bg-brand-100", "Referidos", "40%"],
              ["bg-brand-300", "Redes sociales", "25%"],
              ["bg-brand-500", "Web institucional", "20%"],
              ["bg-brand-700", "Ferias educativas", "10%"],
              ["bg-brand-900", "Email campañas", "5%"],
            ].map(([tone, label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2 text-gray-600">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone}`} />
                  <span className="truncate">{label}</span>
                </div>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(280px,0.85fr)]">
        <section className={`${panelCardClass} p-4`}>
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="section-title">Registros recientes</h3>
              <p className="mt-1 text-xs text-muted">Últimas matrículas y movimientos académicos</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 sm:w-[260px]">
                <input className="h-[38px] w-full rounded-lg border border-gray-200 bg-[#FAFBFC] pl-9 pr-3 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100" placeholder="Buscar estudiante o curso" />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">🔎</span>
              </div>

              <button type="button" className="h-[38px] rounded-lg bg-brand-600 px-3 text-sm font-bold text-white transition hover:bg-brand-700">Todos los cursos</button>
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
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50">{row.courseIcon}</span>
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
            <div className="flex flex-wrap items-center gap-4">
              <span>Privacidad</span>
              <span>Términos</span>
              <span>Contacto</span>
            </div>
          </div>
        </section>

        <section className={`${panelCardClass} p-4`}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="section-title">Actividad reciente</h3>
              <p className="mt-1 text-xs text-muted">Últimos eventos del sistema</p>
            </div>
            <button type="button" className="font-bold text-gray-400" aria-label="Más opciones">···</button>
          </div>

          <div className="space-y-4">
            {recentActivity.map(([icon, actor, text, emphasis, time], index) => (
              <div key={`${time}-${index}`} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">{icon}</div>
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-gray-700">
                    {actor ? <span className="font-semibold">{actor}</span> : null}
                    {actor ? " " : ""}
                    {text}{" "}
                    {emphasis ? <span className="font-semibold">{emphasis}</span> : null}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">{time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400">
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
