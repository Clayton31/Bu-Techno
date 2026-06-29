'use client';

import { useEffect, useState } from 'react';
import { useStudyEditorStore } from '../store/study-editor.store';

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useStudyAutosave(studyId: string, intervalMs = 30_000) {
  const [status, setStatus] = useState<AutosaveStatus>('idle');
  const canvas = useStudyEditorStore((state) => state.canvas);
  const selection = useStudyEditorStore((state) => state.selection);
  const history = useStudyEditorStore((state) => state.history);

  useEffect(() => {
    const autosave = async () => {
      setStatus('saving');
      const response = await fetch(`/api/studies/${studyId}/autosave`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ snapshot: { zoom: canvas.zoom, position: canvas.position, selectedLayerId: selection.selectedLayerId, historyIndex: history.historyIndex } }) });
      setStatus(response.ok ? 'saved' : 'error');
    };

    const timer = window.setInterval(() => { void autosave(); }, intervalMs);
    return () => window.clearInterval(timer);
  }, [canvas.position, canvas.zoom, history.historyIndex, intervalMs, selection.selectedLayerId, studyId]);

  return status;
}
