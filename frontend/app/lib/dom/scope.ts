/* ==========================================================================
   Scope : garde la trace de tout ce qu'un effet visuel met en place
   (écouteurs, observateurs, timers, boucles d'animation) pour TOUT retirer
   d'un coup quand la page change ou que le composant disparaît.

   Les effets d'animation (globe, scènes 3D, révélation de texte...) sont du
   code impératif sur le DOM : on les lance dans un useEffect et on renvoie
   scope.dispose comme fonction de nettoyage.
   ========================================================================== */
export interface Scope {
  on<K extends keyof WindowEventMap>(target: Window, type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions | boolean): void;
  on<K extends keyof DocumentEventMap>(target: Document, type: K, fn: (e: DocumentEventMap[K]) => void, opts?: AddEventListenerOptions | boolean): void;
  on<K extends keyof HTMLElementEventMap>(target: Element, type: K, fn: (e: HTMLElementEventMap[K]) => void, opts?: AddEventListenerOptions | boolean): void;
  on(target: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions | boolean): void;
  io(cb: IntersectionObserverCallback, opts?: IntersectionObserverInit): IntersectionObserver;
  raf(fn: FrameRequestCallback): number;
  timeout(fn: () => void, ms?: number): number;
  interval(fn: () => void, ms?: number): number;
  add(cleanup: () => void): void;
  readonly disposed: boolean;
  dispose(): void;
}

export function createScope(): Scope {
  const cleanups: (() => void)[] = [];
  /* boucles d'animation et minuteries : seuls les appels EN ATTENTE sont
     suivis (une boucle rAF continue ne doit pas accumuler de nettoyages) */
  const frames = new Set<number>();
  const timers = new Set<number>();
  let disposed = false;
  return {
    on(target: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions | boolean) {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    },
    io(cb, opts) {
      const o = new IntersectionObserver(cb, opts);
      cleanups.push(() => o.disconnect());
      return o;
    },
    raf(fn) {
      if (disposed) return 0;
      const id = requestAnimationFrame((t) => {
        frames.delete(id);
        if (!disposed) fn(t);
      });
      frames.add(id);
      return id;
    },
    timeout(fn, ms) {
      if (disposed) return 0;
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!disposed) fn();
      }, ms);
      timers.add(id);
      return id;
    },
    interval(fn, ms) {
      const id = window.setInterval(fn, ms);
      cleanups.push(() => clearInterval(id));
      return id;
    },
    add(cleanup) {
      cleanups.push(cleanup);
    },
    get disposed() {
      return disposed;
    },
    dispose() {
      disposed = true;
      frames.forEach((id) => cancelAnimationFrame(id));
      timers.forEach((id) => clearTimeout(id));
      frames.clear();
      timers.clear();
      while (cleanups.length) {
        try { cleanups.pop()!(); } catch { /* on continue le nettoyage */ }
      }
    },
  };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isCoarsePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
