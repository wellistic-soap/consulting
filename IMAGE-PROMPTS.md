# Image prompts

Prompts for DALL-E (or any image model) to fill the placeholder slots on the site. Every slot is a `Placeholder` component with a `data-image-slot` attribute; grep for the slot name to find where to swap in `next/image`.

## Style rules (paste at the start of every prompt)

> Editorial photograph, natural daylight, calm and professional. Warm off-white and deep green tones, one small rust-orange accent at most. Real working environment, no people looking at the camera, no text, no logos, no screens with UI, no robots, no glowing effects, no sparkles. Shallow depth of field. Composition leaves clear negative space on the left third.

Why: the palette is deep green `#1f4d3a`, off-white `#faf7f2`, rust `#c2410c`. Images sit beside serif headlines, so they need to be quiet. Negative space matters because the hero grid crops images to 4:3 on tablet and wider.

## Export specs

| Slot | Where | Size to generate | Final asset |
| --- | --- | --- | --- |
| `dealers-hero` | Dealers page hero | 1792 x 1024 (wide) | crop to 1200 x 900, WebP, under 80 KB |
| `homeServices-hero` | Home services hero | 1792 x 1024 | same |
| `dental-hero` | Dental hero | 1792 x 1024 | same |
| `auto-hero` | Auto hero | 1792 x 1024 | same |
| `gyms-hero` | Gyms hero | 1792 x 1024 | same |
| `portrait-oz`, `portrait-cris` | Home, "Who we are" | use real photos, not generated | 400 x 400 square, WebP, under 40 KB |
| OG image | `/api/og` | none needed (rendered text card) | optional 1200 x 630 background |
| Logo | header and footer | none from DALL-E; commission a vector | SVG |

Keep every hero under 80 KB so vertical pages stay under the 500 KB weight budget. Use `sharp` or Squoosh to convert to WebP at quality 75.

## Vertical hero prompts

**dealers-hero**
> [style rules] A modern agricultural equipment dealership service bay in the early morning. A green tractor and a combine header in the background, slightly out of focus. In the foreground, a clean parts counter with a few boxed parts and a handheld phone resting on the counter. Wide angle, left third of the frame is a plain wall in warm light.

**homeServices-hero**
> [style rules] A fleet of white service vans parked in a row outside a small commercial building at sunrise, ladders on the roof racks. Dew on the pavement. One van has its side door open showing organized tools. Left third of the frame is open sky and pavement.

**dental-hero**
> [style rules] A calm dental office front desk area with a wood counter, a small plant, and a landline phone. Treatment room door open in the background, chair visible but empty. Morning light through a window. Left third of the frame is a plain wall.

**auto-hero**
> [style rules] An independent auto repair shop with two lift bays, one car raised, tools neatly arranged on a rolling cart. A service desk with a tablet lying flat, screen off. Overhead lights on, daylight from the open bay door. Left third of the frame is the plain shop floor.

**gyms-hero**
> [style rules] A modern gym front desk with a wood counter, water bottles, and a wall clock, empty at opening time. Rows of equipment out of focus behind glass. Soft morning light. Left third of the frame is the plain counter surface.

## Home page supporting images (optional, not slotted yet)

If you want a quiet image behind the "How it works" section later, generate one abstract:

**how-it-works-texture**
> Minimal abstract composition of three overlapping rounded rectangles in deep green, pale sage, and warm off-white on a cream background. Flat design, no gradients, no shadows, no text. Lots of empty space. Suitable as a subtle background texture.

## OG background (optional)

**og-background**
> A very subtle abstract background for a social card: cream `#faf7f2` field with one soft deep-green block in the bottom right corner and a thin rust-orange line. Flat, no texture, no text. 1200 x 630.

## What not to generate

- Portraits of Oz or Cris. Use real photos.
- Anything with a John Deere or other manufacturer logo. The site mentions dealers by name in copy, not imagery.
- Screens showing chat bubbles, dashboards, or "AI" visuals. The brief bans robot and sparkle imagery.
