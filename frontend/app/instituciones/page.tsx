import { DemoApiError, fetchDemoApi } from '../lib/demo-api';
import { InstitutionsWorkspace } from './institutions-workspace';

export const dynamic = 'force-dynamic';

type Institution = {
  id: string;
  name: string;
  slug: string;
  institutionType: 'publica' | 'privada';
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
};

async function loginAndLoadInstitutions() {
  try {
    const institutions = await fetchDemoApi<Institution[]>('/institutions');
    return { institutions, error: null };
  } catch (error) {
    if (error instanceof DemoApiError) {
      return { institutions: [] as Institution[], error: error.message };
    }

    return { institutions: [] as Institution[], error: 'No fue posible cargar instituciones.' };
  }
}

export default async function InstitutionsPage() {
  const { institutions, error } = await loginAndLoadInstitutions();
  const publicCount = institutions.filter((institution) => institution.institutionType === 'publica').length;
  const privateCount = institutions.length - publicCount;

  return (
    <main className="page-main">
      <section className="hero-panel">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Institución y sedes</p>
            <h1 className="section-title mt-3">Datos institucionales visibles, compactos y listos para operación</h1>
            <p className="section-copy mt-4 max-w-3xl">
              Esta vista concentra la institución base, sus sedes y sus datos operativos en una lectura compacta, directa y coherente con un solo colegio.
            </p>
          </div>
          <aside className="side-note-card">
            <div className="summary-strip xl:grid-cols-2">
              <div className="summary-item">
                <p className="summary-label">Estructura visible</p>
                <p className="summary-value">{institutions.length}</p>
                <p className="mt-1 text-sm text-slate-500">Sede principal y sedes cargadas.</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Distribución</p>
                <p className="summary-value text-lg sm:text-xl">{publicCount} / {privateCount}</p>
                <p className="mt-1 text-sm text-slate-500">Públicas y privadas visibles.</p>
              </div>
            </div>
            <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Composición</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Más equilibrio entre contexto, resumen y tabla para que la vista no se vea pesada ni dispersa.</p>
            </div>
          </aside>
        </div>
      </section>

      <InstitutionsWorkspace institutions={institutions} error={error} />
    </main>
  );
}
