import { beforeEach, describe, expect, it, vi } from 'vitest';

const requireSessionMock = vi.fn();
const studyService = { list: vi.fn(), create: vi.fn(), getById: vi.fn(), update: vi.fn(), delete: vi.fn() };
const uploadService = { upload: vi.fn() };
const autosaveService = { save: vi.fn() };

vi.mock('@/lib/api', async () => {
  const actual = await vi.importActual<typeof import('@/lib/api')>('@/lib/api');
  return { ...actual, requireSession: requireSessionMock };
});
vi.mock('@/features/studies/infrastructure/study-container', () => ({ createStudyServices: () => ({ studyService, uploadService, autosaveService }) }));

const collectionRoute = await import('@/app/api/studies/route');
const detailRoute = await import('@/app/api/studies/[id]/route');
const uploadRoute = await import('@/app/api/studies/[id]/upload/route');
const autosaveRoute = await import('@/app/api/studies/[id]/autosave/route');

describe('Studies API', () => {
  beforeEach(() => {
    requireSessionMock.mockResolvedValue({ user: { id: 'user_1' } });
    studyService.list.mockReset();
    studyService.create.mockReset();
    studyService.getById.mockReset();
    studyService.update.mockReset();
    studyService.delete.mockReset();
    uploadService.upload.mockReset();
    autosaveService.save.mockReset();
  });

  it('lists studies by project id', async () => {
    studyService.list.mockResolvedValue([{ id: 'study_1' }]);
    const response = await collectionRoute.GET(new Request('http://test.local/api/studies?projectId=project_1'));
    expect(response.status).toBe(200);
    expect(studyService.list).toHaveBeenCalledWith('project_1');
  });

  it('creates studies from JSON payloads', async () => {
    studyService.create.mockResolvedValue({ id: 'study_2' });
    const request = new Request('http://test.local/api/studies', { method: 'POST', body: JSON.stringify({ projectId: 'project_1', name: 'Étude EXE' }) });
    const response = await collectionRoute.POST(request);
    expect(response.status).toBe(201);
  });

  it('patches studies', async () => {
    studyService.update.mockResolvedValue({ id: 'study_3', name: 'Étude DOE' });
    const request = new Request('http://test.local/api/studies/study_3', { method: 'PATCH', body: JSON.stringify({ name: 'Étude DOE' }) });
    const response = await detailRoute.PATCH(request, { params: Promise.resolve({ id: 'study_3' }) });
    expect(response.status).toBe(200);
    expect(studyService.update).toHaveBeenCalledWith('study_3', { name: 'Étude DOE' });
  });

  it('uploads accepted files through the upload service', async () => {
    uploadService.upload.mockResolvedValue({ id: 'file_1', url: '/uploads/studies/file.pdf' });
    const formData = new FormData();
    formData.append('file', new File(['pdf'], 'plan.pdf', { type: 'application/pdf' }));
    const response = await uploadRoute.POST(new Request('http://test.local/api/studies/study_1/upload', { method: 'POST', body: formData }), { params: Promise.resolve({ id: 'study_1' }) });
    expect(response.status).toBe(201);
    expect(uploadService.upload).toHaveBeenCalledTimes(1);
    const uploadedFile = uploadService.upload.mock.calls[0]?.[1];
    expect(uploadedFile).toBeInstanceOf(File);
  });

  it('autosaves canvas snapshots', async () => {
    autosaveService.save.mockResolvedValue({ id: 'version_1', number: 1 });
    const snapshot = { zoom: 1, position: { x: 0, y: 0 }, selectedLayerId: null, historyIndex: 0 };
    const request = new Request('http://test.local/api/studies/study_1/autosave', { method: 'POST', body: JSON.stringify({ snapshot }) });
    const response = await autosaveRoute.POST(request, { params: Promise.resolve({ id: 'study_1' }) });
    expect(response.status).toBe(201);
    expect(autosaveService.save).toHaveBeenCalledWith('study_1', { snapshot });
  });
});
