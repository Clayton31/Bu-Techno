'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ title: z.string().min(2), message: z.string().min(2), type: z.enum(['INFO','SUCCESS','WARNING','ERROR']), userId: z.string().optional() });

export default function Page() {
  return <ModulePage title='Notifications' description='Messages applicatifs et alertes utilisateurs.' endpoint='/api/notifications' fields={[{ name: 'title', label: 'Titre' }, { name: 'message', label: 'Message' }, { name: 'type', label: 'Type INFO/SUCCESS/WARNING/ERROR' }, { name: 'userId', label: 'ID utilisateur' }]} schema={schema} />;
}
