import { useEffect, useRef, useState, type FormEvent } from 'react';
import { submitTestimonial } from '~/lib/api/endpoints';
import { prefersReducedMotion } from '~/lib/dom/scope';
import { IconCheck } from '~/components/ui/icons';

type Status = 'idle' | 'flying' | 'landed' | 'sent' | 'error';

/* Dépôt d'un témoignage. Envoyé à l'API (publication APRÈS relecture).
   Correction : l'ancien site l'« affichait » seulement dans le navigateur du
   visiteur (localStorage) en annonçant une publication immédiate. */
export function TestimonialForm({ className = 'qform' }: { className?: string }) {
  const [rating, setRating] = useState(5);
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

  return (
    <div className={className}>
      <div>
        <h3>Laissez votre témoignage</h3>
        <p>Vous avez travaillé avec nos équipes ? Racontez-le en quelques lignes : nous le relisons puis le publions dans le fil ci-dessus.</p>
        <ul className="ticks">
          <li>Publication après relecture par notre équipe</li>
          <li>Aucune inscription nécessaire</li>
          <li>Réponse sous 24 h ouvrées</li>
        </ul>
      </div>
      <form
        className={'qform__f' + (flying ? ' is-sending' : '') + (bad ? ' is-bad' : '')}
        id="temoForm"
        noValidate
        onSubmit={onSubmit}
      >
        <p className="cpanel__honey" aria-hidden="true">
          <label>
            Ne pas remplir : <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="fld">
          <label htmlFor="temoNom">Votre nom</label>
          <input id="temoNom" name="name" type="text" placeholder="Ex. Aya Konan" required autoComplete="name" />
        </div>
        <div className="fld">
          <label htmlFor="temoRole">Fonction &amp; organisation</label>
          <input id="temoRole" name="role" type="text" placeholder="Ex. DAF, Groupe Lagune" />
        </div>
        <div className="fld fld--full">
          <label htmlFor="temoTexte">Votre témoignage</label>{' '}
          <textarea id="temoTexte" name="text" placeholder="Ce que nous avons livré, ce que ça a changé pour vous…" required rows={4} />
        </div>
        <div className="fld fld--full qform__rate">
          {/* étiquette de groupe (pas de champ unique associé) */}
          <label id="temoNoteLabel">Votre note</label>{' '}
          <div className="qstars" role="group" aria-labelledby="temoNoteLabel" onMouseLeave={() => setHover(null)}>
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
                <i></i>
              </button>
            ))}
          </div>
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
        <button className="btn btn--red btn--lg qform__submit" type="submit" disabled={flying}>
          Envoyer mon témoignage <i className="arw"></i>
        </button>
      </form>
      <div className="qok" id="temoOk" role="status" hidden={status !== 'sent'}>
        <IconCheck /> Merci ! Votre témoignage nous est parvenu : il sera publié après relecture.
      </div>
      <div className="cpanel__err" role="alert" hidden={status !== 'error'}>
        <b>Envoi impossible.</b> Vérifiez votre connexion puis réessayez.
      </div>
    </div>
  );
}
