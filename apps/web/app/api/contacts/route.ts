import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { contactSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const items = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, include: { client: true } });
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, contactSchema);
    const item = await prisma.contact.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
