import { prisma } from '@/lib/prisma';
import { AutosaveService } from '../application/autosave.service';
import { StorageService } from '../application/storage.service';
import { StudyService } from '../application/study.service';
import { StudyUploadService } from '../application/study-upload.service';
import { PrismaStudyRepository } from './prisma-study.repository';

export function createStudyServices() {
  const repository = new PrismaStudyRepository(prisma);
  const storage = new StorageService();
  return { repository, studyService: new StudyService(repository), uploadService: new StudyUploadService(repository, storage), autosaveService: new AutosaveService(repository) };
}
