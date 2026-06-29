import { beforeEach, describe, expect, it, vi } from 'vitest';

const authMock = vi.fn();
const projectFindManyMock = vi.fn();
const projectCreateMock = vi.fn();
const projectFindUniqueMock = vi.fn();
const projectUpdateMock = vi.fn();
const projectDeleteMock = vi.fn();

vi.mock('@/auth', () => ({ auth: authMock }));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      findMany: projectFindManyMock,
      create: projectCreateMock,
      findUnique: projectFindUniqueMock,
      update: projectUpdateMock,
      delete: projectDeleteMock,
    },
  },
}));

const collectionRoute = await import('@/app/api/projects/route');
const itemRoute = await import('@/app/api/projects/[id]/route');

describe('Projects REST API', () => {
  beforeEach(() => {
    authMock.mockResolvedValue({ user: { id: 'user_1', email: 'pm@butechno.fr' } });
    projectFindManyMock.mockReset();
    projectCreateMock.mockReset();
    projectFindUniqueMock.mockReset();
    projectUpdateMock.mockReset();
    projectDeleteMock.mockReset();
  });

  it('lists projects with critical relations for dashboard views', async () => {
    projectFindManyMock.mockResolvedValue([{ id: 'project_1', reference: 'PRJ-001', name: 'Vidéosurveillance' }]);
    const response = await collectionRoute.GET();
    expect(response.status).toBe(200);
    expect(projectFindManyMock).toHaveBeenCalledWith({ orderBy: { createdAt: 'desc' }, include: { client: true, site: true, owner: true, members: true } });
    await expect(response.json()).resolves.toHaveLength(1);
  });

  it('creates a project after authentication and Zod validation', async () => {
    const payload = { reference: 'PRJ-002', name: 'Contrôle accès', status: 'SURVEY', clientId: 'client_1', siteId: 'site_1', ownerId: 'user_1' };
    projectCreateMock.mockResolvedValue({ id: 'project_2', ...payload });
    const request = new Request('http://test.local/api/projects', { method: 'POST', body: JSON.stringify(payload) });
    const response = await collectionRoute.POST(request);
    expect(response.status).toBe(201);
    expect(projectCreateMock).toHaveBeenCalledWith({ data: payload });
  });

  it('rejects invalid project creation payloads before Prisma is called', async () => {
    const request = new Request('http://test.local/api/projects', { method: 'POST', body: JSON.stringify({ reference: 'P' }) });
    const response = await collectionRoute.POST(request);
    expect(response.status).toBe(400);
    expect(projectCreateMock).not.toHaveBeenCalled();
  });

  it('updates an existing project by id', async () => {
    const payload = { reference: 'PRJ-003', name: 'Intrusion', status: 'IN_PROGRESS', clientId: 'client_1', siteId: 'site_1', ownerId: 'user_1' };
    projectUpdateMock.mockResolvedValue({ id: 'project_3', ...payload });
    const request = new Request('http://test.local/api/projects/project_3', { method: 'PUT', body: JSON.stringify(payload) });
    const response = await itemRoute.PUT(request, { params: Promise.resolve({ id: 'project_3' }) });
    expect(response.status).toBe(200);
    expect(projectUpdateMock).toHaveBeenCalledWith({ where: { id: 'project_3' }, data: payload });
  });

  it('deletes projects by id', async () => {
    projectDeleteMock.mockResolvedValue({ id: 'project_4' });
    const response = await itemRoute.DELETE(new Request('http://test.local/api/projects/project_4'), { params: Promise.resolve({ id: 'project_4' }) });
    expect(response.status).toBe(204);
    expect(projectDeleteMock).toHaveBeenCalledWith({ where: { id: 'project_4' } });
  });
});
