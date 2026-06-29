'use client';

import { z } from 'zod';
import { ModulePage } from '@/components/modules/module-page';

const schema = z.object({ name: z.string().min(2), legalName: z.string().optional(), siret: z.string().optional(), email: z.string().email().optional().or(z.literal('')), phone: z.string().optional(), website: z.string().url().optional().or(z.literal('')), address: z.string().optional(), city: z.string().optional(), postalCode: z.string().optional(), country: z.string().default('France') });

export default function SettingsPage() {
  return <ModulePage title="Paramètres société" description="Identité, coordonnées et informations légales de la société." endpoint="/api/company-settings" fields={[{ name: 'name', label: 'Nom société' }, { name: 'legalName', label: 'Raison sociale' }, { name: 'siret', label: 'SIRET' }, { name: 'email', label: 'Email' }, { name: 'phone', label: 'Téléphone' }, { name: 'website', label: 'Site web' }, { name: 'address', label: 'Adresse' }, { name: 'city', label: 'Ville' }, { name: 'postalCode', label: 'Code postal' }, { name: 'country', label: 'Pays' }]} schema={schema} />;
}
