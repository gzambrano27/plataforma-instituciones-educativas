import Link from 'next/link';

const navigation = [
  { label: 'Propuesta', href: '#propuesta' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Admisiones', href: '#admisiones' },
];

const trustSignals = [
  'Proyecto pedagógico visible y bien argumentado.',
  'Admisiones claras para familias y aspirantes.',
  'Acceso privado para la operación institucional.',
];

const impactMetrics = [
  { value: '360°', label: 'seguimiento formativo, académico y familiar' },
  { value: '3 etapas', label: 'integradas en una sola narrativa educativa' },
  { value: '24/7', label: 'acceso protegido para el equipo institucional' },
  { value: '1 ruta', label: 'de contacto, orientación e ingreso' },
];

const proposalBlocks = [
  {
    title: 'Formación exigente con acompañamiento cercano',
    description:
      'La institución se presenta con rigor, calidez y expectativas altas desde el primer recorrido visual.',
  },
  {
    title: 'Comunicación sobria que sí orienta decisiones',
    description:
      'Cada sección responde preguntas reales de una familia: proyecto, ambiente, oferta, proceso y siguiente paso.',
  },
  {
    title: 'Separación clara entre presencia pública y gestión interna',
    description:
      'La plataforma protege la operación académica sin convertir el landing en una pantalla técnica.',
  },
];

const experienceColumns = [
  {
    eyebrow: 'Vida escolar',
    title: 'Una institución que comunica cultura, no solo servicios.',
    description:
      'La composición prioriza escenas de acompañamiento, convivencia, proyecto y pertenencia para que la visita se sienta humana y sólida.',
  },
  {
    eyebrow: 'Continuidad pedagógica',
    title: 'Inicial, primaria y secundaria articuladas con sentido de trayectoria.',
    description:
      'La oferta se entiende como un recorrido completo en el que cada etapa prepara la siguiente con coherencia visible.',
  },
  {
    eyebrow: 'Confianza operativa',
    title: 'El equipo encuentra acceso directo sin interferir con la narrativa pública.',
    description:
      'El sistema interno sigue disponible, pero queda encuadrado como un acceso reservado y profesional.',
  },
];

const academicOffer = [
  {
    stage: 'Educación inicial',
    focus: 'Exploración, lenguaje, autonomía y desarrollo socioemocional con acompañamiento cercano.',
    accent: 'Descubrir',
  },
  {
    stage: 'Educación primaria',
    focus: 'Fundamentos sólidos en lectura, pensamiento lógico, convivencia y hábitos de estudio.',
    accent: 'Consolidar',
  },
  {
    stage: 'Educación secundaria',
    focus: 'Profundización académica, criterio personal y preparación para el siguiente nivel.',
    accent: 'Proyectar',
  },
];

const communityHighlights = [
  'Acompañamiento a familias con lenguaje claro y puntos de contacto visibles.',
  'Bloques de confianza que transmiten orden, criterio y continuidad institucional.',
  'Secciones más ricas en contenido para evitar la sensación de plantilla genérica.',
  'Cierre de conversión con oferta, proceso y acceso interno bien diferenciados.',
];

const admissionsJourney = [
  {
    step: '01',
    title: 'Descubrir la propuesta',
    description:
      'La familia entiende rápido qué distingue a la institución y cómo se vive su proyecto educativo.',
  },
  {
    step: '02',
    title: 'Solicitar orientación',
    description:
      'Los llamados a la acción priorizan acompañamiento, información y una conversación concreta.',
  },
  {
    step: '03',
    title: 'Continuar el proceso',
    description:
      'La experiencia conecta presencia pública, gestión de interés y acceso protegido sin perder sobriedad.',
  },
];

const institutionalNotes = [
  'Narrativa editorial para admisiones y posicionamiento institucional.',
  'Composición más original con superposiciones, paneles y ritmo vertical real.',
  'Responsive revisado para evitar bloques pesados y textos sobredimensionados en móvil.',
];

export default function HomePage() {
  return (
    <main className="landing-root min-h-screen overflow-x-hidden text-slate-950">
      <div className="landing-noise" />

      <header className="landing-shell landing-header-shell">
        <div className="landing-topbar">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="landing-brand-mark">EH</span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-sky-700 sm:text-[11px]">
                Plataforma institucional
              </span>
              <span className="block truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                Entorno Horizonte
              </span>
            </span>
          </Link>

          <nav aria-label="Navegacion principal" className="landing-nav hidden xl:flex">
            <ul className="landing-inline-list">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link border-transparent bg-transparent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="landing-actions-cluster shrink-0">
            <Link href="/registro" className="secondary-button hidden sm:inline-flex">
              Solicitar información
            </Link>
            <Link href="/login" className="primary-button">
              Iniciar sesión
            </Link>
          </div>
        </div>

        <nav aria-label="Navegacion por secciones" className="landing-mobile-nav xl:hidden">
          <ul className="landing-inline-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="landing-mobile-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section aria-labelledby="hero-title" className="landing-shell landing-section-hero">
        <div className="landing-hero-grid">
          <div className="landing-stack relative z-10">
            <div className="landing-kicker">
              Admisiones visibles, confianza institucional y acceso privado bien resuelto
            </div>

            <h1 id="hero-title" className="landing-display max-w-4xl">
              Un sitio institucional que proyecta excelencia antes de pedir el primer contacto.
            </h1>

            <p className="landing-lead max-w-2xl">
              La presencia pública deja de sentirse como una plantilla genérica y pasa a comunicar criterio pedagógico,
              cultura escolar y una ruta de admisión clara con carácter propio.
            </p>

            <div className="landing-actions-row">
              <Link href="/registro" className="primary-button w-full sm:w-auto">
                Solicitar acompañamiento de admisiones
              </Link>
              <Link href="#propuesta" className="secondary-button w-full sm:w-auto">
                Ver propuesta institucional
              </Link>
            </div>

            <ul role="list" className="landing-card-list-sm">
              {trustSignals.map((item) => (
                <li key={item} className="landing-trust-card">
                  <span className="landing-trust-dot" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>

            <div className="landing-feature-pair">
              <article className="landing-editorial-card">
                <p className="eyebrow">Lectura institucional</p>
                <h2 className="landing-panel-title-lg mt-4">
                  La primera impresión transmite orden, visión pedagógica y una cultura académica mejor narrada.
                </h2>
                <p className="landing-panel-copy mt-4">
                  El hero ya no funciona como una portada plana. Ahora combina capas, información útil y ritmo visual para
                  que la institución se perciba premium, contemporánea y confiable desde móvil hasta escritorio amplio.
                </p>
              </article>

              <aside className="landing-aside-card">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Acceso del equipo</p>
                <p className="landing-panel-title mt-4 text-white">
                  El sistema interno sigue presente, pero ubicado donde corresponde.
                </p>
                <ul role="list" className="landing-stack-sm mt-5 text-sm leading-6 text-white/78">
                  <li className="landing-glass-note">Presencia pública hacia afuera.</li>
                  <li className="landing-glass-note">Operación académica hacia adentro.</li>
                </ul>
              </aside>
            </div>
          </div>

          <aside className="landing-hero-stage" aria-label="Resumen visual institucional">
            <div className="landing-stage-shell">
              <div className="landing-stage-header">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100/90">Fachada institucional</p>
                  <h2 className="landing-stage-title mt-4 max-w-md text-white">
                    Más editorial, más memorable y mucho mejor adaptada a cada pantalla.
                  </h2>
                </div>
                <span className="landing-stage-chip">Premium educativo</span>
              </div>

              <div className="landing-stage-composition">
                <article className="landing-stage-feature landing-stage-feature-primary">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100">Dirección visual</p>
                  <p className="landing-panel-title-lg mt-4 text-white">
                    Paneles con aire, contrastes medidos, superposición controlada y bloques que sí construyen relato.
                  </p>
                  <p className="landing-panel-copy mt-4 text-white/72">
                    El visitante reconoce propuesta, comunidad, niveles formativos y próximo paso sin saturación ni ruido.
                  </p>
                </article>

                <article className="landing-stage-feature landing-stage-feature-secondary">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100">Señales de confianza</p>
                  <ul role="list" className="landing-stack-sm mt-4">
                    {institutionalNotes.map((item) => (
                      <li key={item} className="landing-note-pill">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="landing-stage-feature landing-stage-feature-wide">
                  <dl className="landing-metric-grid">
                    {impactMetrics.map((metric) => (
                      <div key={metric.label} className="landing-metric-tile">
                        <dt className="landing-metric-value text-white">{metric.value}</dt>
                        <dd className="landing-metric-label text-white/72">{metric.label}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="confianza-title" className="landing-shell landing-section-tight">
        <div className="landing-band-grid">
          <header className="landing-band-primary">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-200">Confianza institucional</p>
            <h2 id="confianza-title" className="landing-section-title mt-4 max-w-3xl text-white">
              Una presencia pública preparada para posicionar mejor la institución y convertir con más claridad.
            </h2>
          </header>

          <ul role="list" className="landing-card-list-sm">
            {communityHighlights.map((item, index) => (
              <li key={item} className="landing-band-card">
                <p className="text-sm font-semibold text-sky-700">0{index + 1}</p>
                <p className="landing-panel-copy mt-3 text-slate-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="propuesta" aria-labelledby="propuesta-title" className="landing-shell landing-section">
        <div className="landing-section-grid">
          <article className="landing-large-surface">
            <header>
              <p className="eyebrow">Propuesta institucional</p>
              <h2 id="propuesta-title" className="landing-section-title landing-section-title-xl mt-4 text-slate-950">
                La institución gana profundidad cuando el contenido se organiza como proyecto, recorrido y promesa verificable.
              </h2>
            </header>
            <p className="landing-section-copy mt-5 max-w-2xl">
              La sección combina jerarquía tipográfica, densidad controlada y bloques de distinto peso visual para explicar
              propuesta educativa, criterio institucional y forma de acompañar a cada familia.
            </p>
          </article>

          <div className="landing-stack-sm">
            {proposalBlocks.map((item) => (
              <article key={item.title} className="landing-soft-card">
                <h3 className="landing-panel-title text-slate-950">{item.title}</h3>
                <p className="landing-panel-copy mt-3">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencia" aria-labelledby="experiencia-title" className="landing-shell landing-section-tight">
        <div className="landing-experience-shell">
          <header>
            <p className="eyebrow">Experiencia institucional</p>
            <h2 id="experiencia-title" className="landing-section-title mt-4 max-w-3xl text-slate-950">
              Más carácter visual para comunicar comunidad educativa, continuidad formativa y un entorno bien gobernado.
            </h2>
          </header>

          <div className="landing-experience-grid">
            <div className="grid gap-4 md:grid-cols-3">
              {experienceColumns.map((item) => (
                <article key={item.title} className="landing-soft-card landing-soft-card-tall">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">{item.eyebrow}</p>
                  <h3 className="landing-panel-title mt-4 text-slate-950">{item.title}</h3>
                  <p className="landing-panel-copy mt-3">{item.description}</p>
                </article>
              ))}
            </div>

            <aside className="landing-dark-rail">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Lectura rápida</p>
              <dl className="landing-stack mt-6">
                {impactMetrics.map((metric) => (
                  <div key={metric.label} className="landing-rail-item">
                    <dt className="landing-metric-value text-white">{metric.value}</dt>
                    <dd className="landing-panel-copy mt-2 text-white/72">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="oferta-title" className="landing-shell landing-section">
        <div className="landing-offer-shell">
          <header>
            <p className="eyebrow">Oferta educativa</p>
            <h2 id="oferta-title" className="landing-section-title mt-4 max-w-2xl text-slate-950">
              Una secuencia formativa presentada con más contexto, continuidad y presencia premium.
            </h2>
            <p className="landing-section-copy mt-5 max-w-2xl">
              La oferta deja de sentirse como un bloque aislado y se convierte en una trayectoria entendible desde el primer
              vistazo, con etapas claras y foco pedagógico concreto.
            </p>
          </header>

          <div className="landing-card-list-lg">
            {academicOffer.map((item) => (
              <article key={item.stage} className="landing-offer-card">
                <span className="landing-offer-accent">{item.accent}</span>
                <h3 className="landing-panel-title-lg mt-5 text-slate-950">{item.stage}</h3>
                <p className="landing-panel-copy mt-4">{item.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comunidad" aria-labelledby="comunidad-title" className="landing-shell landing-section-tight">
        <div className="landing-community-grid">
          <article className="landing-community-panel">
            <p className="eyebrow text-sky-200">Comunidad educativa</p>
            <h2 id="comunidad-title" className="landing-section-title mt-4 max-w-2xl text-white">
              Una comunidad que se percibe acompañada, bien informada y conectada con un proyecto institucional reconocible.
            </h2>
            <p className="landing-section-copy mt-5 max-w-2xl text-slate-300">
              La narrativa pública equilibra calidez y rigor para que las familias identifiquen pertenencia, método y cultura
              institucional antes de iniciar cualquier trámite.
            </p>
          </article>

          <div className="landing-stack-sm">
            {communityHighlights.slice(0, 3).map((item) => (
              <article key={item} className="landing-community-card">
                <p className="landing-panel-copy text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="admisiones" aria-labelledby="admisiones-title" className="landing-shell landing-section landing-section-cta">
        <div className="landing-cta-grid">
          <article className="landing-cta-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">CTA institucional</p>
            <h2 id="admisiones-title" className="landing-section-title landing-section-title-xl mt-4 max-w-2xl text-white">
              Un cierre más convincente para familias interesadas y un acceso directo, sobrio y claro para el equipo.
            </h2>
            <p className="landing-section-copy mt-5 max-w-2xl text-slate-300">
              El cierre integra oferta, proceso y confianza institucional en un último bloque con más presencia visual y mejor
              adaptación para móvil, tablet y escritorio.
            </p>
            <div className="landing-actions-row mt-8">
              <Link href="/registro" className="primary-button w-full bg-white text-slate-950 shadow-none hover:bg-slate-100 sm:w-auto">
                Solicitar información ahora
              </Link>
              <Link
                href="/login"
                className="secondary-button w-full border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white sm:w-auto"
              >
                Iniciar sesión del equipo
              </Link>
            </div>
          </article>

          <ol className="landing-stack-sm" aria-label="Recorrido de admisiones">
            {admissionsJourney.map((item) => (
              <li key={item.step} className="landing-journey-card">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-sm font-semibold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="landing-panel-title text-slate-950">{item.title}</h3>
                    <p className="landing-panel-copy mt-3">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="landing-shell landing-footer-shell">
        <div className="landing-footer">
          <div className="landing-footer-grid">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Entorno Horizonte</p>
              <p className="landing-panel-copy mt-2 max-w-2xl">
                Plataforma institucional con presencia pública renovada, orientación de admisiones y acceso privado para la
                operación académica.
              </p>
            </div>
            <div className="landing-actions-row">
              <Link href="/registro" className="secondary-button w-full sm:w-auto">
                Hablar con admisiones
              </Link>
              <Link href="/login" className="primary-button w-full sm:w-auto">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
