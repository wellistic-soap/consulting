# Groundwork marketing site

Bilingual (English / Spanish) marketing site for Groundwork, an AI operations consultancy for established local and regional businesses. Built for one use case: Cris pulls it up on his phone in a lobby and hands it to an owner.

- Production: the `consulting` project in the wellistic-soap Vercel account (URL assigned on first deploy; set it in `NEXT_PUBLIC_SITE_URL`)
- GitHub: https://github.com/wellistic-soap/consulting
- Vercel project: `consulting` (wellistic-soap's projects)

See `DECISIONS.md` for design and copy decisions and `TODO.md` for every placeholder still to fill.

## Stack

Next.js 15 (App Router, static generation), TypeScript, Tailwind CSS v4, shadcn/ui primitives, next-intl for routing and messages, zod for form validation, Resend for email, Twilio REST API for SMS, Vercel Analytics.

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
| `RESEND_API_KEY` | Resend API key for the callback email. |
| `LEAD_EMAIL` | Address that receives callback requests. |
| `LEAD_FROM` | Optional. Sender for the email, e.g. `Groundwork <leads@yourdomain.com>`. Defaults to Resend's onboarding sender, which only delivers to the Resend account owner. |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | Twilio credentials and sending number for the SMS. |
| `CRIS_PHONE` | Cris's mobile number in E.164 format, e.g. `+15555550199`. |

If any Twilio variable is missing the site logs a warning and sends email only. If neither channel is configured the form returns an error to the visitor.

## Project layout

```
src/app/[locale]/           pages (home, five verticals, pricing, callback, privacy, terms)
src/app/api/callback/       form handler: zod validation, honeypot, IP rate limit, email + SMS
src/app/api/og/             locale-aware Open Graph image
src/app/sitemap.ts          locale-aware sitemap with hreflang alternates
src/components/site/        header, footer, mobile CTA bar, share button, form, page templates
src/messages/en.json        all English copy
src/messages/es.json        all Spanish copy
src/i18n/                   next-intl routing, navigation, request config
src/lib/                    site config, SEO helpers, form schema, notifications, rate limiter
```

All copy lives in the two message files. Do not hardcode strings in components.

## Deploy

The Vercel project is imported from GitHub, so pushes to `main` deploy to production and pull requests get preview URLs. Manual deploy (after `npx vercel login` as wellistic-soap and `npx vercel link`):

```bash
npx vercel --prod
```

Environment variables live in the Vercel project (Production and Preview). Update them with `npx vercel env add NAME production` or in the dashboard. See `TODO.md` for the full list and values to replace.

## Testing the callback form

1. Set real `RESEND_API_KEY` and `LEAD_EMAIL` in `.env.local` (Twilio optional).
2. `npm run dev`, open `/callback`, submit the form.
3. Check the terminal for `[callback]` warnings and your inbox for the email.

The API can also be exercised directly:

```bash
curl -X POST http://localhost:3000/api/callback -H 'Content-Type: application/json' \
  -d '{"name":"Test Owner","business":"Test Dealer","vertical":"dealers","locations":"2-3","revenue":"5m-20m","phone":"5551234567","language":"en","bestTime":"morning","locale":"en"}'
```

Rate limit is 5 requests per IP per 10 minutes, in memory per serverless instance.
