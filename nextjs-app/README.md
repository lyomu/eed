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

### Editing the rest of the website

The `site_page` page type controls the home, about, what-we-do, team, contact,
news, portfolio, and four pillar landing pages. Editors can reorder and edit
their sections in Prismic. The model includes heroes, text and image, columns,
card grids, lists, statistics, image statements, calls to action, team profiles,
forms, live news and publication lists, and the specialized about/pillar layouts.
The `site_settings` singleton controls logos, navigation, and footer content.
Page SEO title and description are editable on each `site_page` document.
Blog posts and publications keep their existing Prismic types.

| Route | `site_page` UID |
| --- | --- |
| `/` | `home` |
| `/about` | `about` |
| `/what-we-do` | `what-we-do` |
| `/what-we-do/wash` | `wash` |
| `/what-we-do/energy` | `energy` |
| `/what-we-do/climate` | `climate` |
| `/what-we-do/agriculture` | `agriculture` |
| `/team` | `team` |
| `/contact` | `contact` |
| `/news` | `news` |
| `/portfolio` | `portfolio` |

The current JSX stays visible for any route without a published page with
sections. A published page replaces the entire route, so build and preview
all its sections before publishing. On news and portfolio pages, include the
corresponding list section to retain the live index. On the team page, include
the Team section and enter each person's profile. Publishing `site_settings`
updates shared site chrome; empty settings fields use code defaults.

The models are in `customtypes/` and `slices/`. To enable them in
`eri-website-repo`, sign in with `npx prismic login`, then run `npx prismic push`
after committing model changes. The Prismic CLI requires model history in Git
before pushing. Create and publish the `site_settings` document and each
`site_page` document in Prismic. The site reads published content within about
one minute; preview uses `/api/preview`. Run
`node scripts/generate-site-models.mjs` to regenerate the model JSON after
changing field definitions in that script.

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
