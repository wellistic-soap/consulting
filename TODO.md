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

Prompts for every slot are in `IMAGE-PROMPTS.md`.

- Vertical hero images are in place for five verticals (`public/images/heroes/*.webp`, 23 to 66 KB each, generated with DALL-E from the prompts). Originals are kept in `design/uploads/` (gitignored). Regenerate and re-run the conversion if you want different scenes. The agencies page still shows a placeholder: generate `agencies-hero` from the prompt, convert to `public/images/heroes/agencies.webp`, and add `"agencies"` to `HERO_IMAGES` in `src/lib/site.ts`.
- Portrait slots still need real photos: `portrait-oz`, `portrait-cris` (448 x 560) and `portrait-cris-small` (224 x 224) in `src/app/[locale]/page.tsx`. Swap the `Placeholder` for `next/image`, WebP under 40 KB.
- Logo: `src/components/site/Logo.tsx` is a 14 px square. Replace with the real mark.
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
- Confirm the "Typical" ranges in `home.automate.items` and each vertical's `useCases` match what you are comfortable saying in a room.
- Have counsel read the four trust bullets on Home, the dental trust bullets, and the FAQ answer on HIPAA and customer data. The wording says we hold no data and build inside the client's systems; make sure the contract matches.

## 8. Optional

- Add a Google Business Profile / LocalBusiness schema once the legal name and address are final.
