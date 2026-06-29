'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ projectId: z.string().min(1), userId: z.string().min(1), role: z.enum(['OWNER','PROJECT_MANAGER','TECHNICIAN','VIEWER']) });

export default function Page() {
  return <ModulePage title='Membres de projet' description='Affectation des équipes aux projets.' endpoint='/api/project-members' fields={[{ name: 'projectId', label: 'ID projet' }, { name: 'userId', label: 'ID utilisateur' }, { name: 'role', label: 'Rôle projet' }]} schema={schema} />;
}
