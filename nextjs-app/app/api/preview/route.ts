import { redirectToPreviewURL } from '@prismicio/next';
import { NextRequest } from 'next/server';
import { createClient, repositoryName } from '@/lib/prismicio';

export async function GET(request: NextRequest) {
  if (!repositoryName) return new Response('Prismic is not configured.', { status: 503 });
  return redirectToPreviewURL({ client: createClient(), request, defaultURL: '/' });
}
