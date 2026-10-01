# BRIEF.md: what to build

The personal portfolio site of **Manideep Thumu**, an ML/AI engineering student. It's a single page, statically built with Astro, and deployed to GitHub Pages. Visual and interaction rules are in `DESIGN.md`.

---

## 1. Goal and audience

**Goal:** get Manideep interviews for **ML/AI engineering internships**: first with remote-first US startups (especially New York based), then NYC on-site for Summer 2027, and India offices of US companies.

**Audience, in priority order:**
1. **Recruiters and founders** skimming for about 10 seconds, often on a phone, coming from LinkedIn or a job application.
2. **Engineers** at those companies who will click through to code, results and write-ups.

**What success looks like:** within 10 seconds a visitor knows:
1. **Who:** Manideep Thumu, an ML/AI engineering student in Bengaluru.
2. **What:** he builds LLM systems and measures whether they work.
3. **Proof:** what he's building now, with the numbers being tracked.
4. **Next step:** resume, GitHub, LinkedIn, email, each one click away.

**What makes it different from other student portfolios:** the craft is high, but the main thing is that **the evidence is on the page**: measured results, honest statuses and dates, instead of a long list of tools and "coming soon" cards.

---

## 2. Voice and copy rules
- First person, plain and specific. Write the way a good engineer explains their work to another engineer.
- Short sentences. One idea each.
- **Banned words:** passionate, leverage, cutting-edge, innovative, seamless, robust, synergy, journey, "AI enthusiast", "tech enthusiast", ninja, rockstar, guru, world-class, revolutionary, "I love to code".
- Numbers beat adjectives. Every project states what it does in one line, then what it's measured on.
- No exclamation marks.
- The copy in §5 is the draft. Manideep may edit it. Don't rewrite it without asking.

---

## 3. Facts (the only allowed source of content)

Anything marked `[TODO]` is unknown. In data files it becomes `null` with a `// TODO:` comment, and on the site it renders as the empty state from DESIGN.md (or the element is hidden). **Never fill it in with a guess.**

### Identity
- **Name:** Manideep Thumu
- **Location:** Bengaluru, India (time zone `Asia/Kolkata`)
- **Role line:** ML / AI engineering student
- **Pitch:** "I build LLM systems and measure whether they work."
- **Availability line:** Open to ML/AI internships — remote
- **Education:**
  - Scaler School of Technology, expected 2029
  - IIT Madras, BS in Data Science (online), expected 2029
  - **Do not show a GPA.**
- **Competitive programming:** solves Codeforces problems most days and enters contests. Handle: `[TODO]`

### Links
- **Email:** manideepthumu3@gmail.com
- **GitHub:** https://github.com/Manideep-2007-ok
- **LinkedIn:** https://www.linkedin.com/in/manideep-thumu-a39b99383
- **Resume PDF:** `public/resume.pdf`, `[TODO: Manideep adds the file]`. If it's missing, hide every Resume button and print a build warning.
- **Codeforces:** `[TODO]`. Hide the link if it's null.
- **Site source:** https://github.com/Manideep-2007-ok/Portfolio

### Skills
- **Use in projects:** Python, SQL, FastAPI, Pydantic, Docker, LangGraph, RAG, ChromaDB
- **Learning now:** pandas, LightGBM, PyTorch, LLM evals

### Projects
**Order on the page: 1 → 5.**

**1. FilingLens** (flagship)
- One line: "Answers questions about SEC filings, and is tested against a hand-written set of 150 questions."
- Status: `building`
- What it will have (planned; show these as the experiment ladder, not as features already built): hybrid search (keyword + vector), reranking, a CI eval gate that fails the build when accuracy drops, a fine-tuned reranker, and an agent mode.
- Experiment ladder: `BASELINE` → `+ HYBRID SEARCH` → `+ RERANK` → `+ FINE-TUNED RERANKER`. Metric name `[TODO: e.g. answer accuracy]`. All values `null` for now.
- Board tracking: `EVAL QUESTIONS WRITTEN`, value `{ done: null, total: 150 }`, rendered `— —/150` while null.
- Stack: Python, FastAPI, RAG, `[TODO: confirm vector DB and models]`
- Links: code `[TODO]`, demo `[TODO]`, write-up `[TODO]`
- Result: `null`

**2. NYC Taxi Demand Forecaster**
- One line: "Forecasts New York taxi demand from public trip data." `[TODO: confirm granularity, e.g. hourly by zone]`
- Status: `building`
- Board tracking: `ERROR VS BASELINE` `[TODO: confirm metric, e.g. MAE vs seasonal-naive]`, value `null`
- Stack: Python, pandas, LightGBM `[TODO: confirm]`
- Links: code `[TODO]`, demo `[TODO]`
- Result: `null`

**3. RailGuard** (team project)
- One line: `[TODO: one sentence on what RailGuard does]`
- Role: "Backend: set up the AI integration"
- Status: `shipped`
- Code: https://github.com/SAI-0360/RailGuard
- Stack: `[TODO]`
- Result: `null`

**4. SplitSaathi**
- One line: "Splits shared expenses and settles them in as few payments as possible, using a greedy debt-simplification algorithm."
- Status: `shipped`
- Stack: React, Firebase
- Code: `[TODO: repo URL]`
- Result: `null` `[TODO: optional, e.g. "cuts N payments to M on a 10-person trip" if measured]`

**5. Shell in Python**
- One line: "A Unix-style shell written in Python, built through the CodeCrafters challenge." `[TODO: confirm features, e.g. pipes, redirection, builtins]`
- Status: `shipped`
- Stack: Python
- Code: `[TODO: repo URL]`
- Result: `null`

**Not shown:** MerchantMesh (paused; see §11) and the first-term CSS assignments (Moon-Orbit, Dog Gallery, Ferris Wheel).

### Experience (shown in "Outside the editor")
Order: most recent first. **Only entries with verified facts render.** Unknown fields are `null`; an entry whose `year` or `title` is null is hidden (and the build warns).

**1. Call of Duty tournament, Yugaantar: 3rd place**
- Highlight chip: `3RD PLACE`
- Year: `[TODO]`
- Organisation or event line: `YUGAANTAR` (add the college or fest name once confirmed: `[TODO]`)
- Context line: `[TODO: team or solo, how many teams entered, one factual sentence]`

**2. Core member, Hospitality, Ascent tech fest**
- Highlight chip: none
- Year: `[TODO]`
- Organisation or event line: `ASCENT TECH FEST`
- Context line: `[TODO: one factual sentence on what hospitality covered, e.g. guest arrivals, accommodation, volunteer coordination, and the team size or guest count if known]`

Do not describe either entry in more detail than the facts supplied. Do not add other achievements.

### Notes / learning in public
- `notes.ts` starts as an empty array. **The Notes section renders only when there's at least one entry.** Each entry: `{ date, title, url, kind: 'post' | 'write-up' | 'talk' }`.

---

## 4. Page structure (single page)

| # | Section | Anchor | Nav label | Renders when |
|---|---|---|---|---|
| — | Hero | `#top` | — | always |
| 01 | Now building | `#now` | `NOW` | at least one project has status `building` |
| 02 | Selected work | `#work` | `WORK` | always |
| 03 | Outside the editor | `#beyond` | `BEYOND` | `experience.length > 0` |
| 04 | Notes | `#notes` | `NOTES` | `notes.length > 0` |
| 05 | About | `#about` | `ABOUT` | always |
| 06 | Contact | `#contact` | `CONTACT` | always |

Section numbers and nav items are generated from the sections that actually render.

Other pages:
- `404.astro`: Doto `404`, the line "This page didn't converge.", and a secondary button `BACK TO HOME`.
- `dev/portrait.astro`: the tuning page (DESIGN.md §10.6). `noindex`, not linked, not in the sitemap.

---

## 5. Section specs and copy

### Hero (DESIGN.md §10)
- Status line: `● OPEN TO ML/AI INTERNSHIPS — REMOTE`
- `<h1>`: `MANIDEEP` / `THUMU` (Doto)
- Pitch: **I build LLM systems and measure whether they work.**
- Buttons: `RESUME ↗` (primary), `GITHUB ↗`, `LINKEDIN ↗` (secondary)
- Meta: `BENGALURU, IN · SCALER + IIT MADRAS · CLASS OF 2029`
- **Acceptance:** at 375×812 the name, pitch and Resume button are visible without scrolling. The portrait denoises in about 2.2s, then stops. Pointer scatter works on desktop and a tap ripple on touch. Reduced motion shows the final frame.

### 01 Now building (DESIGN.md §11)
- Title: **What I'm building right now.**
- The eval board, with rows for projects whose status is `building` (currently FilingLens and NYC Taxi).
- Caption under the board: *Numbers update as I build. Nothing here is projected.*
- **Acceptance:** null values show `— —`; the scramble runs once; it's a semantic table; mobile shows stacked blocks.

### 02 Selected work (DESIGN.md §7.5)
- Title: **Things I've built, and how I checked them.**
- Project rows 001–005 in the order in §3. FilingLens shows the experiment ladder.
- Below the list, a text link button: `ALL CODE ON GITHUB ↗`
- **Acceptance:** no fake numbers; links render only if they exist; team role shown for RailGuard.

### 03 Outside the editor (only if entries exist)
- Title: **Outside the editor.**
- One line under the title: "Team events, competitions and things I helped run." (`--fs-body`, `--text-secondary`)
- Experience rows (DESIGN.md §7.12), most recent first.
- **Acceptance:** at most a few rows; visibly lighter than the project rows; no invented detail; the section is hidden if every entry is missing its year or title.

### 04 Notes (only if entries exist)
- Title: **Notes from building.**
- A dated list: `01 OCT 2026` (`--fs-caption`) · title (`--fs-body`, link) · kind label.

### 05 About
- Title: **About.**
- Body (draft for Manideep to edit):
  > I'm an engineering student in Bengaluru, studying at Scaler School of Technology and doing IIT Madras's BS in Data Science alongside it.
  >
  > I work on LLM systems: retrieval, agents, and the evals that tell you whether either one actually works. Right now that's FilingLens, a question-answering system over SEC filings that I'm testing against 150 questions I'm writing by hand.
  >
  > Most days also include a few Codeforces problems.
- Then the skills block (DESIGN.md §7.6).
- Then an education list: `SCALER SCHOOL OF TECHNOLOGY — 2029` and `IIT MADRAS · BS DATA SCIENCE — 2029` in `--fs-label`.

### 06 Contact
- Title: **Let's talk.**
- Line: "Email is the fastest way to reach me. I reply within a day." `[TODO: Manideep confirms he's happy with the reply promise]`
- The copy-email control (DESIGN.md §7.7), then text link buttons: `LINKEDIN ↗` `GITHUB ↗` `RESUME ↗` (`CODEFORCES ↗` if set).
- **"Looking for" block** (desktop: cols 9–12 beside the email; mobile: below it). Label/value pairs, labels in `--fs-label` secondary, values in `--fs-body`:
  - `ROLE` → ML / AI engineering internships
  - `WHERE` → Remote now · NYC on-site from Summer 2027 `[TODO: Manideep confirms he wants NYC shown publicly]`
  - `TIME ZONE` → IST (UTC+5:30) · `[TODO: confirm a line such as "overlaps US East Coast mornings"]`
  - `LIVE` → the current Bengaluru time, ticking (same source as the status bar, but here it's real visible text for all users)
  Values marked `[TODO]` are hidden until confirmed; the block renders with whatever pairs are confirmed.

### Footer and status bar
Per DESIGN.md §7.10–7.11.

---

## 6. Data model (`src/data/`)

```ts
// site.ts
export const site = {
  name: 'Manideep Thumu',
  role: 'ML / AI engineering student',
  pitch: 'I build LLM systems and measure whether they work.',
  availability: 'Open to ML/AI internships — remote',
  location: 'Bengaluru, IN',
  timezone: 'Asia/Kolkata',
  email: 'manideepthumu3@gmail.com',
  links: {
    github: 'https://github.com/Manideep-2007-ok',
    linkedin: 'https://www.linkedin.com/in/manideep-thumu-a39b99383',
    resume: null as string | null,      // TODO: set to `${BASE_URL}resume.pdf` once public/resume.pdf exists
    codeforces: null as string | null,  // TODO
    source: 'https://github.com/Manideep-2007-ok/Portfolio',
  },
  education: [
    { school: 'Scaler School of Technology', detail: null, until: 2029 },
    { school: 'IIT Madras', detail: 'BS Data Science', until: 2029 },
  ],
  skills: {
    using: ['Python', 'SQL', 'FastAPI', 'Pydantic', 'Docker', 'LangGraph', 'RAG', 'ChromaDB'],
    learning: ['pandas', 'LightGBM', 'PyTorch', 'LLM evals'],
  },
};

// experience.ts
export type Experience = {
  year: number | null;
  title: string | null;
  org: string | null;
  highlight?: string | null;   // e.g. '3RD PLACE'
  context: string | null;      // one factual sentence; null → row omits it
};

// projects.ts
export type Status = 'building' | 'shipped' | 'planned' | 'paused';
export type Metric = { label: string; value: number | null; unit?: string; display?: string };
export type Project = {
  id: string;                 // '001'
  slug: string;               // anchor id, e.g. 'filinglens'
  title: string;
  oneLiner: string | null;    // null → row shows title only (and the build warns)
  status: Status;
  role?: string;              // team projects
  stack: string[];
  links: { code?: string | null; demo?: string | null; writeup?: string | null };
  result: Metric | null;      // shown in the Result block
  tracking?: { label: string; done: number | null; total?: number; updated: string } // eval board row
  experiments?: { metric: string | null; steps: { label: string; value: number | null }[] };
};
```

**Rendering rules:**
- `null` → the empty state defined in DESIGN.md, never the text "null" or "[TODO]".
- `tracking.done` with `total` → `062/150` (zero-padded to the digits of `total`).
- Updating the site when something ships means **editing data files only**, never components.

---

## 7. Portrait: what Manideep does

1. **Take the photo.** Head and shoulders, high resolution, a plain background, and **strong light from one side** (a window to your left or right) so half the face is in shadow. A slight angle and something recognisable in the silhouette (glasses, hoodie, headphones) help. Phone portrait mode is fine. Flat front lighting, busy backgrounds and sunglasses don't work.
2. **Remove the background** with any background-removal tool and **export as PNG with a transparent background** (not on black or white; the transparency is what the site uses to cut you out).
3. Save it as `src-assets/portrait.png` (this folder is gitignored).
4. Run `npm run portrait`.
5. Run `npm run dev`, open `/dev/portrait`, and adjust the sliders until it looks right in **both themes** (contrast, gamma and cell size matter most; use the mask overlay to spot leftover background). Press `COPY CONFIG` and paste the result into `src/data/portrait.config.ts`.
6. Run `npm run portrait` again to regenerate the fallback and OG images, then commit.

Until a photo exists, the site uses the generated placeholder silhouette.

---

## 8. Tech stack and repo

- **Astro** (latest stable), static output, **no UI framework integration**. Components are `.astro` files; interactivity is small vanilla TypeScript modules in `src/scripts/`.
- Plain CSS: `src/styles/tokens.css` (all tokens), `src/styles/base.css` (reset, typography, focus, utilities), plus component-scoped `<style>` blocks.
- `astro.config.mjs`: `site: 'https://manideep-2007-ok.github.io'`, `base: '/Portfolio'`, with the sitemap integration excluding `/dev/`.
- Build-time values: `BUILD_SHA` (from `GITHUB_SHA` in CI, else `git rev-parse --short HEAD`) and `BUILD_DATE`, exposed via Vite `define`.

**Dependency allowlist:** `astro`, `@astrojs/sitemap`, `@fontsource-variable/doto`, `@fontsource-variable/space-grotesk`, `@fontsource/space-mono`, plus dev-only `sharp`, `playwright`, `@axe-core/playwright`, `typescript`. Nothing else without asking.

```
/
├─ CLAUDE.md · DESIGN.md · BRIEF.md · README.md
├─ astro.config.mjs · package.json · tsconfig.json
├─ .github/workflows/deploy.yml        # official Astro → GitHub Pages action
├─ src-assets/portrait.png             # gitignored source photo (transparent background)
├─ tools/
│  ├─ build-portrait.mjs               # npm run portrait
│  ├─ shots.mjs                        # npm run shots → .shots/ (gitignored)
│  ├─ a11y.mjs                         # npm run a11y
│  └─ check-content.mjs                # npm run check
├─ public/
│  ├─ portrait/ portrait-gray.png · portrait-fallback-dark.png · portrait-fallback-light.png
│  ├─ og.png · favicon.svg · resume.pdf (when added)
└─ src/
   ├─ data/ site.ts · projects.ts · experience.ts · notes.ts · portrait.config.ts
   ├─ styles/ tokens.css · base.css
   ├─ layouts/ Base.astro               # head, meta, OG, theme inline script, skip link
   ├─ components/ Nav · MobileMenu · ThemeToggle · Hero · Portrait · SectionHeader ·
   │              EvalBoard · ProjectRow · ExperimentLadder · StatusChip · Button · Tag ·
   │              Experience · ExperienceRow · Notes · About · Skills · Contact · CopyEmail ·
   │              Toast · ShortcutsSheet · StatusBar · Footer
   ├─ scripts/ portrait.ts · scramble.ts (shared by eval board + section labels) · evalboard.ts ·
   │           nav.ts · statusbar.ts · theme.ts · reveal.ts · copy-email.ts · shortcuts.ts · presence.ts
   └─ pages/ index.astro · 404.astro · dev/portrait.astro
```

**npm scripts:** `dev`, `build`, `preview`, `portrait`, `shots`, `a11y`, `check`.
- `shots`: builds, serves the preview, and takes full-page screenshots at 375×812, 768×1024 and 1440×900 in dark and light, plus a hero-only shot at each size. Also takes one shot at 1440 with reduced motion emulated.
- `a11y`: runs axe on `/` in both themes and fails on serious or critical issues.
- `check`: fails if the built HTML contains `[TODO]`, `TODO`, `null`, `undefined`, `lorem`, `TBA` or `coming soon` (case-insensitive) as visible text; if any image lacks `alt`; or if any external link lacks `rel="noopener noreferrer"`. It warns (doesn't fail) for missing resume, project one-liners and links.

**SEO and meta:** title `Manideep Thumu — ML/AI engineering student`; a description built from the pitch; canonical URL; `og.png`; `twitter:card summary_large_image`; `theme-color` per theme; and JSON-LD `Person` with name, URL, sameAs (GitHub, LinkedIn) and alumniOf.

---

## 9. Build phases (stop and report after each one; see CLAUDE.md)

**Phase 0: Foundation**
Astro project, tokens.css, base.css, fonts, Base layout with meta, the theme inline script and skip link, the deploy workflow, and the `shots`/`a11y`/`check` tools. A blank page that renders type specimens of every token in both themes.
*Check:* the type specimen screenshots match DESIGN.md §3 and there's no theme flash on reload.

**Phase 1: Static page with real content**
All sections, built from the data files, with full layout at every breakpoint. No animation yet. The portrait shows the static fallback image (placeholder silhouette).
*Check:* DESIGN.md §16 items 1–9 at all widths.

**Phase 2: Portrait**
`build-portrait.mjs` (with placeholder generation), `portrait.ts`, the `/dev/portrait` tuning page, reduced motion and the fallback layering.
*Check:* the denoise looks smooth at 60fps on desktop; the loop stops after settling (verify with the Performance panel or a frame counter); the touch ripple works in mobile emulation; there's no blank flash.

**Phase 3: Eval board, nav and status bar**
Scramble, active-section tracking, status bar, mobile menu (with focus trap), theme toggle and copy email with toast.
*Check:* keyboard-only walkthrough; the mobile menu traps and returns focus; the status bar never covers content.

**Phase 4: Motion and polish**
Section reveals, hover states, every micro-interaction in DESIGN.md §6 (LED blink, label scramble, nav marker, arrow nudge, keyboard shortcuts and sheet, tab-title presence, copy feedback), the full reduced-motion pass, a spacing pass against DESIGN.md §4, and light-theme refinement.
*Check:* the whole of DESIGN.md §16.

**Phase 5: Ship**
404 page, OG image, favicon, sitemap, JSON-LD, Lighthouse, then push and deploy.
*Check:* the Lighthouse mobile scores and budgets in DESIGN.md §14; the live URL works under `/Portfolio/`; the OG preview renders (check with a link-preview tester).

---

## 10. Definition of done
- Every phase check passes, and `build`, `check` and `a11y` are clean.
- The live site at https://manideep-2007-ok.github.io/Portfolio/ matches the screenshots.
- `README.md` explains: how to run it, how to update projects (data files only), and how to redo the portrait.

---

## 11. Open decisions for Manideep (Claude Code: don't decide these, ask)
1. **URL.** Keep `…github.io/Portfolio/`, or rename the repo to `Manideep-2007-ok.github.io` for a cleaner root URL? (If renamed, set `base: '/'`.)
2. **MerchantMesh.** It's currently left out because it's paused. Add it back as `paused`?
3. **Resume PDF.** Add `public/resume.pdf`.
4. **Codeforces handle,** and whether to show it.
5. **All `[TODO]` items in §3:** project one-liners, stacks, repo URLs and metric names.
6. **Contact line:** keep "I reply within a day"?
7. **Experience facts:** the year and one factual sentence for each entry in §3 (Yugaantar Call of Duty, Ascent hospitality).
8. **Contact "Looking for" block:** confirm the NYC line and the time-zone line.
