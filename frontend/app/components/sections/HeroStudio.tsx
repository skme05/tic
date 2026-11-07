import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { solutions } from '~/content/solutions';
import { prefersReducedMotion } from '~/lib/dom/scope';

/* ==========================================================================
   Hero de l'accueil — composition « studio » claire et animée
   Gauche : titre, accroche, actions, plateformes en production.
   Droite : éléments d'interface flottants (panneau-porte aux couleurs du
   logo, disque ∞, fenêtre de code, graphique, tuiles reliées).
   Animations : entrée en cascade, SORTIE au défilement, flottement,
   parallaxe à la souris, curseur sur un arc, fil et point, graphique.
   Styles : styles/sections/hero-studio.css (préfixe .hs).
   ========================================================================== */

const PLATFORMS = ['odoo', 'paie', 'fne', 'school-manager', 'e-clinique'];

export function HeroStudio() {
  const ref = useRef<HTMLElement>(null);
  /* les animations SVG (SMIL) ne sont rendues que si le mouvement est permis */
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setMotion(true);
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let rafScroll = 0;

    /* SORTIE : quand on fait défiler la page, le texte remonte et s'efface,
       les éléments de la composition s'écartent selon leur profondeur.
       --out va de 0 (hero en place) à 1 (hero sorti). */
    const onScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(() => {
        /* la sortie commence quand le tiers du hero est passé, et se termine
           quand son bas quitte l'écran (identique sur ordinateur et mobile) */
        const h = el.offsetHeight || 1;
        const start = h * 0.35;
        el.style.setProperty('--out', Math.min(1, Math.max(0, (window.scrollY - start) / (h * 0.6))).toFixed(3));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* PARALLAXE : la position de la souris (-1 → 1) en variables CSS */
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    if (fine) window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafScroll);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const platforms = PLATFORMS.map((slug) => solutions.find((s) => s.slug === slug)).filter((s) => s !== undefined);

  return (
    <section className="hs" ref={ref} aria-labelledby="hs-title">
      <div className="hs__in">
        {/* ── texte ── */}
        <div className="hs__copy">
          <p className="hs__pill hs__enter" style={{ '--d': '.05s' }}>
            <span className="hs__pill-dot" aria-hidden="true"></span>
            Abidjan · Côte d'Ivoire · depuis 2021
          </p>
          <h1 className="hs__title" id="hs-title">
            <span className="hs__line hs__enter" style={{ '--d': '.12s' }}>
              De meilleures
              <svg className="hs__sparkle" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 0 C21.5 13 27 18.5 40 20 C27 21.5 21.5 27 20 40 C18.5 27 13 21.5 0 20 C13 18.5 18.5 13 20 0Z" />
              </svg>
            </span>
            <span className="hs__line hs__enter" style={{ '--d': '.2s' }}>
              <span className="hs__mark">perspectives</span>
            </span>
            <span className="hs__line hs__line--soft hs__enter" style={{ '--d': '.28s' }}>
              pour la croissance de votre activité
            </span>
          </h1>
          <p className="hs__lead hs__enter" style={{ '--d': '.4s' }}>
            The Infinite Corridor Software Solutions accompagne entreprises et institutions dans leur transformation numérique avec des
            solutions technologiques sur mesure, innovantes et durables.
          </p>
          <div className="hs__cta hs__enter" style={{ '--d': '.5s' }}>
            <Link viewTransition to="/demarrer-un-projet" className="hs__btn">
              Démarrer un projet <i className="arw"></i>
            </Link>
            <Link viewTransition to="/solutions" className="hs__link">
              Voir nos solutions <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hs__brands hs__enter" style={{ '--d': '.62s' }}>
            <p>Nos plateformes en production</p>
            <ul>
              {platforms.map((s) => (
                <li key={s.slug}>
                  <Link viewTransition to={`/solutions/${s.slug}`}>{s.menuLabel ?? s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── composition animée (décorative) ── */}
        <div className="hs__art" aria-hidden="true">
          {/* panneau « porte » dans le dégradé du logo */}
          <div className="hs__layer hs__panel hs__pop" style={{ '--d': '.15s', '--z': 0.5 }}>
            <span className="hs__panel-dots">
              <i></i>
              <i></i>
            </span>
            <div className="hs__toolbar">
              <span className="hs__tool">
                <svg viewBox="0 0 24 24"><path d="M8 7 3 12l5 5M16 7l5 5-5 5" /></svg>
              </span>
              <span className="hs__tool">
                <svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></svg>
              </span>
              <span className="hs__tool">
                <svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4Z" /></svg>
              </span>
              <span className="hs__tool hs__tool--plus">
                <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </div>
          </div>

          {/* arc + curseur, et fil entre les tuiles (même repère 0-100) */}
          <svg className="hs__layer hs__lines" viewBox="0 0 100 100" style={{ '--z': 0.8 }}>
            <path id="hsArc" className="hs__arc" d="M55 15 C74 16 88 30 91 49" />
            <circle className="hs__arc-end" cx="55" cy="15" r="0.9" />
            <circle className="hs__arc-end" cx="91" cy="49" r="0.9" />
            <g className="hs__cursor">
              <path d="M0 0 L4.2 1.6 L2.2 2.4 L1.6 4.4 Z" />
              {motion && (
                <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1">
                  <mpath href="#hsArc" />
                </animateMotion>
              )}
            </g>
            <path id="hsWire" className="hs__wire" d="M18.5 79 H22 C26 79 27 77 27 73 V55 C27 50.5 28.5 49 33 49 H35.5" />
            <circle className="hs__wire-dot" r="1.3" cx="0" cy="0">
              {motion && (
                <animateMotion dur="3.2s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".5 0 .5 1">
                  <mpath href="#hsWire" />
                </animateMotion>
              )}
            </circle>
          </svg>

          {/* disque central : le symbole ∞ en mouvement */}
          <div className="hs__layer hs__disc hs__pop" style={{ '--d': '.3s', '--z': 1.1 }}>
            <span className="hs__orbit"></span>
            <span className="hs__core">
              <svg viewBox="0 0 200 100">
                <path className="hs__inf-base" d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z" />
                <path className="hs__inf-flow" pathLength={100} d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z" />
              </svg>
            </span>
          </div>
          <span className="hs__layer hs__ring hs__pop" style={{ '--d': '.55s', '--z': 1.6 }}></span>

          {/* fenêtre de code */}
          <div className="hs__layer hs__card hs__code hs__pop" style={{ '--d': '.38s', '--z': 1.4 }}>
            <span className="hs__win">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span className="hs__sk hs__sk--1"></span>
            <span className="hs__sk hs__sk--2"></span>
            <span className="hs__sk hs__sk--3"></span>
            <span className="hs__sk-btn"></span>
          </div>

          {/* tuiles reliées */}
          <span className="hs__layer hs__tile hs__tile--orange hs__pop" style={{ '--d': '.62s', '--z': 2 }}>
            <svg viewBox="0 0 24 24"><path d="M9 7 4 12l5 5M15 7l5 5-5 5" /></svg>
          </span>
          <span className="hs__layer hs__tile hs__tile--blue hs__pop" style={{ '--d': '.7s', '--z': 1.8 }}>
            <svg viewBox="0 0 24 24"><path d="M3 12h4l2-5 4 10 2-5h6" /></svg>
          </span>

          {/* graphique */}
          <span className="hs__layer hs__gridcard hs__pop" style={{ '--d': '.5s', '--z': 0.7 }}></span>
          <div className="hs__layer hs__card hs__chart hs__pop" style={{ '--d': '.58s', '--z': 1.5 }}>
            <span className="hs__win">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span className="hs__bars">
              <i style={{ '--h': '.35', '--b': '0s' }}></i>
              <i className="is-green" style={{ '--h': '.62', '--b': '.2s' }}></i>
              <i style={{ '--h': '.5', '--b': '.4s' }}></i>
              <i className="is-blue" style={{ '--h': '1', '--b': '.6s' }}></i>
              <i style={{ '--h': '.3', '--b': '.8s' }}></i>
            </span>
          </div>

          {/* pastille Abidjan */}
          <span className="hs__layer hs__chip hs__pop" style={{ '--d': '.8s', '--z': 2.2 }}>
            <span className="hs__chip-ping"></span>
            Abidjan → Afrique de l'Ouest
          </span>
        </div>
      </div>
    </section>
  );
}
