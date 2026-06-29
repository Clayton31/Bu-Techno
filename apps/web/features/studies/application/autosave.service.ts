import type { StudyRepository } from '../domain/study.repository';
import { autosaveSchema } from '../domain/study.schemas';

export class AutosaveService {
  constructor(private readonly repository: StudyRepository) {}

  async save(studyId: string, input: unknown) {
    const { snapshot } = autosaveSchema.parse(input);
    await this.repository.update(studyId, {});
    return this.repository.createVersion({ studyId, snapshot });
  }
}
