import Link from 'next/link';
import { UserCreateForm } from './user-create-form';
import { DemoApiError, fetchDemoApi } from '../lib/demo-api';

export const dynamic = 'force-dynamic';

type EduUser = {
  id: string;
  institutionId: string | null;
  institutionName?: string | null;
  fullName: string;
  email: string;
  status: 'pending' | 'active' | 'blocked';
  roleCodes: string[];
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

async function loginAndLoadUsers() {
  try {
    const [users, roles, institutions] = await Promise.all([
      fetchDemoApi<EduUser[]>('/users'),
      fetchDemoApi<EduRole[]>('/users/roles'),
      fetchDemoApi<InstitutionOption[]>('/institutions'),
    ]);

    return {
      users,
      roles,
      institutions,
      error: null,
    };
  } catch (error) {
    if (error instanceof DemoApiError) {
      return {
        users: [] as EduUser[],
        roles: [] as EduRole[],
        institutions: [] as InstitutionOption[],
        error: error.message,
      };
    }

    return {
      users: [] as EduUser[],
      roles: [] as EduRole[],
      institutions: [] as InstitutionOption[],
      error: 'No fue posible cargar usuarios, roles o instituciones.',
    };
  }
}

export default async function UsersPage() {
  const { users, roles, institutions, error } = await loginAndLoadUsers();
  const activeUsers = users.filter((user) => user.status === 'active').length;
  const blockedUsers = users.filter((user) => user.status === 'blocked').length;

  return (
    <main className="space-y-8 pb-10">
      <section className="glass-panel px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div>
            <p className="eyebrow">Usuarios y roles</p>
            <h1 className="section-title mt-3">Gobernanza de acceso con foco en perfiles, estados y asignación institucional</h1>
            <p className="section-copy mt-4 max-w-3xl">
              El rediseño organiza altas, catálogo de roles y listado de usuarios en superficies más claras, manteniendo intacto el flujo real sobre la API protegida.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="metric-card">
              <p className="eyebrow">Usuarios activos</p>
              <p className="stat-value mt-3">{activeUsers}</p>
              <p className="mt-3 text-sm text-slate-500">Accesos operativos habilitados actualmente.</p>
            </div>
            <div className="dark-metric-card">
              <p className="text-sm font-medium text-slate-300">Riesgo controlado</p>
              <p className="mt-4 text-2xl font-semibold">{blockedUsers} bloqueados</p>
              <p className="mt-3 text-sm text-slate-300">Cuentas suspendidas para seguimiento y soporte.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <UserCreateForm institutions={institutions} roles={roles} />

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
            <span className="info-chip">{users.length} usuarios</span>
          </div>

          {error ? (
            <div className="px-6 py-6 text-sm text-rose-700">{error}</div>
          ) : users.length === 0 ? (
            <div className="px-6 py-6 text-sm text-slate-500">Todavía no hay usuarios registrados.</div>
          ) : (
            <>
              <div className="table-header-row grid-cols-[minmax(0,1fr)_220px_220px_180px]">
                <span>Usuario</span>
                <span>Institución</span>
                <span>Roles</span>
                <span>Estado</span>
              </div>
              <div>
              {users.map((user) => (
                <article key={user.id} className="table-data-row grid-cols-[minmax(0,1fr)_220px_220px_180px]">
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">{user.fullName}</h3>
                    <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                  </div>
                  <p className="text-sm text-slate-600">{user.institutionName ?? 'Acceso global sin institución'}</p>
                  <p className="text-sm text-slate-600">{user.roleCodes.join(', ')}</p>
                  <span className="info-chip h-fit">{translateUserStatus(user.status)}</span>
                </article>
              ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function translateUserStatus(status: EduUser['status']) {
  if (status === 'active') return 'Activo';
  if (status === 'pending') return 'Pendiente';
  return 'Bloqueado';
}
