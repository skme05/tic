#!/usr/bin/env node
/* ==========================================================================
   Après `react-router build` (pages pré-rendues dans build/client) :
   - 404.html à la racine (page d'erreur servie par Netlify)
   - sitemap.xml et robots.txt
   - _redirects : anciennes adresses en .html → nouvelles adresses
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'build/client';
const SITE_URL = (process.env.VITE_SITE_URL || process.env.URL || 'https://tic-infinit.netlify.app').replace(/\/$/, '');
/* pages exclues des moteurs de recherche */
const NOINDEX = new Set(['/espace-client', '/404']);

const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') {
      const rel = '/' + path.relative(OUT, path.dirname(p)).split(path.sep).join('/');
      pages.push(rel === '/' ? '/' : rel.replace(/\/$/, ''));
    }
  }
})(OUT);
pages.sort();

/* 404 */
const notFound = path.join(OUT, '404', 'index.html');
if (fs.existsSync(notFound)) fs.copyFileSync(notFound, path.join(OUT, '404.html'));

/* sitemap */
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !NOINDEX.has(p))
  .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`);
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);

/* robots */
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nDisallow: /espace-client\nSitemap: ${SITE_URL}/sitemap.xml\n`);

/* redirections des anciennes adresses (site d'origine en fichiers .html) */
const redirects = ['# Anciennes adresses du site (.html) → nouvelles adresses', '/index.html  /  301'];
for (const p of pages) if (p !== '/' && p !== '/404') redirects.push(`${p}.html  ${p}  301`);
fs.writeFileSync(path.join(OUT, '_redirects'), redirects.join('\n') + '\n');

console.log(`postbuild : ${pages.length} pages · sitemap (${urls.length} URL) · robots.txt · _redirects · 404.html`);
