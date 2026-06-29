import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type VersionItem = { id: string; number: number; createdAt: Date };

export function VersionsPanel({ versions }: { versions: VersionItem[] }) {
  return <Card><CardHeader><CardTitle>Versions</CardTitle></CardHeader><CardContent className="grid gap-2">{versions.length === 0 && <p className="text-sm text-slate-500">Aucune sauvegarde.</p>}{versions.map((version) => <div key={version.id} className="rounded-xl border border-slate-200 p-3 text-sm"><span className="font-medium">Version {version.number}</span><span className="block text-xs text-slate-500">{new Date(version.createdAt).toLocaleString('fr-FR')}</span></div>)}</CardContent></Card>;
}
