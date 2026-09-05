# Claude Design prompt

Paste this into Claude Design (or any design tool that takes a brief) to get a stronger structure for the site. It describes the brand, the audience, the pages, and the constraints. Reference screenshots of the current build are in the repo history and on the live site.

---

Design a bilingual (English and Spanish) marketing site for **Groundwork**, a small firm that builds automations, chatbots, and AI agents for established local businesses: equipment dealers (John Deere and similar), multi-location HVAC and plumbing companies, dental groups, auto service chains, and gyms. One salesperson, Cris, shows this site on his phone in a lobby and hands it to a 50-year-old owner. Every decision serves that moment.

**Feel**: technical and precise, but calm. Think a well-run engineering firm's site, not a startup landing page. Signals of competence: monospace numerals and labels, thin rules, an engineering grid in the background, generous whitespace, numbered sections (01, 02, 03), tight sans headlines. No gradients, no glowing orbs, no robots, no chat-bubble illustrations, no sparkle icons, no stock photos of handshakes.

**Palette** (keep): deep green `#1f4d3a` primary, warm off-white `#faf7f2` background, near-black `#1c1a17` text, muted `#5b564f`, rust orange `#c2410c` for the single CTA color only. Dark sections use the deep green with a faint white grid. All text pairs must meet WCAG AA.

**Type**: Inter for text and headlines, tight letter-spacing on headlines. JetBrains Mono for eyebrows, prices, metrics, and section numbers. No serif.

**Pages and structure** (routes fixed, do not add pages):
1. Home: outcome headline hero on a faint grid, one sentence of proof, single CTA "Book a call with Cris." Then: who we work with (five cards, dealers first), six automation examples with a "Typical:" metric in mono, how it works (Audit $3,000 visually dominant, then Build, then Ongoing support), who we are (two portraits), trust block (works with your systems, runs in your accounts, your data stays in your systems, you own the work), pricing teaser, final CTA.
2. Five vertical pages sharing one skeleton: pain headline hero, "Sound familiar?" pains, numbered workflows, dark trust band, "Where the money is" (three to six use cases, each with The problem / What we build / Typical impact), CTA with a Share button. On phones a fixed bottom bar holds the CTA and Share.
3. Pricing: Audit card dominant with the credit line boxed above the CTA, Build beside it with no CTA, then two retainer cards side by side (Monitor $750, Improve $2,500) with no CTAs and a "no retainer required" note, then a six-question FAQ.
4. Privacy and Terms: plain text.

**Mobile first**: design at 390 px first, then 1440 px. Every CTA in thumb reach. Tap targets 44 px or larger. Body text 16 px minimum. Nothing scrolls horizontally.

**Performance budget**: no hero video, no images over 80 KB, total page weight under 500 KB. Imagery slots are neutral blocks until real photos exist.

**Copy rules**: outcome first, short sentences, speak to the owner not the IT person. Every figure labeled "Typical." No em dashes in either language. The only thing sold is the $3,000 audit; Build and retainers never get a buy button.

**Deliverables**: component-level layouts for Home, one vertical page, and Pricing at 390 px and 1440 px, plus a small style sheet (type scale, spacing scale, card and button styles, grid background spec) I can hand to an engineer working in Tailwind.

---

## What changed in the current build toward this direction

- Headlines moved from serif to tight Inter; JetBrains Mono for eyebrows, prices, metrics, and section numbers.
- Faint engineering grid behind the hero and inside the dark trust bands.
- Numbered section eyebrows (01, 02, 03) on Home and vertical pages.
- Radii tightened from 8 px to 6 px, cards use `rounded-lg`.
- Use-case cards with mono "Typical impact" lines replaced the before/after scenario.
