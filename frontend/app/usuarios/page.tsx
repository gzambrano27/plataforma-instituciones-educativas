import Link from 'next/link';

export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4100/api';

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

async function loginAndLoadUsers() {
  const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@educa.local', password: 'Educa2026!' }),
    cache: 'no-store',
  });

  if (!loginResponse.ok) {
    return { users: [] as EduUser[], roles: [] as EduRole[], error: 'No fue posible autenticar el acceso demo.' };
  }

  const loginPayload = (await loginResponse.json()) as {
    data?: { accessToken?: string };
  };

  const accessToken = loginPayload.data?.accessToken;

  if (!accessToken) {
    return { users: [] as EduUser[], roles: [] as EduRole[], error: 'No se recibió token de acceso.' };
  }

  const [usersResponse, rolesResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    }),
    fetch(`${API_BASE_URL}/users/roles`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    }),
  ]);

  if (!usersResponse.ok || !rolesResponse.ok) {
    return { users: [] as EduUser[], roles: [] as EduRole[], error: 'No fue posible cargar usuarios o roles.' };
  }

  const usersPayload = (await usersResponse.json()) as { data?: EduUser[] };
  const rolesPayload = (await rolesResponse.json()) as { data?: EduRole[] };

  return {
    users: usersPayload.data ?? [],
    roles: rolesPayload.data ?? [],
    error: null,
  };
}

export default async function UsersPage() {
  const { users, roles, error } = await loginAndLoadUsers();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Fase 4 · Usuarios y roles</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Gobernanza base de acceso</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Esta vista ya expone usuarios reales sembrados, su estado, institución asociada y catálogo inicial de roles.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/instituciones" className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
            Ver instituciones
          </Link>
          <Link href="/" className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="grid grid-cols-[1.6fr_1.2fr_0.9fr_1.3fr] gap-4 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>Usuario</span>
            <span>Institución</span>
            <span>Estado</span>
            <span>Roles</span>
          </div>

          {error ? (
            <div className="px-5 py-6 text-sm text-rose-300">{error}</div>
          ) : users.length === 0 ? (
            <div className="px-5 py-6 text-sm text-slate-400">Todavía no hay usuarios registrados.</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="grid grid-cols-[1.6fr_1.2fr_0.9fr_1.3fr] gap-4 border-b border-white/6 px-5 py-4 text-sm text-slate-200 last:border-b-0">
                <div>
                  <p className="font-medium text-white">{user.fullName}</p>
                  <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                </div>
                <div>{user.institutionName ?? 'Global / sin institución'}</div>
                <div className="capitalize">{user.status}</div>
                <div className="text-xs text-slate-300">{user.roleCodes.join(', ')}</div>
              </div>
            ))
          )}
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Roles iniciales</p>
          <div className="mt-4 space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="font-medium text-white">{role.name}</p>
                <p className="mt-1 text-xs text-slate-500">{role.code}</p>
                <p className="mt-2 text-xs text-slate-400">{role.isSystem ? 'Rol de sistema' : 'Rol editable'}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
