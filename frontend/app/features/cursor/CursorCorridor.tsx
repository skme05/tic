import { useEffect, useRef } from 'react';

/* ==========================================================================
   Traînée du curseur « couloir éphémère » (souris uniquement).
   En se déplaçant, le curseur trace deux rails parallèles reliés par des
   cadres de porte, aux couleurs TIC : un couloir vu de dessus, large près du
   curseur et qui s'amincit vers le passé avant de s'effacer (~0,7 s), en traits fins et très transparents comme le plan des cartes services.
   Désactivé sur écran tactile et si l'utilisateur réduit les animations.
   ========================================================================== */
const LIFE = 700; // durée de vie d'un point (ms)
const STEP = 4; // distance mini entre deux points (px)
const DOOR = 26; // espacement des cadres de porte (px de trajet)
const MAX_W = 8; // demi-largeur du couloir près du curseur (px)
const COLORS = [
  [29, 95, 174],
  [34, 160, 107],
  [244, 197, 49],
  [242, 138, 38],
  [226, 69, 43],
];
const SPAN = 420; // px de trajet pour parcourir tout le dégradé

type Pt = { x: number; y: number; t: number; d: number; door: boolean };

/* couleur TIC selon la distance parcourue (boucle bleu → rouge → bleu) */
function color(d: number, a: number) {
  const u = (d % (SPAN * 2)) / SPAN; // 0 → 2
  const f = u <= 1 ? u : 2 - u; // aller-retour
  const pos = f * (COLORS.length - 1);
  const i = Math.min(COLORS.length - 2, Math.floor(pos));
  const k = pos - i;
  const c = COLORS[i].map((v, j) => Math.round(v + (COLORS[i + 1][j] - v) * k));
  return `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
}

export function CursorCorridor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pts: Pt[] = [];
    let dist = 0;
    let raf = 0;
    let running = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const last = pts[pts.length - 1];
      const now = performance.now();
      if (last) {
        const dd = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (dd < STEP) return;
        if (dd > 160) {
          /* saut (sortie de fenêtre, défilement) : on repart à zéro */
          pts.length = 0;
        } else {
          const before = Math.floor(dist / DOOR);
          dist += dd;
          pts.push({ x: e.clientX, y: e.clientY, t: now, d: dist, door: Math.floor(dist / DOOR) !== before });
          start();
          return;
        }
      }
      pts.push({ x: e.clientX, y: e.clientY, t: now, d: dist, door: false });
      start();
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const frame = (now: number) => {
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (pts.length < 3) {
        running = pts.length > 0;
        if (running) raf = requestAnimationFrame(frame);
        return;
      }
      /* rails gauche / droit : décalés selon la normale, largeur selon l'âge */
      const L: [number, number][] = [];
      const R: [number, number][] = [];
      const A: number[] = [];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const a = pts[Math.max(0, i - 1)];
        const b = pts[Math.min(pts.length - 1, i + 1)];
        let nx = -(b.y - a.y);
        let ny = b.x - a.x;
        const n = Math.hypot(nx, ny) || 1;
        nx /= n;
        ny /= n;
        const life = 1 - (now - p.t) / LIFE; // 1 = récent
        const w = 2 + MAX_W * life;
        L.push([p.x + nx * w, p.y + ny * w]);
        R.push([p.x - nx * w, p.y - ny * w]);
        A.push(Math.pow(Math.max(0, life), 0.6));
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      /* rails */
      for (let i = 1; i < pts.length; i++) {
        const al = Math.max(0, A[i]) * 0.32;
        ctx.strokeStyle = color(pts[i].d, al);
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(L[i - 1][0], L[i - 1][1]);
        ctx.lineTo(L[i][0], L[i][1]);
        ctx.moveTo(R[i - 1][0], R[i - 1][1]);
        ctx.lineTo(R[i][0], R[i][1]);
        ctx.stroke();
      }
      /* cadres de porte : traverse + deux montants courts */
      for (let i = 1; i < pts.length - 1; i++) {
        if (!pts[i].door) continue;
        const al = Math.max(0, A[i]) * 0.22;
        ctx.strokeStyle = color(pts[i].d, al);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(L[i][0], L[i][1]);
        ctx.lineTo(R[i][0], R[i][1]);
        ctx.stroke();
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
