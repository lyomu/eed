import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import prismicConfig from '@/prismic.config.json';

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

export function linkResolver(document: { type: string; uid?: string | null }) {
  if (document.type === 'site_page') {
    if (document.uid === 'home') return '/';
    if (['wash', 'energy', 'climate', 'agriculture'].includes(document.uid || '')) {
      return `/what-we-do/${document.uid}`;
    }
    return `/${document.uid || ''}`;
  }
  if (document.type === 'blog_post') return `/news/${document.uid}`;
  if (document.type === 'research_publication') return `/portfolio/${document.uid}`;
  return '/';
}

export function createClient(config: prismic.ClientConfig = {}) {
  if (!repositoryName) {
    throw new Error(
      'NEXT_PUBLIC_PRISMIC_ENVIRONMENT is not set — lib/cms.ts should not call createClient() without it.',
    );
  }

  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN || undefined,
    routes: prismicConfig.routes,
    fetchOptions: {
      next: { tags: ['prismic'], revalidate: 60 },
    },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
