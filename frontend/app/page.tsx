import Link from 'next/link';

const academicLevels = [
  {
    title: 'Inicial',
    description: 'Acompañamiento cercano en los primeros años, juego guiado y desarrollo socioemocional temprano.',
  },
  {
    title: 'Primaria',
    description: 'Fortalecimiento de lectura, pensamiento matemático, hábitos de estudio y trabajo colaborativo.',
  },
  {
    title: 'Secundaria',
    description: 'Trayectoria académica con seguimiento formativo, autonomía progresiva y orientación de proyecto de vida.',
  },
];

const communityPillars = [
  {
    title: 'Acompañamiento a familias',
    description: 'Comunicación clara, seguimiento oportuno y una relación institucional seria, cercana y sostenida.',
  },
  {
    title: 'Cuidado del clima escolar',
    description: 'Convivencia, hábitos y bienestar como parte visible del proceso formativo cotidiano.',
  },
  {
    title: 'Operación académica ordenada',
    description: 'Procesos internos más controlados para que la experiencia educativa sea consistente y confiable.',
  },
];

const institutionalProcess = [
  'Conocimiento del proyecto institucional y visita guiada.',
  'Orientación con coordinación académica y admisiones.',
  'Formalización documental y definición de trayectoria de ingreso.',
  'Acompañamiento de incorporación para familia y estudiante.',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6f8fb_0%,#eef3f8_100%)] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-3 text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">ED</span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Institución educativa</span>
              <span className="block text-lg font-semibold tracking-tight">Colegio Horizonte</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <Link href="#propuesta" className="nav-link">Propuesta</Link>
            <Link href="#oferta" className="nav-link">Niveles</Link>
            <Link href="#comunidad" className="nav-link">Comunidad</Link>
            <Link href="#proceso" className="nav-link">Proceso institucional</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/registro" className="secondary-button hidden sm:inline-flex">
              Solicitar información
            </Link>
            <Link href="/login" className="primary-button">
              Ingresar al sistema
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:px-10 lg:py-16">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Presencia institucional</span>
            <span className="info-chip">Una sola institución, una identidad clara</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Formación académica seria, comunidad cercana y operación escolar con mayor orden.
          </h1>

          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-600 sm:text-base">
            El Colegio Horizonte presenta una experiencia institucional sobria y confiable: una página pública pensada para familias y aspirantes, y un sistema interno separado para la gestión académica y administrativa del equipo escolar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/registro" className="secondary-button w-full sm:w-auto">
              Iniciar proceso institucional
            </Link>
            <Link href="/login" className="primary-button w-full sm:w-auto">
              Acceso para personal autorizado
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="summary-item">
              <p className="summary-label">Jornada</p>
              <p className="summary-value">Integral</p>
              <p className="mt-1 text-sm text-slate-500">Desarrollo académico y formativo.</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Enfoque</p>
              <p className="summary-value">Humano</p>
              <p className="mt-1 text-sm text-slate-500">Cercanía con familias y estudiantes.</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Gestión</p>
              <p className="summary-value">Ordenada</p>
              <p className="mt-1 text-sm text-slate-500">Accesos internos detrás de autenticación.</p>
            </div>
          </div>
        </div>

        <aside className="surface-panel overflow-hidden">
          <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] p-6 text-white sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Vida institucional</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Una propuesta académica que se comunica con claridad desde el primer contacto.</h2>
          </div>
          <div className="space-y-4 p-6 sm:p-7">
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Relación con familias</p>
              <p className="mt-2 font-semibold text-slate-950">Información accesible, proceso de ingreso visible y canales institucionales definidos.</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Operación interna</p>
              <p className="mt-2 font-semibold text-slate-950">El aplicativo académico deja de exponerse como página pública y queda detrás de acceso autorizado.</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm text-slate-500">Presencia digital</p>
              <p className="mt-2 font-semibold text-slate-950">Una entrada institucional más profesional, sobria y coherente con una sola comunidad educativa.</p>
            </div>
          </div>
        </aside>
      </section>

      <section id="propuesta" className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10 lg:py-6">
        <div className="section-grid-card grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">Propuesta institucional</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Una experiencia educativa construida sobre continuidad, criterio y acompañamiento.</h2>
          </div>
          <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
            La propuesta combina rigor académico, convivencia cuidada y seguimiento cotidiano. No se trata solo de administrar cursos o procesos, sino de sostener una relación educativa seria con estudiantes, docentes y familias durante todo el año escolar.
          </p>
        </div>
      </section>

      <section id="oferta" className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10 lg:py-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {academicLevels.map((level) => (
            <article key={level.title} className="section-grid-card h-full">
              <p className="eyebrow">Oferta educativa</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{level.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{level.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="comunidad" className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10 lg:py-6">
        <div className="section-grid-card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Comunidad educativa</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Una institución que cuida la relación entre aprendizaje, convivencia y seguimiento.</h2>
            </div>
            <span className="info-chip">Familias, estudiantes y equipo escolar</span>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {communityPillars.map((pillar) => (
              <article key={pillar.title} className="surface-muted h-full p-5">
                <h3 className="text-lg font-semibold text-slate-950">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="mx-auto max-w-7xl px-6 py-4 pb-14 sm:px-8 lg:px-10 lg:py-6 lg:pb-20">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="section-grid-card">
            <p className="eyebrow">Proceso institucional</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Un recorrido de ingreso claro, acompañado y sin fricciones innecesarias.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              La fase pública organiza el primer contacto de manera profesional. El equipo interno continúa luego el seguimiento dentro del sistema protegido, sin exponer la operación académica a visitantes externos.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/registro" className="primary-button w-full sm:w-auto">
                Solicitar acompañamiento
              </Link>
              <Link href="/login" className="secondary-button w-full sm:w-auto">
                Ingresar con credenciales
              </Link>
            </div>
          </div>

          <div className="section-grid-card">
            <div className="space-y-3">
              {institutionalProcess.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    0{index + 1}
                  </span>
                  <p className="pt-2 text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
