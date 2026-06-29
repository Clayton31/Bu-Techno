'use client';

import { useState } from 'react';
import { AutosaveIndicator } from './autosave-indicator';
import { FileUploader } from './file-uploader';
import { LayersPanel } from './layers-panel';
import { PropertiesPanel } from './properties-panel';
import { StudyCanvas } from './study-canvas';
import { Toolbar } from './toolbar';
import { VersionsPanel } from './versions-panel';
import { useStudyAutosave } from '../hooks/use-study-autosave';
import { useStudyEditorStore } from '../store/study-editor.store';
import type { StudyDetails } from '../types/study.types';

export function StudyEditor({ study }: { study: StudyDetails }) {
  const [fileUrl, setFileUrl] = useState(study.files[0]?.url);
  const fullscreen = useStudyEditorStore((state) => state.ui.fullscreen);
  const selectedLayerId = useStudyEditorStore((state) => state.selection.selectedLayerId);
  const autosaveStatus = useStudyAutosave(study.id);

  return <section className={`grid gap-4 ${fullscreen ? 'fixed inset-0 z-50 bg-slate-50 p-6' : ''}`}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-medium text-blue-700">Module Étude</p><h1 className="text-3xl font-bold tracking-tight text-slate-950">{study.name}</h1></div><AutosaveIndicator status={autosaveStatus} /></div><Toolbar /><div className="grid gap-4 xl:grid-cols-[1fr_360px]"><div className="grid gap-4"><FileUploader studyId={study.id} onUploaded={setFileUrl} /><StudyCanvas fileUrl={fileUrl} /></div><aside className="grid content-start gap-4"><PropertiesPanel studyName={study.name} selectedLayerId={selectedLayerId} /><LayersPanel layers={study.layers} /><VersionsPanel versions={study.versions} /></aside></div></section>;
}
