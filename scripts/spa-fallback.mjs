// GitHub Pages serves 404.html for unknown paths; make it the SPA shell
// so deep links like /privacy and /terms render.
import { copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
console.log('wrote dist/404.html');
