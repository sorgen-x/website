// Restores binary assets from export/*.b64 only when they are missing,
// so a build never overwrites the committed src/assets files.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, 'src', 'assets');
const exp = join(root, 'export');
mkdirSync(assets, { recursive: true });
function loadB64(name) {
  const single = join(exp, `${name}.b64.txt`);
  if (existsSync(single)) return readFileSync(single, 'utf8').replace(/\s+/g, '');
  const parts = readdirSync(exp).filter(f => f.startsWith(`${name}.b64.part`) && f.endsWith('.txt')).sort();
  if (!parts.length) throw new Error('missing b64 for ' + name);
  return parts.map(f => readFileSync(join(exp, f), 'utf8')).join('').replace(/\s+/g, '');
}
for (const name of ['logo']) {
  const target = join(assets, `${name}.png`);
  if (existsSync(target)) {
    console.log('kept', name);
    continue;
  }
  const buf = Buffer.from(loadB64(name), 'base64');
  writeFileSync(target, buf);
  console.log('decoded', name, buf.length);
}
