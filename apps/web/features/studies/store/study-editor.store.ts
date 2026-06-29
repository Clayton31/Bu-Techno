'use client';

import { create } from 'zustand';

type Tool = 'select' | 'pan';

type UIState = { fullscreen: boolean; activeTool: Tool };
type CanvasState = { zoom: number; position: { x: number; y: number } };
type SelectionState = { selectedLayerId: string | null };
type HistoryState = { canUndo: boolean; canRedo: boolean; historyIndex: number };

type StudyEditorState = {
  ui: UIState;
  canvas: CanvasState;
  selection: SelectionState;
  history: HistoryState;
  setTool: (tool: Tool) => void;
  toggleFullscreen: () => void;
  setZoom: (zoom: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
  fitScreen: () => void;
  resetZoom: () => void;
  selectLayer: (layerId: string | null) => void;
};

const initialCanvas: CanvasState = { zoom: 1, position: { x: 0, y: 0 } };

export const useStudyEditorStore = create<StudyEditorState>((set) => ({
  ui: { fullscreen: false, activeTool: 'select' },
  canvas: initialCanvas,
  selection: { selectedLayerId: null },
  history: { canUndo: false, canRedo: false, historyIndex: 0 },
  setTool: (tool) => set((state) => ({ ui: { ...state.ui, activeTool: tool } })),
  toggleFullscreen: () => set((state) => ({ ui: { ...state.ui, fullscreen: !state.ui.fullscreen } })),
  setZoom: (zoom) => set((state) => ({ canvas: { ...state.canvas, zoom: Math.min(Math.max(zoom, 0.1), 5) } })),
  setPosition: (position) => set((state) => ({ canvas: { ...state.canvas, position } })),
  fitScreen: () => set((state) => ({ canvas: { ...state.canvas, zoom: 0.85, position: { x: 24, y: 24 } } })),
  resetZoom: () => set({ canvas: initialCanvas }),
  selectLayer: (layerId) => set({ selection: { selectedLayerId: layerId } }),
}));
