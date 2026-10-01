import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';

function gitSha() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'unknown';
  }
}

export default defineConfig({
  site: 'https://manideep-2007-ok.github.io',
  base: '/Portfolio',
  integrations: [sitemap({ filter: (page) => !page.includes('/dev/') })],
  vite: {
    define: {
      BUILD_SHA: JSON.stringify(gitSha()),
      BUILD_DATE: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
  },
});
