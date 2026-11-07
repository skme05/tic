import { useEffect, useRef, useState, type ReactNode } from 'react';
import { prefersReducedMotion } from '~/lib/dom/scope';

/* ==========================================================================
   « Notre manifeste » (accueil) — le manifeste en 4 engagements.
   Gauche (reste visible) : titre, message, chiffres qui comptent, signature.
   Droite : 4 cartes numérotées avec chacune une mini-illustration animée ;
   en défilant, une ligne se remplit dans le dégradé du logo et la carte au
   centre de l'écran s'active (son illustration s'anime, les autres
   s'estompent). Styles : styles/sections/manifesto.css (préfixe .mfx).
   ========================================================================== */

export type VizKind = 'pin' | 'deploy' | 'growth' | 'door';
export interface Commitment {
  kicker: string;
  title: string;
  text: string;
  color: string;
  viz: VizKind;
}

/* engagements de l'accueil (valeur par défaut) */
const COMMITMENTS: Commitment[] = [
  {
    kicker: 'Origine',
    title: 'Nés à Abidjan',
    text: "Nous sommes nés à Abidjan. Nos équipes conçoivent et livrent depuis Cocody, au plus près des réalités de nos clients.",
    color: '#1D5FAE',
    viz: 'pin',
  },
  {
    kicker: 'Engagement',
    title: "De l'idée à la solution",
    text: 'Nous concevons et donnons vie à des solutions taillées pour vos enjeux, avec des avancées concrètes à chaque étape.',
    color: '#1E8F5E',
    viz: 'deploy',
  },
  {
    kicker: 'Valeur',
    title: 'Un avantage réel',
    text: "Chaque plateforme métier, chaque application, chaque modèle d'intelligence artificielle que nous livrons devient un avantage réel.",
    color: '#B88A00',
    viz: 'growth',
  },
  {
    kicker: 'Promesse',
    title: 'Toujours derrière vous',
    text: 'Nous ne vendons pas des promesses : nous ouvrons des portes, une à une, et nous restons derrière vous quand elles sont ouvertes.',
    color: '#C9361C',
    viz: 'door',
  },
];

const FACTS = [
  { value: 2021, prefix: '', suffix: '', label: 'année de création' },
  { value: 200, prefix: '+', suffix: '', label: 'projets livrés' },
  { value: 100, prefix: '', suffix: ' %', label: 'des équipes à Abidjan' },
];

/** nombre qui compte jusqu'à sa valeur quand il devient visible */
function CountUp({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const from = value > 1000 ? value - 25 : 0; /* 2021 compte depuis 1996, pas depuis 0 */
    setN(from);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setN(Math.round(from + (value - from) * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/* mini-illustrations (décoratives) */
function Viz({ kind }: { kind: VizKind }) {
  switch (kind) {
    case 'pin':
      return (
        <svg className="mfx__viz mfx__viz--pin" viewBox="0 0 120 90" aria-hidden="true">
          <path className="mfx__route" d="M60 58 Q36 30 14 26" />
          <path className="mfx__route mfx__route--2" d="M60 58 Q86 26 106 22" />
          <path className="mfx__route mfx__route--3" d="M60 58 Q90 66 110 74" />
          <circle cx="14" cy="26" r="3" /> <circle cx="106" cy="22" r="3" /> <circle cx="110" cy="74" r="3" />
          <circle className="mfx__wave" cx="60" cy="58" r="10" />
          <circle className="mfx__wave mfx__wave--2" cx="60" cy="58" r="10" />
          <path className="mfx__pin" d="M60 60 C52 50 48 45 48 38 a12 12 0 0 1 24 0 c0 7 -4 12 -12 22Z" />
          <circle cx="60" cy="38" r="4.5" fill="#fff" />
        </svg>
      );
    case 'deploy':
      return (
        <div className="mfx__viz mfx__viz--term" aria-hidden="true">
          <span className="mfx__term-bar">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <code className="mfx__cmd">
            <span className="mfx__prompt">$</span> <span className="mfx__typed">deploy --prod</span>
            <span className="mfx__caret"></span>
          </code>
          <code className="mfx__ok">✓ en ligne</code>
        </div>
      );
    case 'growth':
      return (
        <svg className="mfx__viz mfx__viz--growth" viewBox="0 0 120 90" aria-hidden="true">
          <path className="mfx__axis" d="M14 78 H110" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} className="mfx__bar" x={20 + i * 18} y={78 - (14 + i * 11)} width="11" height={14 + i * 11} rx="3" style={{ '--i': i }} />
          ))}
          <path className="mfx__trend" d="M24 62 L44 54 L62 44 L80 32 L100 16" />
          <path className="mfx__spark" d="M100 2 C101 9 104 11 110 12 C104 13 101 15 100 22 C99 15 96 13 90 12 C96 11 99 9 100 2Z" />
        </svg>
      );
    case 'door':
      return (
        <div className="mfx__viz mfx__viz--door" aria-hidden="true">
          <span className="mfx__door-light"></span>
          <span className="mfx__door-frame">
            <span className="mfx__door-leaf">
              <i></i>
            </span>
          </span>
          <span className="mfx__door-floor"></span>
        </div>
      );
  }
}

export function Manifesto({
  eyebrow = 'Notre manifeste',
  title = (
    <>
      Nous ouvrons des <span className="mfx__mark">portes</span>, une à une.
    </>
  ),
  lead = "Une équipe née à Abidjan, qui livre des logiciels à des entreprises qui n'attendent plus — et qui reste à vos côtés une fois la porte franchie.",
  commitments = COMMITMENTS,
}: {
  eyebrow?: string;
  /** titre ; entourer le mot clé de <span className="mfx__mark"> pour le surligner */
  title?: ReactNode;
  lead?: string;
  commitments?: Commitment[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  /* carte active (au centre de l'écran) + remplissage de la ligne */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>('.mfx__card'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(cards.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    cards.forEach((c) => io.observe(c));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = list.getBoundingClientRect();
        const p = (window.innerHeight * 0.5 - r.top) / r.height;
        list.style.setProperty('--fill', Math.min(1, Math.max(0, p)).toFixed(3));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="mfx" id="manifeste" aria-labelledby="mfx-title">
      <div className="mfx__in">
        <div className="mfx__side">
          <div className="mfx__sticky reveal">
            <p className="mfx__eyebrow">{eyebrow}</p>
            <h2 className="mfx__title" id="mfx-title">
              {title}
            </h2>
            <p className="mfx__lead">{lead}</p>
            <ul className="mfx__facts">
              {FACTS.map((f) => (
                <li key={f.label}>
                  <b>
                    <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} />
                  </b>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
            <p className="mfx__sign">
              <span aria-hidden="true"></span>L'équipe TIC — Cocody, Abidjan
            </p>
          </div>
        </div>

        <ol className="mfx__list" ref={listRef}>
          <span className="mfx__track" aria-hidden="true">
            <i></i>
          </span>
          {commitments.map((c, i) => (
            <li
              key={c.kicker}
              /* classe FIXE (l'effet d'apparition y ajoute « in ») : l'état
                 actif passe par data-state, pour que React ne l'efface pas */
              className="mfx__card reveal"
              data-state={i === active ? 'active' : i < active ? 'past' : 'next'}
              style={{ '--c': c.color }}
            >
              <span className="mfx__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mfx__body">
                <p className="mfx__kicker">{c.kicker}</p>
                <h3 className="mfx__h">{c.title}</h3>
                <p className="mfx__text">{c.text}</p>
              </div>
              <Viz kind={c.viz} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
