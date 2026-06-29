import { z } from 'zod';

export const idSchema = z.object({ id: z.string().min(1) });
export const roleSchema = z.enum(['ADMIN', 'MANAGER', 'INTEGRATOR', 'VIEWER']);
export const projectStatusSchema = z.enum(['DRAFT', 'SURVEY', 'QUOTED', 'IN_PROGRESS', 'DELIVERED', 'ARCHIVED']);
export const projectMemberRoleSchema = z.enum(['OWNER', 'PROJECT_MANAGER', 'TECHNICIAN', 'VIEWER']);
export const notificationTypeSchema = z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR']);

export const userSchema = z.object({ name: z.string().min(2).optional(), email: z.string().email(), role: roleSchema.default('INTEGRATOR'), active: z.boolean().default(true) });
export const companySettingsSchema = z.object({ name: z.string().min(2), legalName: z.string().optional(), siret: z.string().optional(), email: z.string().email().optional(), phone: z.string().optional(), website: z.string().url().optional(), address: z.string().optional(), city: z.string().optional(), postalCode: z.string().optional(), country: z.string().default('France') });
export const clientSchema = z.object({ name: z.string().min(2), email: z.string().email().optional(), phone: z.string().optional(), notes: z.string().optional() });
export const contactSchema = z.object({ firstName: z.string().min(2), lastName: z.string().min(2), jobTitle: z.string().optional(), email: z.string().email().optional(), phone: z.string().optional(), clientId: z.string().min(1) });
export const siteSchema = z.object({ name: z.string().min(2), address: z.string().min(3), city: z.string().min(2), postalCode: z.string().min(2), country: z.string().default('France'), latitude: z.coerce.number().optional(), longitude: z.coerce.number().optional(), clientId: z.string().min(1) });
export const projectSchema = z.object({ reference: z.string().min(2), name: z.string().min(2), description: z.string().optional(), status: projectStatusSchema.default('DRAFT'), clientId: z.string().min(1), siteId: z.string().min(1), ownerId: z.string().min(1) });
export const projectMemberSchema = z.object({ projectId: z.string().min(1), userId: z.string().min(1), role: projectMemberRoleSchema.default('TECHNICIAN') });
export const projectHistorySchema = z.object({ projectId: z.string().min(1), userId: z.string().min(1).optional(), action: z.string().min(2), details: z.string().optional() });
export const notificationSchema = z.object({ title: z.string().min(2), message: z.string().min(2), type: notificationTypeSchema.default('INFO'), userId: z.string().min(1).optional() });
