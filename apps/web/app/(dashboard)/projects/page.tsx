'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ reference: z.string().min(2), name: z.string().min(2), description: z.string().optional(), status: z.enum(['DRAFT','SURVEY','QUOTED','IN_PROGRESS','DELIVERED','ARCHIVED']), clientId: z.string().min(1), siteId: z.string().min(1), ownerId: z.string().min(1) });

export default function Page() {
  return <ModulePage title='Projets' description='Pipeline des projets de sécurité électronique.' endpoint='/api/projects' fields={[{ name: 'reference', label: 'Référence' }, { name: 'name', label: 'Nom' }, { name: 'description', label: 'Description' }, { name: 'status', label: 'Statut' }, { name: 'clientId', label: 'ID client' }, { name: 'siteId', label: 'ID site' }, { name: 'ownerId', label: 'ID responsable' }]} schema={schema} />;
}
