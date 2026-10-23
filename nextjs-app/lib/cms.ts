import * as prismic from '@prismicio/client';
import { createClient, repositoryName } from './prismicio';
import { BLOG_POSTS, PUBLICATIONS } from './mock-content';
import type {
  BlogPost,
  BlogPostSummary,
  Publication,
  PublicationSummary,
  PillarCategory,
  PostBlock,
} from './blog-types';

/**
 * Content fetch layer. News uses Prismic when a repository is configured.
 * Publications retain their local content until that collection is populated
 * in Prismic. Every caller depends only on these signatures and blog-types.
 */

const usePrismic = Boolean(repositoryName);

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  if (!usePrismic) return BLOG_POSTS.map(stripBody);

  const client = createClient();
  const docs = await client.getAllByType('blog_post', {
    orderings: [{ field: 'my.blog_post.date', direction: 'desc' }],
  });
  return docs.map(toSummary);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!usePrismic) return BLOG_POSTS.find((post) => post.slug === slug) ?? null;

  const client = createClient();
  try {
    const doc = await client.getByUID('blog_post', slug);
    return toBlogPost(doc);
  } catch (error) {
    if (error instanceof prismic.NotFoundError) return null;
    throw error;
  }
}

export async function getPublications(): Promise<PublicationSummary[]> {
  if (!usePrismic) return PUBLICATIONS.map(({ body: _body, ...summary }) => summary);

  const client = createClient();
  const docs = await client.getAllByType('research_publication', {
    orderings: [{ field: 'my.research_publication.publication_date', direction: 'desc' }],
  });
  if (docs.length === 0) return PUBLICATIONS.map(({ body: _body, ...summary }) => summary);
  return docs.map(toPublicationSummary);
}

export async function getPublication(slug: string): Promise<Publication | null> {
  if (!usePrismic) return PUBLICATIONS.find((pub) => pub.slug === slug) ?? null;

  const client = createClient();
  const published = await client.getByType('research_publication', { pageSize: 1 });
  if (published.results.length === 0) {
    return PUBLICATIONS.find((publication) => publication.slug === slug) ?? null;
  }
  try {
    const doc = await client.getByUID('research_publication', slug);
    return toPublication(doc);
  } catch (error) {
    if (error instanceof prismic.NotFoundError) return null;
    throw error;
  }
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

function asText(field: prismic.RichTextField): string {
  return prismic.asText(field) ?? '';
}

function formatDate(isoDate: string | null): string {
  if (!isoDate) return '';
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSummary(doc: any): BlogPostSummary {
  const data = doc.data;
  return {
    slug: doc.uid,
    title: asText(data.title),
    category: data.category ?? '',
    categoryFilter: (data.category_filter ?? 'energy') as PillarCategory,
    date: formatDate(data.date),
    readTime: data.read_time ?? '',
    excerpt: asText(data.excerpt),
    featured: Boolean(data.featured),
    imageUrl: data.hero_image?.url || undefined,
    imageAlt: data.hero_image?.alt || asText(data.title),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toBlogPost(doc: any): BlogPost {
  const data = doc.data;
  return {
    ...toSummary(doc),
    author: data.author_name ?? '',
    authorRole: data.author_role ?? '',
    leadImageLabel: data.lead_image_label || data.hero_image?.alt || asText(data.title),
    body: toBody(data.body ?? []),
    keyTakeaways: (data.key_takeaways ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => item.text)
      .filter(Boolean),
    sidebarStats: (data.sidebar_stats ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({ title: item.title ?? '', value: item.value ?? '', body: item.body ?? '' })),
    references: (data.references ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any, index: number) => ({
        id: index + 1,
        text: item.text ?? '',
        url: item.url?.url,
      })),
  };
}

// Existing repositories may use either a Rich Text body or the legacy Slice Zone.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toBody(nodes: any[]): PostBlock[] {
  if (nodes.length > 0 && 'slice_type' in nodes[0]) {
    return nodes.map(toPostBlock).filter((block): block is PostBlock => block !== null);
  }

  return nodes.flatMap((node, index): PostBlock[] => {
    const text = node.text ?? '';
    if (node.type === 'heading2' || node.type === 'heading3') {
      return [{ type: 'heading', text }];
    }
    if (node.type === 'paragraph' && text) {
      return [{ type: index === 0 ? 'lead' : 'paragraph', text }];
    }
    if (node.type === 'image') {
      return [{
        type: 'figure',
        caption: node.alt ?? '',
        markLabel: node.alt ?? '',
        imageUrl: node.url,
        imageAlt: node.alt ?? '',
      }];
    }
    return [];
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPostBlock(slice: any): PostBlock | null {
  switch (slice.slice_type) {
    case 'lead':
      return {
        type: 'lead',
        opener: slice.primary.opener || undefined,
        text: asText(slice.primary.text),
      };
    case 'signoff':
      return { type: 'signoff', text: asText(slice.primary.text) };
    case 'blockquote':
      return { type: 'blockquote', text: slice.primary.text ?? '' };
    case 'figure':
      return {
        type: 'figure',
        caption: slice.primary.caption ?? '',
        markLabel: slice.primary.image?.alt || slice.primary.caption || '',
        imageUrl: slice.primary.image?.url || undefined,
        imageAlt: slice.primary.image?.alt || slice.primary.caption || '',
      };
    case 'callout':
      return {
        type: 'callout',
        title: slice.primary.title ?? '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        paragraphs: (slice.items ?? []).map((item: any) => ({
          term: item.term || undefined,
          text: item.text ?? '',
        })),
      };
    case 'text_block':
      return slice.primary.style === 'heading'
        ? { type: 'heading', text: asText(slice.primary.content) }
        : { type: 'paragraph', text: asText(slice.primary.content) };
    default:
      return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPublicationSummary(doc: any): PublicationSummary {
  const data = doc.data;
  return {
    slug: doc.uid,
    title: asText(data.title),
    description: asText(data.description),
    funder: data.funder ?? '',
    category: (data.category ?? 'energy') as PillarCategory,
    tag: data.tag ?? '',
    documentUrl: prismic.asLink(data.document) || undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPublication(doc: any): Publication {
  const data = doc.data;
  const paragraphs = (data.body ?? []).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node: any) => node.type === 'paragraph' && node.text,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ).map((node: any) => node.text);
  return {
    ...toPublicationSummary(doc),
    body: paragraphs,
  };
}
