'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), role: z.enum(['ADMIN','MANAGER','INTEGRATOR','VIEWER']) });

export default function Page() {
  return <ModulePage title='Utilisateurs' description='Gestion complète des utilisateurs et affectation de rôle.' endpoint='/api/users' fields={[{ name: 'name', label: 'Nom' }, { name: 'email', label: 'Email' }, { name: 'role', label: 'Rôle ADMIN/MANAGER/INTEGRATOR/VIEWER' }]} schema={schema} />;
}
