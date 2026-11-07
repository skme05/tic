import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { CorridorPlan } from '~/components/sections/ServiceGrid';

/* ==========================================================================
   En-tête des pages intérieures (préfixe .ph) — 5 mises en scène du couloir :
   - door    : la photo dans une porte en arche, portes en enfilade derrière ;
   - wall    : la photo en mur de couloir fuyant, bord aux couleurs TIC ;
   - slides  : texte centré, photo panoramique révélée par des portes coulissantes ;
   - plan    : papier de plan bleu, photo bichromie et couloir tracé en direct ;
   - tunnel  : texte centré au cœur d'un couloir de cadres qui avance sans fin.
   Par principe, toutes les pages classiques partagent le même en-tête
   (HERO_PAGES) et toutes les pages produits /solutions/<slug> le leur
   (HERO_PRODUCTS). La prop `variant` permet une exception ponctuelle.
   Styles : styles/sections/page-hero.css
   ========================================================================== */
export interface Crumb {
  label: string;
  to?: string;
}

export const HERO_VARIANTS = ['door', 'wall', 'slides', 'plan', 'tunnel'] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];

/* en-tête des pages classiques et des pages produits (solutions) */
export const HERO_PAGES: HeroVariant = 'door';
export const HERO_PRODUCTS: HeroVariant = 'plan';
const pickVariant = (path: string): HeroVariant => (/^\/solutions\/[^/]+/.test(path) ? HERO_PRODUCTS : HERO_PAGES);

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  image: string;
  imageAlt?: string;
  /** couleur d'accent (étiquette, lueur) — bleu TIC par défaut */
  color?: string;
  /** petite carte posée sur le visuel */
  badge?: { k: string; v: string };
  /** version plus basse (pages formulaire) */
  compact?: boolean;
  /** imposer une mise en scène (sinon : tirée de l'adresse) */
  variant?: HeroVariant;
  /** actions (boutons) */
  children?: ReactNode;
}

export function PageHero({ crumbs, eyebrow, title, lead, image, imageAlt = '', color = '#1D5FAE', badge, compact, variant, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const v = variant ?? pickVariant(pathname);

  /* parallaxe légère à la souris */
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const label = (typeof title === 'string' ? title : (badge?.k ?? eyebrow ?? 'Porte')).toUpperCase();
  const badgeEl = badge && (
    <span className="ph__badge">
      <span className="ph__dot"></span>
      <span>
        <small>{badge.k}</small>
        <b>{badge.v}</b>
      </span>
    </span>
  );
  const img = <img src={image} alt={imageAlt} loading="eager" decoding="async" />;

  return (
    <section
      ref={ref}
      className={`ph ph--${v}` + (compact ? ' ph--compact' : '')}
      data-variant={v}
      style={{ '--c': color } as CSSProperties}
    >
      <span className="ph__aura" aria-hidden="true"></span>
      {v === 'tunnel' && (
        <span className="ph__tunnel" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <i key={i} style={{ '--i': i } as CSSProperties}></i>
          ))}
        </span>
      )}
      <div className="ph__in">
        <div className="ph__copy">
          <nav className="ph__crumbs ph__enter" aria-label="Fil d'Ariane">
            <ol>
              {crumbs.map((c, i) => (
                <li key={c.label}>
                  {c.to && i < crumbs.length - 1 ? (
                    <Link viewTransition to={c.to}>
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && (
            <p className="ph__eyebrow ph__enter" style={{ '--d': '.06s' } as CSSProperties}>
              <span className="ph__dot"></span>
              {eyebrow}
            </p>
          )}
          <h1 className="ph__title ph__enter" style={{ '--d': '.12s' } as CSSProperties}>
            {title}
          </h1>
          <p className="ph__lead ph__enter" style={{ '--d': '.2s' } as CSSProperties}>
            {lead}
          </p>
          {children && (
            <div className="ph__actions ph__enter" style={{ '--d': '.28s' } as CSSProperties}>
              {children}
            </div>
          )}
          {v === 'tunnel' && badgeEl && (
            <div className="ph__enter ph__tunnel-badge" style={{ '--d': '.36s' } as CSSProperties}>
              <span className="ph__avatar">{img}</span>
              {badgeEl}
            </div>
          )}
        </div>

        {v === 'door' && (
          <div className="ph__stage" aria-hidden={imageAlt ? undefined : true}>
            <span className="ph__floor"></span>
            <span className="ph__vanish"></span>
            <span className="ph__arch" style={{ '--i': 3 } as CSSProperties}></span>
            <span className="ph__arch" style={{ '--i': 2 } as CSSProperties}></span>
            <span className="ph__arch" style={{ '--i': 1 } as CSSProperties}></span>
            <figure className="ph__door">
              {img}
              <span className="ph__leaf ph__leaf--l"></span>
              <span className="ph__leaf ph__leaf--r"></span>
              <span className="ph__frame"></span>
            </figure>
            {badgeEl}
          </div>
        )}

        {v === 'slides' && (
          <div className="ph__slides" aria-hidden={imageAlt ? undefined : true}>
            <figure className="ph__pano">
              {img}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="ph__slat" style={{ '--i': i } as CSSProperties}></span>
              ))}
            </figure>
            {badgeEl}
          </div>
        )}

        {v === 'plan' && (
          <div className="ph__sheet" aria-hidden={imageAlt ? undefined : true}>
            <figure className="ph__print">
              {img}
              <CorridorPlan label={label} className="ph__trace" />
            </figure>
            <span className="ph__cart">
              <b>TIC · {label}</b>
              <span>Éch. 1:50 — Abidjan</span>
            </span>
            {badgeEl}
          </div>
        )}
      </div>

      {v === 'wall' && (
        <div className="ph__wall" aria-hidden={imageAlt ? undefined : true}>
          <figure className="ph__wallimg">{img}</figure>
          <span className="ph__walledge"></span>
          {badgeEl}
        </div>
      )}
    </section>
  );
}
