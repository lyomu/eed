import { NextResponse } from 'next/server';
import { validateInquiry } from '@/lib/validate-form';

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data || typeof data !== 'object') {
    return NextResponse.json({ ok: false, errors: [{ field: 'form', message: 'Invalid request body.' }] }, { status: 400 });
  }

  const errors = validateInquiry(data);
  if (errors.length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: send email (e.g. via Resend) once a provider/API key is configured.
  // For now the inquiry is accepted and validated but not delivered anywhere.
  console.log('[contact] received', {
    name: data.name,
    email: data.email,
    organization: data.organization,
    pillar: data.pillar,
  });

  return NextResponse.json({ ok: true });
}
