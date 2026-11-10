/**
 * Import the research portfolio entries into Prismic as Research Publication
 * documents.
 *
 * Preview the mapping: node scripts/migrate-publications.mjs
 * Stage in Prismic: PRISMIC_WRITE_TOKEN=... node scripts/migrate-publications.mjs --apply
 * Review the Migration Release in Prismic before publishing it.
 *
 * Push the research_publication model (npx prismic push) before applying.
 */
import { createMigration, createWriteClient } from '@prismicio/client';
import { PUBLICATIONS } from '../lib/mock-content.ts';

const repositoryName = 'eri-website-repo';

function toDocument(pub) {
  if (!pub.url) throw new Error(`Missing source link for ${pub.slug}`);
  return {
    type: 'research_publication',
    uid: pub.slug,
    lang: 'en-us',
    data: {
      title: [{ type: 'heading1', text: pub.title, spans: [] }],
      description: [{ type: 'paragraph', text: pub.description, spans: [] }],
      category: pub.category,
      publication_type: pub.type,
      publisher: pub.publisher,
      document: { link_type: 'Web', url: pub.url, target: '_blank' },
    },
  };
}

const documents = PUBLICATIONS.map(toDocument);
for (const doc of documents) {
  console.log(`${doc.uid}\t${doc.data.category}\t${doc.data.publication_type}\t${doc.data.publisher}`);
}
console.log(`Prepared ${documents.length} research publications for ${repositoryName}.`);

if (process.argv.includes('--apply')) {
  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required for --apply.');

  const client = createWriteClient(repositoryName, { writeToken });
  const published = await client.getAllByType('research_publication');
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
