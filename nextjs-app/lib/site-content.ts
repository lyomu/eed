import * as prismic from '@prismicio/client';
import { createClient, repositoryName } from './prismicio';
import type { Metadata } from 'next';

function isUnregisteredType(error: unknown, type: string): boolean {
  const response = (error as { response?: { type?: string; message?: string } })?.response;
  return response?.type === 'api_parsing_error' &&
    Boolean(response.message?.includes(`my.${type}.`));
}

// The legacy JSX remains the published fallback until each page is created in
// Prismic. A page takes over only after it has at least one published slice.
export async function getSitePage(uid: string) {
  if (!repositoryName) return null;
  try {
    const page = await createClient().getByUID('site_page', uid);
    return Array.isArray(page.data.slices) && page.data.slices.length ? page : null;
  } catch (error) {
    if (error instanceof prismic.NotFoundError || isUnregisteredType(error, 'site_page')) return null;
    throw error;
  }
}

export async function getSiteSettings() {
  if (!repositoryName) return null;
  try {
    return await createClient().getSingle('site_settings');
  } catch (error) {
    if (error instanceof prismic.NotFoundError || isUnregisteredType(error, 'site_settings')) return null;
    throw error;
  }
}

export async function getPageMetadata(uid: string, fallback: Metadata): Promise<Metadata> {
  const page = await getSitePage(uid);
  if (!page) return fallback;
  return {
    ...fallback,
    title: page.data.meta_title || fallback.title,
    description: page.data.meta_description || fallback.description,
  };
}
