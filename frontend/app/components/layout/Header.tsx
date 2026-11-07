import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { mainNav, type NavItem } from '~/content/navigation';
import { getSolution } from '~/content/solutions';
import { MobileMenu } from './MobileMenu';

/* En-tête : fond plein dès qu'on défile, menu burger sur mobile, sous-menus
   au survol (vraie souris), au focus clavier ou au toucher. */
export function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const { pathname } = useLocation();
  const listRef = useRef<HTMLUListElement>(null);

  /* indicateurs glissants (bureau) : la pastille sombre suit la page active,
     la pastille claire suit le survol ; les deux se déplacent en douceur. */
  const place = (prefix: 'a' | 'h', li: Element | null) => {
    const ul = listRef.current;
    if (!ul) return;
    if (!li) {
      ul.style.setProperty(`--${prefix}o`, '0');
      return;
    }
    const r = (li as HTMLElement).getBoundingClientRect();
    const u = ul.getBoundingClientRect();
    ul.style.setProperty(`--${prefix}x`, `${r.left - u.left}px`);
    ul.style.setProperty(`--${prefix}w`, `${r.width}px`);
    ul.style.setProperty(`--${prefix}o`, '1');
  };
  const activeItem = () => listRef.current?.querySelector('.nav__l.is-on')?.closest('li') ?? null;
  const onNavOver = (e: RPointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const li = (e.target as Element).closest('ul > li:not(.nav__thumb):not(.nav__hover)');
    if (li && li.parentElement === listRef.current) {
      place('h', li);
      listRef.current?.setAttribute('data-hover', li === activeItem() ? 'active' : 'other');
    }
  };
  const onNavLeave = () => {
    place('h', null);
    listRef.current?.removeAttribute('data-hover');
  };
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const sync = () => place('a', activeItem());
    /* attendre le rendu de la nouvelle classe active */
    const raf = requestAnimationFrame(() => {
      sync();
      requestAnimationFrame(() => ul.classList.add('is-ready'));
    });
    const ro = new ResizeObserver(sync);
    ro.observe(ul);
    document.fonts?.ready.then(sync).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    let tick = false;
    const run = () => {
      tick = false;
      setSolid(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(run);
      }
    };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* changement de page : tout se referme */
  useEffect(() => {
    setMenuOpen(false);
    setOpenDrop(null);
  }, [pathname]);

  /* clic en dehors d'un sous-menu : il se referme */
  useEffect(() => {
    if (!openDrop) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.('.drop')) setOpenDrop(null);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [openDrop]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
    <header className={'hdr' + (solid || forceSolid || menuOpen ? ' is-solid' : '') + (menuOpen ? ' is-menu' : '')} id="hdr">
      <div className="shell hdr__in">
        <Link viewTransition className="brand" to="/">
          <img src="/assets/img/logo-tic.webp" width="600" height="138" alt="TIC — The Infinite Corridor Software Solutions" />
        </Link>

        <nav className="nav" id="nav" aria-label="Navigation principale">
          <ul ref={listRef} onPointerOver={onNavOver} onPointerLeave={onNavLeave}>
            <li className="nav__thumb" aria-hidden="true"></li>
            <li className="nav__hover" aria-hidden="true"></li>
            {mainNav.map((item) =>
              item.menu || item.columns ? (
                <DropItem
                  key={item.to}
                  item={item}
                  open={openDrop === item.to}
                  setOpen={(o) => setOpenDrop(o ? item.to : null)}
                />
              ) : (
                <li key={item.to}>
                  <NavLink viewTransition className={({ isActive }) => 'nav__l' + (isActive ? ' is-on' : '')} to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hdr__act">
          <NavLink viewTransition className={({ isActive }) => 'signin' + (isActive ? ' is-on' : '')} to="/espace-client">
            Espace client
          </NavLink>
          <Link viewTransition className="btn btn--ink" to="/contact">
            Nous contacter
          </Link>
        </div>
        <button
          className="burger"
          id="burger"
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mnav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
    <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

const MENU_COLORS = ['#1D5FAE', '#1E8F5E', '#D97706', '#E2452B'];

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function DropItem({ item, open, setOpen }: { item: NavItem; open: boolean; setOpen: (o: boolean) => void }) {
  const closeTimer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) openedAt.current = Date.now();
    setOpen(true);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <li
      className={'drop' + (open ? ' is-open' : '')}
      onMouseEnter={() => finePointer() && openNow()}
      onMouseLeave={() => finePointer() && scheduleClose()}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
      }}
    >
      <NavLink viewTransition className={({ isActive }) => 'nav__l' + (isActive ? ' is-on' : '')} to={item.to}>
        {item.label}
      </NavLink>
      <button
        className="nav__c"
        type="button"
        aria-expanded={open}
        aria-label={`Sous-menu ${item.label}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          /* sur écran tactile, l'appui ouvre d'abord via le focus : ne pas refermer aussitôt */
          const justOpened = open && Date.now() - openedAt.current < 600;
          setOpen(justOpened ? true : !open);
        }}
      >
        <i className="car"></i>
      </button>
      {item.columns ? (
        <div className="menu menu--3">
          {item.columns.map((col, i) => (
            <div key={col.title}>
              <p className="menu__t">{col.title}</p>
              {col.items.map((slug) => {
                const sol = getSolution(slug);
                if (!sol) return null;
                return (
                  <Link viewTransition key={slug} to={`/solutions/${slug}`} style={{ '--c': sol.color } as CSSProperties}>
                    <i className="menu__dot" aria-hidden="true"></i>
                    {sol.menuLabel ?? sol.name}
                  </Link>
                );
              })}
              {i === item.columns!.length - 1 && (
                <Link viewTransition className="menu__all" to={item.to}>
                  Toutes nos solutions →
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="menu">
          {item.menu!.map((sub, i) => (
            <Link viewTransition key={sub.to} to={sub.to} style={{ '--c': sub.color ?? MENU_COLORS[i % MENU_COLORS.length] } as CSSProperties}>
              <b>{sub.title}</b>
              <span>{sub.text}</span>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
