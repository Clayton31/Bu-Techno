import { z } from 'zod';

export const studyStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']);
export const studyCreateSchema = z.object({ projectId: z.string().min(1), name: z.string().min(2), description: z.string().optional(), status: studyStatusSchema.default('DRAFT') });
export const studyUpdateSchema = studyCreateSchema.partial().extend({ status: studyStatusSchema.optional() });
export const autosaveSchema = z.object({ snapshot: z.object({ zoom: z.number().positive(), position: z.object({ x: z.number(), y: z.number() }), selectedLayerId: z.string().nullable(), historyIndex: z.number().int().min(0) }) });

export const acceptedStudyMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/svg+xml'] as const;
export const maxStudyFileSize = 25 * 1024 * 1024;
