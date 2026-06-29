import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PropertiesPanel({ studyName, selectedLayerId }: { studyName: string; selectedLayerId: string | null }) {
  return <Card><CardHeader><CardTitle>Propriétés</CardTitle></CardHeader><CardContent className="grid gap-2 text-sm text-slate-600"><p><span className="font-medium text-slate-900">Étude :</span> {studyName}</p><p><span className="font-medium text-slate-900">Sélection :</span> {selectedLayerId ?? 'Aucun calque'}</p><p>Les équipements et annotations seront ajoutés dans un sprint ultérieur.</p></CardContent></Card>;
}
