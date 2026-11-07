import { useEffect, useState } from 'react';

/* ==========================================================================
   Loader « architectural » : le corridor se construit comme sur un plan.
   1. Fondations — trame de plan, lignes de fuite tracées ;
   2. Structure  — les cadres du couloir dessinés un à un, avec leurs cotes ;
   3. Lumière    — les cadres s'allument en néon (dégradé du logo), le ∞
                   apparaît au point de fuite ;
   puis on « entre » : le plan s'agrandit vers le point de fuite et disparaît.

   Toute l'animation est en CSS (styles/components/site-loader.css) : elle se
   joue et se termine même sans JavaScript. Le script ne sert qu'à : ne
   l'afficher qu'une fois par visite, bloquer le défilement pendant ~3,5 s,
   et permettre de la passer (bouton, Échap, Entrée).
   ========================================================================== */

export const LOADER_KEY = 'tic_loader_2026';
const DURATION = 3900; /* fin de l'animation de sortie (ms) */

/* point de fuite et cadres du couloir (repère 1600 × 900) */
const VP = { x: 800, y: 430 };
const SCALES = [1, 0.74, 0.55, 0.41, 0.305, 0.228, 0.17];
const frame = (s: number) => {
  const w = 1360 * s;
  const h = 800 * s;
  const x = VP.x - w / 2;
  const y = VP.y - h * 0.47;
  return { x, y, w, h, d: `M${x} ${y + h} V${y} H${x + w} V${y + h}` };
};
const FRAMES = SCALES.map(frame);
/* couleurs des néons, du fond (bleu) vers l'avant (rouge) */
const NEON = ['#E2452B', '#F28A26', '#F5A13A', '#F4C531', '#8DB43E', '#22A06B', '#1D5FAE'];

export function SiteLoader() {
  const [gone, setGone] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(LOADER_KEY) === '1';
    } catch {
      /* stockage indisponible : on joue le loader */
    }
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem(LOADER_KEY, '1');
    } catch {
      /* ignoré */
    }
    const root = document.documentElement;
    root.classList.add('is-loading');
    const finish = () => {
      setDone(true);
      root.classList.remove('is-loading');
      window.setTimeout(() => setGone(true), 750);
    };
    const t = window.setTimeout(() => {
      root.classList.remove('is-loading');
      setGone(true);
    }, DURATION);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    };
    document.addEventListener('keydown', onKey);
    const skip = document.getElementById('ldrSkip');
    skip?.addEventListener('click', finish);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      skip?.removeEventListener('click', finish);
      root.classList.remove('is-loading');
    };
  }, []);

  if (gone) return null;
  const front = FRAMES[0];

  return (
    <div className={'ldr' + (done ? ' is-done' : '')} role="status" aria-label="Chargement du site The Infinite Corridor">
      <svg className="ldr__plan" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="ldrGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#16243D" strokeWidth="1" />
          </pattern>
          <pattern id="ldrGridBig" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M200 0H0V200" fill="none" stroke="#1C2E4D" strokeWidth="1.4" />
          </pattern>
          <linearGradient id="ldrInf" x1="0" x2="1">
            <stop offset="0" stopColor="#1D5FAE" />
            <stop offset=".3" stopColor="#22A06B" />
            <stop offset=".5" stopColor="#F4C531" />
            <stop offset=".72" stopColor="#F28A26" />
            <stop offset="1" stopColor="#E2452B" />
          </linearGradient>
        </defs>

        {/* 1 · FONDATIONS : trame et lignes de fuite */}
        <g className="ldr__grid">
          <rect width="1600" height="900" fill="url(#ldrGrid)" />
          <rect width="1600" height="900" fill="url(#ldrGridBig)" />
        </g>
        <g className="ldr__guides">
          {[
            [front.x, front.y],
            [front.x + front.w, front.y],
            [front.x, front.y + front.h],
            [front.x + front.w, front.y + front.h],
          ].map(([x, y], i) => (
            <path key={i} pathLength={1} d={`M${x} ${y} L${VP.x} ${VP.y}`} style={{ '--i': i }} />
          ))}
          <circle className="ldr__vp" cx={VP.x} cy={VP.y} r="5" />
        </g>

        {/* 2 · STRUCTURE : cadres tracés un à un + cotes */}
        <g className="ldr__frames">
          {FRAMES.map((f, i) => (
            <path key={i} pathLength={1} d={f.d} style={{ '--i': i }} />
          ))}
        </g>
        <g className="ldr__dims">
          <path d={`M${front.x} ${front.y - 26} H${front.x + front.w} M${front.x} ${front.y - 36} v20 M${front.x + front.w} ${front.y - 36} v20`} />
          <text x={VP.x} y={front.y - 36} textAnchor="middle">
            13,60 m
          </text>
          <path d={`M${front.x - 26} ${front.y} V${front.y + front.h} M${front.x - 36} ${front.y} h20`} />
          <text x={front.x - 40} y={front.y + front.h / 2} textAnchor="middle" transform={`rotate(-90 ${front.x - 40} ${front.y + front.h / 2})`}>
            8,00 m
          </text>
          {FRAMES.slice(0, 5).map((f, i) => (
            <text key={i} className="ldr__tag" x={f.x + 10} y={f.y + 22} style={{ '--i': i }}>
              P.{String(i + 1).padStart(2, '0')}
            </text>
          ))}
        </g>

        {/* 3 · LUMIÈRE : néons, rails et ∞ au point de fuite */}
        <g className="ldr__neon">
          {FRAMES.map((f, i) => (
            <path key={i} d={f.d} style={{ '--i': i, '--c': NEON[NEON.length - 1 - i] }} />
          ))}
        </g>
        <g className="ldr__rails">
          <path d={`M${front.x + front.w * 0.25} ${front.y + front.h} L${VP.x} ${VP.y + 40}`} />
          <path d={`M${front.x + front.w * 0.75} ${front.y + front.h} L${VP.x} ${VP.y + 40}`} />
        </g>
        <g className="ldr__glow">
          <ellipse cx={VP.x} cy={VP.y} rx="120" ry="80" />
        </g>
        <path
          className="ldr__inf"
          pathLength={1}
          transform={`translate(${VP.x - 60} ${VP.y - 30}) scale(.6)`}
          d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z"
        />
      </svg>

      <div className="ldr__hud">
        <p className="ldr__brand">
          THE INFINITE CORRIDOR <span>Software Solutions</span>
        </p>
        <ol className="ldr__steps" aria-hidden="true">
          <li>Fondations</li>
          <li>Structure</li>
          <li>Lumière</li>
        </ol>
        <div className="ldr__bar" aria-hidden="true">
          <i></i>
        </div>
        <p className="ldr__pct" aria-hidden="true"></p>
      </div>

      <button className="ldr__skip" id="ldrSkip" type="button">
        Passer
      </button>
    </div>
  );
}
