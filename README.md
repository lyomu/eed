# EED Research Institute website

Source for [eedresearch.com](https://eedresearch.com), the website of the EED
Research Institute (ERI), an organisation working on WASH, energy, climate
change and agriculture.

The site is a Next.js app. Editors manage its content in the
[Prismic](https://prismic.io) repository `eri-website-repo`. If Prismic is
unreachable or a page has not been published there, the app falls back to
content bundled in the code.

## Contents

- [Repository layout](#repository-layout)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [App structure](#app-structure)
- [Content management (Prismic)](#content-management-prismic)
- [Images](#images)
- [Deployment](#deployment)
- [Maintenance mode](#maintenance-mode)
- [Google Sans variant](#google-sans-variant)
- [Known gaps](#known-gaps)
- [Working on the project](#working-on-the-project)

## Repository layout

| Path | What it is |
| --- | --- |
| [`nextjs-app/`](nextjs-app/) | The production website. Everything below refers to this folder unless stated. |
| [`nextjs-app-google-sans/`](nextjs-app-google-sans/) | A full copy of the site that uses the Google Sans font throughout. It is for comparing designs and is not deployed. See [Google Sans variant](#google-sans-variant). |
| [`deploy/maintenance/`](deploy/maintenance/) | Static "under maintenance" page and Apache config for taking the site offline. |

## Tech stack

- **Next.js 16** (App Router, Turbopack) with **React 19** and **TypeScript**
- **Prismic** headless CMS (`@prismicio/client`, `@prismicio/next`, `@prismicio/react`)
- One global stylesheet, [`app/globals.css`](nextjs-app/app/globals.css), built on design tokens (colours, type, spacing and motion) defined on `:root`
- Fonts: DM Sans for headings and labels, Outfit for body text, both loaded with `next/font/google`
- **Node.js 22 or later** is required, because the Prismic packages need it

> Note: this Next.js version has breaking changes from earlier releases. Before
> changing framework-level code, read the guides in
> `nextjs-app/node_modules/next/dist/docs/` (see [`nextjs-app/AGENTS.md`](nextjs-app/AGENTS.md)).

## Getting started

```bash
cd nextjs-app
cp .env.local.example .env.local   # then fill in the values below
npm ci
npm run dev                        # http://localhost:3000
```

Without `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`, the site runs entirely on the bundled
fallback content in [`lib/mock-content.ts`](nextjs-app/lib/mock-content.ts) and
the page components.

## Environment variables

Set these in `nextjs-app/.env.local` locally and in the host's environment in
production. `.env.local` is git-ignored, so never commit it.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | Yes, in production | The Prismic repository name, `eri-website-repo`. It must be present **at build time**: Next.js inlines `NEXT_PUBLIC_*` values into the bundle. If it is missing, the site quietly serves the fallback content instead of Prismic. |
| `PRISMIC_WEBHOOK_SECRET` | Recommended | Shared secret checked by `/api/revalidate`. Set the same value on the Prismic webhook so published changes appear immediately rather than within about a minute. |
| `PRISMIC_ACCESS_TOKEN` | No | Only needed if the Prismic Content API is switched from public to private. |
| `PRISMIC_WRITE_TOKEN` | No | Only for running the migration scripts with `--apply`. Create it temporarily in Prismic and revoke it afterwards. |

## Scripts

Run these from `nextjs-app/`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serves the production build. Set `PORT` to change the port. |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |
| `node scripts/generate-site-models.mjs` | Regenerates the Prismic slice and page models from the definitions in that script |
| `node scripts/migrate-news.mjs` | Dry run: prints the blog posts it would import into Prismic. Add `--apply` to stage them. |
| `node scripts/migrate-publications.mjs` | Dry run for the research portfolio entries. Add `--apply` to stage them. |
| `node scripts/migrate-site-content.mjs` | Dry run for the editable page content and site settings. Add `--apply` to stage them. |
| `node scripts/optimize-hero-images.mjs` | Writes responsive WebP copies of the banner photos. Run it after adding or replacing one. |

With `--apply`, the migration scripts need `PRISMIC_WRITE_TOKEN`. They stage
documents as a Prismic migration release, which must then be reviewed and
published in Prismic.

## App structure

```
nextjs-app/
├── app/                    Routes (App Router)
│   ├── page.tsx            Home
│   ├── about/  team/  contact/  news/  portfolio/
│   ├── what-we-do/         Overview plus wash/, energy/, climate/, agriculture/
│   ├── api/
│   │   ├── contact/  inquiry/      Form endpoints (email delivery not yet wired, see Known gaps)
│   │   ├── preview/  exit-preview/ Prismic preview
│   │   └── revalidate/             Prismic webhook: clears the cached content
│   ├── layout.tsx          Header, footer, fonts, site settings from Prismic
│   └── globals.css         All styles
├── components/
│   ├── SitePage.tsx        Renders a Prismic page section by section
│   ├── HeroSlideshow.tsx   Cross-fading homepage hero
│   ├── MotionEffects.tsx   Scroll reveal, parallax, sticky header state
│   ├── layout/             Header, Footer
│   └── team/  pillars/  forms/  blog/
├── lib/
│   ├── cms.ts              Blog posts and publications (Prismic, with fallback)
│   ├── site-content.ts     Prismic pages and site settings
│   ├── mock-content.ts     Fallback blog posts and portfolio entries
│   ├── team-data.ts  pillars-data.ts  nav.ts
│   └── prismicio.ts        Prismic client and link resolver
├── customtypes/  slices/   Prismic models (pushed with the Prismic CLI)
├── scripts/                Model generator and content migration scripts
└── public/assets/          Images and logos
```

Each route renders its Prismic `site_page` when one is published. Otherwise
it renders the page component's built-in markup.

## Content management (Prismic)

Repository: **`eri-website-repo`**. Content updates appear on the site within
about 60 seconds of publishing, or immediately once the webhook is configured.

### What editors control

| Prismic type | Controls |
| --- | --- |
| **Website Page** (`site_page`) | The main pages, built from reorderable sections: hero, text and image, columns, card grids, statistics, team profiles, forms, the blog and publication lists, and more |
| **Site Settings** (`site_settings`) | Logos, main navigation, the What We Do submenu, the header button and footer content |
| **Blog Post** (`blog_post`) | Articles at `/news/<slug>` |
| **Research Publication** (`research_publication`) | Research portfolio entries: title, abstract, research area, type, publisher and a link to where the work is published. Entries link out and have no page on this site; `/portfolio/<slug>` redirects to the source. |

| Route | `site_page` UID |
| --- | --- |
| `/` | `home` |
| `/about` | `about` |
| `/what-we-do` | `what-we-do` |
| `/what-we-do/wash` `/energy` `/climate` `/agriculture` | `wash`, `energy`, `climate`, `agriculture` |
| `/team` | `team` |
| `/contact` | `contact` |
| `/news` | `news` |
| `/portfolio` | `portfolio` |

Things editors should know:

- A published page replaces the whole route. Build and preview every section before publishing.
- On `/news` and `/portfolio`, keep the News list or Publication list section, or the index disappears.
- The homepage hero's **Home hero slideshow** field takes a list of images that cross-fade. Upload full-size originals; Prismic resizes them.
- Blog filter tabs and portfolio area tabs only appear for categories that have entries.
- Research areas are `energy`, `wash`, `climate`, `agriculture` and `circular_economy`.

### Changing the content models

1. Edit the models. Slices and `site_page` are generated from
   [`scripts/generate-site-models.mjs`](nextjs-app/scripts/generate-site-models.mjs):
   edit the script, then run it. `blog_post` and `research_publication` are
   edited directly in `customtypes/`.
2. Update [`prismicio-types.d.ts`](nextjs-app/prismicio-types.d.ts) to match.
3. **Commit the change.** The Prismic CLI refuses to push models that are not in Git history.
4. Push to Prismic:
   ```bash
   npx prismic login
   npx prismic status   # shows what differs
   npx prismic push
   ```

### Preview and webhook

Configure both in the Prismic dashboard:

- **Preview:** domain `https://eedresearch.com`, route `/api/preview`. A local preview for `http://localhost:3000` is also registered.
- **Webhook:** URL `https://eedresearch.com/api/revalidate`, triggered on publish and unpublish, with the same secret as `PRISMIC_WEBHOOK_SECRET`.

## Images

Banner and hero images live in [`public/assets/hero/`](nextjs-app/public/assets/hero/).
They are 2560px wide; keep new ones at least that wide so they stay sharp on
large screens.

After adding or replacing a banner photo, run
`node scripts/optimize-hero-images.mjs`. It writes WebP copies at 1280, 1920
and 2560px beside each JPEG, and
[`components/HeroImage.tsx`](nextjs-app/components/HeroImage.tsx) serves the
size that fits the screen and preloads the first banner on each page.
Banners uploaded to Prismic are resized by Prismic's CDN, so they need no
extra step.

Banner images are chosen in this order, set in
[`components/SitePage.tsx`](nextjs-app/components/SitePage.tsx):

1. `HERO_IMAGE_OVERRIDES`: a fixed image that ignores Prismic. Currently used
   for About, Team and Research Portfolio. Remove an entry to hand that page
   back to Prismic.
2. The **Background image** set on the page's hero in Prismic.
3. `DEFAULT_HERO_IMAGES`: used when Prismic has no image. Currently set for
   Blog and the four research areas.

The homepage hero is a slideshow. It plays the Prismic **Home hero slideshow**
images, or `HOME_HERO_SLIDES` in
[`components/HeroSlideshow.tsx`](nextjs-app/components/HeroSlideshow.tsx) if
none are set.

Photo credits (all from Pexels under the [Pexels licence](https://www.pexels.com/license/)):

| File | Photo |
| --- | --- |
| `hero-about-river.jpg` | [Top View of a River and Green Forest](https://www.pexels.com/photo/top-view-of-a-river-and-green-forest-17398968/), Siarhei Nester |
| `hero-team-solar.jpg` | [Expansive Solar Farm in Vietnam's Binh Thuan Province](https://www.pexels.com/photo/expansive-solar-farm-in-vietnam-s-binh-thuan-province-35105443/), Quang Nguyen Vinh |
| `hero-portfolio-wind.jpg` | [Panoramic View of Wind Turbines in Vietnamese Countryside](https://pexels.com/photo/35105465), Quang Nguyen Vinh |
| `hero-news.jpg` | [Dam of river between green hills](https://pexels.com/photo/6415966), Quang Nguyen Vinh |
| `hero-agriculture.jpg` | [View of a Rolling Landscape](https://www.pexels.com/photo/view-of-a-rolling-landscape-6872257/), Quang Nguyen Vinh |
| `hero-wash.jpg` | [Colorful water taps](https://www.pexels.com/photo/colorful-water-taps-in-vibrant-outdoor-setting-30224434/) |
| `hero-energy.jpg` | [Solar panels in a photovoltaic power station](https://www.pexels.com/photo/solar-panels-in-modern-photovoltaic-power-station-4320449/) |
| `hero-climate.jpg` | [Cracked dry earth during drought](https://www.pexels.com/photo/cracked-dry-earth-during-severe-drought-36767372/) |
| `hero-home-wind.jpg` | [Wind turbines over farmland](https://www.pexels.com/photo/9022671/), Rockwell Branding Agency |
| `hero-home-solar.jpg` | Wind turbines and solar panels. This one is AI-generated; check its licence and consider replacing it with a real photo. |
| `assets/blog/clean-cooking-charcoal-stove.jpg` | [Outdoor Cooking Pot on Rustic Charcoal Stove](https://www.pexels.com/photo/outdoor-cooking-pot-on-rustic-charcoal-stove-32796453/), Wedson msoni. Lead image for the Sierra Leone clean cooking article. |

## Deployment

### Production: DigitalOcean Droplet

eedresearch.com runs on a DigitalOcean Droplet. **PM2** runs the app on port
3001 as the process `eed-nextjs`, and **Apache** reverse-proxies HTTPS to it.
The app is checked out at `/var/www/apps/eed`, and its production
`.env.local` sits in `nextjs-app/` on the server. Ask the maintainer for SSH
access.

Pushing to GitHub does **not** deploy. To release `main`:

```bash
cd /var/www/apps/eed && git pull
cd nextjs-app && npm ci && npm run build && pm2 restart eed-nextjs
```

Before building on the server:

- **Check swap is on (`free -h`).** The Droplet has about 1 GB of RAM, and `next build` only survives because of a 2 GB swapfile. Without it, the build can get the database on the same machine killed.
- **The server is shared.** It also hosts other sites, so confirm they still respond after a deploy, and reload Apache (`systemctl reload apache2`) rather than restarting it.
- **Regenerate `package-lock.json` on Linux when adding dependencies.** A lockfile resolved on Windows can omit Linux-only packages and break `npm ci` on the server.

### Vercel

When deploying with Vercel, set the project's **Root Directory** to
`nextjs-app` (the app is not at the repository root), choose **Node.js 22.x**,
and add the environment variables above. If Vercel becomes the production
host, point the Prismic preview and webhook at its domain.

## Maintenance mode

[`deploy/maintenance/`](deploy/maintenance/) holds a static maintenance page.
Apache serves it with HTTP 503 while the app keeps running. Its
[README](deploy/maintenance/README.md) has the on/off commands.

## Google Sans variant

[`nextjs-app-google-sans/`](nextjs-app-google-sans/) is a copy of the site with
Google Sans for every font role. It uses the same Prismic content. Run it
beside the original to compare:

```bash
cd nextjs-app-google-sans && npm ci && npm run dev   # http://localhost:3001
```

The two folders are independent: code changes made in one are not applied to
the other. Once a font is chosen, keep one folder and delete the other.

## Known gaps

- **The contact and inquiry forms do not send email yet.** They validate and
  respond, but delivery is a `TODO` in
  [`app/api/contact/route.ts`](nextjs-app/app/api/contact/route.ts) and
  [`app/api/inquiry/route.ts`](nextjs-app/app/api/inquiry/route.ts) until an
  email provider is configured.
- **Research portfolio entries are not in Prismic yet.** Until they are
  published there, the page shows the bundled list in `lib/mock-content.ts`.
  Run `node scripts/migrate-publications.mjs --apply` with a write token to
  stage them.
- **Check that the Prismic preview and webhook are configured** for the
  production domain.

## Working on the project

- Work on a branch and merge to `main` through a pull request. `main` is what
  gets deployed.
- Commit each change separately, with a message that explains why.
- Run `npx tsc --noEmit` and `npm run lint` before committing.
- `nextjs-app/AGENTS.md` is rewritten by `next dev`; it is safe to commit or
  ignore.
