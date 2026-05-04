import { AppShell } from '../../components/app-shell';

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
