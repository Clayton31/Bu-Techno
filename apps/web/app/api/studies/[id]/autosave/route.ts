import { NextResponse } from 'next/server';
import { handleError, requireSession } from '@/lib/api';
import { createStudyServices } from '@/features/studies/infrastructure/study-container';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const { id } = await params;
    const { autosaveService } = createStudyServices();
    return NextResponse.json(await autosaveService.save(id, await request.json()), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
