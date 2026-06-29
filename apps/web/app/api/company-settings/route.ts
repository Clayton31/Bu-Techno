import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError, parseJson, requireSession } from '@/lib/api';
import { companySettingsSchema } from '@/lib/validations';

export async function GET() {
  try {
    await requireSession();
    const settings = await prisma.companySettings.findFirst({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json(settings);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireSession();
    const data = await parseJson(request, companySettingsSchema);
    const current = await prisma.companySettings.findFirst({ orderBy: { createdAt: 'asc' } });
    const settings = current
      ? await prisma.companySettings.update({ where: { id: current.id }, data })
      : await prisma.companySettings.create({ data });
    return NextResponse.json(settings);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  return PUT(request);
}
