import type { StudyRepository } from '../domain/study.repository';
import { studyCreateSchema, studyUpdateSchema } from '../domain/study.schemas';

export class StudyService {
  constructor(private readonly repository: StudyRepository) {}

  list(projectId?: string) {
    return this.repository.list(projectId);
  }

  async getById(id: string) {
    const study = await this.repository.findById(id);
    if (!study) throw new Error('Study not found');
    return study;
  }

  async create(input: unknown) {
    const data = studyCreateSchema.parse(input);
    const study = await this.repository.create(data);
    await this.repository.createLayer({ studyId: study.id, name: 'Plan importé', order: 0 });
    return this.getById(study.id);
  }

  update(id: string, input: unknown) {
    return this.repository.update(id, studyUpdateSchema.parse(input));
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
