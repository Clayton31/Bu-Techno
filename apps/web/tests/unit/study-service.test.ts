import { describe, expect, it, vi } from 'vitest';
import { StudyService } from '@/features/studies/application/study.service';
import type { StudyRepository } from '@/features/studies/domain/study.repository';

function createRepository(): StudyRepository {
  return { list: vi.fn(), findById: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn(), createFile: vi.fn(), createLayer: vi.fn(), createVersion: vi.fn(), nextVersionNumber: vi.fn() };
}

describe('StudyService', () => {
  it('creates a study and initializes the base layer', async () => {
    const repository = createRepository();
    vi.mocked(repository.create).mockResolvedValue({ id: 'study_1', name: 'Étude APS', description: null, status: 'DRAFT', projectId: 'project_1', createdAt: new Date(), updatedAt: new Date(), files: [], layers: [], versions: [] });
    vi.mocked(repository.findById).mockResolvedValue({ id: 'study_1', name: 'Étude APS', description: null, status: 'DRAFT', projectId: 'project_1', createdAt: new Date(), updatedAt: new Date(), files: [], layers: [], versions: [] });
    const service = new StudyService(repository);

    await service.create({ name: 'Étude APS', projectId: 'project_1' });

    expect(repository.create).toHaveBeenCalledWith({ name: 'Étude APS', projectId: 'project_1', status: 'DRAFT' });
    expect(repository.createLayer).toHaveBeenCalledWith({ studyId: 'study_1', name: 'Plan importé', order: 0 });
  });

  it('rejects invalid creation payloads', async () => {
    const service = new StudyService(createRepository());
    await expect(service.create({ name: 'A' })).rejects.toThrow();
  });
});
