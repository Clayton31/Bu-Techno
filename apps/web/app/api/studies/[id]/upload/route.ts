import { NextResponse } from 'next/server';
import { handleError, requireSession } from '@/lib/api';
import { createStudyServices } from '@/features/studies/infrastructure/study-container';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const { id } = await params;
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ message: 'Missing file' }, { status: 400 });
    const { uploadService } = createStudyServices();
    return NextResponse.json(await uploadService.upload(id, file), { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
