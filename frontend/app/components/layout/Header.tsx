import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { mainNav, type NavItem } from '~/content/navigation';
import { getSolution } from '~/content/solutions';

/* En-tête : fond plein dès qu'on défile, menu burger sur mobile, sous-menus
   au survol (vraie souris), au focus clavier ou au toucher. */
export function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const { pathname } = useLocation();

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

  return (
    <header className={'hdr' + (solid || forceSolid ? ' is-solid' : '')} id="hdr">
      <div className="shell hdr__in">
        <Link className="brand" to="/">
          <img src="/assets/img/logo-tic.webp" width="600" height="138" alt="TIC — The Infinite Corridor Software Solutions" />
        </Link>

        <nav className={'nav' + (menuOpen ? ' open' : '')} id="nav" aria-label="Navigation principale">
          <ul>
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
                  <NavLink className={({ isActive }) => 'nav__l' + (isActive ? ' is-on' : '')} to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hdr__act">
          <NavLink className={({ isActive }) => 'signin' + (isActive ? ' is-on' : '')} to="/espace-client">
            Espace client
          </NavLink>
          <Link className="btn btn--ink" to="/contact">
            Nous contacter
          </Link>
        </div>
        <button
          className="burger"
          id="burger"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

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
      <NavLink className={({ isActive }) => 'nav__l' + (isActive ? ' is-on' : '')} to={item.to}>
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
                  <Link key={slug} to={`/solutions/${slug}`}>
                    {sol.menuLabel ?? sol.name}
                  </Link>
                );
              })}
              {i === item.columns!.length - 1 && (
                <Link className="menu__all" to={item.to}>
                  Toutes nos solutions →
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="menu">
          {item.menu!.map((sub) => (
            <Link key={sub.to} to={sub.to}>
              <b>{sub.title}</b>
              <span>{sub.text}</span>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
