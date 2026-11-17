// Post-build step for GitHub Pages (static hosting, no rewrites).
// 1) dist/404.html = SPA shell, so any unknown path still boots the app
//    and React Router shows the in-app NotFound page.
// 2) dist/<route>.html and dist/<route>/index.html for every static
//    <Route path="..."> in src/App.tsx, so /privacy and /privacy/ both
//    return HTTP 200 (Pages serves <route>.html for extensionless URLs).
// 3) Per-route shells rewrite title, description, canonical, and og/twitter
//    tags. 404.html is noindexed and must not advertise the homepage canonical.
// 4) Verify every file exists; refuse leftover /auth or /user shells;
//    exit non-zero (fail the build) otherwise.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shell = join(dist, 'index.html');
const SITE = 'https://sorgenx.com';
const FORBIDDEN_ROUTES = new Set(['/auth', '/user']);

const ROUTE_META = {
  '/privacy': {
    title: '隐私政策 | SORGEN',
    description: 'SORGEN 隐私政策：说明我们如何收集和使用预约咨询中的姓名、电话和留言。',
    url: `${SITE}/privacy`,
  },
  '/terms': {
    title: '用户协议 | SORGEN',
    description: 'SORGEN 用户协议：本网站介绍 Aether 并接受预约体验咨询的使用条款。',
    url: `${SITE}/terms`,
  },
};

const NOT_FOUND_META = {
  title: '页面不存在 | SORGEN',
  description: '您访问的页面不存在。',
  robots: 'noindex',
};

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

const forbidden = routes.filter((route) => FORBIDDEN_ROUTES.has(route));
if (forbidden.length) {
  console.error(`spa-fallback: refused to emit leftover auth routes: ${forbidden.join(', ')}`);
  process.exit(1);
}

const homepage = readFileSync(shell, 'utf8');

function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(pattern);
  if (!matches || matches.length !== 1) {
    throw new Error(`spa-fallback: failed to rewrite ${label}`);
  }
  return html.replace(pattern, replacement);
}

function applyPageMeta(html, meta) {
  let next = replaceOnce(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttr(meta.title)}</title>`,
    'title',
  );
  const replacements = [
    ['property', 'og:title', meta.title],
    ['name', 'twitter:title', meta.title],
    ['name', 'description', meta.description],
    ['property', 'og:description', meta.ogDescription ?? meta.description],
    ['name', 'twitter:description', meta.ogDescription ?? meta.description],
  ];
  for (const [attr, key, content] of replacements) {
    next = replaceOnce(
      next,
      new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/>`),
      `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`,
      key,
    );
  }
  if (meta.url) {
    next = replaceOnce(
      next,
      /<meta property="og:url" content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${escapeAttr(meta.url)}" />`,
      'og:url',
    );
    next = replaceOnce(
      next,
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${escapeAttr(meta.url)}" />`,
      'canonical',
    );
  } else {
    next = next.replace(/\s*<meta property="og:url" content="[^"]*"\s*\/>/, '');
    next = next.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/>/, '');
  }
  if (meta.robots) {
    if (next.includes('name="robots"')) {
      next = replaceOnce(
        next,
        /<meta name="robots" content="[^"]*"\s*\/>/,
        `<meta name="robots" content="${escapeAttr(meta.robots)}" />`,
        'robots',
      );
    } else {
      next = replaceOnce(
        next,
        /<meta name="viewport" content="[^"]*"\s*\/>/,
        (match) => `${match}\n    <meta name="robots" content="${escapeAttr(meta.robots)}" />`,
        'robots insert',
      );
    }
  }
  return next;
}

function writeShell(path, html) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
}

const expected = [join(dist, '404.html')];
try {
  writeShell(expected[0], applyPageMeta(homepage, NOT_FOUND_META));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

for (const route of routes) {
  const meta = ROUTE_META[route];
  if (!meta) {
    console.error(`spa-fallback: missing title/canonical mapping for ${route}`);
    process.exit(1);
  }
  let html;
  try {
    html = applyPageMeta(homepage, meta);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
  const rel = route.replace(/^\/+|\/+$/g, '');
  const dir = join(dist, rel);
  mkdirSync(dir, { recursive: true });
  const nested = join(dir, 'index.html');
  const flat = join(dist, `${rel}.html`);
  writeShell(nested, html);
  writeShell(flat, html);
  expected.push(nested, flat);
}

for (const leftover of ['auth', 'user']) {
  const dir = join(dist, leftover);
  const flat = join(dist, `${leftover}.html`);
  if (existsSync(dir) || existsSync(flat)) {
    console.error(`spa-fallback: leftover ${leftover} shell would be published`);
    process.exit(1);
  }
}

const missing = expected.filter((f) => !existsSync(f));
if (missing.length) {
  console.error('spa-fallback: missing generated files:\n' + missing.join('\n'));
  process.exit(1);
}

for (const route of ['/privacy', '/terms']) {
  if (!routes.includes(route)) {
    console.error(`spa-fallback: expected route shell missing from App.tsx: ${route}`);
    process.exit(1);
  }
}

console.log(`spa-fallback: 404.html + ${routes.length} routes (${routes.join(', ')})`);
if (skipped.length) console.log(`spa-fallback: dynamic routes served via 404.html: ${skipped.join(', ')}`);
