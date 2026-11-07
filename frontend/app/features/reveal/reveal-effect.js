// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Apparitions au défilement (.reveal). */
import { $$, prefersReducedMotion } from '~/lib/dom/scope';

/* ====================================================================
   4 · APPARITIONS
   ==================================================================== */
/** @param {import("~/lib/dom/scope").Scope} scope */
export function reveal(scope) {
  var items = $$('.reveal');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach(function (i) { i.classList.add('in'); });
    return;
  }
  /* bidirectionnel : l'element apparait en descendant et disparait en
     remontant au-dela du viewport, puis rejoue son animation quand on
     redescend dessus (meme logique que le portfolio) */
  var io = scope.io(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); }
      else { e.target.classList.remove('in'); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (i) { io.observe(i); });
}
