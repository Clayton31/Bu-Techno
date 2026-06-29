import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const roles = ['ADMIN', 'MANAGER', 'INTEGRATOR', 'VIEWER'];

export default function RolesPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Gestion des rôles</h1><p className="mt-2 text-slate-600">Les rôles structurent les permissions Sprint 2 et les évolutions RBAC.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{roles.map((role) => <Card key={role}><CardHeader><CardTitle>{role}</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-500">Rôle système disponible pour les utilisateurs et les workflows projet.</p></CardContent></Card>)}</div></div>;
}
