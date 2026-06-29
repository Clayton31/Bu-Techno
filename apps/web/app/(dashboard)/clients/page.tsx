'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ name: z.string().min(2), email: z.string().email().optional().or(z.literal('')), phone: z.string().optional(), notes: z.string().optional() });

export default function Page() {
  return <ModulePage title='Clients' description='Portefeuille des clients intégrateurs.' endpoint='/api/clients' fields={[{ name: 'name', label: 'Nom' }, { name: 'email', label: 'Email' }, { name: 'phone', label: 'Téléphone' }, { name: 'notes', label: 'Notes' }]} schema={schema} />;
}
