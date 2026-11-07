#!/usr/bin/env node
/* ==========================================================================
   Optimisation des médias — à lancer quand on ajoute ou remplace un média.

     npm run media -- <dossier des originaux>

   Prérequis : ImageMagick (convert) et ffmpeg installés sur la machine.
   Les fichiers produits vont dans public/assets/ et sont versionnés ; les
   originaux lourds restent hors du dépôt.

   - photos PNG/JPG  → WebP, 1600 px de large au maximum, qualité 78
   - icônes secteurs → WebP 240 px
   - vidéos          → H.264 sans piste audio (elles sont toutes muettes
                       à l'écran), 720p au plus, « faststart » pour démarrer
                       pendant le téléchargement, + une image d'affiche WebP
   ========================================================================== */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) {
  console.error('Usage : npm run media -- <dossier contenant les médias d\'origine>');
  process.exit(1);
}
const IMG = 'public/assets/img';
const VID = 'public/assets/video';
fs.mkdirSync(path.join(IMG, 'portes'), { recursive: true });
fs.mkdirSync(path.join(IMG, 'secteurs'), { recursive: true });
fs.mkdirSync(VID, { recursive: true });

/* nom d'origine → nom propre (sans espaces, explicite) */
const IMAGES = [
  ['image 1.png', 'equipe-presentation.webp', 1600],
  ['image 2.png', 'equipe-open-space.webp', 1600],
  ['image 3.png', 'equipe-reunion.webp', 1600],
  ['black-pro-v2 1.png', 'consultante.webp', 1000],
  ['arriere_plan.jpg', 'couloir-fond.webp', 1200],
  ['the-infinite-corridor-2 1.png', 'logo-tic.webp', 600],
  ['the-infinite-corridor_logo.png', 'logo-symbole.webp', 300],
  ['portes/web-design.jpg', 'portes/web-design.webp', 900],
  ['portes/ui-ux.jpg', 'portes/ui-ux.webp', 900],
  ['portes/migration.jpg', 'portes/migration.webp', 900],
  ['portes/applications.jpg', 'portes/applications.webp', 900],
  ['portes/hubspot.jpg', 'portes/hubspot.webp', 900],
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => [`logo_section_trust_${n}.png`, `secteurs/secteur-${n}.webp`, 240]),
];
const COPIES = [['portes/email-marketing.svg', 'portes/email-marketing.svg']];
const FAVICONS = [
  ['the-infinite-corridor_logo.png', 'favicon-32.png', '32x32'],
  ['the-infinite-corridor_logo.png', 'apple-touch-icon.png', '180x180'],
];
const VIDEOS = [
];

const kb = (f) => Math.round(fs.statSync(f).size / 1024) + ' Ko';
const run = (cmd, args) => execFileSync(cmd, args, { stdio: ['ignore', 'ignore', 'inherit'] });

for (const [from, to, width] of IMAGES) {
  const src = path.join(SRC, from);
  const dst = path.join(IMG, to);
  run('convert', [src, '-resize', `${width}x>`, '-strip', '-quality', '78', '-define', 'webp:method=6', dst]);
  console.log(`${from.padEnd(34)} ${kb(src).padStart(9)} → ${to} ${kb(dst)}`);
}
for (const [from, to] of COPIES) fs.copyFileSync(path.join(SRC, from), path.join(IMG, to));
for (const [from, to, size] of FAVICONS) {
  run('convert', [path.join(SRC, from), '-resize', size, '-background', 'none', '-gravity', 'center', '-extent', size, path.join('public', to)]);
}
for (const [from, to, width, crf] of VIDEOS) {
  const src = path.join(SRC, from);
  const dst = path.join(VID, to);
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-vf', `scale='min(${width},iw)':-2`, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dst]);
  const poster = dst.replace(/\.mp4$/, '.webp');
  run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '0.5', '-i', dst, '-frames:v', '1', '-q:v', '70', poster]);
  console.log(`${from.padEnd(34)} ${kb(src).padStart(9)} → ${to} ${kb(dst)} (+ affiche)`);
}
