# TODO before launch

Every placeholder still to fill, in rough priority order.

## 1. Company name

- `src/lib/site.ts`: `SITE_NAME` (currently "Groundwork").
- `src/messages/en.json` and `src/messages/es.json`: `common.siteName` and every `meta.*.title` that ends in `| Groundwork`.
- `src/app/api/og/route.tsx`: the title-stripping regex references "Groundwork."
- `README.md` and `DECISIONS.md` mention the working name.
- Legal pages: `[COMPANY LEGAL NAME]`, `[ADDRESS]`, `[CONTACT EMAIL]`, `[STATE]`, `[DATE]` in `legal.privacy` and `legal.terms` in both message files. Have a lawyer read both pages.

## 2. People

- Cris's last name: `home.who.cris.name` in both message files (`[LAST NAME]` / `[APELLIDO]`).
- Confirm both bios (`home.who.oz.bio`, `home.who.cris.bio`) in both languages.
- Portrait photos: replace the two `Placeholder` slots `portrait-oz` and `portrait-cris` in `src/app/[locale]/page.tsx` with `next/image`. Square crops, at least 320 px, under 40 KB each.

## 3. Imagery

- Vertical hero slots (`data-image-slot="dealers-hero"` etc.) in `src/components/site/VerticalPage.tsx`. Only shown at tablet width and up. Keep each under 80 KB to stay inside the 500 KB page budget.
- Logo: `src/components/site/Logo.tsx` is a simple two-block mark. Replace with the real logo SVG.
- Favicon: `src/app/favicon.ico` is the Next.js default. Replace it.

## 4. Environment variables (real values)

Set in Vercel for Production and Preview (`npx vercel env add NAME production` / `preview`, or the dashboard), and in `.env.local` for local testing:

| Variable | Current value | Replace with |
| --- | --- | --- |
| `RESEND_API_KEY` | `REPLACE_ME_resend_api_key` | Resend API key |
| `LEAD_EMAIL` | `replace-me@example.com` | Cris's email (or a shared leads inbox) |
| `LEAD_FROM` | not set | `Groundwork <leads@yourdomain.com>` after verifying the domain in Resend. Without it, email only reaches the Resend account owner. |
| `TWILIO_ACCOUNT_SID` | `REPLACE_ME_twilio_sid` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | `REPLACE_ME_twilio_token` | Twilio auth token |
| `TWILIO_FROM` | `+15555550100` | Twilio sending number (E.164) |
| `CRIS_PHONE` | `+15555550199` | Cris's mobile (E.164) |
| `NEXT_PUBLIC_SITE_URL` | `https://groundwork-site.vercel.app` | Final domain once attached, e.g. `https://yourdomain.com` |

After updating, redeploy (`npx vercel --prod` or push to `main`) and submit the form once to confirm both the SMS and the email arrive.

Note: the current placeholder Twilio values are syntactically valid, so the API will attempt an SMS and log a Twilio error until real values are set. Email will fail the same way until the Resend key is real. Until then the form shows the generic error to visitors.

## 5. Custom domain

Nothing is attached yet. When the domain (`[DOMAIN]`) is ready:

1. Vercel dashboard: Futureproof team, project `groundwork-site`, Settings, Domains, Add. Enter `[DOMAIN]` and also `www.[DOMAIN]`. Choose to redirect `www` to the apex (or the reverse).
2. At the DNS provider, add:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`
   Vercel shows the exact records for your setup on the same screen; use those if they differ.
3. Wait for the domain to show "Valid Configuration" in Vercel. SSL is automatic.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel (Production) to `https://[DOMAIN]` and redeploy so canonical, hreflang, sitemap, and OG URLs use the real domain.
5. Optional: in Resend, verify `[DOMAIN]` and set `LEAD_FROM` to an address on it.

## 6. Content review

- Native Spanish review of the phrases listed in `DECISIONS.md`.
- Confirm the integration names dropped in the trust blocks and FAQ (ServiceTitan, Housecall Pro, Jobber, Dentrix, Open Dental, Eaglesoft, Tekmetric, Shop-Ware, Mitchell 1, Mindbody, ABC Fitness, Club Automation). Remove any you would not want to be asked about.
- Confirm the "typical" ranges in `home.automate.items` and each vertical's example engagement match what you are comfortable saying in a room.
- Confirm the HIPAA / BAA statements with counsel before selling to dental groups.

## 7. Optional

- Replace the in-memory rate limiter with Upstash or Vercel KV if the form ever sees abuse.
- Add a Google Business Profile / LocalBusiness schema once the legal name and address are final.
