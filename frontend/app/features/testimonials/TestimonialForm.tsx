import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { submitTestimonial } from '~/lib/api/endpoints';
import { prefersReducedMotion } from '~/lib/dom/scope';
import { IconCheck } from '~/components/ui/icons';

type Status = 'idle' | 'flying' | 'landed' | 'sent' | 'error';

/* Dépôt d'un témoignage. Envoyé à l'API (publication APRÈS relecture).
   Correction : l'ancien site l'« affichait » seulement dans le navigateur du
   visiteur (localStorage) en annonçant une publication immédiate. */
const RATING_LABEL = ['', 'Décevant', 'Moyen', 'Bien', 'Très bien', 'Excellent'];
const STARTERS = ['Avant TIC, ', 'Aujourd’hui, ', 'Ce que j’ai apprécié : '];
const AVATAR = ['#1D5FAE', '#1E8F5E', '#B88A00', '#D9531E', '#E2452B'];
const MIN = 12;

export function TestimonialForm({ className = 'tf' }: { className?: string }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [hover, setHover] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [bad, setBad] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get('website')) return;
    const name = String(f.get('name') ?? '').trim();
    const text = String(f.get('text') ?? '').trim();
    if (!name || text.length < 12) {
      setBad(true);
      later(() => setBad(false), 900);
      return;
    }
    setStatus('flying');
    const reduced = prefersReducedMotion();
    const minFlight = new Promise((r) => setTimeout(r, reduced ? 300 : 2500));
    try {
      await Promise.all([
        submitTestimonial({ name, role: String(f.get('role') ?? '').trim() || undefined, text, rating }),
        minFlight,
      ]);
      setStatus('landed');
      later(() => {
        form.reset();
        setName('');
        setRole('');
        setText('');
        setRating(5);
        setStatus('sent');
        later(() => setStatus('idle'), 8000);
      }, reduced ? 200 : 1100);
    } catch {
      setStatus('error');
    }
  }

  const shown = hover ?? rating;
  const flying = status === 'flying' || status === 'landed';

  const initials = (name.trim() || 'Votre nom')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const avatar = AVATAR[(name.trim().length || 0) % AVATAR.length];
  const missing = Math.max(0, MIN - text.trim().length);

  return (
    <div className={className}>
      <form
        className={'tf__form qform__f' + (flying ? ' is-sending' : '') + (bad ? ' is-bad' : '')}
        id="temoForm"
        noValidate
        onSubmit={onSubmit}
      >
        <p className="tf__k">Votre avis compte</p>
        <h3 className="tf__title">
          Laissez votre <em>témoignage</em>
        </h3>
        <p className="tf__lead">Vous avez travaillé avec nos équipes ? Racontez-le en quelques lignes : nous le relisons puis le publions.</p>

        <p className="cpanel__honey" aria-hidden="true">
          <label>
            Ne pas remplir : <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="tf__rate">
          <span id="temoNoteLabel" className="tf__label">
            Votre note
          </span>
          <div className="qstars tf__stars" role="group" aria-labelledby="temoNoteLabel" onMouseLeave={() => setHover(null)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
                aria-pressed={n <= rating}
                className={(n <= rating ? 'on' : '') + (hover !== null && n <= shown ? ' is-hov' : '')}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />
                </svg>
              </button>
            ))}
          </div>
          <span className="tf__rate-l" aria-live="polite">
            {RATING_LABEL[shown]}
          </span>
        </div>

        <div className="tf__grid">
          <label className="tf__fld">
            <span className="tf__label">Votre nom</span>
            <input id="temoNom" name="name" type="text" placeholder="Ex. Aya Konan" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="tf__fld">
            <span className="tf__label">Fonction &amp; organisation</span>
            <input id="temoRole" name="role" type="text" placeholder="Ex. DAF, Groupe Lagune" value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <label className="tf__fld tf__fld--full">
            <span className="tf__label">Votre témoignage</span>
            <textarea
              id="temoTexte"
              name="text"
              placeholder="Ce que nous avons livré, ce que ça a changé pour vous…"
              required
              rows={4}
              maxLength={600}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
        <div className="tf__help">
          {STARTERS.map((s) => (
            <button type="button" key={s} onClick={() => setText((v) => (v.trim() ? `${v.trim()} ${s}` : s))}>
              + {s.replace(/[,:]\s*$/, '')}
            </button>
          ))}
          <small className={'tf__count' + (missing ? '' : ' is-ok')}>
            {missing ? `Encore ${missing} caractère${missing > 1 ? 's' : ''}` : `${text.length} / 600`}
          </small>
        </div>

        <div className={'qsend' + (flying ? ' is-fly' : '') + (status === 'landed' ? ' is-done' : '')} hidden={!flying} aria-hidden="true">
          <svg className="qsend__road" viewBox="0 0 620 130" preserveAspectRatio="none" aria-hidden="true">
            <path className="qsend__dash" d="M8 102 Q310 10 612 58"></path>
            <path className="qsend__done" d="M8 102 Q310 10 612 58"></path>
          </svg>{' '}
          <span className="qsend__pin qsend__pin--a">
            <b>Vous</b>
          </span>{' '}
          <span className="qsend__pin qsend__pin--b">
            <b>TIC</b>
          </span>{' '}
          <span className="qsend__ship">
            <svg viewBox="0 0 54 38" aria-hidden="true">
              <g className="qsend__rotor" fill="none" stroke="#0f1115" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="9" x2="20" y2="9"></line>
                <line x1="34" y1="9" x2="48" y2="9"></line>
              </g>
              <path d="M13 9v5M41 9v5" stroke="#0f1115" strokeWidth="2" strokeLinecap="round"></path>
              <rect x="14" y="13" width="26" height="12" rx="5" fill="#0f1115"></rect>
              <rect x="18" y="16" width="12" height="6" rx="2" fill="#b91c1c"></rect>
              <circle cx="35" cy="19" r="2" fill="#63B843"></circle>
              <path className="qsend__beam" d="M27 26l-5 9h10l-5-9z" fill="#b91c1c" opacity=".5"></path>
              <path d="M20 27h14" stroke="#0f1115" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </span>{' '}
          <p className="qsend__msg">
            <span>Transmission du témoignage…</span>
            <em>Reçu · merci ! Publication après relecture.</em>
          </p>
        </div>{' '}
        <button className="tf__submit qform__submit" type="submit" disabled={flying}>
          <span>Envoyer mon témoignage</span>
          <i aria-hidden="true">→</i>
        </button>
      </form>

      <aside className="tf__preview" aria-label="Aperçu de votre témoignage">
        <span className="tf__rays" aria-hidden="true"></span>
        <p className="tf__pk">
          <i></i>Aperçu en direct
        </p>
        <figure className="tf__card">
          <span className="tf__quote" aria-hidden="true">
            “
          </span>
          <div className="tf__cstars" aria-label={`${rating} sur 5`}>
            {'★★★★★'.slice(0, rating)}
            <span>{'★★★★★'.slice(rating)}</span>
          </div>
          <blockquote className={text.trim() ? '' : 'is-empty'}>{text.trim() || 'Votre témoignage apparaîtra ici, tel qu’il sera publié après relecture.'}</blockquote>
          <figcaption>
            <i style={{ '--a': avatar } as CSSProperties}>{initials}</i>
            <span>
              <b>{name.trim() || 'Votre nom'}</b>
              <small>{role.trim() || 'Fonction, organisation'}</small>
            </span>
          </figcaption>
        </figure>
        <ul className="tf__ticks">
          <li>Publication après relecture</li>
          <li>Aucune inscription</li>
          <li>Réponse sous 24 h ouvrées</li>
        </ul>
      </aside>

      <div className="qok tf__ok" id="temoOk" role="status" hidden={status !== 'sent'}>
        <IconCheck /> Merci ! Votre témoignage nous est parvenu : il sera publié après relecture.
      </div>
      <div className="cpanel__err tf__ko" role="alert" hidden={status !== 'error'}>
        <b>Envoi impossible.</b> Vérifiez votre connexion puis réessayez.
      </div>
    </div>
  );
}
