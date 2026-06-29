import { NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { auth } from '@/auth';

export async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Response('Unauthorized', { status: 401 });
  return session;
}

export async function parseJson<T>(request: Request, schema: ZodSchema<T>) {
  try {
    return schema.parse(await request.json());
  } catch (error) {
    if (error instanceof ZodError) {
      throw NextResponse.json({ message: 'Validation error', issues: error.flatten() }, { status: 400 });
    }
    throw error;
  }
}

export function handleError(error: unknown) {
  if (error instanceof Response) return error;
  if (error instanceof NextResponse) return error;
  if (error instanceof ZodError) return NextResponse.json({ message: 'Validation error', issues: error.flatten() }, { status: 400 });
  if (error instanceof Error && error.message.endsWith('not found')) return NextResponse.json({ message: error.message }, { status: 404 });
  console.error(error);
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}
