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

## 4. Calendly and environment variables

Cris sets up a Calendly account and creates one event type (suggested: "Call with Cris, 20 minutes", phone call, with a question for preferred language). Then in the wellistic-soap Vercel project, Settings, Environment Variables, add for Production and Preview:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<cris-handle>/<event>
NEXT_PUBLIC_SITE_URL=https://<the project's vercel.app URL, later the custom domain>
```

Redeploy after adding them (Deployments, Redeploy). Until the Calendly URL is set, every CTA opens `https://calendly.com/REPLACE_ME`, which is a Calendly 404.

Optional: in Calendly, turn on UTM tracking so each booking shows `utm_campaign` (which vertical page the owner was on) and `utm_content` (en or es).

## 5. Clean up the first deploy

The mistaken Vercel project has been deleted. The GitHub repo `ozmerchant/groundwork-site` still exists because the `gh` CLI lacks the delete scope. Delete it at github.com/ozmerchant/groundwork-site, Settings, Delete this repository, or run:

```
gh auth refresh -h github.com -s delete_repo
gh repo delete ozmerchant/groundwork-site --yes
```

## 6. Custom domain## 6. Custom domain

Nothing is attached yet. When the domain (`[DOMAIN]`) is ready:

1. Vercel dashboard: wellistic-soap's projects, project `consulting`, Settings, Domains, Add. Enter `[DOMAIN]` and also `www.[DOMAIN]`. Choose to redirect `www` to the apex (or the reverse).
2. At the DNS provider, add:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`
   Vercel shows the exact records for your setup on the same screen; use those if they differ.
3. Wait for the domain to show "Valid Configuration" in Vercel. SSL is automatic.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel (Production) to `https://[DOMAIN]` and redeploy so canonical, hreflang, sitemap, and OG URLs use the real domain.

## 7. Content review

- Native Spanish review of the phrases listed in `DECISIONS.md`.
- Confirm the integration names dropped in the trust blocks and FAQ (ServiceTitan, Housecall Pro, Jobber, Dentrix, Open Dental, Eaglesoft, Tekmetric, Shop-Ware, Mitchell 1, Mindbody, ABC Fitness, Club Automation). Remove any you would not want to be asked about.
- Confirm the "typical" ranges in `home.automate.items` and each vertical's example engagement match what you are comfortable saying in a room.
- Confirm the HIPAA / BAA statements with counsel before selling to dental groups.

## 8. Optional

- Add a Google Business Profile / LocalBusiness schema once the legal name and address are final.
