// maplibre-gl-worker.mjs importa por ruta relativa fija a
// "./maplibre-gl-shared.mjs", así que ambos ficheros deben servirse desde el
// mismo directorio, con sus nombres originales, sin pasar por el pipeline de
// hashing de Vite (que solo copiaría el primero y rompería esa import).
// Por eso se copian tal cual a public/ en cada `npm install`
// (ver "postinstall" en package.json) en vez de trackearlos en git.
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, '..', 'node_modules', 'maplibre-gl', 'dist');
const dest = path.join(here, '..', 'public');

for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
	copyFileSync(path.join(src, file), path.join(dest, file));
	console.log(`Copiado ${file} a public/`);
}
