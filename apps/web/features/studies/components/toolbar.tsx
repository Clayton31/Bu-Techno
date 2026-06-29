'use client';

import { Maximize2, Move, RotateCcw, Scan, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudyEditorStore } from '../store/study-editor.store';

export function Toolbar() {
  const zoom = useStudyEditorStore((state) => state.canvas.zoom);
  const setZoom = useStudyEditorStore((state) => state.setZoom);
  const fitScreen = useStudyEditorStore((state) => state.fitScreen);
  const resetZoom = useStudyEditorStore((state) => state.resetZoom);
  const toggleFullscreen = useStudyEditorStore((state) => state.toggleFullscreen);
  const setTool = useStudyEditorStore((state) => state.setTool);

  return <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><Button size="sm" variant="outline" onClick={() => setTool('pan')}><Move className="mr-2 h-4 w-4" />Pan</Button><Button size="sm" variant="outline" onClick={() => setZoom(zoom + 0.1)}><ZoomIn className="mr-2 h-4 w-4" />Zoom +</Button><Button size="sm" variant="outline" onClick={() => setZoom(zoom - 0.1)}><ZoomOut className="mr-2 h-4 w-4" />Zoom -</Button><Button size="sm" variant="outline" onClick={fitScreen}><Scan className="mr-2 h-4 w-4" />Fit screen</Button><Button size="sm" variant="outline" onClick={resetZoom}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button><Button size="sm" variant="outline" onClick={toggleFullscreen}><Maximize2 className="mr-2 h-4 w-4" />Fullscreen</Button><span className="ml-auto text-sm font-medium text-slate-600"><Search className="mr-1 inline h-4 w-4" />{Math.round(zoom * 100)}%</span></div>;
}
