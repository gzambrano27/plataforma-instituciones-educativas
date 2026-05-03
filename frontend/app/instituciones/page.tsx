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
    <main className="space-y-6 pb-8">
      <section className="glass-panel px-6 py-7 sm:px-8 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div>
            <p className="eyebrow">Institución y sedes</p>
            <h1 className="section-title mt-3">Datos institucionales visibles, compactos y listos para operación</h1>
            <p className="section-copy mt-4 max-w-3xl">
              Esta vista concentra la institución base, sus sedes y sus datos operativos en una lectura compacta, directa y coherente con un solo colegio.
            </p>
          </div>
          <div className="summary-strip">
            <div className="summary-item">
              <p className="summary-label">Estructura visible</p>
              <p className="summary-value">{institutions.length}</p>
              <p className="mt-1 text-sm text-slate-500">Sede principal y sedes cargadas.</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Distribución</p>
              <p className="summary-value text-lg sm:text-xl">{publicCount} públicas / {privateCount} privadas</p>
              <p className="mt-1 text-sm text-slate-500">Clasificación visible en backend actual.</p>
            </div>
          </div>
        </div>
      </section>

      <InstitutionsWorkspace institutions={institutions} error={error} />
    </main>
  );
}
