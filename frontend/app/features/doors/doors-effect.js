// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Portes du corridor (ouverture au survol / au toucher). */
import { $$, isCoarsePointer } from '~/lib/dom/scope';

/* ====================================================================
   7 · PORTES DU CORRIDOR
   survol au bureau · premier appui = ouvrir, second = entrer
   ==================================================================== */
/** @param {import("~/lib/dom/scope").Scope} scope */
export function doors(scope) {
  var list = $$('.door');
  list.forEach(function (door) {
    function open() {
      list.forEach(function (o) { if (o !== door) { o.classList.remove('is-open'); } });
      door.classList.add('is-open');
    }
    scope.on(door, 'click', function (e) {
      if (isCoarsePointer() && !door.classList.contains('is-open')) {
        e.preventDefault();
        open();
      }
    });
    scope.on(door, 'mouseenter', open);
    scope.on(door, 'mouseleave', function () { door.classList.remove('is-open'); });
    scope.on(door, 'focus', open);
    scope.on(door, 'blur', function () { door.classList.remove('is-open'); });
    scope.on(door, 'keydown', function (e) {
      if (e.key === 'Escape') { door.classList.remove('is-open'); }
    });
  });
}
