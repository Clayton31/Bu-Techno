import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { userSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const items = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, active: true, createdAt: true } });
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, userSchema);
    const item = await prisma.user.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
