import { describe, expect, it } from 'vitest';
import { clientSchema, contactSchema, notificationSchema, projectHistorySchema, projectMemberSchema, siteSchema, userSchema } from '@/lib/validations';

const criticalApiContracts = [
  { resource: 'users', schema: userSchema, payload: { name: 'Technicien', email: 'tech@butechno.fr', role: 'INTEGRATOR' } },
  { resource: 'clients', schema: clientSchema, payload: { name: 'Banque Nord', email: 'contact@banquenord.fr' } },
  { resource: 'contacts', schema: contactSchema, payload: { firstName: 'Lina', lastName: 'Martin', clientId: 'client_1' } },
  { resource: 'sites', schema: siteSchema, payload: { name: 'Agence Lille', address: '10 rue Nationale', city: 'Lille', postalCode: '59000', clientId: 'client_1' } },
  { resource: 'project-members', schema: projectMemberSchema, payload: { projectId: 'project_1', userId: 'user_1', role: 'PROJECT_MANAGER' } },
  { resource: 'project-history', schema: projectHistorySchema, payload: { projectId: 'project_1', action: 'Statut mis à jour' } },
  { resource: 'notifications', schema: notificationSchema, payload: { title: 'Projet créé', message: 'Le projet PRJ-001 est prêt.', type: 'SUCCESS' } },
];

describe('Core API validation contracts', () => {
  it.each(criticalApiContracts)('accepts the minimal valid payload for $resource', ({ schema, payload }) => {
    expect(schema.parse(payload)).toMatchObject(payload);
  });
});
