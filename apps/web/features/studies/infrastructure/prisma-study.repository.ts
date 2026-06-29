import type { PrismaClient } from '@prisma/client';
import type { StudyCanvasSnapshot } from '../types/study.types';
import type { CreateStudyInput, StudyRepository, StudyWithRelations, UpdateStudyInput } from '../domain/study.repository';

const studyInclude = { files: true, layers: { orderBy: { order: 'asc' as const } }, versions: { orderBy: { number: 'desc' as const } } };

export class PrismaStudyRepository implements StudyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  list(projectId?: string) {
    return this.prisma.study.findMany({ where: projectId ? { projectId } : undefined, orderBy: { updatedAt: 'desc' } });
  }

  findById(id: string): Promise<StudyWithRelations | null> {
    return this.prisma.study.findUnique({ where: { id }, include: studyInclude });
  }

  create(input: CreateStudyInput): Promise<StudyWithRelations> {
    return this.prisma.study.create({ data: input, include: studyInclude });
  }

  update(id: string, input: UpdateStudyInput): Promise<StudyWithRelations> {
    return this.prisma.study.update({ where: { id }, data: input, include: studyInclude });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.study.delete({ where: { id } });
  }

  createFile(input: { studyId: string; originalName: string; mimeType: string; size: number; storageKey: string; url: string }) {
    return this.prisma.studyFile.create({ data: input });
  }

  createLayer(input: { studyId: string; name: string; order: number }) {
    return this.prisma.studyLayer.create({ data: input });
  }

  async nextVersionNumber(studyId: string): Promise<number> {
    const latest = await this.prisma.studyVersion.findFirst({ where: { studyId }, orderBy: { number: 'desc' } });
    return (latest?.number ?? 0) + 1;
  }

  async createVersion(input: { studyId: string; snapshot: StudyCanvasSnapshot }) {
    const number = await this.nextVersionNumber(input.studyId);
    return this.prisma.studyVersion.create({ data: { studyId: input.studyId, number, snapshot: input.snapshot } });
  }
}
