import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudyEditor } from '@/features/studies/components/study-editor';
import { createStudyServices } from '@/features/studies/infrastructure/study-container';
import type { StudyDetails } from '@/features/studies/types/study.types';

export default async function StudyPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  if (!id) {
    const { studyService } = createStudyServices();
    const studies = await studyService.list();
    return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Études</h1><p className="mt-2 text-slate-600">Sélectionnez une étude existante depuis un projet pour ouvrir l’éditeur.</p></div><div className="grid gap-3">{studies.map((study) => <Card key={study.id}><CardHeader><CardTitle>{study.name}</CardTitle></CardHeader><CardContent><Button asChild><Link href={`/study?id=${study.id}`}>Ouvrir l’étude</Link></Button></CardContent></Card>)}</div></div>;
  }

  const { studyService } = createStudyServices();
  const study = await studyService.getById(id);
  return <StudyEditor study={study as StudyDetails} />;
}
