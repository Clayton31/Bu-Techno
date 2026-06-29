import type { Study, StudyFile, StudyLayer, StudyVersion } from '@prisma/client';
import type { StudyCanvasSnapshot } from '../types/study.types';
import type { studyCreateSchema, studyUpdateSchema } from './study.schemas';
import type { z } from 'zod';

export type CreateStudyInput = z.infer<typeof studyCreateSchema>;
export type UpdateStudyInput = z.infer<typeof studyUpdateSchema>;
export type StudyWithRelations = Study & { files: StudyFile[]; layers: StudyLayer[]; versions: StudyVersion[] };

export interface StudyRepository {
  list(projectId?: string): Promise<Study[]>;
  findById(id: string): Promise<StudyWithRelations | null>;
  create(input: CreateStudyInput): Promise<StudyWithRelations>;
  update(id: string, input: UpdateStudyInput): Promise<StudyWithRelations>;
  delete(id: string): Promise<void>;
  createFile(input: { studyId: string; originalName: string; mimeType: string; size: number; storageKey: string; url: string }): Promise<StudyFile>;
  createLayer(input: { studyId: string; name: string; order: number }): Promise<StudyLayer>;
  createVersion(input: { studyId: string; snapshot: StudyCanvasSnapshot }): Promise<StudyVersion>;
  nextVersionNumber(studyId: string): Promise<number>;
}
