'use client';

import { Layer, Rect, Stage, Text } from 'react-konva';
import { useStudyEditorStore } from '../store/study-editor.store';

export function StudyCanvas({ fileUrl }: { fileUrl?: string }) {
  const canvas = useStudyEditorStore((state) => state.canvas);
  const setPosition = useStudyEditorStore((state) => state.setPosition);

  return <div className="h-[calc(100vh-260px)] min-h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"><Stage width={1200} height={760} draggable scaleX={canvas.zoom} scaleY={canvas.zoom} x={canvas.position.x} y={canvas.position.y} onDragEnd={(event) => setPosition({ x: event.target.x(), y: event.target.y() })}><Layer><Rect x={120} y={80} width={900} height={560} fill="white" stroke="#cbd5e1" shadowBlur={12} /><Text x={160} y={120} text={fileUrl ? `Plan importé : ${fileUrl}` : 'Importez un PDF, PNG, JPG, JPEG ou SVG pour afficher le plan.'} fontSize={22} fill="#0f172a" width={820} /><Text x={160} y={180} text="Fondations du module Étude : zoom, pan, fit screen, reset zoom, fullscreen et autosave." fontSize={16} fill="#64748b" width={780} /></Layer></Stage></div>;
}
