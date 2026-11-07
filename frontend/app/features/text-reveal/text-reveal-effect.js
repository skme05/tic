// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Révélation du manifeste mot à mot au défilement. */
import { $, $$, clamp, prefersReducedMotion } from '~/lib/dom/scope';

/* ====================================================================
   6 · REVELATION DE TEXTE AU SCROLL
   ==================================================================== */
/** @param {import("~/lib/dom/scope").Scope} scope */
export function textReveal(scope) {
  var sec = $('.reveal-sec');
  if (!sec) { return; }
  var box = $('.rs__txt', sec);
  var bar = $('.rs__prog i', sec);
  if (!box) { return; }

  /* on decoupe en mots, en conservant les <b> comme accents */
  function split(node, hot) {
    var kids = Array.prototype.slice.call(node.childNodes);
    kids.forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach(function (w) {
          if (!w) { return; }
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
          var s = document.createElement('span');
          s.className = 'w' + (hot ? ' hot' : '');
          s.textContent = w;
          frag.appendChild(s);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) {
        split(n, hot || n.tagName === 'B' || n.tagName === 'EM');
      }
    });
  }
  /* au démontage, le texte d'origine est rétabli (le DOM redevient celui
     que React a rendu ; utile notamment en double montage de développement) */
  var original = box.cloneNode(true);
  split(box, false);
  scope.add(function () { box.replaceChildren.apply(box, Array.prototype.slice.call(original.childNodes)); });

  var words = $$('.w', box);
  if (prefersReducedMotion()) { words.forEach(function (w) { w.classList.add('on'); }); return; }

  var tick = false;
  function run() {
    tick = false;
    var r = sec.getBoundingClientRect();
    var run2 = r.height - window.innerHeight;
    var p = run2 > 0 ? clamp(-r.top / run2, 0, 1) : 0;
    /* le texte se revele vite des l'arrivee sur la section — on ne veut
       plus d'un long scroll "a vide" juste apres la plongee du globe */
    var n = Math.round(clamp(p / .2, 0, 1) * words.length);
    for (var i = 0; i < words.length; i++) {
      words[i].classList.toggle('on', i < n);
    }
    if (bar) { bar.style.width = (p * 100).toFixed(1) + '%'; }
  }
  scope.on(window, 'scroll', function () {
    if (!tick) { tick = true; scope.raf(run); }
  }, { passive: true });
  scope.on(window, 'resize', run, { passive: true });
  run();
}
