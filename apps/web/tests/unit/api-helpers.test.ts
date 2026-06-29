import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

const authMock = vi.fn();
vi.mock('@/auth', () => ({ auth: authMock }));

const { parseJson, requireSession } = await import('@/lib/api');

describe('API auth and validation helpers', () => {
  beforeEach(() => authMock.mockReset());

  it('returns the current session for authenticated requests', async () => {
    authMock.mockResolvedValue({ user: { id: 'user_1', email: 'admin@butechno.fr' } });
    await expect(requireSession()).resolves.toMatchObject({ user: { id: 'user_1' } });
  });

  it('throws a 401 response when no session exists', async () => {
    authMock.mockResolvedValue(null);
    await expect(requireSession()).rejects.toMatchObject({ status: 401 });
  });

  it('parses valid JSON request bodies with Zod', async () => {
    const request = new Request('http://test.local', { method: 'POST', body: JSON.stringify({ name: 'Client A' }) });
    await expect(parseJson(request, z.object({ name: z.string().min(2) }))).resolves.toEqual({ name: 'Client A' });
  });

  it('returns a 400 response for invalid JSON payloads', async () => {
    const request = new Request('http://test.local', { method: 'POST', body: JSON.stringify({ name: 'A' }) });
    await expect(parseJson(request, z.object({ name: z.string().min(2) }))).rejects.toMatchObject({ status: 400 });
  });
});
