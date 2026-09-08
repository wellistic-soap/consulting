# Image prompts

Prompts for DALL-E to fill the image slots on the site. Every slot is a `Placeholder` component with a `data-image-slot` attribute; grep for the slot name to find where to swap in `next/image`.

## Style block (paste at the start of every prompt)

> Editorial photograph, natural morning light, calm and precise, like a photo in an engineering firm's annual report. Muted palette: warm off-white, slate blue-gray, and one small brass or amber accent at most. Real working environment. No people facing the camera, no text, no logos, no screens showing software, no robots, no glowing effects. Shallow depth of field. Composition leaves clear empty space on the left third of the frame.

Why: the palette is slate `#24384d`, off-white `#f8f6f1`, brass `#b45309`. Photos sit beside tight sans headlines and mono labels, so they need to stay quiet. Left-side negative space matters because hero slots crop to 4:3 on tablet and wider.

## Slots and sizes

| Slot | Where | Generate at | Deliver as |
| --- | --- | --- | --- |
| `dealers-hero` | Dealers page hero, tablet and up | 1792 x 1024 | crop 1200 x 900, WebP, under 80 KB |
| `homeServices-hero` | Home services hero | 1792 x 1024 | same |
| `dental-hero` | Dental hero | 1792 x 1024 | same |
| `auto-hero` | Auto hero | 1792 x 1024 | same |
| `gyms-hero` | Gyms hero | 1792 x 1024 | same |
| `agencies-hero` | Marketing agencies hero | 1792 x 1024 | same |
| `portrait-oz`, `portrait-cris` | Home, "Who we are" (112 x 140 slot) | real photos, not generated | 448 x 560 (4:5), WebP, under 40 KB |
| `portrait-cris-small` | Home, "Talk to Cris" card (56 x 56) | same photo of Cris, square crop | 224 x 224, WebP, under 15 KB |

Keep every hero under 80 KB so vertical pages stay under the 500 KB budget. Convert with Squoosh or `sharp` at WebP quality 75.

## Vertical hero prompts

**dealers-hero**
> [style block] A modern agricultural equipment dealership service bay early in the morning. A green tractor and a combine header in the background, out of focus. In the foreground, a clean parts counter with a few boxed parts and a desk phone resting on it. Wide angle. The left third of the frame is a plain wall in soft light.

**homeServices-hero**
> [style block] A row of white service vans parked outside a small commercial building at sunrise, ladders on the roof racks, dew on the pavement. One van's side door is open showing neatly organized tools. The left third of the frame is open sky and empty pavement.

**dental-hero**
> [style block] A calm dental office front desk with a light wood counter, a small plant, and a desk phone. A treatment room door is open in the background with the chair empty. Soft morning light through a window. The left third of the frame is a plain wall.

**auto-hero**
> [style block] An independent auto repair shop with two lift bays, one car raised, tools arranged on a rolling cart. A service desk with a tablet lying face down. Overhead lights on, daylight through the open bay door. The left third of the frame is the plain shop floor.

**gyms-hero**
> [style block] A modern gym front desk with a wood counter, a row of water bottles, and a wall clock, empty at opening time. Equipment out of focus behind glass. Soft morning light. The left third of the frame is the plain counter surface.

**agencies-hero**
> [style block] A marketing agency's glass-walled meeting room mid-morning. Three people seen from behind and in profile, leaning over a long wood table covered with printed campaign mockups, sticky notes, and two closed laptops. A large window behind them with soft light. Faces turned toward the table, not the camera. The left third of the frame is the plain glass wall and floor.

## Optional

**og-background** (only if you want a texture behind the social card)
> A very subtle abstract background for a social card: warm off-white field with one soft slate blue-gray block in the bottom right corner and a thin brass line. Flat, no gradient, no texture, no text. 1200 x 630.

## Do not generate

- Portraits of Oz or Cris. Use real photos.
- Manufacturer logos of any kind (John Deere or otherwise).
- Screens with chat bubbles, dashboards, or "AI" visuals. The brief bans robot and sparkle imagery.
