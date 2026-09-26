import { BLOG_POSTS, PUBLICATIONS } from './mock-content';
import type { BlogPost, BlogPostSummary, Publication, PublicationSummary } from './blog-types';

/**
 * Content fetch layer. Currently backed by lib/mock-content.ts. To connect a
 * real Prismic repo, rewrite the bodies of these functions to call
 * @prismicio/client against the schemas documented in customtypes/ — every
 * caller (pages, FilterBar, etc.) depends only on these signatures and the
 * types in lib/blog-types.ts, not on how the data is fetched.
 */

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  return BLOG_POSTS.map(stripBody);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export async function getPublications(): Promise<PublicationSummary[]> {
  return PUBLICATIONS.map(({ body: _body, ...summary }) => summary);
}

export async function getPublication(slug: string): Promise<Publication | null> {
  return PUBLICATIONS.find((pub) => pub.slug === slug) ?? null;
}

function stripBody(post: BlogPost): BlogPostSummary {
  const {
    body: _body,
    author: _author,
    authorRole: _authorRole,
    leadImageLabel: _leadImageLabel,
    keyTakeaways: _keyTakeaways,
    sidebarStats: _sidebarStats,
    references: _references,
    ...summary
  } = post;
  return summary;
}
