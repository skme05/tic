import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Link } from 'react-router';

/* ==========================================================================
   « Le Corridor Lab » (accueil) — l'établi du Lab (préfixe .lab)
   Fond de papier de plan. À gauche le message ; à droite trois « fiches
   d'expérience » en onglets, chacune avec sa démonstration animée :
   - Recherche & Développement : radar de veille qui balaie les sujets ;
   - Prototypage & Fablab : piste de l'idée à la production ;
   - IA générative : un assistant qui répond en direct.
   Les onglets tournent seuls toutes les 7 s (pause au survol / au focus).
   Styles : styles/sections/lab-showcase.css
   ========================================================================== */
const EXPERIMENTS = [
  {
    id: 'rd',
    code: 'EXP-01',
    title: 'Recherche & Développement',
    text: 'Veille technologique et recherche appliquée à vos métiers.',
    color: '#1D5FAE',
  },
  {
    id: 'fab',
    code: 'EXP-02',
    title: 'Prototypage & Fablab',
    text: 'Du concept au prototype fonctionnel en quelques semaines.',
    color: '#1E8F5E',
  },
  {
    id: 'ia',
    code: 'EXP-03',
    title: 'IA générative',
    text: 'Assistants métiers et automatisation documentaire.',
    color: '#D9531E',
  },
] as const;

const TOPICS = [
  { label: 'IA générative', a: 35, r: 0.72 },
  { label: 'Paiement mobile', a: 130, r: 0.5 },
  { label: 'IoT', a: 215, r: 0.8 },
  { label: 'No-code', a: 300, r: 0.45 },
  { label: 'Cloud souverain', a: 190, r: 0.62 },
];

const STAGES = ['Idée', 'Maquette', 'Prototype', 'Pilote', 'Production'];

const ANSWER = 'Trois points clés : 1. durée de 24 mois, 2. pénalités de retard plafonnées à 5 %, 3. résiliation avec un préavis de 60 jours.';

export function LabShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typed, setTyped] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  /* rotation automatique des fiches */
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % EXPERIMENTS.length), 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  /* réponse de l'assistant tapée lettre par lettre */
  useEffect(() => {
    if (EXPERIMENTS[active].id !== 'ia') return;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
      setTyped(ANSWER.length);
      return;
    }
    setTyped(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 2;
      setTyped(Math.min(n, ANSWER.length));
      if (n >= ANSWER.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [active]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + EXPERIMENTS.length) % EXPERIMENTS.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const exp = EXPERIMENTS[active];

  return (
    <section className="lab" id="lab" aria-labelledby="lab-title">
      <div className="lab__in">
        <div className="lab__copy reveal">
          <p className="lab__cmd">lab://corridor</p>
          <h2 id="lab-title">
            Le <em>Corridor Lab</em>
          </h2>
          <p className="lab__lead">
            Un espace dédié à l'exploration : prototypage rapide, veille technologique et recherche appliquée. Nous testons aujourd'hui les usages de demain, puis nous les industrialisons avec vous.
          </p>
          <ol className="lab__steps">
            <li>
              <b>Explorer</b>
              <span>la veille repère ce qui compte pour vos métiers</span>
            </li>
            <li>
              <b>Prototyper</b>
              <span>un concept testable en quelques semaines</span>
            </li>
            <li>
              <b>Industrialiser</b>
              <span>ce qui marche rejoint nos portes</span>
            </li>
          </ol>
          <Link viewTransition to="/innovation" className="btn btn--red btn--lg">
            Découvrir le Lab <i className="arw"></i>
          </Link>
        </div>

        <div
          className="lab__bench reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setPaused(false)}
          style={{ '--c': exp.color } as CSSProperties}
        >
          <div className="lab__tabs" role="tablist" aria-label="Expériences du Lab" aria-orientation="vertical">
            {EXPERIMENTS.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`lab-tab-${x.id}`}
                aria-selected={i === active}
                aria-controls="lab-panel"
                tabIndex={i === active ? 0 : -1}
                className="lab__tab"
                style={{ '--tc': x.color } as CSSProperties}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <small>{x.code}</small>
                <b>{x.title}</b>
                <span>{x.text}</span>
                <i className="lab__bar" aria-hidden="true" data-run={i === active && !paused ? 'true' : undefined}></i>
              </button>
            ))}
          </div>

          <div className="lab__panel" role="tabpanel" id="lab-panel" aria-labelledby={`lab-tab-${exp.id}`} key={exp.id}>
            <div className="lab__panel-hd">
              <span>{exp.code}</span>
              <span className="lab__live">
                <i></i>en cours
              </span>
            </div>

            {exp.id === 'rd' && (
              <div className="lab__radar" aria-label="Sujets suivis par la veille : IA générative, paiement mobile, IoT, no-code, cloud souverain">
                <svg viewBox="0 0 200 200" aria-hidden="true">
                  <circle cx="100" cy="100" r="88" />
                  <circle cx="100" cy="100" r="62" />
                  <circle cx="100" cy="100" r="36" />
                  <path d="M100 8v184M8 100h184" />
                </svg>
                <span className="lab__sweep" aria-hidden="true"></span>
                {TOPICS.map((t, i) => {
                  const rad = (t.a * Math.PI) / 180;
                  return (
                    <span
                      key={t.label}
                      className="lab__blip"
                      style={{ left: `${50 + Math.cos(rad) * t.r * 44}%`, top: `${50 + Math.sin(rad) * t.r * 44}%`, '--d': `${(t.a / 360) * 4}s`, '--k': i } as CSSProperties}
                    >
                      <i></i>
                      {t.label}
                    </span>
                  );
                })}
              </div>
            )}

            {exp.id === 'fab' && (
              <div className="lab__track" aria-label={`Étapes : ${STAGES.join(', ')}`}>
                <svg viewBox="0 0 320 60" preserveAspectRatio="none" aria-hidden="true">
                  <path className="lab__trace" d="M10 30 H80 L95 15 H160 L175 45 H240 L255 30 H310" />
                  <path className="lab__trace lab__trace--on" d="M10 30 H80 L95 15 H160 L175 45 H240 L255 30 H310" />
                </svg>
                <ol>
                  {STAGES.map((s, i) => (
                    <li key={s} style={{ '--k': i } as CSSProperties}>
                      <i></i>
                      <b>{s}</b>
                      <small>S{i * 2 + 1}</small>
                    </li>
                  ))}
                </ol>
                <p className="lab__note">Un pilote réel avant toute mise en production.</p>
              </div>
            )}

            {exp.id === 'ia' && (
              <div className="lab__chat">
                <div className="lab__doc" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <b>contrat-fournisseur.pdf</b>
                </div>
                <p className="lab__q">Résume ce contrat en trois points.</p>
                <p className="lab__a" aria-live="polite">
                  <i aria-hidden="true">∞</i>
                  <span>
                    {ANSWER.slice(0, typed)}
                    {typed < ANSWER.length && <u aria-hidden="true"></u>}
                  </span>
                </p>
                <p className="lab__note">Exemple de démonstration : l'assistant lit vos documents et en extrait l'essentiel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
