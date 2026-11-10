/**
 * Import the eight articles currently listed on the site's news page.
 *
 * Preview the mapping: node scripts/migrate-news.mjs
 * Stage in Prismic: PRISMIC_WRITE_TOKEN=... node scripts/migrate-news.mjs --apply
 * Review the Migration Release in Prismic before publishing it.
 */
import { createMigration, createWriteClient } from '@prismicio/client';
import { BLOG_POSTS } from '../lib/mock-content.ts';

const repositoryName = 'eri-website-repo';
const paragraph = (text) => ({ type: 'paragraph', text, spans: [] });

function toRichText(body) {
  return body.flatMap((block) => {
    switch (block.type) {
      case 'lead':
        return [paragraph([block.opener, block.text].filter(Boolean).join(' '))];
      case 'paragraph':
      case 'signoff':
        return [paragraph(block.text)];
      case 'heading':
        return [{ type: 'heading2', text: block.text, spans: [] }];
      case 'blockquote':
        return [paragraph(block.text)];
      case 'figure':
        return [paragraph(block.caption || block.markLabel)];
      case 'callout':
        return [
          { type: 'heading2', text: block.title, spans: [] },
          ...block.paragraphs.map((item) =>
            paragraph([item.term, item.text].filter(Boolean).join(' ')),
          ),
        ];
      default:
        throw new Error(`Unsupported article block: ${block.type}`);
    }
  });
}

function toDocument(post) {
  const date = new Date(`${post.date} UTC`);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date for ${post.slug}`);

  return {
    type: 'blog_post',
    uid: post.slug,
    lang: 'en-us',
    data: {
      title: [{ type: 'heading1', text: post.title, spans: [] }],
      excerpt: [paragraph(post.excerpt)],
      category: post.category,
      category_filter: post.categoryFilter,
      date: date.toISOString().slice(0, 10),
      read_time: post.readTime,
      author_name: post.author,
      author_role: post.authorRole,
      lead_image_label: post.leadImageLabel,
      featured: Boolean(post.featured),
      body: toRichText(post.body),
      key_takeaways: post.keyTakeaways.map((text) => ({ text })),
      sidebar_stats: post.sidebarStats.map(({ title, value, body }) => ({ title, value, body })),
      references: post.references.map(({ text, url }) => ({
        text,
        ...(url ? { url: { link_type: 'Web', url } } : {}),
      })),
    },
  };
}

const documents = BLOG_POSTS.map(toDocument);
for (const doc of documents) {
  console.log(`${doc.uid}\t${doc.data.date}\t${doc.data.body.length} body blocks`);
}
console.log(`Prepared ${documents.length} news articles for ${repositoryName}.`);

if (process.argv.includes('--apply')) {
  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required for --apply.');

  const client = createWriteClient(repositoryName, { writeToken });
  const published = await client.getAllByType('blog_post');
  const existingUIDs = new Set(published.map((doc) => doc.uid));
  const duplicates = documents.filter((doc) => existingUIDs.has(doc.uid));
  if (duplicates.length) {
    throw new Error(`Already published: ${duplicates.map((doc) => doc.uid).join(', ')}`);
  }

  const migration = createMigration();
  for (const doc of documents) migration.createDocument(doc, doc.data.title[0].text);
  await client.migrate(migration, {
    reporter: (event) => {
      if (event.type === 'end') console.log(`Migration staged: ${event.data.migrated.documents} documents.`);
    },
  });
}
