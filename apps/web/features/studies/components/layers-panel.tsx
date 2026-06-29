'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudyEditorStore } from '../store/study-editor.store';

type LayerItem = { id: string; name: string; visible: boolean; locked: boolean };

export function LayersPanel({ layers }: { layers: LayerItem[] }) {
  const selectedLayerId = useStudyEditorStore((state) => state.selection.selectedLayerId);
  const selectLayer = useStudyEditorStore((state) => state.selectLayer);
  return <Card><CardHeader><CardTitle>Calques</CardTitle></CardHeader><CardContent className="grid gap-2">{layers.map((layer) => <button key={layer.id} type="button" onClick={() => selectLayer(layer.id)} className={`rounded-xl border p-3 text-left text-sm ${selectedLayerId === layer.id ? 'border-slate-950 bg-slate-100' : 'border-slate-200 bg-white'}`}><span className="font-medium">{layer.name}</span><span className="block text-xs text-slate-500">{layer.visible ? 'Visible' : 'Masqué'} · {layer.locked ? 'Verrouillé' : 'Éditable'}</span></button>)}</CardContent></Card>;
}
