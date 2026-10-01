import { mkdirSync, rmSync } from 'node:fs';
import { settle, url, withPreview } from './preview.mjs';

const OUT = '.shots';
const pages = [{ name: 'home', path: '' }];
const sizes = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];
const themes = ['dark', 'light'];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

await withPreview(async (browser) => {
  const written = [];

  async function shoot({ name, path }, size, theme, suffix = '', reducedMotion = 'no-preference') {
    const context = await browser.newContext({ viewport: size, colorScheme: theme, reducedMotion });
    const page = await context.newPage();
    await page.goto(url(path));
    await settle(page);
    const base = `${OUT}/${name}-${size.width}-${theme}${suffix}`;
    await page.screenshot({ path: `${base}-full.png`, fullPage: true });
    written.push(`${base}-full.png`);
    if (!suffix) {
      await page.screenshot({ path: `${base}-hero.png` });
      written.push(`${base}-hero.png`);
    }
    await context.close();
  }

  for (const entry of pages) {
    for (const size of sizes) {
      for (const theme of themes) await shoot(entry, size, theme);
    }
    await shoot(entry, sizes[2], 'dark', '-reduced-motion', 'reduce');
  }

  console.log(`Wrote ${written.length} screenshots to ${OUT}/ (absolute: ${process.cwd()}/${OUT})`);
  for (const file of written) console.log(`  ${file}`);
});
