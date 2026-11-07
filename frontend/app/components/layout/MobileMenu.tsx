import { useEffect, useState, type CSSProperties } from 'react';
import { Link, NavLink } from 'react-router';
import { mainNav } from '~/content/navigation';
import { getSolution } from '~/content/solutions';
import { nbsp, site } from '~/content/site';

/* ==========================================================================
   Menu mobile plein écran (préfixe .mnav) — ouvert par le burger de l'en-tête.
   Grandes entrées numérotées qui entrent en cascade, sous-menus en accordéon
   aux couleurs de chaque entrée, page active marquée du filet TIC, couloir
   en perspective en fond, actions et coordonnées en pied.
   Styles : styles/layout/mobile-menu.css
   ========================================================================== */
const SUB_COLORS = ['#1D5FAE', '#1E8F5E', '#D97706', '#E2452B'];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sub, setSub] = useState<string | null>(null);

  /* page figée derrière le menu, Échap pour fermer */
  useEffect(() => {
    if (!open) {
      setSub(null);
      return;
    }
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div className="mnav" id="mnav" data-open={open} aria-hidden={!open} inert={!open}>
      <span className="mnav__rays" aria-hidden="true"></span>
      <nav className="mnav__in" aria-label="Navigation mobile">
        <ol className="mnav__list">
          {mainNav.map((item, i) => {
            const hasSub = Boolean(item.menu || item.columns);
            const isOpen = sub === item.to;
            return (
              <li key={item.to} className="mnav__item" style={{ '--i': i } as CSSProperties} data-sub={isOpen || undefined}>
                <div className="mnav__row">
                  <NavLink
                    viewTransition
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => 'mnav__l' + (isActive ? ' is-on' : '')}
                    onClick={onClose}
                  >
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    <span className="mnav__lbl">{item.label}</span>
                  </NavLink>
                  {hasSub && (
                    <button
                      type="button"
                      className="mnav__toggle"
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? 'Fermer' : 'Ouvrir'} le sous-menu ${item.label}`}
                      onClick={() => setSub(isOpen ? null : item.to)}
                    >
                      <i></i>
                    </button>
                  )}
                </div>
                {hasSub && (
                  <div className="mnav__sub">
                    <div className="mnav__subin">
                      {item.menu?.map((m, k) => (
                        <Link viewTransition key={m.to} to={m.to} onClick={onClose} style={{ '--c': m.color ?? SUB_COLORS[k % SUB_COLORS.length] } as CSSProperties}>
                          <i></i>
                          <span>
                            <b>{m.title}</b>
                            <small>{m.text}</small>
                          </span>
                        </Link>
                      ))}
                      {item.columns && (
                        <div className="mnav__chips">
                          {item.columns.flatMap((c) => c.items).map((slug) => {
                            const s = getSolution(slug);
                            if (!s) return null;
                            return (
                              <Link viewTransition key={slug} to={`/solutions/${slug}`} onClick={onClose} style={{ '--c': s.color } as CSSProperties}>
                                <i></i>
                                {s.menuLabel ?? s.name}
                              </Link>
                            );
                          })}
                          <Link viewTransition to={item.to} onClick={onClose} className="mnav__all">
                            Toutes les solutions →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mnav__foot" style={{ '--i': mainNav.length } as CSSProperties}>
          <div className="mnav__act">
            <Link viewTransition to="/contact" className="mnav__btn mnav__btn--ink" onClick={onClose}>
              Nous contacter <span aria-hidden="true">→</span>
            </Link>
            <Link viewTransition to="/espace-client" className="mnav__btn" onClick={onClose}>
              Espace client
            </Link>
          </div>
          <p className="mnav__contact">
            <a href={`tel:${site.contact.phoneHref}`}>{nbsp(site.contact.phone)}</a>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <span>
              {site.contact.district}, {site.contact.city}
            </span>
          </p>
        </div>
      </nav>
    </div>
  );
}
