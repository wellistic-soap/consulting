# Handoff: Groundwork design system (Slate)

## Overview
Design system refresh for the existing Groundwork Next.js + Tailwind v4 site (`consulting/`). The site is already built; this package updates its visual language, not its routes or copy. Direction: technical and calm, like an engineering firm. Palette moves from deep green to slate with a brass CTA. Cards drop hard outlines for soft depth. Type scale grows. Section rhythm gets more air.

## About the design files
`Groundwork Home.dc.html` and `Groundwork Style Sheet.dc.html` are **design references built in HTML**. Do not ship them. Recreate the tokens and component styles inside the existing codebase: `src/app/globals.css`, `src/components/ui/button.tsx`, `src/components/site/*`. Open the HTML files in a browser to see intended look and behavior at any width.

## Fidelity
High fidelity. Values below are final. Copy is unchanged from `src/messages/en.json` / `es.json` except where noted under "Copy additions".

---

## 1. Tokens (replace in `globals.css` `:root`)

```css
:root {
  --background: #f8f6f1;
  --foreground: #1c1a17;
  --card: #ffffff;
  --card-foreground: #1c1a17;
  --primary: #24384d;             /* slate */
  --primary-foreground: #ffffff;
  --secondary: #e9eef3;           /* slate tint: credit box, hover fills, image slots */
  --secondary-foreground: #24384d;
  --muted: #efece6;               /* alternate section ground at /60, neutral tags */
  --muted-foreground: #5b564f;
  --accent: #b45309;              /* brass. Booking CTA + its badge ONLY */
  --accent-foreground: #ffffff;
  --accent-hover: #92400e;
  --border: #e1dcd3;
  --input: #cfc8bd;
  --ring: #24384d;
  --radius: 0.375rem;             /* 6px buttons; cards use 10px, hero cards 12px (see radii) */
}
```

Contrast (all AA): foreground/background 15.5:1 · muted-fg/background 6.2:1 · white/primary 11.6:1 · white/accent 4.8:1 · primary/background 10.6:1.

Rules: accent never appears on text, icons, borders or non-CTA hovers. No gradients. Dark sections are `bg-primary` with the light grid, never black.

### Radii
- `rounded-md` 6px: buttons, tags, image slot inner blocks
- `rounded-[10px]`: standard cards (verticals, examples, people, Build/Support)
- `rounded-xl` 12px: hero metric strip, Audit card, pricing teaser, final CTA card
- `rounded-lg` 8px: xl buttons
- `rounded-full`: badges

Add to `@theme inline`: `--radius-card: 10px;` and use `rounded-[var(--radius-card)]` or a `.card` utility.

### Shadows (add as utilities)
```css
.shadow-card       { box-shadow: 0 1px 2px rgba(28,26,23,.04), 0 8px 24px rgba(28,26,23,.06); }
.shadow-card-hover { box-shadow: 0 2px 4px rgba(28,26,23,.05), 0 16px 40px rgba(28,26,23,.10); }
.shadow-audit      { box-shadow: 0 0 0 2px var(--primary), 0 2px 4px rgba(28,26,23,.04), 0 24px 48px -12px rgba(36,56,77,.25); }
```

### Grid backgrounds (update existing utilities)
- `.grid-bg::before`: lines `rgba(36,56,77,0.08)` 1px, cell 32×32, `background-position: center top`, mask `linear-gradient(to bottom, black 30%, transparent 100%)`.
- `.grid-bg-dark::before`: lines `rgba(255,255,255,0.06)` 1px, 32×32, no mask.

---

## 2. Type (Inter + JetBrains Mono, unchanged families)

| Role | Tailwind | Notes |
|---|---|---|
| h1 hero | `text-[clamp(38px,5.6vw,72px)] font-semibold tracking-[-0.035em] leading-none text-balance max-w-[920px]` | was text-4xl/6xl |
| h2 section | `text-[clamp(32px,3.6vw,48px)] font-semibold tracking-[-0.03em] leading-[1.06]` | was 3xl/4xl |
| Lead under h2 | `text-[clamp(17px,1.4vw,20px)] leading-normal text-muted-foreground mt-4` | |
| h3 card | `text-[19px] font-semibold tracking-tight leading-tight text-balance` | verticals 18px |
| Body | `text-base leading-relaxed` | never under 16px on phones |
| Card body | `text-[15px] leading-[1.55] text-muted-foreground` | |
| Price (Audit) | `font-mono text-[clamp(40px,4vw,48px)] font-semibold tracking-tight text-primary leading-none` | |
| Price (secondary) | `font-mono text-lg font-semibold text-primary` | Build, Monitor, Improve |
| Metric value | `font-mono text-[clamp(26px,2.4vw,32px)] font-semibold tracking-tight text-primary` | hero strip |
| Metric inline | `font-mono text-sm font-semibold text-primary` | card "Typical" row |
| Eyebrow / section number | `font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3` | 01, 02… |
| Muted mono label | `font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground` | "Typical", step tags |
| Step label | `font-mono text-[11px] font-semibold uppercase tracking-[0.18em]` | primary on Audit, muted on others |

---

## 3. Spacing and layout
- Container: `mx-auto w-full max-w-6xl px-5 sm:px-8` (unchanged).
- Section padding: `py-[clamp(64px,9vw,128px)]` (was `py-14 sm:py-20`). Hero: `pt-[clamp(56px,10vw,136px)] pb-[clamp(40px,6vw,80px)]`.
- Section heading block: `mb-12 max-w-2xl` (was mb-8/10).
- Card grid gap: `gap-4` (16px). Card padding: `p-7` (28px); Audit `p-[clamp(22px,3vw,36px)]`.
- Section tones alternate: default / `bg-muted/60` / default / `bg-muted/60` / default / `grid-bg-dark bg-primary`.

---

## 4. Components

### Button (`button.tsx`)
Base: `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background,transform] duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/50`
- `accent`: `bg-accent text-accent-foreground hover:bg-accent-hover hover:scale-[1.02] shadow-sm` (only the booking CTA)
- `default`: `bg-primary text-primary-foreground hover:bg-primary/90`
- `outline`: `border border-primary/30 bg-background text-primary hover:bg-secondary`
- `ghost`: `hover:bg-secondary`
- Sizes: `sm h-8 px-3 text-sm` · `default h-9 px-4 text-sm` · `lg h-11 px-6 text-base` (44px, phone minimum) · `xl h-13 px-7 text-base font-semibold rounded-lg` (52px, hero + Audit + final CTA)
- Language toggle and header CTA: `h-11` (44px), not h-10.

### Header (`Header.tsx`, `MobileNav.tsx`)
- 56px tall, sticky, `bg-background/92 backdrop-blur border-b border-border`.
- Logo: 14px `bg-primary rounded-sm` square + "Groundwork" `font-bold text-[17px] tracking-tight`.
- Desktop (≥1024): nav links `Dealers · Home services · Dental · Auto · Gyms · Pricing`, `px-2.5 py-2 text-sm font-medium rounded-md hover:bg-secondary`; language toggle (outline, h-11); accent CTA h-11 "Book a call".
- 768–1023: hide nav links, keep language toggle + header CTA, show 44px hamburger.
- <768: language toggle + hamburger; header CTA hidden; fixed bottom bar shows.
- Menu sheet: **render outside `<header>`** (backdrop-filter makes the header a containing block for `fixed` children). `fixed inset-x-0 top-14 bottom-0 z-50 bg-background border-t border-border overflow-y-auto`; mono eyebrow "Who we work with", 5 vertical links `py-3 px-2 text-lg font-medium rounded-md hover:bg-secondary`, divider, Pricing, then xl accent CTA. Lock body scroll while open.

### Hero
`grid-bg` section. Stack: mono eyebrow → h1 → lead `max-w-[600px] mt-6` → CTA row `mt-8 flex flex-wrap gap-x-6 gap-y-3 items-center` (xl accent "Book a call with Cris" + text link "See how it works →" with `min-h-11`) → metric strip `mt-[clamp(40px,5vw,64px)]` → qualifier `font-mono text-xs text-muted-foreground mt-4`.

### Metric strip (new, hero)
`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] rounded-xl bg-card shadow-card overflow-hidden`. Each cell `p-6 px-7 border-r border-b border-[#efece6] -mr-px -mb-px`: mono muted label "Typical", value, `text-sm text-muted-foreground mt-1.5` caption. Three cells: `20 to 40` recovered calls per month, per location · `10% to 20%` more quotes closed · `6 to 12 hrs` a week back, per location.

### Vertical card (Home, ×5)
`<a>` `flex flex-col min-h-[200px] p-5 rounded-[10px] bg-card shadow-card transition-[box-shadow,transform] duration-300 hover:shadow-card-hover hover:-translate-y-0.5`. Dealers card only: `border border-primary/60`; others `border border-transparent`. Content: mono number 01–05, h3 18px `mt-3.5`, desc `text-sm text-muted-foreground mt-2 flex-1`, "Learn more →" `text-sm font-medium text-primary mt-4`. Grid `grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-4`.

### Example card (Home, ×6)
`flex flex-col p-7 rounded-[10px] bg-card shadow-card` + same hover. No icons. Mono number 01–06, h3 19px, desc 15px `flex-1`, metric row `mt-5 pt-3 border-t border-border flex gap-2.5 items-baseline`: muted mono "Typical" + `font-mono text-sm font-semibold text-primary` value. Grid `minmax(300px,1fr) gap-4`. Note line under grid `text-sm text-muted-foreground mt-5 max-w-2xl`.

### How it works
Grid `grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 items-start`.
- **Audit card**: `p-[clamp(22px,3vw,36px)] rounded-xl bg-card border border-primary shadow-audit`. Row: step label (primary) + brass pill badge "Start here" (`rounded-full bg-accent text-white text-xs font-semibold uppercase tracking-[0.08em] px-3 py-1`). h3 `text-[clamp(24px,2.4vw,30px)]`. Price row `flex gap-3 items-baseline flex-wrap`: `$3,000` + `font-mono text-sm text-muted-foreground whitespace-nowrap` "/ Two weeks". Desc. Credit box `mt-6 rounded-md bg-secondary text-primary text-[15px] font-semibold text-center px-4 py-3`. xl accent CTA `mt-3 w-full`.
- **Build / Support** (stacked right column, `gap-3`): `p-7 rounded-[10px] bg-card/70 shadow-card`. Muted step label; title row `flex justify-between flex-wrap items-baseline`: h3 22px + `font-mono text-lg font-semibold text-primary` price; muted mono tag; desc 15px. No CTA.
- Under column: `text-sm text-muted-foreground px-1` "No retainer required. Build and support are never sold from this site."

### People card (×2)
`flex flex-wrap gap-5 p-7 rounded-[10px] bg-card shadow-card`. Portrait slot `w-28 h-[140px] shrink-0 rounded-md bg-secondary` (Placeholder component, label "photo / cris"). Text `flex-1 basis-[200px] min-w-0`: h3 20px, mono role `text-xs uppercase tracking-[0.08em] text-primary mt-1.5`, bio 15px `mt-3`.

### Trust band
`grid-bg-dark bg-primary text-white`. Eyebrow "05" `text-white/85`, h2 `max-w-2xl`. Grid `mt-10 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-8`; each item `border-t border-white/25 pt-4`: mono number `text-white/70`, h3 18px, desc `text-[15px] text-white/80`.

### Pricing teaser
`flex flex-wrap gap-x-10 gap-y-5 items-center justify-between p-[clamp(28px,3vw,40px)] rounded-xl bg-card shadow-card`. Text `flex-[1_1_420px]`: h2 `text-[clamp(24px,2.4vw,30px)]`, desc. Outline button lg "See pricing" `shrink-0`.

### Final CTA + named-person card (new)
Centered: h2 `text-[clamp(30px,3.4vw,44px)] tracking-[-0.03em] max-w-[720px]`, desc `max-w-[520px]`. Card `mt-9 w-full max-w-[420px] p-7 rounded-xl bg-card shadow-card text-left flex flex-col gap-4`: row with 56px `rounded-md bg-secondary` portrait slot + "Talk to Cris" `font-semibold` / "One person. No sales team." `text-sm text-muted-foreground`; xl accent CTA full width; `font-mono text-xs text-muted-foreground` "Reply within one business day · EN / ES".

### Mobile CTA bar (`MobileCtaBar.tsx`)
Unchanged structure; CTA height 48px, `rounded-md`. Show below `md`. Spacer `h-20` after main.

### Footer
`border-t border-border`. 3 columns `minmax(220px,1fr) gap-8 py-10`. Links `text-sm py-2.5 leading-6 block` (44px tap). Bottom bar `font-mono text-xs text-muted-foreground py-4 border-t`.

---

## 5. Motion
- Cards: `transition: box-shadow .3s ease, transform .3s ease`; hover lifts 2px and deepens shadow.
- Accent buttons: `transition: background .2s, transform .2s`; hover `scale(1.02)`.
- Respect `prefers-reduced-motion` (already in globals.css).

## 6. Responsive rules
- Breakpoints: <768 phone (bottom bar, hamburger), 768–1023 tablet (hamburger + header CTA), ≥1024 desktop nav.
- All grids use `auto-fit` minmax; no fixed heights on text boxes; `overflow-x: hidden` on body.
- Tap targets ≥44px everywhere (toggle, header CTA, footer links, hero secondary link).

## 7. Copy additions (add to en.json / es.json)
- `home.hero.eyebrow`: "Automations, chatbots and AI agents for local businesses" / "Automatizaciones, chatbots y agentes de IA para negocios locales"
- `home.hero.proof` shortened: "We build the systems that handle calls, scheduling, and follow-up, connected to the software you already use. You see the numbers before you spend a dollar on a build." / "Construimos los sistemas que manejan llamadas, citas y seguimientos, conectados al software que ya usa. Usted ve los números antes de gastar un dólar en construir algo."
- `home.stats[]`: three value/label pairs listed under Metric strip (ES: "20 a 40", "10% a 20%", "6 a 12 hrs").
- `home.how.noRetainer`: "No retainer required. Build and support are never sold from this site." / "No se requiere contrato mensual. La construcción y el soporte nunca se venden desde este sitio."
- `home.finalCta.talkTo` / `talkToSub` / `talkToMeta`: "Talk to Cris" / "One person. No sales team." / "Reply within one business day · EN / ES" (ES: "Hable con Cris" / "Una persona. Sin equipo de ventas." / "Respuesta en un día hábil · ES / EN").
- Nav short labels: Dealers · Home services · Dental · Auto · Gyms (ES: Distribuidores · Hogar · Dental · Automotriz · Gimnasios).

## 8. Assets
No images. Portrait and image slots stay as `Placeholder` blocks (`bg-secondary`) until photos exist (<80 KB each).

## 9. Files
- `Groundwork Home.dc.html`: full Home reference. Toggle EN/ES in the header; resize the window for phone/tablet/desktop.
- `Groundwork Style Sheet.dc.html`: tokens, type scale, spacing, grid spec, buttons, cards, reference patterns.
