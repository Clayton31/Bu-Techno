import type { StudyRepository } from '../domain/study.repository';
import type { StorageService } from './storage.service';

export class StudyUploadService {
  constructor(private readonly repository: StudyRepository, private readonly storage: StorageService) {}

  async upload(studyId: string, file: File) {
    const study = await this.repository.findById(studyId);
    if (!study) throw new Error('Study not found');
    const storedFile = await this.storage.storeStudyFile(studyId, file);
    return this.repository.createFile({ studyId, ...storedFile });
  }
}
