import AxeBuilder from '@axe-core/playwright';
import { settle, url, withPreview } from './preview.mjs';

const paths = [''];
const viewports = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];
const themes = ['dark', 'light'];
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

let blocking = 0;

await withPreview(async (browser) => {
  for (const path of paths) {
    for (const viewport of viewports) {
      for (const theme of themes) {
        const context = await browser.newContext({ viewport, colorScheme: theme });
        const page = await context.newPage();
        await page.goto(url(path));
        await settle(page);
        const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
        const label = `/${path} ${viewport.width}px ${theme}`;
        if (violations.length === 0) console.log(`ok    ${label}`);
        for (const v of violations) {
          const serious = v.impact === 'serious' || v.impact === 'critical';
          if (serious) blocking += v.nodes.length;
          console.log(`${serious ? 'FAIL' : 'note'}  ${label}  [${v.impact}] ${v.id}: ${v.help}`);
          for (const node of v.nodes.slice(0, 3)) console.log(`        ${node.target.join(' ')}`);
        }
        await context.close();
      }
    }
  }
});

if (blocking > 0) {
  console.error(`\n${blocking} serious or critical accessibility issue(s)`);
  process.exit(1);
}
console.log('\nNo serious or critical accessibility issues');
