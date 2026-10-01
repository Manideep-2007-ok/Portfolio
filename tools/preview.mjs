import { spawnSync } from 'node:child_process';
import { createServer as createHttpServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

export const PORT = 4399;
export const ORIGIN = `http://127.0.0.1:${PORT}`;
export const BASE = '/Portfolio/';

export const url = (path = '') => ORIGIN + BASE + path.replace(/^\/+/, '');

export function buildSite() {
  const result = spawnSync('npm', ['run', 'build', '--silent'], { encoding: 'utf8' });
  const output = `${result.stdout}${result.stderr}`;
  if (result.status !== 0) {
    console.error(output);
    throw new Error('npm run build failed');
  }
  if (/warn/i.test(output)) {
    console.error(output);
    throw new Error('npm run build produced warnings');
  }
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

// Serves dist/ under BASE, the way GitHub Pages does. astro preview leaves a detached child behind, so it is not used here.
function createServer() {
  return createHttpServer(async (req, res) => {
    const { pathname } = new URL(req.url, ORIGIN);
    let file = null;
    if (pathname.startsWith(BASE) || pathname === BASE.slice(0, -1)) {
      const rel = decodeURIComponent(pathname.slice(BASE.length)).replace(/\.\.+/g, '');
      for (const candidate of [rel, join(rel, 'index.html')]) {
        const full = join('dist', candidate);
        try {
          if ((await stat(full)).isFile()) {
            file = full;
            break;
          }
        } catch {
          // try the next candidate
        }
      }
    }
    const status = file ? 200 : 404;
    file ??= join('dist', '404.html');
    try {
      const body = await readFile(file);
      res.writeHead(status, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('Not found');
    }
  });
}

// Builds (unless --no-build), serves dist/, runs fn(browser), then cleans up.
export async function withPreview(fn) {
  if (!process.argv.includes('--no-build')) buildSite();
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', resolve);
  });
  const browser = await chromium.launch();
  try {
    return await fn(browser);
  } finally {
    await browser.close();
    server.close();
    server.closeAllConnections();
  }
}

export async function settle(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
}
