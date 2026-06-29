import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { projectHistorySchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const items = await prisma.projectHistory.findMany({ orderBy: { createdAt: 'desc' }, include: { project: true, user: true } });
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, projectHistorySchema);
    const item = await prisma.projectHistory.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
