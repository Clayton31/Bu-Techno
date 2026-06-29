import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { acceptedStudyMimeTypes, maxStudyFileSize } from '../domain/study.schemas';

export type StoredFile = { originalName: string; mimeType: string; size: number; storageKey: string; url: string };

export class StorageService {
  constructor(private readonly uploadRoot = process.env.STORAGE_DIR ?? path.join(process.cwd(), 'public', 'uploads', 'studies')) {}

  async storeStudyFile(studyId: string, file: File): Promise<StoredFile> {
    if (!acceptedStudyMimeTypes.includes(file.type as (typeof acceptedStudyMimeTypes)[number])) {
      throw new Error('Unsupported study file type');
    }
    if (file.size > maxStudyFileSize) {
      throw new Error('Study file exceeds maximum size');
    }

    const extension = path.extname(file.name).toLowerCase();
    const storageKey = `${studyId}/${crypto.randomUUID()}${extension}`;
    const targetDirectory = path.join(this.uploadRoot, studyId);
    const targetPath = path.join(this.uploadRoot, storageKey);
    await mkdir(targetDirectory, { recursive: true });
    await writeFile(targetPath, Buffer.from(await file.arrayBuffer()));

    return { originalName: file.name, mimeType: file.type, size: file.size, storageKey, url: `/uploads/studies/${storageKey}` };
  }
}
