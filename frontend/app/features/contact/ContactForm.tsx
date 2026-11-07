import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { services } from '~/content/services';
import { solutions } from '~/content/solutions';
import { site } from '~/content/site';
import { submitContact } from '~/lib/api/endpoints';
import { ApiError } from '~/lib/api/client';
import type { ContactRequest } from '~/lib/api/types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/* Formulaire de contact : validation native du navigateur, envoi via la
   couche API (Django, ou Netlify Forms tant que le backend n'existe pas). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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
      setStatus('sent');
    } catch (err) {
      if (err instanceof ApiError) setFieldErrors(err.fieldErrors);
      setStatus('error');
    }
  }

  const err = (name: string) =>
    fieldErrors[name]?.length ? (
      <small className="fld__err" role="alert">
        {fieldErrors[name].join(' ')}
      </small>
    ) : null;

  return (
    <>
      <form
        className={'cpanel__fields' + (status === 'sending' ? ' is-sending' : '')}
        id="contactForm"
        noValidate
        hidden={status === 'sent'}
        onSubmit={onSubmit}
      >
        <p className="cpanel__honey" aria-hidden="true">
          <label>
            Ne pas remplir : <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="cpanel__grid">
          <label className="cpanel__fld">
            <span>Nom complet *</span>
            <input id="nom" name="name" type="text" required autoComplete="name" placeholder="Jean Kouassi" />
            {err('name')}
          </label>
          <label className="cpanel__fld">
            <span>Organisation</span>
            <input id="org" name="organisation" type="text" autoComplete="organization" placeholder="Votre entreprise" />
          </label>
          <label className="cpanel__fld">
            <span>Email *</span>
            <input id="mail" name="email" type="email" required autoComplete="email" placeholder="vous@entreprise.ci" />
            {err('email')}
          </label>
          <label className="cpanel__fld">
            <span>Téléphone</span>
            <input id="tel" name="phone" type="tel" autoComplete="tel" placeholder="+225 07 00 00 00 00" />
          </label>
          <label className="cpanel__fld cpanel__fld--full">
            <span>Objet / service *</span>
            <select id="suj" name="service" required defaultValue="">
              <option value="" disabled>
                Sélectionnez un service
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
          <label className="cpanel__fld cpanel__fld--full">
            <span>Message *</span>
            <textarea id="msg" name="message" required rows={5} placeholder="Votre besoin, votre contexte, vos délais…" />
            {err('message')}
          </label>
        </div>

        <div className="cpanel__foot">
          <label className="cpanel__consent">
            <input type="checkbox" name="consent" required />
            <span>
              J’accepte que TIC utilise ces infos pour me répondre (<Link viewTransition to="/confidentialite">confidentialité</Link>).
            </span>
          </label>
          <button className="btn btn--red btn--lg" type="submit" id="contactSend" disabled={status === 'sending'}>
            <span className="form__send-label">{status === 'sending' ? 'Envoi en cours…' : 'Envoyer'}</span>
            <i className="arw"></i>
          </button>
        </div>
      </form>

      <div className="cpanel__ok" id="contactOk" role="status" hidden={status !== 'sent'}>
        <b>Message bien reçu</b> <p>Merci. Nous vous répondons sous {site.contact.responseTime}.</p>
      </div>
      <div className="cpanel__err" id="contactErr" role="alert" hidden={status !== 'error'}>
        <b>Envoi impossible</b>{' '}
        <p>
          Réessayez, ou écrivez à <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </div>
    </>
  );
}
