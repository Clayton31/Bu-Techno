'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ projectId: z.string().min(1), userId: z.string().optional(), action: z.string().min(2), details: z.string().optional() });

export default function Page() {
  return <ModulePage title='Historique projets' description='Traçabilité des actions projet.' endpoint='/api/project-history' fields={[{ name: 'projectId', label: 'ID projet' }, { name: 'userId', label: 'ID utilisateur' }, { name: 'action', label: 'Action' }, { name: 'details', label: 'Détails' }]} schema={schema} />;
}
