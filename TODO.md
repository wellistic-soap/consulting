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

Add these in the wellistic-soap Vercel project (`consulting`), Settings, Environment Variables, for Production and Preview. You can paste the block below straight into the "Environment Variables" panel on the import screen or in settings, then edit values:

```
NEXT_PUBLIC_SITE_URL=https://consulting.vercel.app
RESEND_API_KEY=REPLACE_ME_resend_api_key
LEAD_EMAIL=replace-me@example.com
TWILIO_ACCOUNT_SID=REPLACE_ME_twilio_sid
TWILIO_AUTH_TOKEN=REPLACE_ME_twilio_token
TWILIO_FROM=+15555550100
CRIS_PHONE=+15555550199
```

Set `NEXT_PUBLIC_SITE_URL` to whatever `.vercel.app` URL Vercel assigns the project, then to the custom domain later. Values to replace:

| Variable | Current value | Replace with |
| --- | --- | --- |
| `RESEND_API_KEY` | `REPLACE_ME_resend_api_key` | Resend API key |
| `LEAD_EMAIL` | `replace-me@example.com` | Cris's email (or a shared leads inbox) |
| `LEAD_FROM` | not set | `Groundwork <leads@yourdomain.com>` after verifying the domain in Resend. Without it, email only reaches the Resend account owner. |
| `TWILIO_ACCOUNT_SID` | `REPLACE_ME_twilio_sid` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | `REPLACE_ME_twilio_token` | Twilio auth token |
| `TWILIO_FROM` | `+15555550100` | Twilio sending number (E.164) |
| `CRIS_PHONE` | `+15555550199` | Cris's mobile (E.164) |
| `NEXT_PUBLIC_SITE_URL` | not set yet | The project's `.vercel.app` URL now, the custom domain later |

After updating, redeploy (push to `main`, or Redeploy in the Vercel dashboard) and submit the form once to confirm both the SMS and the email arrive.

Note: the current placeholder Twilio values are syntactically valid, so the API will attempt an SMS and log a Twilio error until real values are set. Email will fail the same way until the Resend key is real. Until then the form shows the generic error to visitors.

## 5. Clean up the first deploy

The site was first pushed to `ozmerchant/groundwork-site` and deployed to a `groundwork-site` project in the Futureproof Vercel team. Once the wellistic-soap deploy is confirmed, delete both so nothing stale stays live:

- Vercel: Futureproof team, project `groundwork-site`, Settings, Delete Project.
- GitHub: `ozmerchant/groundwork-site`, Settings, Delete this repository.

## 6. Custom domain## 6. Custom domain

Nothing is attached yet. When the domain (`[DOMAIN]`) is ready:

1. Vercel dashboard: wellistic-soap's projects, project `consulting`, Settings, Domains, Add. Enter `[DOMAIN]` and also `www.[DOMAIN]`. Choose to redirect `www` to the apex (or the reverse).
2. At the DNS provider, add:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`
   Vercel shows the exact records for your setup on the same screen; use those if they differ.
3. Wait for the domain to show "Valid Configuration" in Vercel. SSL is automatic.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel (Production) to `https://[DOMAIN]` and redeploy so canonical, hreflang, sitemap, and OG URLs use the real domain.
5. Optional: in Resend, verify `[DOMAIN]` and set `LEAD_FROM` to an address on it.

## 7. Content review

- Native Spanish review of the phrases listed in `DECISIONS.md`.
- Confirm the integration names dropped in the trust blocks and FAQ (ServiceTitan, Housecall Pro, Jobber, Dentrix, Open Dental, Eaglesoft, Tekmetric, Shop-Ware, Mitchell 1, Mindbody, ABC Fitness, Club Automation). Remove any you would not want to be asked about.
- Confirm the "typical" ranges in `home.automate.items` and each vertical's example engagement match what you are comfortable saying in a room.
- Confirm the HIPAA / BAA statements with counsel before selling to dental groups.

## 8. Optional

- Replace the in-memory rate limiter with Upstash or Vercel KV if the form ever sees abuse.
- Add a Google Business Profile / LocalBusiness schema once the legal name and address are final.
