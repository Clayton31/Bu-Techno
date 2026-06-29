import { ShieldCheck } from 'lucide-react';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return <main className="grid min-h-screen bg-slate-950 lg:grid-cols-2"><section className="hidden bg-[radial-gradient(circle_at_top,#1d4ed8,transparent_35%),#020617] p-12 text-white lg:flex lg:flex-col lg:justify-between"><div className="flex items-center gap-3 text-lg font-bold"><ShieldCheck />BU Techno</div><div className="max-w-xl space-y-5"><p className="text-sm uppercase tracking-[0.3em] text-blue-200">Sécurité électronique</p><h1 className="text-5xl font-bold tracking-tight">Un cockpit SaaS pour vos opérations terrain.</h1><p className="text-lg text-slate-300">Structurez clients, sites, projets, coordonnées GPS et responsabilités d'équipe dès le Sprint 1.</p></div></section><section className="flex items-center justify-center bg-slate-50 p-6"><LoginForm /></section></main>;
}
