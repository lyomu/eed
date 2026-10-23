import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { repositoryName } from '@/lib/prismicio';

export async function POST(request: NextRequest) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (!repositoryName || !secret) {
    return NextResponse.json({ error: 'Prismic webhook is not configured.' }, { status: 503 });
  }

  let body: { secret?: string; domain?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  if (body.secret !== secret || body.domain !== repositoryName) {
    return NextResponse.json({ error: 'Invalid webhook.' }, { status: 401 });
  }

  revalidateTag('prismic', { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
