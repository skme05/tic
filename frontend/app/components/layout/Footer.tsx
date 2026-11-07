import { useEffect, useRef, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { legalNav } from '~/content/navigation';
import { services } from '~/content/services';
import { solutions } from '~/content/solutions';
import { nbsp, site } from '~/content/site';
import { IconEmail, IconFacebook, IconLinkedIn, IconX } from '~/components/ui/icons';

/* ==========================================================================
   Pied de page — carte sombre aux coins arrondis.
   En fond : un couloir de lumière en particules qui monte vers un point de
   fuite (dégradé TIC). En bas : « The Infinite Corridor » en très grand,
   coupé par le bord de la carte : les lettres montent une à une quand le
   pied de page apparaît, puis une vague aux couleurs TIC les parcourt.
   Les colonnes ne répètent pas le menu : portes, solutions, coordonnées.
   Styles : styles/layout/footer-corridor.css
   ========================================================================== */
const FOOTER_SOLUTIONS = ['odoo', 'paie', 'school-manager', 'e-clinique', 'scraper-pro'];

const WORD = 'The Infinite Corridor';

export function Footer() {
  const c = site.contact;
  const wordRef = useRef<HTMLParagraphElement>(null);

  /* animation de l'inscription quand elle entre à l'écran */
  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const sols = FOOTER_SOLUTIONS.map((s) => solutions.find((x) => x.slug === s)).filter((s) => s !== undefined);
  return (
    <footer className="ftr">
      <div className="ftr__card">
        <div className="ftr__art" aria-hidden="true">
          <span className="ftr__rays"></span>
          <span className="ftr__dust"></span>
          <span className="ftr__dust ftr__dust--2"></span>
          <span className="ftr__beam"></span>
        </div>

        <div className="ftr__top">
          <div className="ftr__brand">
            <Link viewTransition to="/" className="ftr__logo" aria-label="TIC — accueil">
              <svg viewBox="0 0 200 100" aria-hidden="true">
                <defs>
                  <linearGradient id="ftrInf" x1="0" x2="1">
                    <stop offset="0" stopColor="#4F9BF0" />
                    <stop offset=".3" stopColor="#3CCB86" />
                    <stop offset=".5" stopColor="#F4C531" />
                    <stop offset=".72" stopColor="#F59A3E" />
                    <stop offset="1" stopColor="#F2674A" />
                  </linearGradient>
                </defs>
                <path d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z" fill="none" stroke="url(#ftrInf)" strokeWidth="15" strokeLinecap="round" />
              </svg>
              <span>
                The Infinite Corridor
                <small>Software Solutions</small>
              </span>
            </Link>
            <p className="ftr__tag">
              Des solutions technologiques sur mesure, innovantes et durables pour les entreprises et institutions africaines.
            </p>
            <div className="ftr__soc">
              {site.social.linkedin && (
                <a href={site.social.linkedin} aria-label="LinkedIn" rel="noopener">
                  <IconLinkedIn />
                </a>
              )}
              {site.social.facebook && (
                <a href={site.social.facebook} aria-label="Facebook" rel="noopener">
                  <IconFacebook />
                </a>
              )}
              {site.social.x && (
                <a href={site.social.x} aria-label="X" rel="noopener">
                  <IconX />
                </a>
              )}
              <a href={`mailto:${c.email}`} aria-label="Email">
                <IconEmail />
              </a>
            </div>
          </div>

          <nav className="ftr__col" aria-label="Nos portes">
            <h2>Nos portes</h2>
            {services.map((s) => (
              <Link viewTransition key={s.slug} to={`/services/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </nav>
          <nav className="ftr__col" aria-label="Solutions">
            <h2>Solutions</h2>
            {sols.map((s) => (
              <Link viewTransition key={s.slug} to={`/solutions/${s.slug}`}>
                {s.name}
              </Link>
            ))}
            <Link viewTransition to="/solutions" className="ftr__more">
              Toutes les solutions →
            </Link>
          </nav>
          <div className="ftr__col">
            <h2>Nous joindre</h2>
            <a href={`tel:${c.phoneHref}`}>{nbsp(c.phone)}</a>
            <a href={`mailto:${c.email}`}>{c.email}</a>
            <span>
              {c.district}, {c.city} — {c.country}
            </span>
            <span>Lun – Ven · 08 h – 18 h GMT</span>
            <Link viewTransition to="/demarrer-un-projet" className="ftr__more">
              Démarrer un projet →
            </Link>
          </div>
        </div>

        <div className="ftr__bar">
          <p>
            © {new Date().getFullYear()} TIC — {site.legalName}. Tous droits réservés.
          </p>
          <ul>
            <li>
              <Link viewTransition to="/espace-client">Espace client</Link>
            </li>
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link viewTransition to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#top">Haut de page ↑</a>
            </li>
          </ul>
        </div>

        <p className="ftr__word" aria-hidden="true" ref={wordRef}>
          {WORD.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {ch === ' ' ? '\u00a0' : ch}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
