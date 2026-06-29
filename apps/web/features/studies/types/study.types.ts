export type StudyStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
export type StudyFileKind = 'application/pdf' | 'image/png' | 'image/jpeg' | 'image/svg+xml';

export type StudyCanvasSnapshot = {
  zoom: number;
  position: { x: number; y: number };
  selectedLayerId: string | null;
  historyIndex: number;
};

export type StudyListItem = {
  id: string;
  name: string;
  description: string | null;
  status: StudyStatus;
  projectId: string;
  updatedAt: Date;
};

export type StudyDetails = StudyListItem & {
  files: Array<{ id: string; originalName: string; mimeType: string; url: string; size: number }>;
  layers: Array<{ id: string; name: string; visible: boolean; locked: boolean; order: number }>;
  versions: Array<{ id: string; number: number; createdAt: Date }>;
};
