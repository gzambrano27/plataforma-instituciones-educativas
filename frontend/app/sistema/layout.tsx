import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '../../components/app-shell';
import { ACCESS_TOKEN_COOKIE } from '../../lib/auth-session';
import { getCurrentUser } from '../../lib/current-user';

export default async function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();

  if (!cookieStore.get(ACCESS_TOKEN_COOKIE)?.value) {
    redirect('/login?next=/sistema');
  }

  const { user } = await getCurrentUser();

  return <AppShell currentUser={user}>{children}</AppShell>;
}
