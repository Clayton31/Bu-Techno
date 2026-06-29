import { NextResponse } from 'next/server';
import { handleError, requireSession } from '@/lib/api';
import { createStudyServices } from '@/features/studies/infrastructure/study-container';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const { id } = await params;
    const { studyService } = createStudyServices();
    return NextResponse.json(await studyService.getById(id));
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const { id } = await params;
    const { studyService } = createStudyServices();
    return NextResponse.json(await studyService.update(id, await request.json()));
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const { id } = await params;
    const { studyService } = createStudyServices();
    await studyService.delete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}
