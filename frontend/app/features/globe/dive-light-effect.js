// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Lumière de plongée : prolonge le globe jusqu'à la section suivante. */
import { $, clamp, prefersReducedMotion } from '~/lib/dom/scope';

/* ====================================================================
   5b · LUMIERE DE PLONGEE — l'embrasement du globe se prolonge en un
   voile blanc plein ecran, fixe, qui ne s'efface qu'une fois entres
   derriere elle, dans la section de revelation. Aucune page noire :
   l'immersion reste continue jusqu'a la sortie de la lumiere.
   Calcule en direct sur getBoundingClientRect() a chaque frame — les
   memes mesures que la plongee du globe elle-meme (fonction progress())
   — plutot que sur des offsets figes au chargement : impossible que le
   voile se desynchronise de l'animation reelle et reste bloque au blanc
   apres la fin de l'immersion, quelle que soit la mise en page (polices,
   images, canvas) au moment du chargement.
   ==================================================================== */
/** @param {import("~/lib/dom/scope").Scope} scope */
export function diveLight(scope) {
  var overlay  = $('#diveLight');
  var heroEl   = $('.hero');
  /* la section suivante (le manifeste) n'est pas requise : la lumière ne
     dépend que du défilement du hero */
  if (!overlay || !heroEl) { return; }
  if (prefersReducedMotion()) { return; }

  var fade = window.innerHeight * .06;  /* distance de sortie de la lumiere une
                                            fois le hero entierement defile : quasi
                                            instantanee, pour tomber tout de suite
                                            sur la section suivante */

  var tick = false;
  function run() {
    tick = false;
    var vh  = window.innerHeight;
    var r   = heroEl.getBoundingClientRect();
    var run1 = Math.max(1, r.height - vh);
    var op;
    if (r.bottom > vh) {
      /* encore dans la portion epinglee : la lumiere monte en fin de plongee */
      var p = clamp(-r.top / run1, 0, 1);
      op = clamp((p - .78) / .2, 0, 1);
    } else {
      /* le hero a fini de defiler (sa base a franchi le bas de l'ecran) :
         on quitte la lumiere tres vite, quelle que soit la mise en page,
         pour reveler tout de suite la section suivante */
      var out = vh - r.bottom;   /* distance deja parcourue depuis la fin du hero */
      op = 1 - clamp(out / fade, 0, 1);
    }
    overlay.style.opacity = op.toFixed(3);
    overlay.classList.toggle('is-active', op > .002);
  }
  run();
  scope.on(window, 'scroll', function () {
    if (!tick) { tick = true; scope.raf(run); }
  }, { passive: true });
  scope.on(window, 'resize', function () {
    fade = window.innerHeight * .06;
    run();
  }, { passive: true });
}
