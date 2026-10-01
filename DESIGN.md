# DESIGN.md: visual and interaction system

This is the source of truth for how the site looks and behaves. Follow it exactly. If you need something it doesn't cover, ask.

---

## 1. Concept

**An instrument panel for an ML engineer.** The look is inspired by Nothing's design language (monochrome, typographic, industrial, dot-matrix) but it is **not Nothing branding**: no Nothing logos, product names or wordmarks.

- **Dark mode** (default) feels like an instrument panel in a dark room: OLED black with white data glowing.
- **Light mode** feels like a printed technical manual: off-white paper and black ink.

**The design principle:** everything is quiet and strict except **two signature moments**, and those two moments are also the proof of the work.

1. **Hero: the denoising portrait** (§10). Manideep's photo forms out of random dots, the way a diffusion model turns noise into an image. A step counter runs `t=1000 → t=0000`.
2. **Now building: the eval board** (§11). A dot-matrix board, like a train departure board, showing what's in progress and the numbers being tracked.

Nothing else on the page competes with these two. If a new element draws attention, it's wrong.

**Three rules that hold everywhere:**
- **One break per screen.** Each viewport-sized area has exactly one thing that breaks the pattern: an oversized number, the portrait, a Doto headline, or a vast gap where everything else is tight. One.
- **Red is an interrupt, not decoration.** `--accent` red appears in at most one place per screen, and only to say "look here, now" (the `DENOISING` indicator in the hero). If nothing is urgent, nothing is red.
- **Show, don't claim.** Numbers, statuses and dates instead of adjectives.

---

## 2. Color tokens

Define these in `src/styles/tokens.css` on `:root[data-theme="dark"]` and `:root[data-theme="light"]`. Components use **only** these variables.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#000000` | `#F5F5F5` | Page background |
| `--surface` | `#111111` | `#FFFFFF` | Raised areas: eval board, row hover |
| `--surface-raised` | `#1A1A1A` | `#F0F0F0` | Toast, mobile menu sheet |
| `--border` | `#222222` | `#E8E8E8` | Decorative hairlines only |
| `--border-visible` | `#333333` | `#CCCCCC` | Intentional borders: rows, board, buttons |
| `--text-disabled` | `#666666` | `#999999` | Decorative only, never for meaningful text |
| `--text-secondary` | `#999999` | `#666666` | Labels, captions, metadata |
| `--text-primary` | `#E8E8E8` | `#1A1A1A` | Body text |
| `--text-display` | `#FFFFFF` | `#000000` | Headlines, hero name, metric values, portrait dots |
| `--interactive` | `#5B9BF6` | `#0062CC` | Inline text links inside paragraphs only. Not buttons. |

The light `--interactive` is `#0062CC` (5.32:1 on `--bg`). The earlier `#007AFF` measured 3.68:1, which fails the 4.5:1 AA minimum for inline link text.

**Mode-independent tokens:**

| Token | Value | Use |
|---|---|---|
| `--accent` | `#D71921` | The interrupt signal. Max one per screen. |
| `--success` | `#4A9E5C` | Status: shipped, ready |
| `--warning` | `#D4A843` | Status: building, in progress |
| `--accent-subtle` | `rgba(215,25,33,0.15)` | Reserved. Don't use without asking. |

**Status colors color the dot or value only**, never a background or a label. Labels stay `--text-secondary`.

No gradients, glows, shadows, blur, glassmorphism, or colors outside this table.

---

## 3. Typography

### Fonts (self-hosted via Fontsource; never load from a Google Fonts CDN at runtime)

| Role | Font | Package | Weights used |
|---|---|---|---|
| Display (dot-matrix) | **Doto** | `@fontsource-variable/doto` | 700 only |
| Body / UI / headings | **Space Grotesk** | `@fontsource-variable/space-grotesk` | 300, 400, 500 |
| Labels / data / mono | **Space Mono** | `@fontsource/space-mono` | 400 only |

Load the Latin subset only. `font-display: swap`. Preload the Doto and Space Grotesk woff2 files used above the fold.

### Type scale (tokens in `tokens.css`; these are the only sizes allowed)

| Token | Size | Line height | Tracking | Font | Use |
|---|---|---|---|---|---|
| `--fs-hero` | `clamp(56px, 8vw, 128px)` | 0.9 | -0.02em | Doto 700 | Hero name only |
| `--fs-display` | 48px (mobile 40px) | 1.0 | -0.01em | Doto 700 | Eval-board values, project result numbers, 404 |
| `--fs-title` | `clamp(36px, 4.5vw, 56px)` | 1.05 | -0.02em | Space Grotesk 300 | Section titles |
| `--fs-heading` | 28px (mobile 24px) | 1.15 | -0.01em | Space Grotesk 400 | Project titles |
| `--fs-lead` | `clamp(20px, 2vw, 24px)` | 1.35 | -0.005em | Space Grotesk 300 | Hero pitch, contact email |
| `--fs-body` | 16px | 1.6 | 0 | Space Grotesk 400 | Body text |
| `--fs-small` | 14px | 1.5 | 0.01em | Space Grotesk 400 | Secondary body |
| `--fs-label` | 11px | 1.2 | 0.08em | Space Mono 400, UPPERCASE | All labels, nav, tags, buttons, status bar |
| `--fs-caption` | 12px | 1.4 | 0.04em | Space Mono 400 | Dates, footnotes |

### Rules
- **Doto only at 40px and above**, and never for body text or anything longer than ~16 characters.
- **Labels are always Space Mono, uppercase, 11px, letter-spacing 0.08em.** They are the "instrument panel" voice: section numbers, nav, tags, button text, statuses, the status bar.
- **Numbers that are data** (metrics, counts, dates, times) are always Space Mono or Doto, never Space Grotesk. Use `font-variant-numeric: tabular-nums` where numbers update.
- **Headings are sentence case** in Space Grotesk 300/400. Big, light and calm. (Uppercase headings are reserved for labels. This is a deliberate contrast with heavy all-caps portfolio styles.)
- At most four levels of hierarchy on any screen: Doto display → Space Grotesk heading → Space Mono label → Space Grotesk body.
- Max line length for body text: 64ch.

---

## 4. Spacing scale (8px base)

`--space-2xs: 2px` · `--space-xs: 4px` · `--space-sm: 8px` · `--space-md: 16px` · `--space-lg: 24px` · `--space-xl: 32px` · `--space-2xl: 48px` · `--space-3xl: 64px` · `--space-4xl: 96px` · `--space-5xl: 160px`

- Section vertical padding: `--space-5xl` desktop, `--space-4xl` tablet, `--space-3xl` mobile.
- Gap between a section header and its content: `--space-2xl`.
- **Rhythm through contrast:** keep things tight inside a group (8–16px) and generous between groups (48–160px). Never uniform medium spacing everywhere.

---

## 5. Layout and grid

- **Container:** `max-width: 1440px`, side padding `clamp(16px, 4vw, 48px)`.
- **Grid:** 12 columns, gutter 24px (desktop), 8 columns with gutter 16px (tablet), 4 columns with gutter 16px (mobile).
- **Breakpoints:** mobile `< 640px`, tablet `640–1023px`, desktop `≥ 1024px`, wide `≥ 1440px`.
- **No horizontal scroll at any width from 320px up.**
- **Section header pattern** (every section except the hero):
  ```
  01 / NOW BUILDING                       ← --fs-label, --text-secondary
  ─────────────────────────────────────── ← 1px --border-visible, full width
  What I'm working on right now.          ← --fs-title, --text-display, cols 1–8
  ```
  Section numbers are computed from the rendered order, so they stay right if a section is hidden.
- **Hairlines** (1px `--border-visible`) structure the page. Use them instead of cards and boxes.
- **Radius:** two values only. `--radius-sm: 4px` for the eval board, toast and focus outlines. `--radius-pill: 999px` for buttons, tags and chips. Everything else has square corners.
- **Background dot grid:** used only in the hero (behind the text column) and inside the eval board:
  ```css
  .dot-grid { background-image: radial-gradient(circle, var(--border-visible) 1px, transparent 1px); background-size: 16px 16px; }
  ```
  Opacity 0.5 in the hero. Never on buttons or as a border.

---

## 6. Motion

- **Durations:** `--dur-micro: 150ms` (hover, press) · `--dur-base: 250ms` (toggles, menu) · `--dur-slow: 400ms` (section reveals)
- **Easing:** `--ease: cubic-bezier(0.25, 0.1, 0.25, 1)`. Ease-out only, with no spring, bounce or overshoot.
- **Prefer opacity over position.** Elements fade; they don't slide or fly in.
- **Section reveal:** on first entering the viewport (IntersectionObserver, threshold 0.15), section contents fade from opacity 0 to 1 over `--dur-slow`, with children staggered 60ms and at most 5 staggered children. Each section reveals once. Content must be visible without JS (add the hide class from JS only).
- **Hover:** borders and text brighten (for example `--text-secondary` → `--text-display`) over `--dur-micro`. No scale, no shadow, no movement.
- **Only two "big" animations exist:** the portrait denoise (§10) and the eval-board scramble (§11).
- **Micro-interactions (the small details; these are the only extras allowed, build all of them):**
  1. **LED blink.** The status dot of every `building` chip blinks like a hardware LED: opacity 1 → 0.25 → 1 on a 1600ms `steps(1)` loop. Static under reduced motion.
  2. **Section label scramble.** When a section header enters view, its label (`02 / WORK`) scrambles through random characters for 400ms using the same routine as the eval board (§11.2), then locks. Once per section. The real text is in the DOM from the start.
  3. **Nav hover marker.** On hover or focus, a `●` (4px, `--text-display`) fades in 8px to the left of the nav label over `--dur-micro`. The current section keeps its underline.
  4. **Arrow nudge.** The one allowed exception to "nothing moves": the `↗` in buttons and links shifts 2px right and 2px up on hover over `--dur-micro`. Nothing else moves.
  5. **Keyboard shortcuts** (ignored while typing in a field or when a modifier key is held): `1`–`9` jump to the nth rendered section, `T` toggles theme, `G` opens GitHub, `?` opens a small shortcuts sheet (a `role="dialog"` panel in `--surface-raised`, centered, max-width 360px, listing each key in Space Mono beside its action; focus trapped; `Esc` or `CLOSE` closes it and returns focus). Discoverability: the status bar shows `PRESS ? FOR KEYS`, and the footer has a text button `KEYBOARD SHORTCUTS` that opens the same sheet (so keyboard and screen-reader users can find it too).
  6. **Tab-title presence.** When the tab is hidden, `document.title` becomes `still here — Manideep Thumu`; it restores on return.
  7. **Copy feedback.** After copying the email, the address briefly (800ms) swaps to `COPIED` in `--fs-label`, together with the toast.
  8. **Experience row hover.** The year label brightens from `--text-secondary` to `--text-display` (colour only).
- **`prefers-reduced-motion: reduce`:** no reveals (everything visible), the portrait renders its final frame instantly with no cursor interaction, the eval board shows final values instantly, and all transitions are ≤ 1ms.

---

## 7. Components

Every interactive component needs these states: default, hover, `:focus-visible`, active (pressed), and where relevant, current or selected.

**Global focus style:** `outline: 2px solid var(--text-display); outline-offset: 3px; border-radius: var(--radius-sm);`. Visible in both themes and never removed.

### 7.1 Nav (top, fixed)
- 64px tall. Transparent at the top of the page. After 24px of scroll, background `--bg` with a 1px `--border` bottom border (fade over `--dur-base`).
- **Left:** monogram `MT` set as `--fs-label` in Space Mono inside a 32×32 square with a 1px `--border-visible` border. Links to top.
- **Center (desktop):** generated from the rendered sections, e.g. `01 NOW` `02 WORK` `03 BEYOND` `04 ABOUT` `05 CONTACT`, in `--fs-label`, `--text-secondary`, gap `--space-xl`. The **current section** (IntersectionObserver) is `--text-display` with a 1px underline 4px below.
- **Right:** theme toggle (§7.9), then a **secondary** button `RESUME ↗` (hidden if no resume URL). It's secondary because the hero already has the primary Resume button, and only one primary is allowed per screen.
- **Mobile (< 768px):** monogram left, a `MENU` text button right (44×44 hit area). This opens a full-screen sheet (`--surface-raised`) with the section links at `--fs-heading` size, the theme toggle and resume. Focus is trapped inside; `Esc` and the `CLOSE` button close it, and focus returns to `MENU`. Body scroll is locked while open.
- Includes a **skip link** ("Skip to content"), visually hidden until focused.

### 7.2 Buttons
All buttons: `--fs-label` text, pill radius, height 44px, horizontal padding 20px, `↗` suffix for external links.
- **Primary:** background `--text-display`, text `--bg`. Hover: background `--text-primary`. Only **one primary button per screen**.
- **Secondary:** transparent, 1px `--border-visible` border, `--text-primary` text. Hover: border and text go to `--text-display`.
- **Text link button:** no border; `--text-secondary` → `--text-display` on hover; used for `CODE ↗`, `DEMO ↗` and similar.
- External links: `target="_blank" rel="noopener noreferrer"`, and the accessible name includes "(opens in new tab)" via visually hidden text.

### 7.3 Tag (tech stack)
`--fs-label`, `--text-secondary`, 1px `--border` border, pill, height 24px, padding 0 10px. Not interactive, no hover.

### 7.4 Status chip
Inline: `●` dot + label in `--fs-label`. The dot is colored by status; the label is `--text-secondary`.

| Status | Dot color | Label |
|---|---|---|
| `building` | `--warning` | `BUILDING` |
| `shipped` | `--success` | `SHIPPED` |
| `planned` | `--text-secondary` | `PLANNED` |
| `paused` | `--text-disabled` | `PAUSED` |

### 7.5 Project row (Selected work)
Rows separated by 1px `--border-visible` hairlines, not cards.

**Desktop grid (12 columns):**
- **Cols 1–2:** index `001` (`--fs-label`, `--text-secondary`), status chip under it.
- **Cols 3–8:** title (`--fs-heading`, `--text-display`, links to the primary URL), one-line description (`--fs-body`, `--text-primary`, max 2 lines), then a row of tags. If the project has a `role` (team projects), show it as a `--fs-caption` line: `ROLE — Backend, AI integration`.
- **Cols 9–12:** **Result block.** Label `RESULT` (`--fs-label`, secondary). Value in Doto `--fs-display` with the unit beside it in `--fs-label` (e.g. `0.82` + `ACCURACY`). If the result is `null`, show `IN PROGRESS` in `--fs-label` with the status dot, and **no fake number**. Below that are the link buttons (`DEMO ↗`, `CODE ↗`, `WRITE-UP ↗`), rendering only the links that exist.
- Row padding: `--space-2xl` vertical.
- Hover (on the row, desktop): background `--surface`, and a `↗` fades in after the title, over `--dur-micro`. Nothing moves.

**Mobile:** a single column stacked in this order: index + status → title → description → result block → tags → links.

**Experiment ladder** (only for projects that define `experiments`, i.e. FilingLens): a horizontal sequence under the description:
```
BASELINE      →  + HYBRID SEARCH  →  + RERANK      →  + FINE-TUNED RERANKER
— —              — —                 — —              — —
```
Labels in `--fs-label`, values in Space Mono at `--fs-lead` size. A `null` value shows `— —` in `--text-disabled`. The best non-null value is `--text-display`; the others are `--text-secondary`. On mobile it becomes a vertical list.

### 7.6 Skills block
Two columns (stacked on mobile), each a label and a plain list:
- `USE IN PROJECTS` with items in `--fs-body`, separated by ` · `
- `LEARNING NOW`, same style, `--text-secondary`.

No logos, icons, progress bars or percentages.

### 7.7 Copy-email control (Contact)
- The email address in `--fs-lead`, `--text-display`, is a `<button>`. Clicking it copies the address to the clipboard and shows the toast `COPIED TO CLIPBOARD`. If the clipboard API fails, it falls back to selecting the text.
- Next to it is a secondary button `OPEN MAIL ↗` (`mailto:` link).

### 7.8 Toast
Bottom center, 16px above the status bar. `--surface-raised`, 1px `--border-visible`, `--radius-sm`, `--fs-label`. Fades in over 150ms, holds 1800ms, fades out over 250ms. `role="status"` and `aria-live="polite"`. One toast at a time.

### 7.9 Theme toggle
A 44×44 button labelled `○` (shown in dark mode, meaning "switch to light") or `●` (in light mode), with an `aria-label` of "Switch to light theme" or "Switch to dark theme".
- Default: follow `prefers-color-scheme`; if there's no preference, use dark.
- Remember the choice in `localStorage` (wrapped in try/catch). An **inline script in `<head>`** sets `data-theme` before first paint, so there's no flash.
- Switching themes repaints the portrait canvas in the new dot color without replaying the animation.

### 7.10 Status bar (fixed bottom; desktop and tablet ≥ 768px only)
- 32px tall, `--bg`, 1px `--border` top border, `--fs-label`, `--text-secondary`, `aria-hidden="true"` (decorative, since the same information is available elsewhere).
- Five slots with `justify-content: space-between`:
  1. `SEC 02 / WORK`: the current section, in sync with the nav.
  2. `SCROLL 034%`: zero-padded, tabular numbers, updated with rAF throttling.
  3. `PRESS ? FOR KEYS` (hidden below 1024px).
  4. `BLR 23:25 IST`: the current time in `Asia/Kolkata` via `Intl.DateTimeFormat`, updated every 30s.
  5. `BUILD a1b2c3d · 01 OCT 2026`: the short git SHA and build date, injected at build time.
- `body` gets `padding-bottom: 32px` so the bar never covers content.

### 7.11 Footer
A single row above the status bar: `© 2026 MANIDEEP THUMU` · `BUILT WITH ASTRO` · `SOURCE ↗` (repo link) · `KEYBOARD SHORTCUTS` (button, opens the sheet) · `LAST UPDATED 01 OCT 2026`. `--fs-label`, `--text-secondary`. Wraps to two lines on mobile.

### 7.12 Experience row (Outside the editor)
Deliberately lighter than project rows: hairline-separated, no result block, no tags.

**Desktop grid (12 columns):**
- **Cols 1–2:** year in `--fs-caption`, `--text-secondary`.
- **Cols 3–8:** title in `--fs-heading` (`--text-display`), with the organisation or event beneath it in `--fs-label`, `--text-secondary`.
- **Cols 9–12:** one line of context in `--fs-small`, `--text-primary`, max 2 lines. If the entry has a `highlight` (e.g. `3RD PLACE`), show it above that line as a pill chip (`--fs-label`, 1px `--border-visible` border, `--text-display`). Never red.
- Row padding `--space-xl` vertical (tighter than project rows, since these matter less than the work).

**Mobile:** single column: year → title → organisation → highlight chip → context line.

Under the list, a `--fs-caption` note is optional; do not add filler.

---

## 8. Iconography
- **No icon library.** The only symbols are `↗` (external link), `→` (sequence), `●` and `○` (status, theme), `↻` (replay) and `—`.
- **Symbols are drawn, not font glyphs.** Doto, Space Grotesk and Space Mono contain none of `↗ → ● ○ ↻`, so a font would fall back to a different system font on every OS. Instead:
  - `↗ → ↻` are inline SVGs with a 1.5px monoline stroke, round caps and joins, `currentColor`, sized to `1em` (11px in labels). Stroke width is the `--glyph-stroke` token.
  - `●` and `○` are plain CSS circles (`--radius-pill`), sized by `--glyph-dot-size`. Status color comes from a `--dot-color`, so the LED blink and status colors work on them.
  - Every drawn symbol is `aria-hidden="true"`; the real accessible text ("opens in new tab", "Replay portrait animation") is always provided separately.
  - All of them come from one component, `src/components/Glyph.astro`. Change a symbol there and nowhere else.
  - `—` is a normal text character (all three fonts have it).
- No emoji anywhere.
- Favicon: an SVG of a 5×5 dot-matrix "M" in `#FFFFFF` on `#000000`.

---

## 9. Imagery
- **The only image on the site is the portrait** (as the dot canvas plus its static fallback). No stock photos, illustrations, screenshots in the hero, or decorative images.
- Project screenshots are allowed later, inside project write-ups only, shown in greyscale at 100% opacity in a 1px `--border-visible` frame.

---

## 10. Signature 1: the denoising portrait (hero)

### 10.1 What the visitor experiences
1. The page loads. The name, pitch and buttons are **immediately visible as normal HTML**, with no loading screen and no waiting.
2. In the portrait area, a field of white dots starts out as random static. Over **2.2 seconds** the dots settle into Manideep's face and shoulders. Meanwhile the label `● DENOISING` (red dot) shows, and a counter `STEP t=1000` counts down to `t=0000`.
3. When settled, the label changes to `● READY` (green dot) and the animation **stops completely** (no idle CPU use).
4. **Desktop:** moving the pointer over the portrait scatters nearby dots back into noise, and they re-settle on their own. **Touch:** tapping sends out a small scatter ripple at the tap point. Page scrolling is never blocked.
5. A small text button `↻ RESAMPLE` next to the counter replays the full denoise.

### 10.2 Hero layout
- **Desktop (≥ 1024px):** hero height `min(100svh, 960px)` minus the nav.
  - **Text column, cols 1–6**, bottom-aligned with `--space-4xl` bottom padding. Top to bottom:
    1. Status chip line: `● OPEN TO ML/AI INTERNSHIPS — REMOTE` (dot is `--success`)
    2. Name in Doto `--fs-hero` on two lines: `MANIDEEP` / `THUMU`
    3. Pitch in `--fs-lead`, `--text-primary`, max 28ch
    4. Buttons: primary `RESUME ↗`, then secondary `GITHUB ↗`, `LINKEDIN ↗`
    5. Meta line in `--fs-label`, secondary: `BENGALURU, IN · SCALER + IIT MADRAS · CLASS OF 2029`
  - **Portrait, cols 7–12**, full hero height. The portrait is **bottom-anchored**: the shoulders touch the bottom edge of the hero, which looks cinematic. Top-right corner of the portrait area: `STEP t=1000` · `● DENOISING` · `↻ RESAMPLE` in `--fs-label`.
  - Dot-grid background (§5) behind the text column only, at 50% opacity.
- **Tablet:** same as desktop, with the split at cols 1–4 for text and 5–8 for the portrait.
- **Mobile (< 640px):** portrait on top at `46svh`, bottom-anchored, with the counter row overlaid at its top-left. The name follows, overlapping the bottom of the portrait by `--space-lg` (z-index above the canvas, no background). Then the pitch, buttons (full-width, stacked: Resume, then GitHub and LinkedIn side by side) and meta line. **On a 375×812 screen, the name, pitch and Resume button must all be visible without scrolling.**

### 10.3 Asset pipeline (see BRIEF §7 for the user steps)
- The source photo lives at `src-assets/portrait.png`: a **PNG with a transparent background** (gitignored). The transparency is the mask that separates Manideep from the background; the brightness gives the dot sizes. Keeping them separate is what lets the portrait look right in both themes.
- `npm run portrait` runs `tools/build-portrait.mjs`, which does two things:
  1. With **sharp**: rotate per EXIF, crop to a 4:5 portrait centred on the subject (crop box in `portrait.config.ts`), convert the colour channels to greyscale **while keeping the alpha channel**, `normalise()` the greyscale, and resize to **240 px wide**. Writes `public/portrait/portrait-gray.png` (greyscale + alpha, target under 25 KB). If the source has no transparency, the script stops with a clear message asking for a background-removed PNG.
  2. With **Playwright**: opens the dev page `/dev/portrait?render=final`, waits for the final frame, and screenshots the canvas to:
     - `public/portrait/portrait-fallback-dark.png` and `-light.png` (1200 px wide, white dots on black and black dots on off-white)
     - `public/og.png` (1200×630): the portrait on the right half, and `MANIDEEP THUMU` in Doto plus the pitch on the left, dark theme.
- **If `src-assets/portrait.png` doesn't exist,** the script generates a placeholder silhouette (head ellipse and shoulders with soft side lighting on a transparent background, rendered from an SVG by sharp) so everything works before the real photo arrives.

### 10.4 Rendering algorithm (`src/scripts/portrait.ts`, config in `src/data/portrait.config.ts`)
1. **Load** `portrait-gray.png` into an offscreen canvas and read its pixels.
2. **Grid sample:** divide the target area into square cells of size `cell` (CSS px). For each cell, average the luminance `L` in [0, 1] and the alpha `A` in [0, 1].
3. **Mask:** **skip the cell if `A < alphaThreshold`.** This removes the background in both themes.
4. **Tone curve:** `v = clamp((L - 0.5) * contrast + 0.5, 0, 1) ** gamma`.
5. **Theme mapping:** the dots are "ink" in the theme's display colour. In dark mode (white dots on black), bright skin should get big dots, so `ink = v`. In light mode (black dots on paper, like a printed halftone), dark areas should get big dots, so `ink = 1 - v`. This is `invert: { dark: false, light: true }` in config. Without this, light mode looks like a photo negative.
6. **Dot radius:** `r = minRadius + ink * (cell * maxRadiusFactor - minRadius)`. Every in-mask cell gets at least `minRadius`, so the silhouette (hair and shoulders included) stays readable even in the darkest areas.
7. **Cap:** if the point count exceeds `maxPoints`, increase `cell` by 1px and resample until it's under the cap.
8. **Start positions:** a seeded PRNG (mulberry32, `seed` from config) assigns each point a start position spread uniformly across the whole portrait area. The same seed gives the same animation every visit.
9. **Animate:** progress `p = clamp(elapsed / durationMs, 0, 1)`, eased `a = 1 - (1 - p) ** 3`.
   - Position = `lerp(start, target, a) + offset + jitter`, where jitter is a random ±`jitterPx * (1 - a)` per frame.
   - Radius = `r * (0.5 + 0.5 * a)`.
   - Counter = `t=` + `round(1000 * (1 - p))` zero-padded to 4 digits.
10. **Pointer:** for each point within `cursorRadius` of the pointer, add a random impulse scaled by `(1 - d / cursorRadius) * cursorForce` to its `offset`. Each frame, decay offsets with `offset *= decay ** (dt / 16.67)` so the behaviour is frame-rate independent. On touch, apply one impulse of `cursorForce * 1.5` at the tap point.
11. **Draw efficiently:** a single `fillStyle` (read `--text-display` from CSS), one `beginPath()` per frame, `moveTo` plus `arc` for every dot, and one `fill()`. No per-dot paths.
12. **Stop the loop** when `p === 1`, every `|offset| < 0.05` and the pointer is outside the canvas. Restart on pointer movement over the canvas, a tap, resample or a theme change (theme change = a single redraw).
13. **Pause** when the canvas leaves the viewport (IntersectionObserver) or `document.hidden` is true.
14. **Device pixel ratio:** canvas backing store scaled by `min(devicePixelRatio, 2)`.
15. **Resize:** debounce 150ms, recompute targets, and keep the settled state (no replay).
16. **Reduced motion:** render the final frame once, show `t=0000 · ● READY`, disable pointer scatter, and still show `↻ RESAMPLE` (which then just redraws).
17. **No JS / before first frame:** a static `<img>` (the fallback PNG for the current theme) sits in the portrait area. The canvas is layered on top and only becomes visible after its first frame is drawn, so there's no blank flash.
18. **Accessibility:** the portrait wrapper is `role="img"` with `aria-label="Portrait of Manideep Thumu"`. The canvas, counter and status are `aria-hidden="true"`. `↻ RESAMPLE` is a real `<button>` with `aria-label="Replay portrait animation"`.

### 10.5 Default config (`portrait.config.ts`; every value tunable on `/dev/portrait`)
```ts
export const portraitConfig = {
  crop: { left: 0, top: 0, width: 1, height: 1 }, // fractions of the source image
  cellDesktop: 5, cellMobile: 7,          // CSS px
  maxPointsDesktop: 9000, maxPointsMobile: 3500,
  contrast: 1.25, gamma: 1.35, alphaThreshold: 0.5,
  minRadius: 0.5, maxRadiusFactor: 0.5,
  durationMs: 2200, jitterPx: 6,
  cursorRadius: 70, cursorForce: 14, decay: 0.88,
  seed: 7,
  invert: { dark: false, light: true },   // see §10.4 step 5
};
```

### 10.6 Tuning page `/dev/portrait`
Unlinked, with `<meta name="robots" content="noindex">` and excluded from the sitemap. It shows the portrait canvas at desktop size, plus sliders for every numeric config value and toggles for theme and invert, a mask overlay toggle (shows the alpha mask in red at 30% so bad background removal is obvious), all applied live. It has a `↻ RESAMPLE` button, a live point count, and a **`COPY CONFIG`** button that copies the current values as the `portraitConfig` object. With `?render=final` it renders the final frame instantly, without the UI (used by the build script).

---

## 11. Signature 2: the eval board (Now building)

### 11.1 Look
- A single board: `--surface` background with the dot grid inside, 1px `--border-visible` border, `--radius-sm`, full container width.
- Semantically a real `<table>` with the `<caption>` "Projects in progress" (visually hidden).
- **Columns:** `ID` · `PROJECT` · `STATUS` · `TRACKING` · `VALUE` · `UPDATED`
  - Header row: `--fs-label`, `--text-secondary`, 1px `--border` bottom border.
  - `ID`: `--fs-label` (`001`).
  - `PROJECT`: `--fs-heading`, `--text-display`, linking to the project's row in Selected work.
  - `STATUS`: status chip (§7.4).
  - `TRACKING`: what's being measured, in `--fs-label` (e.g. `EVAL QUESTIONS WRITTEN`, `MAE VS BASELINE`).
  - `VALUE`: **Doto `--fs-display`**, `--text-display`, tabular. Progress values read like `062/150`. A `null` value renders `— —` in `--text-disabled`.
  - `UPDATED`: `--fs-caption`, date as `01 OCT`.
- Row height 96px desktop. Rows separated by 1px `--border`.
- Below the board, as a `--fs-caption` note: `Numbers update as I build. Nothing here is projected.`

### 11.2 Scramble animation
- Triggered once, when the board is 40% in view.
- Each VALUE cell cycles through random characters from `0123456789—/` every 40ms for 600ms, then locks to its final value. Rows stagger by 120ms.
- `null` values scramble too, then lock to `— —`.
- The final text is in the DOM from the start (for screen readers and no-JS). The scrambling characters render in an `aria-hidden` overlay span, and the real text is hidden visually only while scrambling.
- Reduced motion: no scramble.

### 11.3 Mobile (< 768px)
Each row becomes a stacked block (CSS grid on `<tr>`/`<td>` with `display: grid`). Line 1: ID + PROJECT. Line 2: STATUS. Line 3: TRACKING label above the Doto VALUE (40px). Line 4: UPDATED. A `data-label` with a `::before` label appears where the header is hidden. No horizontal scrolling.

---

## 12. Responsive summary

| Section | Mobile < 640 | Tablet 640–1023 | Desktop ≥ 1024 |
|---|---|---|---|
| Nav | Monogram + MENU sheet | Monogram + MENU sheet below 768px; full nav at 768px and up | Full nav |
| Hero | Portrait on top (46svh), text below | Split 4/4 | Split 6/6 |
| Eval board | Stacked blocks | Table | Table |
| Work rows | Single column | Cols 1–3 meta+title, 4–8 result | 12-col grid (§7.5) |
| About | Single column | 8 cols | Text cols 1–7, skills cols 9–12 |
| Contact | Stacked | Stacked | Email + links cols 1–8, "Looking for" block cols 9–12 |
| Status bar | Hidden | Shown at 768px and up | Shown |

Test at **320, 375, 768, 1024, 1440 and 1920** widths.

---

## 13. Accessibility (WCAG 2.2 AA)
- Text contrast is ≥ 4.5:1 (≥ 3:1 for text ≥ 24px). `--text-disabled` is never used for meaningful text.
- Everything works with the keyboard alone, in a logical tab order: skip link → nav → hero buttons → … The focus style (§7) is always visible.
- Touch targets are ≥ 44×44px.
- There's one `<h1>` (the name). Section titles are `<h2>` and project titles `<h3>`. Use landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- `lang="en"`. Every external link announces that it opens in a new tab.
- `prefers-reduced-motion` is honored as described in §6.
- Empty values (`— —`) carry visually hidden text "not measured yet" so screen readers don't just read dashes.
- `npm run a11y` (axe-core via Playwright) must report zero serious or critical violations in both themes.

---

## 14. Performance budgets
- Lighthouse (mobile) **≥ 95** for Performance, Accessibility, Best Practices and SEO.
- **LCP < 1.8s** on a simulated 4G connection. The LCP element should be the hero name text, not the canvas.
- **CLS = 0**: reserve the portrait area's size and use font metric overrides or `size-adjust` if the font swap shifts the layout.
- JS shipped ≤ **25 KB gzipped** in total (no framework runtime).
- Fonts ≤ 150 KB total (Latin subsets). Portrait greyscale PNG ≤ 20 KB. Each fallback PNG ≤ 120 KB.
- No third-party scripts and no analytics in v1.

---

## 15. Banned patterns (never do these)
- Loading or splash screens, preloaders, intro animations that block content
- Custom cursors, cursor trails, magnetic buttons
- Scroll-jacking, smooth-scroll libraries, parallax, horizontal scroll sections, pinned scroll storytelling
- Typing or typewriter effects on headlines; rotating "I am a ___" words
- Gradients (including gradient text), glows, neon, drop shadows, glassmorphism, noise textures (the dot grid is the only texture)
- Purple, or any color not in §2
- Emoji, icon packs, tech-logo walls
- Skill bars, percentages, star ratings, "years of experience" counters, "10+ projects shipped" style stats
- "Coming soon", "TBA" or empty placeholder sections. If there's no content, the section doesn't render.
- Lorem ipsum or invented copy, projects, metrics, testimonials or company logos
- A contact form (the site is static; use the email and links instead)
- Bento grids of mismatched cards, cards with heavy rounded corners
- Uppercase headings in Space Grotesk (uppercase is for Space Mono labels only)
- More than one primary button per screen; more than one red element per screen
- Copying the layout of any specific existing portfolio

---

## 16. Review checklist (run after every phase, against the screenshots)
1. **10-second test:** at 1440 and 375, is it obvious within 10 seconds who this is, what he does, and where the proof and contact are?
2. Only `tokens.css` contains hex values, px font sizes or durations (search the code to confirm).
3. Exactly one primary button and at most one red element per screen.
4. Doto appears only at ≥ 40px. Labels are Space Mono uppercase 11px. No uppercase Space Grotesk.
5. Spacing is tight within groups and generous between them; nothing is evenly medium.
6. No text overflows, wraps awkwardly or collides at 320/375/768/1024/1440/1920. No horizontal scroll.
7. Both themes look intentional (light = printed manual, not inverted dark).
8. Hero: the name, pitch and Resume button are visible without scrolling at 375×812, and the portrait is bottom-anchored.
9. No `null` value shows as anything other than the defined empty states. No `[TODO]`, "TBA" or "coming soon".
10. Every interactive element has visible hover and focus states. Tab through the whole page once.
11. Reduced motion: emulate it and confirm everything is static and visible.
12. Nothing in §15 appears anywhere.
