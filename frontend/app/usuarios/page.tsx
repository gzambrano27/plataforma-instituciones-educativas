import { DemoApiError, fetchDemoApi } from '../lib/demo-api';
import { UsersWorkspace } from './users-workspace';

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

      <UsersWorkspace users={users} roles={roles} institutions={institutions} error={error} />
    </main>
  );
}
