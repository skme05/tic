// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Bandes défilantes (plateformes, logos, témoignages). */
import { $, $$ } from '~/lib/dom/scope';

/* ====================================================================
   10 · BANDES DEFILANTES — logos partenaires, plateformes, temoignages
   Le contenu est duplique une fois : la piste se translate de -50 %,
   la boucle est donc invisible.
   ==================================================================== */
/** @param {import("~/lib/dom/scope").Scope} scope */
export function rails(scope) {
  $$('.rail__track').forEach(function (track) {
    if (track.getAttribute('data-cloned') === '1') { return; }
    var kids = Array.prototype.slice.call(track.children);
    var clones = kids.map(function (k) {
      var c = k.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      $$('a,button,input,textarea,select', c).forEach(function (f) { f.setAttribute('tabindex', '-1'); });
      track.appendChild(c);
      return c;
    });
    track.setAttribute('data-cloned', '1');
    /* au démontage : on retire les copies pour rendre à React son DOM d'origine */
    scope.add(function () {
      clones.forEach(function (c) { c.remove(); });
      track.removeAttribute('data-cloned');
    });
    /* duree proportionnelle a la largeur : vitesse constante partout */
    var w = track.scrollWidth / 2;
    var speed = parseFloat(track.getAttribute('data-speed') || '58'); /* px/s */
    track.style.animationDuration = Math.max(14, Math.round(w / speed)) + 's';
  });

  /* une piste hors champ ne consomme rien */
  if (!('IntersectionObserver' in window)) { return; }
  var io = scope.io(function (en) {
    en.forEach(function (e) {
      var t = $('.rail__track', e.target);
      if (t) { t.style.animationPlayState = e.isIntersecting ? 'running' : 'paused'; }
    });
  }, { rootMargin: '120px 0px' });
  $$('.rail').forEach(function (r) { io.observe(r); });
}
