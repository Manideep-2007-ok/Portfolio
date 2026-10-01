import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ORIGIN, settle, url, withPreview } from './preview.mjs';

const failures = [];
const warnings = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

const FORBIDDEN = /\b(todo|null|undefined|lorem|tba|coming soon)\b/i;

function walk(dir, test) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, test);
    return test(full) ? [full] : [];
  });
}

// Source rule: colors, font sizes and durations are defined in tokens.css only.
const tokensFile = join('src', 'styles', 'tokens.css');
const sourceRules = [
  [/(?<![\w/&-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/, 'raw hex color'],
  [/\b(?:rgb|rgba|hsl|hsla|hwb|oklch|oklab|lab|lch)\(/, 'raw color function'],
  [/font-size\s*:\s*[\d.]+\s*(?:px|rem|em|pt)\b/, 'raw font size'],
  [/\bfont\s*:[^;{}]*\b[\d.]+(?:px|rem|em)\b/, 'raw font size in font shorthand'],
  [/(?:transition|animation)(?:-duration|-delay)?\s*:[^;{}]*?[\d.]+m?s\b/, 'raw duration'],
];
for (const file of walk('src', (f) => /\.(css|astro|ts|js)$/.test(f))) {
  if (file === tokensFile) continue;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const [pattern, label] of sourceRules) {
        if (pattern.test(line)) fail(`${file}:${i + 1}`, `${label} outside tokens.css`);
      }
    });
}

// Built pages
const dist = 'dist';
let pageCount = 0;

await withPreview(async (browser) => {
  const htmlFiles = walk(dist, (f) => f.endsWith('.html'));
  pageCount = htmlFiles.length;
  const page = await browser.newPage();
  for (const file of htmlFiles) {
    const rel = relative(dist, file).replaceAll('\\', '/');
    const path = rel === 'index.html' ? '' : rel.replace(/index\.html$/, '');
    const where = `/${path}`;

    if (/\[TODO/i.test(readFileSync(file, 'utf8'))) fail(where, 'the string [TODO] is in the built HTML');

    await page.goto(url(path));
    await settle(page);
    const found = await page.evaluate(() => {
      const attr = (sel, name) => [...document.querySelectorAll(sel)].map((el) => el.getAttribute(name) ?? '');
      return {
        text: document.body.innerText,
        title: document.title,
        attrs: [
          ...attr('[alt]', 'alt'),
          ...attr('[aria-label]', 'aria-label'),
          ...attr('[title]', 'title'),
          ...attr('meta[name="description"],meta[property^="og:"]', 'content'),
        ],
        imagesWithoutAlt: [...document.querySelectorAll('img:not([alt])')].map((img) => img.getAttribute('src')),
        links: [...document.querySelectorAll('a[href]')].map((a) => ({
          href: a.href,
          rel: (a.getAttribute('rel') ?? '').split(/\s+/),
        })),
      };
    });

    for (const line of found.text.split('\n')) {
      const hit = line.match(FORBIDDEN);
      if (hit) fail(where, `visible text contains "${hit[0]}": ${line.trim().slice(0, 80)}`);
    }
    for (const value of [found.title, ...found.attrs]) {
      const hit = value.match(FORBIDDEN);
      if (hit) fail(where, `attribute or title contains "${hit[0]}": ${value.slice(0, 80)}`);
    }
    for (const src of found.imagesWithoutAlt) fail(where, `image without alt: ${src}`);
    for (const link of found.links) {
      if (!/^https?:/.test(link.href) || new URL(link.href).origin === ORIGIN) continue;
      if (!link.rel.includes('noopener') || !link.rel.includes('noreferrer')) {
        fail(where, `external link without rel="noopener noreferrer": ${link.href}`);
      }
    }
  }
});

for (const w of warnings) console.warn(`warn  ${w}`);
if (failures.length > 0) {
  for (const f of failures) console.error(`FAIL  ${f}`);
  console.error(`\n${failures.length} problem(s)`);
  process.exit(1);
}
console.log(`ok    ${pageCount} page(s) and src/ passed`);
