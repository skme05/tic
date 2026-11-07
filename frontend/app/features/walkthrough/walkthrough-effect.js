// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Franchir une porte : transition immersive entre deux pages. */
import { $$, prefersReducedMotion, isCoarsePointer } from '~/lib/dom/scope';

/* ====================================================================
   9 · FRANCHIR UNE PORTE — immersion totale puis arrivee sur la page
   ==================================================================== */
var WALK_KEY = 'tic_walk_c';

/**
 * Version application (React Router) : la page n'est plus rechargée ; à
 * la fin de l'animation on appelle `navigate(href)`, puis l'effet de la
 * nouvelle page joue l'arrivée et retire le voile de sortie.
 * @param {import("~/lib/dom/scope").Scope} scope
 * @param {(href: string) => void} navigate
 */
export function walkthrough(scope, navigate) {
  /* ── arrivee : l'embrasure de lumiere se retire et decouvre la page ──
     Un cache plein ecran (#walkPre) a deja ete pose de facon synchrone,
     tout en haut du <body>, avant meme le CSS et le reste de la page :
     il n'y a donc jamais de blanc entre la sortie de l'ancienne page et
     ce cache. Ici on ne fait que lui succeder avec la belle animation
     d'ouverture, sans jamais le retirer avant que quelque chose d'autre
     ne recouvre deja l'ecran. */
  var from = null;
  try { from = sessionStorage.getItem(WALK_KEY); } catch (e) {}
  var pre = document.getElementById('walkPre');
  if (from) {
    try { sessionStorage.removeItem(WALK_KEY); } catch (e) {}
    /* voile de sortie posé par la page précédente (même document) :
       retiré juste après que l'animation d'arrivée l'a recouvert */
    $$('.walk--out').forEach(function (w) {
      scope.timeout(function () { w.remove(); }, 60);
    });
    document.documentElement.classList.remove('is-crossing');
    document.body.classList.remove('is-locked');
    window.scrollTo(0, 0);
    if (!prefersReducedMotion()) {
      var iris = document.createElement('div');
      iris.className = 'walk walk--in';
      iris.style.setProperty('--c', from);
      iris.innerHTML = '<span class="walk__flash"></span>';
      document.body.appendChild(iris);
      /* le cache pose tout en haut du <body> cede la place a l'animation
         au meme instant : les deux sont pleinement opaques, donc aucune
         image de la page nue ne peut apparaitre entre les deux. */
      if (pre && pre.parentNode) { pre.parentNode.removeChild(pre); }
      scope.timeout(function () { if (iris.parentNode) { iris.parentNode.removeChild(iris); } }, 1600);
    } else if (pre && pre.parentNode) {
      pre.parentNode.removeChild(pre);
    }
  } else if (pre && pre.parentNode) {
    /* cache orphelin (navigation directe, retour arriere...) : on le
       retire sans animation pour ne jamais bloquer la page */
    pre.parentNode.removeChild(pre);
  }

  if (prefersReducedMotion()) { return; }

  $$('.door, .ndoor').forEach(function (door) {
    scope.on(door, 'click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) { return; }
      /* sur ecran tactile, le premier appui ouvre seulement la porte */
      if (isCoarsePointer() && !door.classList.contains('is-open')) { return; }
      e.preventDefault();
      cross(door);
    });
  });

  /* ── on franchit : la piece grandit jusqu'a remplir l'ecran ── */
  var going = false;
  function cross(door) {
    if (going) { return; }
    going = true;
    var href = door.getAttribute('href');
    var col  = (door.style.getPropertyValue('--c') || '#b91c1c').trim();
    var r    = door.getBoundingClientRect();
    /* la lumiere part d'un disque centre sur la porte et grandit jusqu'a
       couvrir tout l'ecran (rayon = distance au coin le plus eloigne) :
       plus de rectangle calque sur la porte, donc plus de « carre »
       visible pendant l'immersion */
    var cx   = r.left + r.width / 2, cy = r.top + r.height / 2;
    var R    = Math.ceil(Math.sqrt(Math.pow(Math.max(cx, window.innerWidth - cx), 2) +
                                   Math.pow(Math.max(cy, window.innerHeight - cy), 2)));
    var s0   = Math.max(0.05, Math.min(r.width, r.height) / (2 * R));

    door.classList.add('is-open');            /* le battant est ouvert pendant la traversee */
    var ov = document.createElement('div');
    ov.className = 'walk walk--out';
    ov.style.setProperty('--c', col);
    ov.style.setProperty('--s0', s0.toFixed(3));
    /* le voile final (inset:-60%) s'allume au meme point que le disque */
    ov.style.setProperty('--fx', ((0.6 * window.innerWidth + cx) / (2.2 * window.innerWidth) * 100).toFixed(1) + '%');
    ov.style.setProperty('--fy', ((0.6 * window.innerHeight + cy) / (2.2 * window.innerHeight) * 100).toFixed(1) + '%');
    ov.innerHTML =
      '<span class="walk__room" style="left:' + (cx - R) + 'px;top:' + (cy - R) +
      'px;width:' + (2 * R) + 'px;height:' + (2 * R) + 'px"></span>' +
      '<span class="walk__glow"></span><span class="walk__flash"></span>';
    document.body.appendChild(ov);
    document.documentElement.classList.add('is-crossing');
    document.body.classList.add('is-locked');

    try { sessionStorage.setItem(WALK_KEY, col); } catch (e) {}
    scope.timeout(function () { navigate(href); }, 1560);
  }

  /* Retour arriere : Chrome et Safari mobiles restaurent la page depuis
     leur cache (bfcache) telle qu'on l'a quittee — voile de traversee
     plein ecran compris, page verrouillee. Le visiteur restait alors
     bloque sur la lumiere de la porte. On remet la page en etat. */
  scope.on(window, 'pageshow', function (e) {
    if (!e.persisted) { return; }
    $$('.walk').forEach(function (w) { if (w.parentNode) { w.parentNode.removeChild(w); } });
    document.documentElement.classList.remove('is-crossing');
    document.body.classList.remove('is-locked');
    $$('.door.is-open').forEach(function (d) { d.classList.remove('is-open'); });
    going = false;
    try { sessionStorage.removeItem(WALK_KEY); } catch (err) {}
  });
}
