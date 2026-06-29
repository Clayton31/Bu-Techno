'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ firstName: z.string().min(2), lastName: z.string().min(2), jobTitle: z.string().optional(), email: z.string().email().optional().or(z.literal('')), phone: z.string().optional(), clientId: z.string().min(1) });

export default function Page() {
  return <ModulePage title='Contacts' description='Contacts rattachés aux clients.' endpoint='/api/contacts' fields={[{ name: 'firstName', label: 'Prénom' }, { name: 'lastName', label: 'Nom' }, { name: 'jobTitle', label: 'Fonction' }, { name: 'email', label: 'Email' }, { name: 'phone', label: 'Téléphone' }, { name: 'clientId', label: 'ID client' }]} schema={schema} />;
}
