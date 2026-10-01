# CLAUDE.md: rules for building this portfolio

This repo is Manideep Thumu's personal portfolio site. Two files define it:

- **`BRIEF.md`** says **what** to build: content, sections, data, build phases and acceptance criteria.
- **`DESIGN.md`** says **how it looks and behaves**: tokens, type, components, motion, accessibility and banned patterns.

## Before writing any code
1. Read `BRIEF.md` and `DESIGN.md` in full. Re-read the relevant section before starting each phase.
2. If they conflict, `BRIEF.md` wins on content and `DESIGN.md` wins on visuals and behaviour. If something is unclear or missing, **ask. Don't guess.**

## Hard rules
- **Never invent content.** That includes projects, metrics, numbers, companies, dates, links and quotes. Every fact comes from `BRIEF.md` or the data files. Missing values are `null` in data and render with the empty states defined in `DESIGN.md`.
- **The string `[TODO]` must never appear on the rendered site.** It may appear in data-file comments only. `npm run check` enforces this.
- **Tokens only.** No raw hex colors, font sizes, spacing values or durations outside `src/styles/tokens.css`. No new font sizes. If you think one is needed, it's a spacing problem; ask first.
- **Dependencies:** only the allowlist in `BRIEF.md` §8. No React, Tailwind, GSAP, Three.js, Lenis or Framer Motion. Ask before adding anything.
- **GitHub Pages base path:** the site is served under `/Portfolio/`. Build every internal URL and asset path with `import.meta.env.BASE_URL`. Never hard-code a leading `/`.
- Everything in DESIGN.md §15 (banned patterns) is forbidden, even if it "looks cool".

## How to work
- Build in the phases listed in `BRIEF.md` §9, one phase at a time.
- **At the end of every phase:**
  1. `npm run build` passes with no warnings.
  2. `npm run shots` produces screenshots (375, 768 and 1440 wide, dark and light). **Open and look at every screenshot.**
  3. Go through the review checklist in `DESIGN.md` §16 against those screenshots and fix every failure.
  4. `npm run a11y` reports zero serious or critical issues.
  5. `npm run check` passes.
  6. Commit with a clear message, then **stop and report** to Manideep: what was built, the screenshot paths, anything that deviates from the docs, and any questions. Wait for his go-ahead before the next phase.
- Prefer small, readable components. Plain CSS with custom properties, vanilla TypeScript, no framework runtime.
- When a spec gives exact numbers (durations, sizes, thresholds), use them exactly. Tunable values live in config files, not scattered through the code.
