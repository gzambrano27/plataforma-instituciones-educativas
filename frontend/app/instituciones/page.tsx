import Link from 'next/link';

export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4100/api';

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
  const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@educa.local', password: 'Educa2026!' }),
    cache: 'no-store',
  });

  if (!loginResponse.ok) {
    return { institutions: [] as Institution[], error: 'No fue posible autenticar el acceso demo.' };
  }

  const loginPayload = (await loginResponse.json()) as {
    data?: { accessToken?: string };
  };

  const accessToken = loginPayload.data?.accessToken;

  if (!accessToken) {
    return { institutions: [] as Institution[], error: 'No se recibió token de acceso.' };
  }

  const institutionsResponse = await fetch(`${API_BASE_URL}/institutions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!institutionsResponse.ok) {
    return { institutions: [] as Institution[], error: 'No fue posible cargar instituciones.' };
  }

  const institutionsPayload = (await institutionsResponse.json()) as { data?: Institution[] };
  return { institutions: institutionsPayload.data ?? [], error: null };
}

export default async function InstitutionsPage() {
  const { institutions, error } = await loginAndLoadInstitutions();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Fase 3 · Instituciones</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Módulo inicial de instituciones</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Esta vista ya consulta la API protegida con autenticación base y muestra el registro institucional disponible.
          </p>
        </div>
        <Link href="/" className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
          Volver al inicio
        </Link>
      </div>

      <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] gap-4 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>Institución</span>
          <span>Contacto</span>
          <span>Tipo</span>
          <span>Año activo</span>
        </div>

        {error ? (
          <div className="px-5 py-6 text-sm text-rose-300">{error}</div>
        ) : institutions.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-400">Todavía no hay instituciones registradas.</div>
        ) : (
          institutions.map((institution) => (
            <div key={institution.id} className="grid grid-cols-[2fr_1.2fr_1fr_1fr] gap-4 border-b border-white/6 px-5 py-4 text-sm text-slate-200 last:border-b-0">
              <div>
                <p className="font-medium text-white">{institution.name}</p>
                <p className="mt-1 text-xs text-slate-500">{institution.slug}</p>
                <p className="mt-2 text-xs text-slate-400">{institution.address ?? 'Dirección por definir'}</p>
              </div>
              <div>
                <p>{institution.contactEmail ?? 'Sin correo'}</p>
                <p className="mt-1 text-xs text-slate-500">{institution.contactPhone ?? 'Sin teléfono'}</p>
              </div>
              <div className="capitalize">{institution.institutionType}</div>
              <div>{institution.activeSchoolYearLabel ?? 'Por definir'}</div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
