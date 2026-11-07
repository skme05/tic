import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { services } from '~/content/services';

/* ==========================================================================
   « Six portes, une même exigence » — les 6 expertises en cartes (préfixe .svc)
   - deux portes phares (grandes cartes avec points clés) puis quatre cartes ;
   - chaque carte porte la couleur de sa porte (lueur dans le coin, trame) ;
   - survol / focus : le plan d'architecte du couloir TIC se dessine trait
     par trait derrière la carte (sans survol : quand la carte entre à l'écran) ;
   - thème clair par défaut, sombre si l'appareil du visiteur est en mode
     sombre (prefers-color-scheme) ou si data-theme="dark" est posé sur <html>.
   Styles : styles/sections/service-grid.css
   ========================================================================== */
const FEATURED = ['web-design', 'developpement-applications'];
const KICKER: Record<string, string> = {
  'web-design': 'Pour les entreprises',
  'developpement-applications': 'Pour les institutions',
};

const ICONS: Record<string, ReactNode> = {
  'web-design': (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M7 21h10" />
    </>
  ),
  'ui-ux-design': (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
    </>
  ),
  'migration-site-web': <path d="M4 7h12l-3-3M20 17H8l3 3" />,
  'developpement-applications': (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  'integration-hubspot': (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="m6.5 6.5 3.3 3.3M17.5 7.3l-3.3 3M16.6 17.5l-2.4-3.4" />
    </>
  ),
  'email-marketing': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
};

/* ── le plan du couloir : perspective à un point de fuite (repère 400 × 300) ── */
const VP = { x: 292, y: 96 };
const W = 400;
const H = 300;
const P = (x: number, y: number, s: number) => [VP.x + (x - VP.x) * s, VP.y + (y - VP.y) * s] as const;
const f = (n: number) => n.toFixed(1);

function CorridorPlan({ label }: { label: string }) {
  let k = 0;
  const st = () => ({ '--k': k++ }) as CSSProperties;
  const els: ReactNode[] = [];
  /* lignes de fuite depuis les coins */
  for (const [x, y] of [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
  ] as const) {
    const [x2, y2] = P(x, y, 0.06);
    els.push(<line key={`r${x}${y}`} pathLength={1} style={st()} x1={x} y1={y} x2={f(x2)} y2={f(y2)} />);
  }
  /* sections du couloir, chacune avec une porte en arche sur le mur gauche */
  for (const s of [0.78, 0.52, 0.34, 0.21]) {
    const [x0, y0] = P(0, 0, s);
    const [x1, y1] = P(W, H, s);
    els.push(<rect key={`s${s}`} pathLength={1} style={st()} x={f(x0)} y={f(y0)} width={f(x1 - x0)} height={f(y1 - y0)} />);
    const dw = (x1 - x0) * 0.16;
    const dh = (y1 - y0) * 0.62;
    const dx = x0 + (x1 - x0) * 0.08;
    const top = y1 - dh + dw / 2;
    els.push(
      <path
        key={`d${s}`}
        pathLength={1}
        style={st()}
        d={`M${f(dx)} ${f(y1)} V${f(top)} A${f(dw / 2)} ${f(dw / 2)} 0 0 1 ${f(dx + dw)} ${f(top)} V${f(y1)}`}
      />,
    );
  }
  /* dalles du sol */
  for (const x of [80, 160, 240, 320]) {
    const [x2, y2] = P(x, H, 0.21);
    els.push(<line key={`f${x}`} pathLength={1} style={st()} x1={x} y1={H} x2={f(x2)} y2={f(y2)} />);
  }
  /* cote d'architecte */
  const [cx0, cy0] = P(0, 0, 0.34);
  const [cx1] = P(W, 0, 0.34);
  return (
    <svg className="svc__plan" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {els}
      <line className="svc__axis" x1={VP.x} y1={H} x2={VP.x} y2={0} />
      <circle className="svc__vp" cx={VP.x} cy={VP.y} r="2.5" />
      <circle pathLength={1} style={st()} cx={VP.x} cy={VP.y} r="7" />
      <line pathLength={1} style={st()} x1={f(cx0)} y1={f(cy0 - 12)} x2={f(cx1)} y2={f(cy0 - 12)} />
      <text x={f(cx0 + 6)} y={f(cy0 - 18)}>
        {label.toUpperCase()} · 2,10 M
      </text>
    </svg>
  );
}

export function ServiceGrid({
  eyebrow = 'Le corridor',
  title = (
    <>
      Six portes, une même <em>exigence</em>
    </>
  ),
  lead = 'Chaque porte a sa couleur et son expertise. Survolez-la : le plan du couloir se dessine derrière elle.',
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const big = FEATURED.map((slug) => services.find((s) => s.slug === slug)).filter((s) => s !== undefined);
  const small = services.filter((s) => !FEATURED.includes(s.slug));

  /* écrans sans survol : le plan se dessine quand la carte est à l'écran */
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(hover:hover)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-drawn', e.isIntersecting)),
      { threshold: 0.55 },
    );
    el.querySelectorAll('.svc__card').forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const icon = (slug: string) => (
    <span className="svc__ic">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {ICONS[slug]}
      </svg>
    </span>
  );

  return (
    <section className="svc" id="corridor" ref={ref} aria-labelledby="svc-title">
      <div className="svc__in">
        <header className="svc__head">
          <div>
            <p className="svc__eyebrow">
              <i></i>
              {eyebrow}
            </p>
            <h2 className="svc__title" id="svc-title">
              {title}
            </h2>
          </div>
          <p className="svc__lead">{lead}</p>
        </header>

        <div className="svc__big">
          {big.map((s) => (
            <article key={s.slug} className="svc__card reveal" style={{ '--c': s.color } as CSSProperties}>
              <CorridorPlan label={s.number} />
              {icon(s.slug)}
              <div>
                <p className="svc__k">
                  {KICKER[s.slug]} · {s.number}
                </p>
                <h3>{s.name}</h3>
              </div>
              <ul>
                {s.bullets.slice(0, 3).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="svc__act">
                <Link viewTransition to={`/services/${s.slug}`} className="svc__btn">
                  Franchir la porte
                </Link>
                <Link viewTransition to="/temoignages" className="svc__ghost">
                  Voir les projets
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="svc__small">
          {small.map((s) => (
            <article key={s.slug} className="svc__card svc__card--sm reveal" style={{ '--c': s.color } as CSSProperties}>
              <CorridorPlan label={s.number} />
              {icon(s.slug)}
              <div className="svc__body">
                <h3>{s.name}</h3>
                <p>{s.lead}</p>
                <Link viewTransition to={`/services/${s.slug}`} className="svc__more" aria-label={`${s.number} — ${s.name}`}>
                  {s.number}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
