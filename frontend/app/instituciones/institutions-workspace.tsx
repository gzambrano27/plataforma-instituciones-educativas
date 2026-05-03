'use client';

import { useState } from 'react';
import { InstitutionFormModal, InstitutionFormValues } from './institution-create-form';

type Institution = InstitutionFormValues & {
  id: string;
};

type InstitutionsWorkspaceProps = {
  institutions: Institution[];
  error: string | null;
};

export function InstitutionsWorkspace({ institutions, error }: InstitutionsWorkspaceProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <aside className="section-grid-card sm:p-7">
          <div className="flex flex-col gap-5">
            <div>
              <p className="eyebrow">Acciones institucionales</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Altas y edición desde modal</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                El registro ya no ocupa espacio dentro de la vista. Ahora se abre en modal y la edición queda visualmente preparada desde cada fila.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="primary-button" onClick={() => setCreateOpen(true)}>
                Nueva institución
              </button>
              <span className="info-chip">{institutions.length} en catálogo</span>
            </div>

            <div className="surface-muted p-4 text-sm text-slate-600">
              Las acciones se concentran en ventanas modales para conservar una lectura institucional más limpia y enfocada en el listado.
            </div>
          </div>
        </aside>

        <section className="table-shell">
          <div className="soft-divider flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Registro institucional</p>
              <p className="mt-2 text-sm text-slate-500">Instituciones disponibles en la operación actual.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="info-chip">{institutions.length} instituciones</span>
              <button type="button" className="compact-button" onClick={() => setCreateOpen(true)}>
                Nueva
              </button>
            </div>
          </div>

          {error ? (
            <div className="px-6 py-6 text-sm text-rose-700">{error}</div>
          ) : institutions.length === 0 ? (
            <div className="px-6 py-6 text-sm text-slate-500">Todavía no hay instituciones registradas.</div>
          ) : (
            <>
              <div className="table-header-row grid-cols-[minmax(0,1fr)_150px_180px_220px_112px]">
                <span>Institución</span>
                <span>Tipo</span>
                <span>Año lectivo</span>
                <span>Contacto</span>
                <span>Acciones</span>
              </div>
              <div>
                {institutions.map((institution) => (
                  <article key={institution.id} className="table-data-row grid-cols-[minmax(0,1fr)_150px_180px_220px_112px] items-start">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{institution.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{institution.slug}</p>
                      <p className="mt-2 text-sm text-slate-500">{institution.address ?? 'Dirección por definir'}</p>
                    </div>
                    <span className="info-chip h-fit">{translateInstitutionType(institution.institutionType)}</span>
                    <span className="info-chip h-fit">{institution.activeSchoolYearLabel ?? 'Año por definir'}</span>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>{institution.contactEmail ?? 'Sin correo'}</p>
                      <p>{institution.contactPhone ?? 'Sin teléfono'}</p>
                    </div>
                    <button type="button" className="compact-button" onClick={() => setEditingInstitution(institution)}>
                      Editar
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <InstitutionFormModal open={createOpen} mode="create" onClose={() => setCreateOpen(false)} />
      <InstitutionFormModal
        open={editingInstitution !== null}
        mode="edit"
        initialValues={editingInstitution ?? undefined}
        onClose={() => setEditingInstitution(null)}
      />
    </>
  );
}

function translateInstitutionType(type: Institution['institutionType']) {
  if (type === 'publica') return 'Pública';
  return 'Privada';
}
