import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { projectSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const items = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, include: { client: true, site: true, owner: true, members: true } });
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, projectSchema);
    const item = await prisma.project.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
