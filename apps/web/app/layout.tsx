import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = { title: 'BU Techno', description: 'SaaS métier pour intégrateurs en sécurité électronique' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><Providers>{children}</Providers></body></html>;
}
