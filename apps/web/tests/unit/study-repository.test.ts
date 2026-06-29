import { describe, expect, it, vi } from 'vitest';
import { PrismaStudyRepository } from '@/features/studies/infrastructure/prisma-study.repository';

describe('PrismaStudyRepository', () => {
  it('filters studies by project and orders by update date', async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    const repository = new PrismaStudyRepository({ study: { findMany } } as never);
    await repository.list('project_1');
    expect(findMany).toHaveBeenCalledWith({ where: { projectId: 'project_1' }, orderBy: { updatedAt: 'desc' } });
  });

  it('increments version numbers from the latest version', async () => {
    const findFirst = vi.fn().mockResolvedValue({ number: 4 });
    const repository = new PrismaStudyRepository({ studyVersion: { findFirst } } as never);
    await expect(repository.nextVersionNumber('study_1')).resolves.toBe(5);
  });
});
