# Groundwork marketing site

Bilingual (English / Spanish) marketing site for Groundwork, an AI operations consultancy for established local and regional businesses. Built for one use case: Cris pulls it up on his phone in a lobby and hands it to an owner.

- Production: the `consulting` project in the wellistic-soap Vercel account (URL assigned on first deploy; set it in `NEXT_PUBLIC_SITE_URL`)
- GitHub: https://github.com/wellistic-soap/consulting
- Vercel project: `consulting` (wellistic-soap's projects)

See `DECISIONS.md` for design and copy decisions and `TODO.md` for every placeholder still to fill.

## Stack

Next.js 15 (App Router, static generation), TypeScript, Tailwind CSS v4, shadcn/ui primitives, next-intl for routing and messages, Vercel Analytics. Every CTA opens Cris's Calendly page; there is no form or backend.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                   # http://localhost:3000 and /es
```

Other scripts:

```bash
npm run build   # production build, must pass with zero errors
npm run start   # serve the production build
npm run lint
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, no trailing slash. Used for canonical, hreflang, sitemap, OG images. |
| `NEXT_PUBLIC_CALENDLY_URL` | Cris's Calendly booking link. Every CTA on the site opens it in a new tab, tagged with `utm_source=site`, `utm_campaign=<vertical>`, and `utm_content=<locale>` so Calendly shows where the booking came from. |

Both are build-time public variables: change them in Vercel and redeploy.

## Project layout

```
src/app/[locale]/           pages (home, six verticals, pricing, privacy, terms)
src/app/api/og/             locale-aware Open Graph image
src/app/sitemap.ts          locale-aware sitemap with hreflang alternates
src/components/site/        header, footer, mobile CTA bar, share button, page templates
src/messages/en.json        all English copy
src/messages/es.json        all Spanish copy
src/i18n/                   next-intl routing, navigation, request config
src/lib/                    site config (incl. Calendly link builder), SEO helpers
```

All copy lives in the two message files. Do not hardcode strings in components.

Design references (Claude Design export) live in `design/`. They are documentation, not shipped code; the tokens and component styles are recreated in `globals.css` and `src/components/site/`.

## Deploy

The Vercel project is imported from GitHub, so pushes to `main` deploy to production and pull requests get preview URLs. Manual deploy (after `npx vercel login` as wellistic-soap and `npx vercel link`):

```bash
npx vercel --prod
```

Set the two environment variables in the Vercel project (Production and Preview) and redeploy.
