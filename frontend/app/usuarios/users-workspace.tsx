'use client';

import { useState } from 'react';
import { UserFormModal, UserFormValues } from './user-create-form';

type EduUser = UserFormValues & {
  id: string;
  institutionName?: string | null;
};

type EduRole = {
  id: string;
  code: string;
  name: string;
  isSystem: boolean;
};

type InstitutionOption = {
  id: string;
  name: string;
};

type UsersWorkspaceProps = {
  users: EduUser[];
  roles: EduRole[];
  institutions: InstitutionOption[];
  error: string | null;
};

export function UsersWorkspace({ users, roles, institutions, error }: UsersWorkspaceProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<EduUser | null>(null);

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <aside className="section-grid-card sm:p-7">
            <div className="flex flex-col gap-5">
              <div>
                <p className="eyebrow">Acciones de usuario</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Altas y edición desde modal</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  La creación se abre en modal para mantener la vista despejada. Cada fila ya incorpora la entrada de edición preparada dentro del mismo patrón visual.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" className="primary-button" onClick={() => setCreateOpen(true)}>
                  Nuevo usuario
                </button>
                <span className="info-chip">{users.length} registrados</span>
              </div>

              <div className="surface-muted p-4 text-sm text-slate-600">
                El flujo actual de creación sigue operativo sobre la API protegida. La edición queda lista en interfaz sin modificar backend.
              </div>
            </div>
          </aside>

          <aside className="section-grid-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Catálogo de roles</p>
                <p className="mt-2 text-sm text-slate-500">Perfiles disponibles en la gobernanza inicial del sistema.</p>
              </div>
              <span className="info-chip">{roles.length} roles</span>
            </div>
            <div className="mt-5 space-y-3">
              {roles.map((role) => (
                <div key={role.id} className="surface-muted p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-950">{role.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{role.code}</p>
                    </div>
                    <span className="info-chip">{role.isSystem ? 'Sistema' : 'Editable'}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="table-shell overflow-hidden">
          <div className="soft-divider flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Usuarios registrados</p>
              <p className="mt-2 text-sm text-slate-500">Lectura de accesos institucionales y globales.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="info-chip">{users.length} usuarios</span>
              <button type="button" className="compact-button" onClick={() => setCreateOpen(true)}>
                Nuevo
              </button>
            </div>
          </div>

          {error ? (
            <div className="px-6 py-6 text-sm text-rose-700">{error}</div>
          ) : users.length === 0 ? (
            <div className="px-6 py-6 text-sm text-slate-500">Todavía no hay usuarios registrados.</div>
          ) : (
            <>
              <div className="table-header-row grid-cols-[minmax(0,1fr)_220px_220px_180px_112px]">
                <span>Usuario</span>
                <span>Institución</span>
                <span>Roles</span>
                <span>Estado</span>
                <span>Acciones</span>
              </div>
              <div>
                {users.map((user) => (
                  <article key={user.id} className="table-data-row grid-cols-[minmax(0,1fr)_220px_220px_180px_112px] items-start">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{user.fullName}</h3>
                      <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                    </div>
                    <p className="text-sm text-slate-600">{user.institutionName ?? 'Acceso global sin institución'}</p>
                    <p className="text-sm text-slate-600">{user.roleCodes.join(', ')}</p>
                    <span className="info-chip h-fit">{translateUserStatus(user.status)}</span>
                    <button type="button" className="compact-button" onClick={() => setEditingUser(user)}>
                      Editar
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <UserFormModal
        open={createOpen}
        mode="create"
        institutions={institutions}
        roles={roles}
        onClose={() => setCreateOpen(false)}
      />
      <UserFormModal
        open={editingUser !== null}
        mode="edit"
        initialValues={editingUser ?? undefined}
        institutions={institutions}
        roles={roles}
        onClose={() => setEditingUser(null)}
      />
    </>
  );
}

function translateUserStatus(status: EduUser['status']) {
  if (status === 'active') return 'Activo';
  if (status === 'pending') return 'Pendiente';
  return 'Bloqueado';
}
