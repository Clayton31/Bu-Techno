import { describe, expect, it } from 'vitest';
import { clientSchema, projectSchema, siteSchema, userSchema } from '@/lib/validations';

describe('Sprint 2 Zod validations', () => {
  it('validates users with production roles and active default', () => {
    const user = userSchema.parse({ name: 'Admin BU', email: 'admin@butechno.fr', role: 'ADMIN' });
    expect(user).toMatchObject({ email: 'admin@butechno.fr', role: 'ADMIN', active: true });
  });

  it('rejects invalid client emails', () => {
    expect(() => clientSchema.parse({ name: 'Client A', email: 'not-an-email' })).toThrow();
  });

  it('coerces site coordinates for Google Maps storage', () => {
    const site = siteSchema.parse({ name: 'Siège', address: '1 rue Test', city: 'Paris', postalCode: '75001', clientId: 'client_1', latitude: '48.8566', longitude: '2.3522' });
    expect(site.latitude).toBe(48.8566);
    expect(site.longitude).toBe(2.3522);
  });

  it('validates required project relations and status', () => {
    const project = projectSchema.parse({ reference: 'PRJ-001', name: 'Contrôle accès', status: 'SURVEY', clientId: 'client_1', siteId: 'site_1', ownerId: 'user_1' });
    expect(project.status).toBe('SURVEY');
  });
});
