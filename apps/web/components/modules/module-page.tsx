'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Field = { name: string; label: string; placeholder?: string; type?: string };

type ModulePageProps = {
  title: string;
  description: string;
  endpoint: string;
  fields: Field[];
  schema: z.ZodSchema<Record<string, unknown>>;
};

export function ModulePage({ title, description, endpoint, fields, schema }: ModulePageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState('');
  const form = useForm<Record<string, unknown>>({ resolver: zodResolver(schema) });

  async function loadItems() {
    const response = await fetch(endpoint);
    if (response.ok) {
      const payload = await response.json();
      setItems(Array.isArray(payload) ? payload : payload ? [payload] : []);
    }
  }

  useEffect(() => { void loadItems(); }, [endpoint]);

  async function onSubmit(values: Record<string, unknown>) {
    setError('');
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    if (!response.ok) { setError('Impossible d’enregistrer les données. Vérifiez les champs et vos droits.'); return; }
    form.reset();
    await loadItems();
  }

  return <div className="grid gap-6 xl:grid-cols-[420px_1fr]"><Card><CardHeader><CardTitle>{title}</CardTitle><p className="text-sm text-slate-500">{description}</p></CardHeader><CardContent><form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>{fields.map((field) => <div className="grid gap-2" key={field.name}><Label htmlFor={field.name}>{field.label}</Label><Input id={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} {...form.register(field.name)} />{form.formState.errors[field.name] && <p className="text-sm text-red-600">Champ invalide</p>}</div>)}{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Button disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Enregistrement...' : 'Créer'}</Button></form></CardContent></Card><Card><CardHeader><CardTitle>Enregistrements</CardTitle></CardHeader><CardContent><div className="grid gap-3">{items.length === 0 && <p className="text-sm text-slate-500">Aucune donnée pour le moment.</p>}{items.map((item) => <div key={String(item.id)} className="rounded-2xl border border-slate-200 p-4"><p className="font-medium">{String(item.name ?? item.title ?? item.reference ?? item.email ?? item.id)}</p><pre className="mt-2 overflow-auto text-xs text-slate-500">{JSON.stringify(item, null, 2)}</pre></div>)}</div></CardContent></Card></div>;
}
