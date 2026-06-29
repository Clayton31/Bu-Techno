import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { notificationSchema } from '@/lib/validations';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireSession();
    const { id } = await params;
    const item = await prisma.notification.findUnique({ where: { id } });
    return item ? NextResponse.json(item) : NextResponse.json({ message: 'Not found' }, { status: 404 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireSession();
    const { id } = await params;
    const data = await parseJson(request, notificationSchema);
    const item = await prisma.notification.update({ where: { id }, data });
    return NextResponse.json(item);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireSession();
    const { id } = await params;
    await prisma.notification.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}
