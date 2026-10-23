import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

export function createClient(config: prismic.ClientConfig = {}) {
  if (!repositoryName) {
    throw new Error(
      'NEXT_PUBLIC_PRISMIC_ENVIRONMENT is not set — lib/cms.ts should not call createClient() without it.',
    );
  }

  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN || undefined,
    routes: [
      { type: 'blog_post', path: '/news/:uid' },
      { type: 'research_publication', path: '/portfolio/:uid' },
    ],
    fetchOptions: {
      next: { tags: ['prismic'], revalidate: 60 },
    },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
