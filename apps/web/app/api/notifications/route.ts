import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { notificationSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const items = await prisma.notification.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } });
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, notificationSchema);
    const item = await prisma.notification.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
