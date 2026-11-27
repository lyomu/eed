/**
 * Moves the approved copy in lib/copy-overrides.ts into the Prismic
 * documents, so the text lives in Prismic instead of in code.
 *
 * Preview: node scripts/push-copy-to-prismic.mjs
 * Stage:   node scripts/push-copy-to-prismic.mjs --apply
 *
 * --apply reads PRISMIC_WRITE_TOKEN (from the environment or .env.local),
 * pushes the Stats slice model (it gains a "Source line" field for the pillar
 * figures), then stages the updated pages in a Migration release. Review and
 * publish that release in Prismic; after that, delete the matching entries
 * from lib/copy-overrides.ts.
 */
import { existsSync, readFileSync } from 'node:fs';
import { createClient, createMigration, createWriteClient } from '@prismicio/client';
import { applyCopyOverrides } from '../lib/copy-overrides.ts';

if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const repositoryName = 'eri-website-repo';
const apply = process.argv.includes('--apply');

// Prismic slices only need these keys; the renderer-only id on the
// "Our approach" section added by the overrides is dropped here.
const clean = (s) => ({ slice_type: s.slice_type, variation: s.variation || 'default', primary: s.primary || {}, items: s.items || [] });

const reader = createClient(repositoryName, { accessToken: process.env.PRISMIC_ACCESS_TOKEN || undefined });
const pages = await reader.getAllByType('site_page');
const migration = createMigration();
const changed = [];

for (const doc of pages) {
  const before = (doc.data.slices || []).map(clean);
  const after = applyCopyOverrides(doc.uid, doc.data.slices || []).map(clean);
  if (JSON.stringify(before) === JSON.stringify(after)) continue;
  const touched = after
    .map((s, i) => (JSON.stringify(s) !== JSON.stringify(before[i]) ? s.slice_type : null))
    .filter(Boolean);
  changed.push(`${doc.uid}: ${touched.join(', ')}`);
  migration.updateDocument({ ...doc, data: { ...doc.data, slices: after } }, doc.data.meta_title || doc.uid);
}

console.log(changed.length ? `Pages with new copy:\n  ${changed.join('\n  ')}` : 'Prismic already has all the approved copy.');

if (apply && changed.length) {
  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required for --apply (add it to .env.local).');

  const model = JSON.parse(readFileSync('slices/Stats/model.json', 'utf8'));
  const res = await fetch('https://customtypes.prismic.io/slices/update', {
    method: 'POST',
    headers: { repository: repositoryName, Authorization: `Bearer ${writeToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(model),
  });
  if (!res.ok) throw new Error(`Pushing the Stats slice model failed: ${res.status} ${await res.text()}`);
  console.log('Stats slice model updated (Source line field).');

  const writer = createWriteClient(repositoryName, { writeToken });
  await writer.migrate(migration, {
    reporter: (event) => {
      if (event.type === 'end') console.log(`Staged ${event.data.migrated.documents} documents in a Migration release. Review and publish it in Prismic.`);
    },
  });
}
