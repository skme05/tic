#!/usr/bin/env node
/* ==========================================================================
   Vérification du site compilé (_site) — sans dépendance.
     npm run build && npm run check
   Contrôle que chaque lien interne, image, vidéo, script et feuille de style
   pointe vers un fichier qui existe, et que chaque ancre (#id) existe dans
   la page visée. Sort en erreur (code 1) au moindre problème.
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[2] || 'build/client';
if (!fs.existsSync(ROOT)) {
  console.error('Lancez d\'abord « npm run build ».');
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(ROOT);

const ids = new Map();
const html = new Map();
for (const p of pages) {
  const t = fs.readFileSync(p, 'utf8');
  html.set(p, t);
  ids.set(p, new Set([...t.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

function fileFor(url) {
  const clean = decodeURI(url.split('?')[0]);
  const p = path.join(ROOT, clean);
  if (clean.endsWith('/')) return path.join(p, 'index.html');
  return p;
}

const problems = [];
for (const [p, t] of html) {
  const here = '/' + path.relative(ROOT, p).replace(/index\.html$/, '');
  const refs = [...t.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)].map((m) => m[1]);
  refs.push(...[...t.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]));
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    const [u, frag] = ref.split('#');
    const target = u ? fileFor(u.startsWith('/') ? u : path.posix.join(here, u)) : p;
    if (u && !fs.existsSync(target)) {
      problems.push(`${path.relative(ROOT, p)} → fichier manquant : ${ref}`);
      continue;
    }
    if (frag && target.endsWith('.html') && ids.has(target) && !ids.get(target).has(frag)) {
      problems.push(`${path.relative(ROOT, p)} → ancre introuvable : ${ref}`);
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n✗ ${problems.length} problème(s) sur ${pages.length} pages.`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages vérifiées : liens, ancres et médias OK.`);
