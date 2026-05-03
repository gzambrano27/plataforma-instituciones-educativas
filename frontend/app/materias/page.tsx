import { DemoApiError, fetchDemoApi } from '../lib/demo-api';
import { SubjectsWorkspace } from './subjects-workspace';

export const dynamic = 'force-dynamic';

export type SubjectStatus = 'active' | 'inactive';

export type SubjectAcademicLevel = {
  id: string;
  name: string;
  code: string;
  educationalStage: 'inicial' | 'basica' | 'bachillerato';
  sortOrder: number;
};

export type SubjectRecord = {
  id: string;
  levelId?: string | null;
  levelName?: string | null;
  name: string;
  code: string;
  area?: string | null;
  weeklyHours?: number | null;
  status: SubjectStatus;
  assignmentsCount: number;
};

type SubjectsPayload = {
  institution: {
    id: string;
    name: string;
  };
  summary: {
    subjects: number;
    activeSubjects: number;
    scopedSubjects: number;
  };
  subjects: SubjectRecord[];
  academicOptions: {
    levels: SubjectAcademicLevel[];
  };
};

async function loadSubjectsModule() {
  try {
    const snapshot = await fetchDemoApi<SubjectsPayload>('/subjects');
    return { snapshot, error: null };
  } catch (error) {
    if (error instanceof DemoApiError) {
      return { snapshot: null as SubjectsPayload | null, error: error.message };
    }

    return { snapshot: null as SubjectsPayload | null, error: 'No fue posible cargar el módulo de materias.' };
  }
}

export default async function MateriasPage() {
  const { snapshot, error } = await loadSubjectsModule();
  const inactiveSubjects = Math.max(0, (snapshot?.summary.subjects ?? 0) - (snapshot?.summary.activeSubjects ?? 0));

  return (
    <main className="page-main">
      <section className="hero-panel">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Fase académica 4</p>
            <h1 className="section-title mt-3">Materias visibles y listas para conectarse con docentes y estructura académica</h1>
            <p className="section-copy mt-4 max-w-3xl">
              El módulo ya permite registrar materias reales para la institución activa y dejarlas preparadas para su asignación por nivel, curso o sección.
            </p>
          </div>
          <aside className="side-note-card">
            <div className="summary-strip xl:grid-cols-2">
              <div className="summary-item">
                <p className="summary-label">Materias activas</p>
                <p className="summary-value">{snapshot?.summary.activeSubjects ?? 0}</p>
                <p className="mt-1 text-sm text-slate-500">Disponibles para carga académica.</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Sin actividad</p>
                <p className="summary-value">{inactiveSubjects}</p>
                <p className="mt-1 text-sm text-slate-500">Registros que no participan hoy.</p>
              </div>
            </div>
            <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Alcance actual</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">La fase deja resuelta la base de materias en español y conectada con la única institución educativa del entorno demo.</p>
            </div>
          </aside>
        </div>
      </section>

      <SubjectsWorkspace snapshot={snapshot} error={error} />
    </main>
  );
}
