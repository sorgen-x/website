// Post-build step for GitHub Pages (static hosting, no rewrites).
// 1) dist/404.html = SPA shell, so any unknown path still boots the app
//    and React Router shows the in-app NotFound page.
// 2) dist/<route>.html and dist/<route>/index.html for every static
//    <Route path="..."> in src/App.tsx, so /privacy and /privacy/ both
//    return HTTP 200 (Pages serves <route>.html for extensionless URLs).
// 3) Verify every file exists; exit non-zero (fail the build) otherwise.
// New routes added to App.tsx are picked up automatically.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shell = join(dist, 'index.html');

if (!existsSync(shell)) {
  console.error('spa-fallback: dist/index.html missing; run vite build first');
  process.exit(1);
}

const appSource = readFileSync(join(root, 'src', 'App.tsx'), 'utf8');
const allPaths = [...appSource.matchAll(/<Route\s+[^>]*path="([^"]+)"/g)].map((m) => m[1]);
const routes = allPaths.filter((p) => p !== '/' && p !== '*' && !p.includes(':') && !p.includes('*'));
const skipped = allPaths.filter((p) => p !== '/' && p !== '*' && !routes.includes(p));

if (!allPaths.includes('/')) {
  console.error('spa-fallback: could not parse routes from src/App.tsx');
  process.exit(1);
}

const expected = [join(dist, '404.html')];
copyFileSync(shell, expected[0]);

for (const route of routes) {
  const rel = route.replace(/^\/+|\/+$/g, '');
  const dir = join(dist, rel);
  mkdirSync(dir, { recursive: true });
  const nested = join(dir, 'index.html');
  const flat = join(dist, `${rel}.html`);
  mkdirSync(dirname(flat), { recursive: true });
  copyFileSync(shell, nested);
  copyFileSync(shell, flat);
  expected.push(nested, flat);
}

const missing = expected.filter((f) => !existsSync(f));
if (missing.length) {
  console.error('spa-fallback: missing generated files:\n' + missing.join('\n'));
  process.exit(1);
}

console.log(`spa-fallback: 404.html + ${routes.length} routes (${routes.join(', ')})`);
if (skipped.length) console.log(`spa-fallback: dynamic routes served via 404.html: ${skipped.join(', ')}`);
