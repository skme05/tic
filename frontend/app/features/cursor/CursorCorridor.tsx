import { useEffect, useRef } from 'react';

/* ==========================================================================
   Traînée du curseur « couloir en circuit intégré » (souris uniquement).
   Le trajet du curseur est routé comme une piste de circuit imprimé : il
   suit une grille, à angles droits et à 45°, en deux rails parallèles (le
   couloir), avec une pastille à chaque coude, de petites arches de porte et
   un axe pointillé de temps en temps. Même graphie que le plan du couloir
   qui se dessine au survol des cartes services : traits fins, très
   transparents, aux couleurs TIC. Chaque tronçon se trace puis s'efface.
   Désactivé sur écran tactile et si l'utilisateur réduit les animations.
   ========================================================================== */
const GRID = 14; // pas de la grille de routage (px)
const GAP = 3; // demi-écart entre les deux rails (px)
const LIFE = 1100; // durée de vie d'un tracé (ms)
const DRAW = 160; // durée du tracé d'un tronçon (ms)
const ALPHA = 0.22; // opacité maximale
const DOOR_EVERY = 84; // une arche tous les N px de piste
const AXIS_EVERY = 210; // un axe pointillé tous les N px de piste
const SPAN = 520; // px de piste pour parcourir le dégradé TIC
const COLORS = [
  [29, 95, 174],
  [34, 160, 107],
  [244, 197, 49],
  [242, 138, 38],
  [226, 69, 43],
];

type Seg = { kind: 'seg'; x1: number; y1: number; x2: number; y2: number; t: number; d: number };
type Via = { kind: 'via'; x: number; y: number; t: number; d: number };
type Arch = { kind: 'arch'; x: number; y: number; nx: number; ny: number; tx: number; ty: number; t: number; d: number };
type Axis = { kind: 'axis'; x: number; y: number; nx: number; ny: number; t: number; d: number };
type Item = Seg | Via | Arch | Axis;

function rgb(d: number) {
  const u = (d % (SPAN * 2)) / SPAN;
  const f = u <= 1 ? u : 2 - u;
  const pos = f * (COLORS.length - 1);
  const i = Math.min(COLORS.length - 2, Math.floor(pos));
  const k = pos - i;
  return COLORS[i].map((v, j) => Math.round(v + (COLORS[i + 1][j] - v) * k));
}
const rgba = (d: number, a: number) => {
  const c = rgb(d);
  return `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
};

export function CursorCorridor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const items: Item[] = [];
    let last: { x: number; y: number } | null = null;
    let dist = 0;
    let nextDoor = DOOR_EVERY;
    let nextAxis = AXIS_EVERY;
    let raf = 0;
    let running = false;

    /* ajoute un tronçon droit (horizontal, vertical ou à 45°) */
    const addSeg = (x1: number, y1: number, x2: number, y2: number, t: number) => {
      const len = Math.hypot(x2 - x1, y2 - y1);
      if (!len) return;
      items.push({ kind: 'seg', x1, y1, x2, y2, t, d: dist });
      const tx = (x2 - x1) / len;
      const ty = (y2 - y1) / len;
      dist += len;
      if (dist >= nextDoor) {
        nextDoor += DOOR_EVERY;
        const side = Math.random() < 0.5 ? 1 : -1;
        items.push({ kind: 'arch', x: x2 - tx * len * 0.5, y: y2 - ty * len * 0.5, nx: -ty * side, ny: tx * side, tx, ty, t: t + DRAW * 0.6, d: dist });
      }
      if (dist >= nextAxis) {
        nextAxis += AXIS_EVERY;
        items.push({ kind: 'axis', x: x2, y: y2, nx: -ty, ny: tx, t: t + DRAW, d: dist });
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const now = performance.now();
      const p = { x: Math.round(e.clientX / GRID) * GRID, y: Math.round(e.clientY / GRID) * GRID };
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 260) {
        last = p;
        items.push({ kind: 'via', x: p.x, y: p.y, t: now, d: dist });
        start();
        return;
      }
      if (p.x === last.x && p.y === last.y) return;
      /* routage « circuit imprimé » : d'abord la diagonale à 45°, puis le droit */
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      const m = Math.min(Math.abs(dx), Math.abs(dy));
      const c = { x: last.x + Math.sign(dx) * m, y: last.y + Math.sign(dy) * m };
      const bend = m > 0 && (c.x !== p.x || c.y !== p.y);
      addSeg(last.x, last.y, c.x, c.y, now);
      addSeg(c.x, c.y, p.x, p.y, now + (m > 0 ? DRAW * 0.5 : 0));
      if (bend && Math.random() < 0.45) items.push({ kind: 'via', x: c.x, y: c.y, t: now + DRAW * 0.5, d: dist });
      last = p;
      start();
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const frame = (now: number) => {
      while (items.length && now - items[0].t > LIFE + DRAW) items.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (!items.length) {
        running = false;
        last = null;
        return;
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (const it of items) {
        const age = now - it.t;
        if (age < 0) continue;
        const life = Math.max(0, 1 - age / (LIFE + DRAW));
        const a = ALPHA * Math.pow(life, 1.2);
        if (a <= 0.004) continue;
        const prog = Math.min(1, age / DRAW);
        ctx.strokeStyle = rgba(it.d, a);
        ctx.fillStyle = rgba(it.d, a);
        if (it.kind === 'seg') {
          /* deux rails parallèles : le couloir */
          const len = Math.hypot(it.x2 - it.x1, it.y2 - it.y1);
          const nx = (-(it.y2 - it.y1) / len) * GAP;
          const ny = ((it.x2 - it.x1) / len) * GAP;
          const ex = it.x1 + (it.x2 - it.x1) * prog;
          const ey = it.y1 + (it.y2 - it.y1) * prog;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(it.x1 + nx, it.y1 + ny);
          ctx.lineTo(ex + nx, ey + ny);
          ctx.moveTo(it.x1 - nx, it.y1 - ny);
          ctx.lineTo(ex - nx, ey - ny);
          ctx.stroke();
        } else if (it.kind === 'via') {
          /* pastille de soudure : anneau + point */
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(it.x, it.y, 2 + 3 * prog, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(it.x, it.y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (it.kind === 'arch') {
          /* petite porte en arche posée sur un rail */
          const w = 4.5;
          const h = 9 * prog;
          const bx = it.x + it.nx * GAP;
          const by = it.y + it.ny * GAP;
          const lx = bx - it.tx * w;
          const ly = by - it.ty * w;
          const rx = bx + it.tx * w;
          const ry = by + it.ty * w;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(lx, ly);
          ctx.lineTo(lx + it.nx * h, ly + it.ny * h);
          const k = h + w * 1.35 * prog;
          ctx.quadraticCurveTo(bx + it.nx * k, by + it.ny * k, rx + it.nx * h, ry + it.ny * h);
          ctx.lineTo(rx, ry);
          ctx.stroke();
        } else {
          /* axe pointillé perpendiculaire, comme une cote */
          const L = 22 * prog;
          ctx.lineWidth = 0.6;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(it.x - it.nx * L, it.y - it.ny * L);
          ctx.lineTo(it.x + it.nx * L, it.y + it.ny * L);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onMove);
      removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="cursor-corridor" aria-hidden="true" />;
}
