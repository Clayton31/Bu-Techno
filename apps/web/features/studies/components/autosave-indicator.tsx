'use client';

import type { AutosaveStatus } from '../hooks/use-study-autosave';

const labels: Record<AutosaveStatus, string> = { idle: 'Autosave prêt', saving: 'Sauvegarde...', saved: 'Sauvegardé', error: 'Erreur autosave' };

export function AutosaveIndicator({ status }: { status: AutosaveStatus }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">{labels[status]}</span>;
}
