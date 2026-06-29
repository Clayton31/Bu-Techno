import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const session = await auth();
  const stats = [{ label: 'Utilisateurs', value: '—' }, { label: 'Clients', value: '—' }, { label: 'Sites', value: '—' }, { label: 'Rôle', value: session?.user.role ?? '—' }];
  return <div className="space-y-8"><div><p className="text-sm font-medium text-blue-700">Sprint 2</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Bonjour {session?.user.name ?? 'intégrateur'}</h1><p className="mt-2 text-slate-600">Les modules opérationnels BU Techno sont prêts : utilisateurs, clients, contacts, sites, projets, membres, historique et notifications.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <Card key={stat.label}><CardHeader><CardTitle className="text-sm text-slate-500">{stat.label}</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{stat.value}</p></CardContent></Card>)}</div></div>;
}
