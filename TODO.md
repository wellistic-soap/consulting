# TODO before launch

Every placeholder still to fill, in rough priority order.

## 1. Company name and logo

Done on 2026-09-08: the site is named **Hecho AI** everywhere (site name, page titles, OG image) and the wordmark logo is in `public/brand/`. Still to do:

- Favicon: `src/app/favicon.ico` is still the Next.js default. Export a 32 px and 180 px icon from the logo mark and replace it (an `icon.png` and `apple-icon.png` in `src/app/` also work).
- Legal pages: `[COMPANY LEGAL NAME]`, `[ADDRESS]`, `[CONTACT EMAIL]`, `[STATE]`, `[DATE]` in `legal.privacy` and `legal.terms` in both message files. Have a lawyer read both pages.

## 2. People

- Confirm both bios (`home.who.oz.bio`, `home.who.cris.bio`) in both languages.
- Portrait photos are in place (`public/images/people/`). Originals in `design/uploads/`.

## 3. Imagery

Prompts for every slot are in `IMAGE-PROMPTS.md`.

- Vertical hero images are in place for all six verticals (`public/images/heroes/*.webp`, 23 to 66 KB each, generated with DALL-E from the prompts). Originals are kept in `design/uploads/` (gitignored). Regenerate and re-run the conversion if you want different scenes.
- Favicon: `src/app/favicon.ico` is the Next.js default. Replace it.

## 4. Environment variables

The booking link is set in code (`https://cal.com/aricgroup/30min` in `src/lib/site.ts`), so the only variable the site needs is the public URL. In the wellistic-soap Vercel project, Settings, Environment Variables, add for Production and Preview:

```
NEXT_PUBLIC_SITE_URL=https://<the project's vercel.app URL, later hechoai.com>
```

Optional: `NEXT_PUBLIC_BOOKING_URL` overrides the booking link without a code change. Redeploy after adding either.

Optional: in cal.com, UTM parameters arrive with each booking (`utm_campaign` is the vertical page, `utm_content` is en or es).

## 5. Clean up the first deploy

The mistaken Vercel project has been deleted. The GitHub repo `ozmerchant/groundwork-site` still exists because the `gh` CLI lacks the delete scope. Delete it at github.com/ozmerchant/groundwork-site, Settings, Delete this repository, or run:

```
gh auth refresh -h github.com -s delete_repo
gh repo delete ozmerchant/groundwork-site --yes
```

## 6. Custom domain## 6. Custom domain

Nothing is attached yet. The likely domain is `hechoai.com` (whois showed it available on 2026-09-07; register it first). When it is ready:

1. Vercel dashboard: wellistic-soap's projects, project `consulting`, Settings, Domains, Add. Enter `hechoai.com` and also `www.hechoai.com`. Choose to redirect `www` to the apex (or the reverse).
2. At the DNS provider, add:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`
   Vercel shows the exact records for your setup on the same screen; use those if they differ.
3. Wait for the domain to show "Valid Configuration" in Vercel. SSL is automatic.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel (Production) to `https://hechoai.com` and redeploy so canonical, hreflang, sitemap, and OG URLs use the real domain.

## 7. Content review

- Native Spanish review of the phrases listed in `DECISIONS.md`.
- Confirm the integration names dropped in the trust blocks and FAQ (ServiceTitan, Housecall Pro, Jobber, Dentrix, Open Dental, Eaglesoft, Tekmetric, Shop-Ware, Mitchell 1, Mindbody, ABC Fitness, Club Automation). Remove any you would not want to be asked about.
- Confirm the "Typical" ranges in `home.automate.items` and each vertical's `useCases` match what you are comfortable saying in a room.
- Have counsel read the four trust bullets on Home, the dental trust bullets, and the FAQ answer on HIPAA and customer data. The wording says we hold no data and build inside the client's systems; make sure the contract matches.

## 8. Optional

- Add a Google Business Profile / LocalBusiness schema once the legal name and address are final.
