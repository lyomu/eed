# EED Research Institute — Next.js app

Pixel-parity port of the static site in `../` (the original `.html`/`css`/`js`/`assets`
files, left untouched as reference). App Router + TypeScript, single global
stylesheet ported from `css/styles.css`, and a mock content layer standing in
for Prismic until a real repo is connected.

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
  `research_publication`), documented but not pushed to any repo.

## Connecting a real Prismic repo

The site currently runs entirely on `lib/mock-content.ts` — 8 blog posts and
6 research publications shaped exactly like the eventual Prismic response
(see `lib/blog-types.ts`). Nothing calls Prismic yet.

To go live:

1. Create a Prismic repository and install the client:
   ```bash
   npm install @prismicio/client @prismicio/next
   ```
2. Add the repo name to `.env.local`:
   ```
   NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
   ```
3. Push the two custom types in `customtypes/` (via Slice Machine or the
   Prismic custom-type builder) — `blog_post` and `research_publication`.
   Populate at least the 8 posts / 6 publications currently in
   `mock-content.ts` so the site doesn't regress content-wise.
4. Rewrite the four functions in `lib/cms.ts` (`getBlogPosts`,
   `getBlogPost`, `getPublications`, `getPublication`) to query the Prismic
   client instead of `mock-content.ts`. Keep the return types
   (`lib/blog-types.ts`) unchanged — every page, `FilterBar`, and
   `PostBody` depends only on those shapes, not on where the data comes
   from.
5. Delete `lib/mock-content.ts` once the swap is verified.

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
