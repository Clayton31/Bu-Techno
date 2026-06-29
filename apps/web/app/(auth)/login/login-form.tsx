'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({ email: z.string().email('Email invalide'), password: z.string().min(8, '8 caractères minimum') });
type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const form = useForm<LoginValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  async function onSubmit(values: LoginValues) {
    setError('');
    const result = await signIn('credentials', { ...values, redirect: false });
    if (result?.error) { setError('Identifiants invalides ou compte non configuré.'); return; }
    router.push('/dashboard');
    router.refresh();
  }

  return <Card className="w-full max-w-md"><CardHeader><CardTitle>Connexion sécurisée</CardTitle><p className="text-sm text-slate-500">Accédez à votre espace intégrateur BU Techno.</p></CardHeader><CardContent><form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}><div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" {...form.register('email')} />{form.formState.errors.email && <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>}</div><div className="grid gap-2"><Label htmlFor="password">Mot de passe</Label><Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />{form.formState.errors.password && <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>}</div>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Button disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Connexion...' : 'Se connecter'}</Button></form></CardContent></Card>;
}
