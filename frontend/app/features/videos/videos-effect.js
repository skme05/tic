// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Vidéos : lecture seulement quand elles sont visibles, bouton son. */
import { $, $$, prefersReducedMotion } from '~/lib/dom/scope';

/* ====================================================================
   8 · VIDEOS — on ne joue que ce qui est visible
   ==================================================================== */
/** @param {import("~/lib/dom/scope").Scope} scope */
export function videos(scope) {
  var vids = $$('video[data-auto]');
  if (!vids.length) { return; }

  vids.forEach(function (v) {
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('playsinline', '');
  });

  /* mouvement réduit demandé : pas de vidéo en lecture automatique,
     l'image d'affiche (poster) reste affichée */
  if (prefersReducedMotion()) { return; }

  /* la video du footer tourne en continu : le coverstack la garde souvent
     hors du viewport (recouverte par le CTA sticky) sans qu'elle soit
     jamais vraiment sortie de la page, elle ne doit donc jamais se mettre en pause */
  var always = $$('.foot__v', document);
  var gated  = vids.filter(function (v) { return always.indexOf(v) === -1; });

  function playIt(v) { var r = v.play(); if (r && typeof r.catch === 'function') { r.catch(function () {}); } }
  always.forEach(playIt);

  if (!('IntersectionObserver' in window)) {
    gated.forEach(playIt);
  } else {
    var io = scope.io(function (en) {
      en.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { playIt(v); } else if (!v.paused) { v.pause(); }
      });
    }, { threshold: .12 });
    gated.forEach(function (v) { io.observe(v); });
  }

  /* coupure / rétablissement du son (bouton .vmute) — à n'utiliser que pour
     une vidéo qui possède une piste audio */
  $$('.vmute').forEach(function (btn) {
    var v = $('#' + btn.getAttribute('data-for'));
    if (!v) { return; }
    scope.on(btn, 'click', function () {
      v.muted = !v.muted;
      btn.setAttribute('aria-pressed', String(!v.muted));
      btn.innerHTML = v.muted ? ICON_MUTE : ICON_SOUND;
      if (!v.muted) { var r = v.play(); if (r && r.catch) { r.catch(function () {}); } }
    });
  });
}
var ICON_MUTE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><line x1="17" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="17" y2="15"/></svg>';
var ICON_SOUND = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M16 8.5a5 5 0 0 1 0 7"/><path d="M19 6a9 9 0 0 1 0 12"/></svg>';
