# Decisions

Decisions made while building the site without stopping to ask. Change any of them; they are recorded so nothing is hidden.

## Setup

- **Company name**: the brief left it as `[COMPANY NAME]`. The working name is **Groundwork** (constant in `src/lib/site.ts`, plus `common.siteName` in both message files). It reads well for equipment and trades and does not say "AI." Replace it once the real name is chosen (see TODO.md).
- **GitHub repo**: first created under `ozmerchant` by mistake, then moved to `wellistic-soap/consulting` (public) on 2026-09-05 at Oz's request.
- **Vercel**: first deployed to a `groundwork-site` project in the Futureproof team by mistake. The site now lives in the `consulting` project under the wellistic-soap Vercel account, imported from the GitHub repo. The Futureproof project and the `ozmerchant` repo are to be deleted once the new deploy is confirmed.
- **Vercel CLI**: runs as a dev dependency via `npx vercel`. The CLI on this machine is logged into the Futureproof account, so CLI deploys to the wellistic-soap project require `npx vercel login` first.
- **Calendly instead of a form**: Oz decided on 2026-09-05 that Cris will run a Calendly account, so the callback form, the API route, Resend, Twilio, zod, and the rate limiter were removed. Every CTA is an external link to `NEXT_PUBLIC_CALENDLY_URL`, opened in a new tab and tagged with UTM parameters (source, vertical, locale). The only configuration left is that URL and the site URL.

## Tech

- **i18n**: next-intl with `localePrefix: "as-needed"`, so English is at the root and Spanish at `/es/...`. The language toggle keeps the current path and query string.
- **Static generation**: every page under `[locale]` is prerendered for both locales. The only dynamic routes are the two API routes.
- **Client bundle**: shadcn's Radix-based button, label, and select were replaced with plain elements. The Radix umbrella package added roughly 75 KB to every page. 
- **Messages sent to the browser**: only the `common` namespace is passed to the client provider. Everything else renders on the server.
- **OG images**: one edge route (`/api/og?locale=&page=`) renders a text card per page and locale, so no image files are needed.
- **Fonts**: Inter (body) and Source Serif 4 (headlines only, weight 600), both self-hosted through `next/font`. The serif adds gravitas to the outcome headlines without looking like a law firm.

## Design

- **Palette**: deep green primary `#1f4d3a`, warm off-white background `#faf7f2`, near-black text `#1c1a17`, rust orange accent `#c2410c` for CTAs only. Muted text `#5b564f`. White on the accent is 4.9:1 and white on the primary is 9.8:1, both WCAG AA.
- **Green over navy**: the lead vertical is equipment dealers. Green reads as familiar to that audience without imitating any manufacturer's brand.
- **Mobile CTA bar**: on phones, every page has a fixed bottom bar with the primary CTA. Vertical pages add the Share button beside it. This is the "thumb reach" requirement made literal.
- **Share button**: uses the Web Share API when available (iOS and Android), otherwise copies the link and shows "Link copied."
- **Placeholder imagery**: a neutral block component (`Placeholder.tsx`) with a `data-image-slot` attribute at each slot. No stock photos. The portrait slots are circles; the vertical hero slots only show at tablet width and up to keep phones text-first.
- **Audit dominance**: on Home and Pricing the audit card is larger, bordered in the primary color, carries the only CTA, and the "Start here" badge. Build and Retainer cards have no CTA and carry "Scoped from your audit" and "After a build" tags.
- **No About page, no blog**: as briefed. Founder bios sit in the "Who we are" block on Home. The brief said no scheduler embed; the Calendly link is a plain link, nothing is embedded.

## Copy

- **Register**: second person, outcome first, short sentences. AI is named only in the product name and the "how it works" layer.
- **Figures**: every number is prefixed with "Typical:" or "Illustrative result:" and each block carries a "not guarantees" note. The example engagements are labeled hypothetical twice (subtitle and footnote).
- **Spanish**: written for a Spanish-speaking business owner in the US. Formal "usted" throughout, since the reader is often a 50-year-old owner meeting Cris for the first time. Vocabulary leans Mexican and US-border Spanish (refacciones, camionetas, sucursales, presupuesto). English product names stay in English where owners would say them that way (HVAC, CRM, HIPAA, BAA).
- **No em dashes** in either language. Verified with grep across `src/`.

## Headline alternates

Chosen (EN): "Your phones answered. Your follow-ups done. Your team back to the work that pays."
Chosen (ES): "Sus teléfonos contestados. Sus seguimientos hechos. Su equipo de vuelta al trabajo que sí paga."

Alternate 1 (EN): "Every call answered. Every quote followed up. Nobody hired to do it."
Alternate 1 (ES): "Cada llamada contestada. Cada cotización con seguimiento. Sin contratar a nadie."

Alternate 2 (EN): "Get the hours back. Keep the customers you are losing on hold."
Alternate 2 (ES): "Recupere las horas. Quédese con los clientes que hoy pierde en espera."

## Spanish phrases flagged for native review

- "Agende una llamada con Cris" (primary CTA). "Agendar" is standard in Mexico and the US; "programar" or "reservar" may read better for other markets.
- "Su equipo de vuelta al trabajo que sí paga" (hero). "Que sí paga" is colloquial on purpose. Confirm it lands with the audience.
- "refacciones" vs "repuestos" vs "partes". Chose "refacciones" (Mexican usage). If dealers serve a Central American or Caribbean base, "repuestos" may fit better.
- "camionetas" for trucks in the home services line. Some owners say "trocas" or "unidades." Confirm with Cris.
- "Plan mensual de operación" for "Operations Retainer." "Retainer" has no clean equivalent; "iguala" is used in Mexico but is unfamiliar elsewhere.
- "Rescate de cancelaciones" for "cancellation save flow." Confirm "rescatar" reads naturally in this context.
- "Auditoría de Oportunidades con IA" for the product name. Confirm whether the brand wants it translated or kept in English.
- "sobreflujo" (overflow calls). Understandable but not idiomatic. "llamadas que no alcanza a contestar" is a longer plain alternative.
- Dental: "sillón" for "the chair." Fine in Mexico; confirm for other markets.

## Verification done

- `npm run build` passes with zero errors and zero warnings from our code.
- Lighthouse (mobile, against the first production deploy on Vercel): Home, Dealers, and Dealers (ES) all score performance 99, accessibility 100, best practices 100, SEO 100. Spanish Home and Pricing (ES) score 98 to 100 across the board. Total byte weight per page is 247 to 260 KB.
- Viewports checked: iPhone 13 emulation (390 px) with zero horizontal overflow, and 1440 px desktop.
