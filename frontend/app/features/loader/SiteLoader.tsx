import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

/* ==========================================================================
   Loader « plan du couloir » — même graphie que le plan qui se dessine au
   survol des cartes services : fond nuit quadrillé, lueur de couleur dans le
   coin, couloir tracé trait par trait (lignes de fuite, sections, portes en
   arche, sol, axe, point de fuite, cote), puis le ∞ du logo au fond.
   Les traits et la lueur passent par les 5 couleurs TIC pendant la
   construction ; à la fin on « entre » dans le couloir.

   Toute l'animation est en CSS (styles/components/site-loader.css) : elle se
   joue et se termine même sans JavaScript. Le script ne sert qu'à : ne
   l'afficher qu'une fois par visite, bloquer le défilement, et permettre de
   la passer (bouton, Échap, Entrée).
   ========================================================================== */

export const LOADER_KEY = 'tic_loader_2026';
const DURATION = 4300; /* fin de l'animation d'entrée (ms) */

/* couloir en perspective à un point de fuite (repère 1600 × 900) */
const W = 1600;
const H = 900;
const VP = { x: 800, y: 410 };
const P = (x: number, y: number, s: number) => [VP.x + (x - VP.x) * s, VP.y + (y - VP.y) * s] as const;
const f = (n: number) => n.toFixed(1);

function buildPlan() {
  let k = 0;
  const st = () => ({ '--k': k++ }) as CSSProperties;
  const els: ReactNode[] = [];
  for (const [x, y] of [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
  ] as const) {
    const [x2, y2] = P(x, y, 0.05);
    els.push(<line key={`r${x}${y}`} pathLength={1} style={st()} x1={x} y1={y} x2={f(x2)} y2={f(y2)} />);
  }
  for (const s of [0.82, 0.58, 0.41, 0.29, 0.205, 0.145]) {
    const [x0, y0] = P(0, 0, s);
    const [x1, y1] = P(W, H, s);
    els.push(<rect key={`s${s}`} pathLength={1} style={st()} x={f(x0)} y={f(y0)} width={f(x1 - x0)} height={f(y1 - y0)} />);
    /* une porte en arche sur chaque mur */
    const dw = (x1 - x0) * 0.07;
    const dh = (y1 - y0) * 0.55;
    for (const dx of [x0 + (x1 - x0) * 0.06, x1 - (x1 - x0) * 0.06 - dw]) {
      const top = y1 - dh + dw / 2;
      els.push(
        <path
          key={`d${s}${dx}`}
          pathLength={1}
          style={st()}
          d={`M${f(dx)} ${f(y1)} V${f(top)} A${f(dw / 2)} ${f(dw / 2)} 0 0 1 ${f(dx + dw)} ${f(top)} V${f(y1)}`}
        />,
      );
    }
  }
  for (const x of [200, 400, 600, 1000, 1200, 1400]) {
    const [x2, y2] = P(x, H, 0.145);
    els.push(<line key={`f${x}`} pathLength={1} style={st()} x1={x} y1={H} x2={f(x2)} y2={f(y2)} />);
  }
  const [cx0, cy0] = P(0, 0, 0.58);
  const [cx1] = P(W, 0, 0.58);
  return { els, k, cote: { x0: cx0, x1: cx1, y: cy0 } };
}
const PLAN = buildPlan();

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
  const { els, cote } = PLAN;

  return (
    <div className={'ldr' + (done ? ' is-done' : '')} role="status" aria-label="Chargement du site The Infinite Corridor">
      <span className="ldr__glow" aria-hidden="true"></span>
      <svg className="ldr__plan" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="ldrInf" x1="0" x2="1">
            <stop offset="0" stopColor="#4F9BF0" />
            <stop offset=".3" stopColor="#3CCB86" />
            <stop offset=".5" stopColor="#F4C531" />
            <stop offset=".72" stopColor="#F59A3E" />
            <stop offset="1" stopColor="#F2674A" />
          </linearGradient>
        </defs>
        {els}
        <line className="ldr__axis" x1={VP.x} y1={H} x2={VP.x} y2={0} />
        <circle className="ldr__vp" cx={VP.x} cy={VP.y} r="4" />
        <circle pathLength={1} style={{ '--k': PLAN.k } as CSSProperties} cx={VP.x} cy={VP.y} r="14" />
        <g className="ldr__cote">
          <line pathLength={1} style={{ '--k': PLAN.k + 1 } as CSSProperties} x1={f(cote.x0)} y1={f(cote.y - 18)} x2={f(cote.x1)} y2={f(cote.y - 18)} />
          <text x={VP.x} y={f(cote.y - 30)} textAnchor="middle">
            THE INFINITE CORRIDOR · 2,10 M
          </text>
        </g>
        <path
          className="ldr__inf"
          pathLength={1}
          transform={`translate(${VP.x - 34} ${VP.y - 60}) scale(.34)`}
          d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z"
        />
      </svg>

      <div className="ldr__hud">
        <p className="ldr__brand">
          THE INFINITE CORRIDOR <span>Software Solutions</span>
        </p>
        <div className="ldr__prog" aria-hidden="true">
          <ol className="ldr__steps">
            <li>Fondations</li>
            <li>Structure</li>
            <li>Portes</li>
            <li>Lumière</li>
          </ol>
          <div className="ldr__bar">
            <i></i>
          </div>
        </div>
      </div>

      <button className="ldr__skip" id="ldrSkip" type="button">
        Passer
      </button>
    </div>
  );
}
