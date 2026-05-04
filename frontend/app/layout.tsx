import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Educa | Presencia institucional y acceso académico',
  description: 'Presencia institucional pública y acceso privado al sistema académico de una institución educativa.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
