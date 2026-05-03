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
  activeSchoolYearLabel?: string;
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
    <main className="space-y-8 pb-10">
      <section className="glass-panel px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div>
            <p className="eyebrow">Instituciones</p>
            <h1 className="section-title mt-3">Gestión institucional con catálogo visible, limpio y listo para operación</h1>
            <p className="section-copy mt-4 max-w-3xl">
              Este módulo presenta una experiencia más ejecutiva para registrar instituciones, leer capacidad instalada y consultar datos operativos con mejor jerarquía visual.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="metric-card">
              <p className="eyebrow">Instituciones</p>
              <p className="stat-value mt-3">{institutions.length}</p>
              <p className="mt-3 text-sm text-slate-500">Unidades educativas cargadas en la plataforma.</p>
            </div>
            <div className="dark-metric-card">
              <p className="text-sm font-medium text-slate-300">Balance actual</p>
              <p className="mt-4 text-2xl font-semibold">{publicCount} públicas / {privateCount} privadas</p>
              <p className="mt-3 text-sm text-slate-300">Distribución del portafolio institucional activo.</p>
            </div>
          </div>
        </div>
      </section>

      <InstitutionsWorkspace institutions={institutions} error={error} />
    </main>
  );
}
