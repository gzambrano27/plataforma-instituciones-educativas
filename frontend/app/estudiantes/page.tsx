import { DemoApiError, fetchDemoApi } from '../lib/demo-api';
import { StudentsWorkspace } from './students-workspace';

export const dynamic = 'force-dynamic';

export type StudentStatus = 'active' | 'inactive' | 'retirado';

export type StudentAcademicLevel = {
  id: string;
  name: string;
  code: string;
  educationalStage: 'inicial' | 'basica' | 'bachillerato';
  sortOrder: number;
};

export type StudentAcademicGrade = {
  id: string;
  levelId: string;
  levelName: string;
  name: string;
  code: string;
  sortOrder: number;
};

export type StudentAcademicSection = {
  id: string;
  levelId: string;
  gradeId: string;
  levelName: string;
  gradeName: string;
  name: string;
  code: string;
  shift?: 'matutina' | 'vespertina' | null;
  capacity?: number | null;
};

export type StudentRecord = {
  id: string;
  fullName: string;
  identityDocument: string;
  enrollmentCode: string;
  email?: string | null;
  phone?: string | null;
  status: StudentStatus;
  levelId: string;
  gradeId: string;
  sectionId: string;
  levelName: string;
  gradeName: string;
  sectionName: string;
  shift?: 'matutina' | 'vespertina' | null;
};

type StudentsPayload = {
  institution: {
    id: string;
    name: string;
  };
  summary: {
    students: number;
    activeStudents: number;
    sectionsInUse: number;
  };
  students: StudentRecord[];
  academicOptions: {
    levels: StudentAcademicLevel[];
    grades: StudentAcademicGrade[];
    sections: StudentAcademicSection[];
  };
};

async function loadStudentsModule() {
  try {
    const snapshot = await fetchDemoApi<StudentsPayload>('/students');
    return { snapshot, error: null };
  } catch (error) {
    if (error instanceof DemoApiError) {
      return { snapshot: null as StudentsPayload | null, error: error.message };
    }

    return { snapshot: null as StudentsPayload | null, error: 'No fue posible cargar el módulo de estudiantes.' };
  }
}

export default async function EstudiantesPage() {
  const { snapshot, error } = await loadStudentsModule();
  const inactiveStudents = Math.max(0, (snapshot?.summary.students ?? 0) - (snapshot?.summary.activeStudents ?? 0));

  return (
    <main className="page-main">
      <section className="hero-panel">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Fase académica 3</p>
            <h1 className="section-title mt-3">Estudiantes y matrícula mínima conectados con la estructura real del colegio</h1>
            <p className="section-copy mt-4 max-w-3xl">
              El módulo ya permite registrar estudiantes sobre la institución activa y ubicarlos coherentemente en nivel, curso y sección dentro del flujo académico actual.
            </p>
          </div>
          <aside className="side-note-card">
            <div className="summary-strip xl:grid-cols-2">
              <div className="summary-item">
                <p className="summary-label">Estudiantes activos</p>
                <p className="summary-value">{snapshot?.summary.activeStudents ?? 0}</p>
                <p className="mt-1 text-sm text-slate-500">Matrícula disponible para operación diaria.</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Con estado no activo</p>
                <p className="summary-value">{inactiveStudents}</p>
                <p className="mt-1 text-sm text-slate-500">Casos visibles para seguimiento administrativo.</p>
              </div>
            </div>
            <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Alcance actual</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">La fase deja resuelta la alta mínima de estudiantes y su ubicación coherente dentro de una sola institución educativa.</p>
            </div>
          </aside>
        </div>
      </section>

      <StudentsWorkspace snapshot={snapshot} error={error} />
    </main>
  );
}
