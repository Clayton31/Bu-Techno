'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ name: z.string().min(2), address: z.string().min(3), city: z.string().min(2), postalCode: z.string().min(2), country: z.string().default('France'), latitude: z.coerce.number().optional(), longitude: z.coerce.number().optional(), clientId: z.string().min(1) });

export default function Page() {
  return <ModulePage title='Sites' description='Sites clients et géolocalisation Google Maps.' endpoint='/api/sites' fields={[{ name: 'name', label: 'Nom' }, { name: 'address', label: 'Adresse' }, { name: 'city', label: 'Ville' }, { name: 'postalCode', label: 'Code postal' }, { name: 'country', label: 'Pays' }, { name: 'latitude', label: 'Latitude', type: 'number' }, { name: 'longitude', label: 'Longitude', type: 'number' }, { name: 'clientId', label: 'ID client' }]} schema={schema} />;
}
