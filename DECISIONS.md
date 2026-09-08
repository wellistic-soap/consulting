# Decisions

Decisions made while building the site without stopping to ask. Change any of them; they are recorded so nothing is hidden.

## Setup

- **Company name**: the brief left it as `[COMPANY NAME]`. The working name is **Groundwork** (constant in `src/lib/site.ts`, plus `common.siteName` in both message files). It reads well for equipment and trades and does not say "AI." Replace it once the real name is chosen (see TODO.md).
- **GitHub repo**: first created under `ozmerchant` by mistake, then moved to `wellistic-soap/consulting` (public) on 2026-09-05 at Oz's request.
- **Vercel**: first deployed to a `groundwork-site` project in the wrong Vercel team by mistake. The site now lives in the `consulting` project under the wellistic-soap Vercel account, imported from the GitHub repo. Both mistaken copies have been deleted.
- **Vercel CLI**: runs as a dev dependency via `npx vercel`. The CLI on this machine is logged into a different account, so CLI deploys to the wellistic-soap project require `npx vercel login` first.
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
- **No engineering-partner credit**: the footer credit line was removed on 2026-09-05 at Oz's request. The site carries no third-party names.
- **No About page, no blog**: as briefed. Founder bios sit in the "Who we are" block on Home. The brief said no scheduler embed; the Calendly link is a plain link, nothing is embedded.

## Copy

- **Register**: second person, outcome first, short sentences. AI is named only in the product name and the "how it works" layer.
- **Figures**: every number is prefixed with "Typical:" or "Illustrative result:" and each block carries a "not guarantees" note. The example engagements are labeled hypothetical twice (subtitle and footnote).
- **Spanish**: written for a Spanish-speaking business owner in the US. Formal "usted" throughout, since the reader is often a 50-year-old owner meeting Cris for the first time. Vocabulary leans Mexican and US-border Spanish (refacciones, camionetas, sucursales, presupuesto). English product names stay in English where owners would say them that way (HVAC, CRM, HIPAA, BAA).
- **No em dashes** in either language. Verified with grep across `src/`.

## Pricing update (2026-09-05)

Audit lowered to reduce first-call friction; retainer split so support obligations are always funded.

- Audit: $5,000 to $3,000, two weeks, deliverables unchanged. The credit line is now framed as a deposit ("Your $3,000 is credited in full when you move to a build") and shown in a highlighted box directly above the CTA.
- Build: unchanged, $15,000 to $25,000, "Scoped from your audit," no CTA.
- Retainer: the single "Operations Retainer from $3,000/month" became two tiers, Monitor ($750/month) and Improve ($2,500/month), neither with a CTA, plus the note that no retainer is required. On Home, step 3 is now "Ongoing support" naming both tiers.
- FAQ: added "What does the retainer cover?" as the third question, six questions total.
- Spanish: product name changed to "Auditoría de Oportunidades de IA" (was "con IA") everywhere, tiers are "Monitoreo" and "Mejora Continua," credit line uses "se acreditan en su totalidad."
- Spanish phrases flagged for native review from this change: "Soporte continuo" (Home step 3 title), "Mejora Continua" as a product name, "plan mensual" for "retainer" in the FAQ question, and "Para que nada de lo que construimos se quede sin atención."

## Copy and design revision (2026-09-05, later the same day)

- **Data and compliance language**: removed every claim that we work within HIPAA, sign business associate agreements, or hold customer data in the US. New framing everywhere: we build automations, chatbots, and agents that connect to the owner's existing systems; anything we build runs on servers and accounts in the client's name; we do not host or store customer or patient data; existing vendor agreements and compliance programs stay in charge. The FAQ keeps the question "What about HIPAA and customer data?" because owners ask it, and answers with that framing. Have counsel read the four trust bullets and the FAQ answer before selling to dental groups.
- **Chatbots and agents**: named explicitly in the hero proof line, the automation section, the Build tier, and the use cases. AI is still not the headline hook.
- **Use cases replace scenarios**: the "Example engagement" before/after block (labeled hypothetical) is gone from all five vertical pages. Each now has five or six use cases with The problem, What we build, and a "Typical impact" line, ordered by payback. All "hypothetical" and "illustrative" wording removed site-wide, including Terms.
- **Design pass toward a more technical feel**: Inter headlines with tight tracking instead of serif, JetBrains Mono for eyebrows, prices, metrics, and section numbers, a faint engineering grid behind the hero and in dark bands, numbered sections, tighter radii. The palette is unchanged. A full brief for a deeper redesign is in DESIGN-PROMPT.md.
- **Spanish phrases flagged for native review from this revision**: "Corre en sus propias cuentas," "No tomamos custodia de datos de pacientes," "Dónde está el dinero" (section title, intentionally blunt), "Impacto típico," and "sobreflujo" again in the home services use cases.

## Slate design handoff implemented (2026-09-05, evening)

Implemented from the Claude Design project export (`design/design_handoff_groundwork/README.md`, plus the `Groundwork Home.dc.html` and `Groundwork Style Sheet.dc.html` artboards, kept in `design/` as references and never shipped).

- **Palette**: primary moved from deep green `#1f4d3a` to slate `#24384d`; accent from rust to brass `#b45309`, used only on the booking CTA and its badge. The artboard offers green, slate, and graphite variants; the handoff README specifies slate, so slate shipped. Switching back is a four-value edit at the top of `globals.css`.
- **Cards**: hard outlines replaced by soft depth (`.card`, `.card-lift`, `.shadow-audit` utilities); 10 px card radius, 12 px on hero strip, Audit, teaser, and final CTA; 6 px on buttons and tags.
- **Type scale**: clamp-based h1 (38 to 72 px) and h2 (32 to 48 px), 19 px card titles, 15 px card body, mono for eyebrows, prices, metrics, and step labels. Section padding is `clamp(64px, 9vw, 128px)`.
- **New Home elements**: hero eyebrow and three-cell metric strip, Build and Support stacked beside the Audit card with the "No retainer required" line, numbered trust band with top rules instead of icons, a named-person card ("Talk to Cris") in the final CTA.
- **Header**: 56 px, short nav labels at 1024 px and up, header CTA at 768 px and up, hamburger below 1024 px; the menu sheet is portaled to `body` because the header's backdrop blur would otherwise trap a fixed child. All header controls are 44 px tall.
- **Footer**: three auto-fit columns, 44 px link rows, mono bottom bar.
- **Other pages**: vertical and pricing pages received the same tokens, card styles, and section rhythm so the site stays one system; their structure is unchanged.
- **Copy additions** from the handoff, both languages: hero eyebrow, shorter hero proof, the three metric-strip stats, "No retainer required" line, the three "Talk to Cris" strings, short nav labels, "Typical" label. The handoff's Spanish qualifier variant was not adopted; the existing one stays.
- **Spanish for native review**: "Hogar" as the short nav label for home services, "Automotriz" for auto, "Respuesta en un día hábil".

## Hero imagery (2026-09-05)

The five vertical hero slots now carry DALL-E images generated from IMAGE-PROMPTS.md, converted with sharp to 1200 x 900 WebP at quality 75 with attention-based cropping. All land between 23 and 66 KB. They render only at 768 px and up, so phone pages do not download them; the `sizes` attribute caps desktop requests at 440 px wide. Alt text lives in each vertical's `hero.imageAlt` in both message files. Portrait slots remain placeholders until real photos exist.

## Marketing agencies vertical (2026-09-07)

Added a sixth vertical at `/agencies` (EN and ES) because Cris knows many agency owners. Same page skeleton as the other five: pain headline, four pains, six workflows, trust band, six use cases with Typical impact, CTA. The trust band includes one line inviting agencies to resell the work under their own name, since agencies are also a channel. Positioned last in the nav and on the Home grid; dealers stays first. The hero shows the placeholder until an image is generated (prompt added to IMAGE-PROMPTS.md).

Spanish for native review: "ejecutivos de cuenta" (account managers; some agencies say "gerentes de cuenta"), "respuesta inmediata a prospectos" for speed-to-lead, "onboarding" left in English as agencies use it.

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
