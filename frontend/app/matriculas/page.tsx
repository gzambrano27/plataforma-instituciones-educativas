import { DemoApiError, fetchDemoApi } from '../lib/demo-api';
import { EnrollmentsWorkspace } from './enrollments-workspace';

export const dynamic = 'force-dynamic';

export type EnrollmentStatus = 'active' | 'withdrawn' | 'cancelled';

export type EnrollmentAcademicLevel = {
  id: string;
  name: string;
  code: string;
  educationalStage: 'inicial' | 'basica' | 'bachillerato';
  sortOrder: number;
};

export type EnrollmentAcademicGrade = {
  id: string;
  levelId: string;
  levelName: string;
  name: string;
  code: string;
  sortOrder: number;
};

export type EnrollmentAcademicSection = {
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

export type EnrollmentStudent = {
  id: string;
  fullName: string;
  enrollmentCode: string;
  identityDocument: string;
  status: 'active' | 'inactive' | 'retirado';
  levelId: string;
  gradeId: string;
  sectionId: string;
  levelName: string;
  gradeName: string;
  sectionName: string;
};

export type EnrollmentRecord = {
  id: string;
  studentId: string;
  studentName: string;
  studentDocument: string;
  studentEnrollmentCode: string;
  sectionId: string;
  levelId: string;
  levelName: string;
  gradeId: string;
  gradeName: string;
  sectionName: string;
  schoolYearLabel: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  notes?: string | null;
  shift?: 'matutina' | 'vespertina' | null;
  capacity?: number | null;
};

type EnrollmentsPayload = {
  institution: {
    id: string;
    name: string;
    activeSchoolYearLabel?: string | null;
  };
  summary: {
    enrollments: number;
    activeEnrollments: number;
    uniqueStudents: number;
    sectionsInUse: number;
  };
  enrollments: EnrollmentRecord[];
  students: EnrollmentStudent[];
  academicOptions: {
    levels: EnrollmentAcademicLevel[];
    grades: EnrollmentAcademicGrade[];
    sections: EnrollmentAcademicSection[];
  };
};

async function loadEnrollmentsModule() {
  try {
    const snapshot = await fetchDemoApi<EnrollmentsPayload>('/enrollments');
    return { snapshot, error: null };
  } catch (error) {
    if (error instanceof DemoApiError) {
      return { snapshot: null as EnrollmentsPayload | null, error: error.message };
    }

    return { snapshot: null as EnrollmentsPayload | null, error: 'No fue posible cargar el módulo de matrículas.' };
  }
}

export default async function MatriculasPage() {
  const { snapshot, error } = await loadEnrollmentsModule();
  const nonActiveEnrollments = Math.max(0, (snapshot?.summary.enrollments ?? 0) - (snapshot?.summary.activeEnrollments ?? 0));

  return (
    <main className="page-main">
      <section className="hero-panel">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Fase académica 5</p>
            <h1 className="section-title mt-3">Matrículas e inscripciones enlazadas con estudiantes y secciones reales</h1>
            <p className="section-copy mt-4 max-w-3xl">
              El módulo registra la matrícula del periodo activo sobre una sola institución educativa y deriva automáticamente nivel y curso desde la sección elegida.
            </p>
          </div>
          <aside className="side-note-card">
            <div className="summary-strip xl:grid-cols-2">
              <div className="summary-item">
                <p className="summary-label">Matrículas activas</p>
                <p className="summary-value">{snapshot?.summary.activeEnrollments ?? 0}</p>
                <p className="mt-1 text-sm text-slate-500">Inscripciones vigentes para operación diaria.</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Con novedad</p>
                <p className="summary-value">{nonActiveEnrollments}</p>
                <p className="mt-1 text-sm text-slate-500">Retiros o anulaciones visibles para control.</p>
              </div>
            </div>
            <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Periodo activo</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {snapshot?.institution.activeSchoolYearLabel ?? 'Sin periodo configurado'} · La matrícula actualiza la ubicación del estudiante y mantiene la trazabilidad por sección.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <EnrollmentsWorkspace snapshot={snapshot} error={error} />
    </main>
  );
}
