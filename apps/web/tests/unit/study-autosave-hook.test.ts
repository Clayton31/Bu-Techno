import { describe, expect, it, vi } from 'vitest';
import { useStudyEditorStore } from '@/features/studies/store/study-editor.store';

describe('Study editor store foundations used by autosave', () => {
  it('separates canvas, selection and history state', () => {
    useStudyEditorStore.getState().setZoom(2);
    useStudyEditorStore.getState().setPosition({ x: 10, y: 20 });
    useStudyEditorStore.getState().selectLayer('layer_1');

    const state = useStudyEditorStore.getState();
    expect(state.canvas).toMatchObject({ zoom: 2, position: { x: 10, y: 20 } });
    expect(state.selection.selectedLayerId).toBe('layer_1');
    expect(state.history.historyIndex).toBe(0);
  });

  it('resets zoom without mutating selection', () => {
    useStudyEditorStore.getState().selectLayer('layer_2');
    useStudyEditorStore.getState().resetZoom();
    expect(useStudyEditorStore.getState().canvas.zoom).toBe(1);
    expect(useStudyEditorStore.getState().selection.selectedLayerId).toBe('layer_2');
  });
});
