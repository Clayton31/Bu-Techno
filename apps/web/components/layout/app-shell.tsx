import Link from 'next/link';
import { Bell, Building2, CalendarDays, ClipboardCheck, FileBarChart, FileText, History, LayoutDashboard, MapPinned, PackageCheck, SearchCheck, Settings, ShieldCheck, Users, UserRoundCog } from 'lucide-react';
import { auth } from '@/auth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Utilisateurs', icon: Users },
  { href: '/roles', label: 'Rôles', icon: UserRoundCog },
  { href: '/settings', label: 'Société', icon: Settings },
  { href: '/clients', label: 'Clients', icon: Building2 },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/sites', label: 'Sites', icon: MapPinned },
  { href: '/projects', label: 'Projets', icon: ClipboardCheck },
  { href: '/project-members', label: 'Membres projet', icon: UserRoundCog },
  { href: '/project-history', label: 'Historique', icon: History },
  { href: '/notifications', label: 'Notifications', icon: Bell },
];

const plannedItems = [
  { href: '/audit', label: 'Audit', icon: SearchCheck },
  { href: '/study', label: 'Étude', icon: FileText },
  { href: '/planning', label: 'Planning', icon: CalendarDays },
  { href: '/delivery-notes', label: 'Bon de livraison', icon: PackageCheck },
  { href: '/reports', label: 'Rapports', icon: FileBarChart },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return <div className="min-h-screen bg-slate-50"><aside className="fixed inset-y-0 left-0 hidden w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block"><Link href="/dashboard" className="flex items-center gap-3 text-lg font-bold"><ShieldCheck className="h-7 w-7" />BU Techno</Link><nav className="mt-10 grid gap-1 text-sm">{navItems.map((item) => <Link key={item.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100" href={item.href}><item.icon className="h-4 w-4" />{item.label}</Link>)}<p className="px-4 pt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">Modules planifiés</p>{plannedItems.map((item) => <Link key={item.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-500 hover:bg-slate-100" href={item.href}><item.icon className="h-4 w-4" />{item.label}</Link>)}</nav></aside><main className="lg:pl-80"><header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-6 py-4 backdrop-blur"><div className="flex items-center justify-between"><p className="font-semibold">Espace intégrateur</p><p className="text-sm text-slate-500">{session?.user?.email ?? 'Utilisateur'}</p></div></header><div className="p-6 lg:p-10">{children}</div></main></div>;
}
