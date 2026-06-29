import { NextResponse } from 'next/server';
import { handleError, requireSession } from '@/lib/api';
import { createStudyServices } from '@/features/studies/infrastructure/study-container';

export async function GET(request: Request) {
  try {
    await requireSession();
    const projectId = new URL(request.url).searchParams.get('projectId') ?? undefined;
    const { studyService } = createStudyServices();
    return NextResponse.json(await studyService.list(projectId));
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const { studyService } = createStudyServices();
    return NextResponse.json(await studyService.create(await request.json()), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
