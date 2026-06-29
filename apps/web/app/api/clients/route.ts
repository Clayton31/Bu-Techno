import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { clientSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const items = await prisma.client.findMany({ orderBy: { createdAt: 'desc' }, include: { contacts: true, sites: true, projects: true } });
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, clientSchema);
    const item = await prisma.client.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
