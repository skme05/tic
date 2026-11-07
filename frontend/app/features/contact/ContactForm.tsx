import { useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Link } from 'react-router';
import { services } from '~/content/services';
import { solutions } from '~/content/solutions';
import { site } from '~/content/site';
import { submitContact } from '~/lib/api/endpoints';
import { ApiError } from '~/lib/api/client';
import type { ContactRequest } from '~/lib/api/types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/* Sujets proposés en un clic (ils remplissent la liste « Objet ») */
const QUICK = [
  ...services.map((s) => ({ label: s.name, color: s.color })),
  { label: 'Odoo', color: '#1E8F5E' },
  { label: 'Autre / je ne sais pas encore', color: '#7A8494' },
];

/* Amorces de message : un clic ajoute la phrase au message */
const STARTERS = ['Nous voulons refaire notre site.', 'Nous avons besoin d’une application mobile.', 'Nous souhaitons un devis pour', 'Nos délais : '];

const REQUIRED = ['name', 'email', 'service', 'message', 'consent'] as const;

/* Formulaire de contact : validation native du navigateur, envoi via la
   couche API (Django, ou Netlify Forms tant que le backend n'existe pas).
   La barre en haut montre l'avancement (champs obligatoires remplis).
   Styles : styles/sections/contact-desk.css (préfixe .ctf) */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  function measure() {
    const form = formRef.current;
    if (!form) return;
    const f = new FormData(form);
    const done = REQUIRED.filter((n) => (n === 'consent' ? f.get(n) === 'on' : String(f.get(n) ?? '').trim() !== '')).length;
    setProgress(Math.round((done / REQUIRED.length) * 100));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const f = new FormData(form);
    /* pot de miel anti-robots : un humain ne le remplit jamais */
    if (f.get('website')) return;
    const payload: ContactRequest = {
      name: String(f.get('name') ?? '').trim(),
      organisation: String(f.get('organisation') ?? '').trim() || undefined,
      email: String(f.get('email') ?? '').trim(),
      phone: String(f.get('phone') ?? '').trim() || undefined,
      service: String(f.get('service') ?? ''),
      message: String(f.get('message') ?? '').trim(),
      consent: f.get('consent') === 'on',
    };
    setStatus('sending');
    setFieldErrors({});
    try {
      await submitContact(payload);
      form.reset();
      setService('');
      setMessage('');
      setProgress(0);
      setStatus('sent');
    } catch (err) {
      if (err instanceof ApiError) setFieldErrors(err.fieldErrors);
      setStatus('error');
    }
  }

  const err = (name: string) =>
    fieldErrors[name]?.length ? (
      <small className="ctf__err" role="alert">
        {fieldErrors[name].join(' ')}
      </small>
    ) : null;

  const pick = (label: string) => {
    setService(label);
    requestAnimationFrame(measure);
  };
  const addStarter = (s: string) => {
    setMessage((m) => (m.trim() ? `${m.trim()} ${s}` : s));
    requestAnimationFrame(measure);
  };

  return (
    <>
      <form
        ref={formRef}
        className={'ctf' + (status === 'sending' ? ' is-sending' : '')}
        id="contactForm"
        noValidate
        hidden={status === 'sent'}
        onSubmit={onSubmit}
        onInput={measure}
        onChange={measure}
        style={{ '--p': `${progress}%` } as CSSProperties}
      >
        <div className="ctf__progress" aria-hidden="true">
          <span></span>
        </div>
        <p className="ctf__state" aria-live="polite">
          {progress === 100 ? 'Votre message est prêt à partir.' : `Votre message est prêt à ${progress} %`}
        </p>

        <p className="ctf__honey" aria-hidden="true">
          <label>
            Ne pas remplir : <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <fieldset className="ctf__block">
          <legend>
            <b>1</b> Votre besoin
          </legend>
          <div className="ctf__chips" role="group" aria-label="Sujets fréquents">
            {QUICK.map((q) => (
              <button
                type="button"
                key={q.label}
                className="ctf__chip"
                aria-pressed={service === q.label}
                style={{ '--c': q.color } as CSSProperties}
                onClick={() => pick(q.label)}
              >
                <i></i>
                {q.label}
              </button>
            ))}
          </div>
          <label className="ctf__fld">
            <span>Objet / service *</span>
            <select id="suj" name="service" required value={service} onChange={(e) => setService(e.target.value)}>
              <option value="" disabled>
                Ou choisissez dans la liste complète
              </option>
              <optgroup label="Expertises">
                {services.map((s) => (
                  <option key={s.slug}>{s.name}</option>
                ))}
              </optgroup>
              <optgroup label="Solutions">
                {solutions.map((s) => (
                  <option key={s.slug}>{s.name}</option>
                ))}
              </optgroup>
              <option>Autre / je ne sais pas encore</option>
            </select>
          </label>
        </fieldset>

        <fieldset className="ctf__block">
          <legend>
            <b>2</b> Vous
          </legend>
          <div className="ctf__grid">
            <label className="ctf__fld">
              <span>Nom complet *</span>
              <input id="nom" name="name" type="text" required autoComplete="name" placeholder="Jean Kouassi" />
              {err('name')}
            </label>
            <label className="ctf__fld">
              <span>Organisation</span>
              <input id="org" name="organisation" type="text" autoComplete="organization" placeholder="Votre entreprise" />
            </label>
            <label className="ctf__fld">
              <span>Email *</span>
              <input id="mail" name="email" type="email" required autoComplete="email" placeholder="vous@entreprise.ci" />
              {err('email')}
            </label>
            <label className="ctf__fld">
              <span>Téléphone</span>
              <input id="tel" name="phone" type="tel" autoComplete="tel" placeholder="+225 07 00 00 00 00" />
            </label>
          </div>
        </fieldset>

        <fieldset className="ctf__block">
          <legend>
            <b>3</b> Votre message
          </legend>
          <label className="ctf__fld">
            <span>Message *</span>
            <textarea
              id="msg"
              name="message"
              required
              rows={5}
              maxLength={2000}
              placeholder="Votre besoin, votre contexte, vos délais…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {err('message')}
          </label>
          <div className="ctf__starters">
            <span>Pour démarrer :</span>
            {STARTERS.map((s) => (
              <button type="button" key={s} onClick={() => addStarter(s)}>
                + {s.replace(/[.:]\s*$/, '')}
              </button>
            ))}
            <small className="ctf__count">{message.length} / 2000</small>
          </div>
        </fieldset>

        <div className="ctf__foot">
          <label className="ctf__consent">
            <input type="checkbox" name="consent" required />
            <span>
              J’accepte que TIC utilise ces informations pour me répondre (<Link viewTransition to="/confidentialite">confidentialité</Link>).
            </span>
          </label>
          <button className="ctf__send" type="submit" id="contactSend" disabled={status === 'sending'}>
            <span>{status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}</span>
            <i aria-hidden="true">→</i>
          </button>
        </div>
      </form>

      <div className="ctf__ok" id="contactOk" role="status" hidden={status !== 'sent'}>
        <span className="ctf__ok-ic" aria-hidden="true">✓</span>
        <b>Message bien reçu</b>
        <p>Merci. Nous vous répondons sous {site.contact.responseTime}.</p>
        <button type="button" className="ctf__again" onClick={() => setStatus('idle')}>
          Écrire un autre message
        </button>
      </div>
      <div className="ctf__ko" id="contactErr" role="alert" hidden={status !== 'error'}>
        <b>Envoi impossible</b>
        <p>
          Réessayez, ou écrivez à <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </div>
    </>
  );
}
