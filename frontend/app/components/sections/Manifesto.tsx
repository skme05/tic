import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { prefersReducedMotion } from '~/lib/dom/scope';

/* « Notre manifeste » (accueil) — lecture rythmée au défilement.
   La section est épinglée (sticky) : en défilant, les mots s'allument un à
   un, temps par temps ; la phrase en cours est pleinement lisible, les
   précédentes s'estompent, les mots clés s'allument dans le dégradé du
   logo, et le symbole ∞ se dessine en fond. Styles : styles/sections/manifesto-v2.css

   Texte : chaque temps est une liste de segments ; `hot` = mot clé. */
const BEATS: { label: string; parts: { t: string; hot?: boolean }[] }[] = [
  { label: 'Origine', parts: [{ t: 'Nous sommes nés à ' }, { t: 'Abidjan', hot: true }, { t: '.' }] },
  {
    label: 'Engagement',
    parts: [{ t: 'Nous écrivons du code pour des entreprises qui ' }, { t: "n'attendent plus", hot: true }, { t: '.' }],
  },
  {
    label: 'Valeur',
    parts: [
      { t: "Chaque plateforme métier, chaque application, chaque modèle d'" },
      { t: 'intelligence artificielle', hot: true },
      { t: ' que nous livrons devient un ' },
      { t: 'avantage réel', hot: true },
      { t: '.' },
    ],
  },
  {
    label: 'Promesse',
    parts: [
      { t: 'Nous ne vendons pas des promesses : nous ouvrons des ' },
      { t: 'portes', hot: true },
      { t: ', une à une, et nous restons ' },
      { t: 'derrière vous', hot: true },
      { t: ' quand elles sont ouvertes.' },
    ],
  },
];

interface Word {
  text: string;
  hot: boolean;
  /** index global du mot */
  i: number;
  /** le mot est collé au précédent (ponctuation, apostrophe) */
  glued: boolean;
}

/* découpe en mots ; un mot clé de plusieurs mots reste un seul bloc lumineux */
function splitBeats() {
  let i = 0;
  return BEATS.map((beat) => {
    const words: Word[] = [];
    beat.parts.forEach((p) => {
      if (p.hot) {
        words.push({ text: p.t, hot: true, i: i++, glued: !/^\s/.test(p.t) && words.length > 0 && /[’']$/.test(words[words.length - 1].text) });
        return;
      }
      const tokens = p.t.split(/(\s+)/);
      let glue = words.length > 0 && !/^\s/.test(p.t);
      tokens.forEach((tk) => {
        if (!tk) return;
        if (/^\s+$/.test(tk)) {
          glue = false;
          return;
        }
        words.push({ text: tk, hot: false, i: i++, glued: glue });
        glue = false;
      });
    });
    return { label: beat.label, words, first: words[0].i, last: words[words.length - 1].i };
  });
}

export function Manifesto() {
  const beats = useMemo(splitBeats, []);
  const total = beats[beats.length - 1].last + 1;
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(0); /* nombre de mots allumés */
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setLit(total);
      setProgress(1);
      return;
    }
    let tick = false;
    const run = () => {
      tick = false;
      const sec = ref.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      setProgress(p);
      /* tout est lu à 85 % du parcours : la fin reste un temps de pause */
      setLit(Math.round(Math.min(1, p / 0.85) * total));
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(run);
      }
    };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [total]);

  const current = beats.findIndex((b) => lit <= b.last + 1 && lit > b.first) ;
  const activeBeat = lit >= total ? beats.length - 1 : Math.max(0, current);
  const done = lit >= total;

  return (
    <section className={'mf' + (done ? ' is-done' : '')} id="manifeste" ref={ref} aria-labelledby="mf-title">
      <div className="mf__stage">
        {/* le symbole ∞ se dessine avec le défilement */}
        <svg className="mf__infinity" viewBox="0 0 200 100" aria-hidden="true">
          <defs>
            <linearGradient id="mfSpectrum" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#1D5FAE" />
              <stop offset=".3" stopColor="#22A06B" />
              <stop offset=".5" stopColor="#F4C531" />
              <stop offset=".72" stopColor="#F28A26" />
              <stop offset="1" stopColor="#E2452B" />
            </linearGradient>
          </defs>
          <path className="mf__inf-track" d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z" />
          <path
            className="mf__inf-draw"
            pathLength={100}
            style={{ strokeDashoffset: 100 - progress * 100 }}
            d="M100 50 C120 18 178 12 182 50 C186 88 122 82 100 50 C78 18 14 12 18 50 C22 88 80 82 100 50 Z"
          />
        </svg>

        <div className="mf__in">
          <ol className="mf__rail" aria-hidden="true">
            {beats.map((b, k) => (
              <li key={b.label} className={(k < activeBeat || done ? 'is-past' : '') + (k === activeBeat && !done ? ' is-now' : '')}>
                <span>{String(k + 1).padStart(2, '0')}</span>
                {b.label}
              </li>
            ))}
          </ol>

          <div className="mf__body">
            <p className="mf__eyebrow" id="mf-title">
              Notre manifeste
            </p>
            {/* texte complet pour les lecteurs d'écran (les mots découpés sont masqués) */}
            <p className="sr">{BEATS.map((b) => b.parts.map((p) => p.t).join('')).join(' ')}</p>
            <div className="mf__text" aria-hidden="true">
              {beats.map((b, k) => (
                <p
                  key={b.label}
                  className={
                    'mf__beat' + (k === activeBeat && !done ? ' is-now' : '') + (k < activeBeat ? ' is-past' : '') + (done ? ' is-all' : '')
                  }
                >
                  {b.words.map((w) => (
                    <Fragment key={w.i}>
                      {!w.glued && w.i !== b.first ? ' ' : ''}
                      <span className={'mf__w' + (w.hot ? ' mf__w--hot' : '') + (w.i < lit ? ' on' : '')}>{w.text}</span>
                    </Fragment>
                  ))}
                </p>
              ))}
            </div>

            <div className="mf__sign">
              <span className="mf__sign-line" aria-hidden="true"></span>
              <span>L'équipe TIC — Cocody, Abidjan</span>
            </div>
            <ul className="mf__facts">
              <li>
                <b>2021</b> année de création
              </li>
              <li>
                <b>+200</b> projets livrés
              </li>
              <li>
                <b>100 %</b> des équipes à Abidjan
              </li>
            </ul>
          </div>
        </div>

        <div className="mf__progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }}></i>
        </div>
      </div>
    </section>
  );
}
