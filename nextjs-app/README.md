# EED Research Institute — Next.js app

Pixel-parity port of the static site in `../` (the original `.html`/`css`/`js`/`assets`
files, left untouched as reference). App Router + TypeScript, single global
stylesheet ported from `css/styles.css`, and a Prismic content adapter with
mock content when no repository is configured.

## Development

```bash
npm install
npm run dev
```

## Project structure

- `app/` — routes. Each page mirrors an original `.html` file; the four
  pillar pages live under `app/what-we-do/*` (nested, not flat like the old
  `wash.html`).
- `components/` — `layout/` (Header, Footer), `MotionEffects.tsx` (ports
  `initReveal`/`initHero`/`initScrollFx` from the original `main.js`),
  `team/` (the team modal), `pillars/` (shared pillar page template),
  `forms/`, `blog/`.
- `lib/` — nav config, team roster, pillar copy, count-up logic, form
  validation, and the CMS layer (`cms.ts` + `mock-content.ts`).
- `customtypes/` — Prismic custom type JSON schemas (`blog_post`,
  `research_publication`). The `blog_post` type is configured in Prismic.

## Prismic content

The app is connected to `eri-website-repo` through the ignored `.env.local`.
All eight existing news articles were migrated and published in the Prismic
`blog_post` type. News indexes and detail pages read from the public Content
API. The six portfolio publications still use `lib/mock-content.ts` because
the Prismic `research_publication` collection has no published documents.
Keep that file until the publications have also been migrated and verified.
Content refreshes within about one minute after publication; a configured
webhook can invalidate the cache immediately.

For another environment, set `NEXT_PUBLIC_PRISMIC_ENVIRONMENT=eri-website-repo`
(see `.env.local.example`). A Content API token is needed only if repository
visibility changes to private. The blog category filter uses `energy`,
`wash`, `climate`, or `agriculture`.

1. The `EED local development` preview is registered in Prismic with domain
   `http://localhost:3000` and route `/api/preview`. Add the production site
   domain after deployment. The app maps blog posts to `/news/:uid` and
   publications to `/portfolio/:uid`.
2. Set `PRISMIC_WEBHOOK_SECRET` in the app and the same secret on a Prismic
   webhook. Point it to `https://<your-site>/api/revalidate` for publication
   and unpublication events. This refreshes cached Prismic content.
3. Run `npm run build` with the repository configured and inspect `/news`
   and its detail pages. `scripts/migrate-news.mjs` is the repeatable migration
   source; `--apply` requires a temporary `PRISMIC_WRITE_TOKEN` and stages
   documents for publication in Prismic.

## Known gaps carried over from the original site

- Six hero images were already missing on disk in the original
  (`hero-agriculture.jpg`, `hero-climate.jpg`, `hero-energy.jpg`,
  `hero-wash.jpg`, `hero-contact.jpg`, `hero-news.jpg`). The port preserves
  the same graceful fallback (gradient-only header) rather than inventing
  placeholder photography — drop the real files into
  `public/assets/hero/` to close this gap.
- Email delivery for the contact and inquiry forms is stubbed
  (`app/api/contact/route.ts`, `app/api/inquiry/route.ts` — see the
  `// TODO: send email` markers). No email provider is configured yet.
