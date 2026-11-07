// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
import { prefersReducedMotion } from '~/lib/dom/scope';

/* ==========================================================================
   TIC — SCENES 3D DES PAGES INTERNES
   Reprise des scenes de animations-3d.js (helice ADN, icosaedre, reseau de
   neurones, tore magnetique, grille de cubes, sphere a facettes), rendues en
   projection perspective sur un canvas 2D : aucune dependance externe, donc
   les pages ne restent jamais vides si le CDN est injoignable.

   Usage dans le HTML :
     <section class="sec" data-scene="ico" data-scene-tone="light">
   Tons possibles : light (sections claires) · dark (sections sombres)
   Scenes : helix · ico · neural · torus · cubes · sphere
   ========================================================================== */
/** @param {import('~/lib/dom/scope').Scope} scope */
export function scenes3d(scope) {

  if (prefersReducedMotion()) { return; }

  var RAD = Math.PI / 180;
  var PHI = (1 + Math.sqrt(5)) / 2;

  var TONE = {
    light: { a: [185, 28, 23], b: [23, 95, 158], c: [99, 184, 67], line: .2, dot: .46 },
    dark:  { a: [255, 106, 106], b: [96, 170, 235], c: [140, 216, 108], line: .2, dot: .5 }
  };

  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')'; }
  function isMobile() { return window.innerWidth < 768; }

  /* ── rotations et projection ────────────────────────────────────── */
  function rotY(p, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
  }
  function rotX(p, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
  }
  function rotZ(p, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
  }

  /* ── geometries ─────────────────────────────────────────────────── */
  function icosahedron() {
    var v = [], i;
    var raw = [
      [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
      [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
      [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
    ];
    for (i = 0; i < raw.length; i++) {
      var n = Math.sqrt(raw[i][0] * raw[i][0] + raw[i][1] * raw[i][1] + raw[i][2] * raw[i][2]);
      v.push([raw[i][0] / n, raw[i][1] / n, raw[i][2] / n]);
    }
    var e = [], j;
    for (i = 0; i < v.length; i++) {
      for (j = i + 1; j < v.length; j++) {
        var d = Math.sqrt(Math.pow(v[i][0] - v[j][0], 2) + Math.pow(v[i][1] - v[j][1], 2) + Math.pow(v[i][2] - v[j][2], 2));
        if (d < 1.15) { e.push([i, j]); }
      }
    }
    return { v: v, e: e };
  }

  /* octaedre subdivise : sphere low-poly a facettes */
  function facetSphere(depth) {
    var base = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    var faces = [
      [4, 0, 2], [4, 2, 1], [4, 1, 3], [4, 3, 0],
      [5, 2, 0], [5, 1, 2], [5, 3, 1], [5, 0, 3]
    ].map(function (f) { return [base[f[0]], base[f[1]], base[f[2]]]; });

    function norm(p) {
      var n = Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]);
      return [p[0] / n, p[1] / n, p[2] / n];
    }
    function mid(a, b) { return norm([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]); }

    for (var d = 0; d < depth; d++) {
      var out = [];
      faces.forEach(function (f) {
        var ab = mid(f[0], f[1]), bc = mid(f[1], f[2]), ca = mid(f[2], f[0]);
        out.push([f[0], ab, ca], [ab, f[1], bc], [ca, bc, f[2]], [ab, bc, ca]);
      });
      faces = out;
    }
    var v = [], e = [], key = {};
    function idx(p) {
      var k = p.map(function (x) { return x.toFixed(4); }).join(',');
      if (!(k in key)) { key[k] = v.length; v.push(p); }
      return key[k];
    }
    faces.forEach(function (f) {
      var a = idx(f[0]), b = idx(f[1]), c = idx(f[2]);
      e.push([a, b], [b, c], [c, a]);
    });
    return { v: v, e: e };
  }

  function torus(R, r, nu, nv) {
    var lines = [], u, vv;
    for (u = 0; u < nu; u++) {
      var ring = [];
      for (vv = 0; vv <= nv; vv++) {
        var a = (u / nu) * Math.PI * 2, b = (vv / nv) * Math.PI * 2;
        ring.push([(R + r * Math.cos(b)) * Math.cos(a), (R + r * Math.cos(b)) * Math.sin(a), r * Math.sin(b)]);
      }
      lines.push(ring);
    }
    for (vv = 0; vv < nv; vv++) {
      var band = [];
      for (u = 0; u <= nu; u++) {
        var a2 = (u / nu) * Math.PI * 2, b2 = (vv / nv) * Math.PI * 2;
        band.push([(R + r * Math.cos(b2)) * Math.cos(a2), (R + r * Math.cos(b2)) * Math.sin(a2), r * Math.sin(b2)]);
      }
      lines.push(band);
    }
    return lines;
  }

  var CUBE_V = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
  ];
  var CUBE_E = [
    [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ];

  /* ── moteur commun ──────────────────────────────────────────────── */
  function mount(section) {
    var kind = section.getAttribute('data-scene');
    var tone = TONE[section.getAttribute('data-scene-tone') === 'dark' ? 'dark' : 'light'];

    var cv = document.createElement('canvas');
    cv.className = 'scene3d';
    cv.setAttribute('aria-hidden', 'true');
    section.insertBefore(cv, section.firstChild);
    scope.add(function () { cv.remove(); });
    var ctx = cv.getContext('2d');

    var W = 0, H = 0, DPR = 1, S = 1;
    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      W = section.offsetWidth; H = section.offsetHeight;
      cv.width = Math.max(1, Math.round(W * DPR));
      cv.height = Math.max(1, Math.round(H * DPR));
      S = Math.min(W, H) / 7.4;                      /* echelle du monde */
    }
    size();

    var mx = 0, my = 0, tmx = 0, tmy = 0, sc = 0;
    scope.on(section, 'mousemove', function (e) {
      var r = section.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - .5) * 2;
      tmy = ((e.clientY - r.top) / r.height - .5) * 2;
    }, { passive: true });
    scope.on(section, 'mouseleave', function () { tmx = 0; tmy = 0; });
    scope.on(window, 'scroll', function () {
      var r = section.getBoundingClientRect();
      sc = (r.top / Math.max(1, window.innerHeight)) * -1;
    }, { passive: true });

    /* projection perspective */
    var FOV = 13;
    function pr(p) {
      var k = FOV / (FOV + p[2] + 6);
      return { x: W / 2 + p[0] * S * k, y: H / 2 - p[1] * S * k, k: k, z: p[2] };
    }

    var geo = build(kind);
    var last = 0, raf = null, t0 = 0;

    function frame(now) {
      raf = scope.raf(frame);
      if (!t0) { t0 = now; }
      var t = (now - t0) / 1000;
      if (now - last < 16) { return; }
      last = now;
      mx += (tmx - mx) * .06; my += (tmy - my) * .06;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      draw(kind, t);
    }

    /* ── construction des scenes ── */
    function build(k) {
      var i, g = {};
      if (k === 'ico') {
        g.a = icosahedron(); g.b = icosahedron();
        g.orb = [];
        var n = isMobile() ? 34 : 60;
        for (i = 0; i < n; i++) {
          var phi = Math.acos(1 - 2 * (i / n));
          var th = Math.sqrt(n * Math.PI) * phi;
          var r = 3.1 + Math.random() * .5;
          g.orb.push([r * Math.sin(phi) * Math.cos(th), r * Math.sin(phi) * Math.sin(th), r * Math.cos(phi)]);
        }
      } else if (k === 'sphere') {
        g.a = facetSphere(isMobile() ? 1 : 2);
      } else if (k === 'torus') {
        g.lines = torus(2.5, .9, isMobile() ? 14 : 22, 9);
        g.parts = [];
        var np = isMobile() ? 90 : 190;
        for (i = 0; i < np; i++) {
          var a = Math.random() * Math.PI * 2, b = Math.random() * Math.PI * 2;
          var rr = .9 + (Math.random() - .5) * 1.5;
          g.parts.push([(2.5 + rr * Math.cos(b)) * Math.cos(a), (2.5 + rr * Math.cos(b)) * Math.sin(a), rr * Math.sin(b)]);
        }
      } else if (k === 'cubes') {
        g.cubes = [];
        var cols = isMobile() ? 4 : 7, rows = 3;
        for (var col = 0; col < cols; col++) {
          for (var row = 0; row < rows; row++) {
            g.cubes.push({
              p: [(col - (cols - 1) / 2) * 1.9, (row - (rows - 1) / 2) * 1.9, (Math.random() - .5) * 1.6],
              r: [Math.random() * 3, Math.random() * 3, Math.random() * 3],
              sp: .12 + Math.random() * .3, ph: Math.random() * 6.28,
              s: .34 + Math.random() * .12
            });
          }
        }
      } else if (k === 'neural') {
        g.nodes = [];
        var nn = isMobile() ? 20 : 34;
        for (i = 0; i < nn; i++) {
          g.nodes.push({
            o: [(Math.random() - .5) * 8.4, (Math.random() - .5) * 4.4, (Math.random() - .5) * 2.4],
            ph: Math.random() * 6.28, c: Math.random() > .5 ? 'a' : 'b'
          });
        }
      } else { /* helix */
        g.pts = [];
        var np2 = isMobile() ? 170 : 320;
        for (i = 0; i < np2; i++) {
          var tt = (i / np2) * Math.PI * 10;
          var strand = i % 2;
          g.pts.push({ t: tt, s: strand, r: 1.5 + Math.random() * .12, y: (i / np2) * 7 - 3.5 });
        }
      }
      return g;
    }

    /* ── rendu des scenes ── */
    function seg(p1, p2, col, a, w) {
      ctx.strokeStyle = rgba(col, a);
      ctx.lineWidth = w || 1;
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    }
    function dot(p, col, a, r) {
      ctx.fillStyle = rgba(col, a);
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fill();
    }

    function draw(k, t) {
      var i, j, p, q;
      var yaw = t * .18 + mx * .35;
      var pit = t * .11 + my * .22 + sc * .12;

      if (k === 'ico') {
        var ry = 2.35;
        for (i = 0; i < geo.a.e.length; i++) {
          p = pr(rotX(rotY(geo.a.v[geo.a.e[i][0]].map(function (x) { return x * ry; }), yaw), pit));
          q = pr(rotX(rotY(geo.a.v[geo.a.e[i][1]].map(function (x) { return x * ry; }), yaw), pit));
          seg(p, q, tone.a, tone.line * (.55 + p.k * .9), 1.1);
        }
        for (i = 0; i < geo.b.e.length; i++) {
          p = pr(rotZ(rotX(geo.b.v[geo.b.e[i][0]].map(function (x) { return x * 1.5; }), -pit * 1.3), t * .2));
          q = pr(rotZ(rotX(geo.b.v[geo.b.e[i][1]].map(function (x) { return x * 1.5; }), -pit * 1.3), t * .2));
          seg(p, q, tone.c, tone.line * .7, 1);
        }
        for (i = 0; i < geo.orb.length; i++) {
          p = pr(rotX(rotY(geo.orb[i], yaw * .6), pit * .5));
          dot(p, tone.b, tone.dot * (.3 + p.k * .8), 1.5 * p.k * 1.6);
        }
      } else if (k === 'sphere') {
        for (i = 0; i < geo.a.e.length; i++) {
          var v1 = geo.a.v[geo.a.e[i][0]], v2 = geo.a.v[geo.a.e[i][1]];
          p = pr(rotX(rotY([v1[0] * 2.6, v1[1] * 2.6, v1[2] * 2.6], yaw), pit));
          q = pr(rotX(rotY([v2[0] * 2.6, v2[1] * 2.6, v2[2] * 2.6], yaw), pit));
          if (p.z + q.z > 0) { continue; }                        /* faces arriere ecartees */
          seg(p, q, tone.a, tone.line * (.4 + p.k * .8), 1);
        }
        for (i = 0; i < geo.a.v.length; i += 1) {
          p = pr(rotX(rotY(geo.a.v[i].map(function (x) { return x * 2.6; }), yaw), pit));
          if (p.z > 0) { continue; }
          dot(p, tone.b, tone.dot * (.4 + p.k), 1.4);
        }
      } else if (k === 'torus') {
        for (i = 0; i < geo.lines.length; i++) {
          var line = geo.lines[i];
          ctx.strokeStyle = rgba(tone.a, tone.line * .8);
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (j = 0; j < line.length; j++) {
            p = pr(rotZ(rotX(rotY(line[j], yaw), 62 * RAD + my * .18), t * .05));
            if (j === 0) { ctx.moveTo(p.x, p.y); } else { ctx.lineTo(p.x, p.y); }
          }
          ctx.stroke();
        }
        for (i = 0; i < geo.parts.length; i++) {
          p = pr(rotZ(rotX(rotY(geo.parts[i], yaw * 1.3), 62 * RAD + my * .18), t * .05));
          dot(p, tone.c, tone.dot * (.35 + p.k * .8), 1.3 * p.k * 1.5);
        }
        /* anneau lumineux pulsant */
        ctx.strokeStyle = rgba(tone.a, (tone.line * 2.4) * (.55 + Math.sin(t * 1.4) * .3));
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (j = 0; j <= 90; j++) {
          var an = (j / 90) * Math.PI * 2;
          p = pr(rotZ(rotX(rotY([2.5 * Math.cos(an), 2.5 * Math.sin(an), 0], yaw), 62 * RAD + my * .18), t * .05));
          if (j === 0) { ctx.moveTo(p.x, p.y); } else { ctx.lineTo(p.x, p.y); }
        }
        ctx.stroke();
      } else if (k === 'cubes') {
        for (i = 0; i < geo.cubes.length; i++) {
          var cu = geo.cubes[i];
          var zz = cu.p[2] + Math.sin(t * .35 + cu.ph) * .7;
          for (j = 0; j < CUBE_E.length; j++) {
            var e1 = CUBE_V[CUBE_E[j][0]], e2 = CUBE_V[CUBE_E[j][1]];
            var f = function (vt) {
              var r = rotY(rotX([vt[0] * cu.s, vt[1] * cu.s, vt[2] * cu.s], t * cu.sp + cu.ph), t * cu.sp * .8);
              return pr([r[0] + cu.p[0], r[1] + cu.p[1], r[2] + zz]);
            };
            seg(f(e1), f(e2), (i % 3 === 0) ? tone.b : tone.a, tone.line * .85, 1);
          }
        }
      } else if (k === 'neural') {
        var pos = [];
        for (i = 0; i < geo.nodes.length; i++) {
          var nd = geo.nodes[i];
          var np3 = [
            nd.o[0] + Math.sin(t * .4 + nd.ph) * .5,
            nd.o[1] + Math.cos(t * .3 + nd.ph) * .34,
            nd.o[2]
          ];
          pos.push({ p: pr(rotY(np3, mx * .16)), c: nd.c, raw: np3 });
        }
        for (i = 0; i < pos.length; i++) {
          for (j = i + 1; j < pos.length; j++) {
            var dx = pos[i].raw[0] - pos[j].raw[0], dy = pos[i].raw[1] - pos[j].raw[1];
            var d2 = Math.sqrt(dx * dx + dy * dy);
            if (d2 < 2.3) { seg(pos[i].p, pos[j].p, tone.a, tone.line * (1 - d2 / 2.3) * .9, 1); }
          }
        }
        for (i = 0; i < pos.length; i++) {
          dot(pos[i].p, tone[pos[i].c], tone.dot * .9, 2.1);
        }
      } else { /* helix */
        var prev = [null, null];
        for (i = 0; i < geo.pts.length; i++) {
          var pt = geo.pts[i];
          var off = pt.s * Math.PI;
          var v = rotY([Math.cos(pt.t + off + t * .35) * pt.r, pt.y, Math.sin(pt.t + off + t * .35) * pt.r], mx * .3);
          v = rotZ(v, .12 + my * .1);
          p = pr(v);
          dot(p, pt.s ? tone.c : tone.b, tone.dot * (.3 + p.k * .85), 1.5 * p.k * 1.5);
          if (prev[pt.s]) { seg(prev[pt.s], p, tone.a, tone.line * .5, 1); }
          prev[pt.s] = p;
          /* barreaux entre les deux brins */
          if (pt.s === 1 && i % 8 === 0 && prev[0]) { seg(prev[0], p, tone.a, tone.line * .8, 1); }
        }
      }
    }

    /* ── cycle de vie ── */
    if ('IntersectionObserver' in window) {
      scope.io(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) {
            cv.classList.add('is-on');
            if (!raf) { t0 = 0; last = 0; raf = scope.raf(frame); }
          } else {
            cv.classList.remove('is-on');
            if (raf) { window.cancelAnimationFrame(raf); raf = null; }
          }
        });
      }, { threshold: .04 }).observe(section);
    } else {
      cv.classList.add('is-on');
      raf = scope.raf(frame);
    }

    var rt = null;
    scope.on(window, 'resize', function () {
      clearTimeout(rt);
      rt = scope.timeout(function () { size(); }, 180);
    }, { passive: true });
  }

  function init() {
    Array.prototype.slice.call(document.querySelectorAll('[data-scene]')).forEach(mount);
  }

  init();
}
