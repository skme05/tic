import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { submitProjectBrief } from '~/lib/api/endpoints';
import type { ProjectBriefRequest } from '~/lib/api/types';

/* « Démarrer un projet » : brief guidé en 5 étapes, envoyé à l'API.
   Corrections par rapport au site d'origine :
   - plus d'envoi par mailto (qui ouvrait la messagerie du visiteur) ;
   - plus de création de « compte » avec mot de passe stocké en clair dans
     le navigateur ;
   - l'email et le téléphone sont réellement validés avant l'envoi. */

const STEPS = ['Type', 'Objectifs', 'Périmètre', 'Budget', 'Coordonnées'];

export function ProjectWizard() {
  const [current, setCurrent] = useState(1);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [objCount, setObjCount] = useState(0);
  const [recap, setRecap] = useState<[string, string][]>([]);
  const [, setTick] = useState(0); /* revalide l'en-tête quand un champ change */
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const panel = (n: number) => formRef.current?.querySelector<HTMLElement>(`[data-panel="${n}"]`) ?? null;

  /** une étape est valide si tous ses champs obligatoires le sont */
  function stepValid(n: number): boolean {
    const p = panel(n);
    if (!p) return true;
    if (n === 1) return !!p.querySelector('input[name="type"]:checked');
    return Array.from(p.querySelectorAll<HTMLInputElement>('input[required], textarea[required], select[required]')).every(
      (el) => el.value.trim() !== '' && el.checkValidity(),
    );
  }

  function shake(n: number) {
    const p = panel(n);
    if (!p) return;
    p.style.animation = 'none';
    void p.offsetWidth; /* relance l'animation */
    p.style.animation = 'nope .5s';
  }

  function val(name: string): string {
    const form = formRef.current!;
    const els = Array.from(form.querySelectorAll<HTMLInputElement>(`[name="${name}"]`));
    if (els[0]?.type === 'checkbox' || els[0]?.type === 'radio') {
      return els.filter((e) => e.checked).map((e) => e.value).join(', ');
    }
    return (els[0]?.value ?? '').trim();
  }

  function go(n: number) {
    const next = Math.max(1, Math.min(STEPS.length, n));
    if (next === STEPS.length) {
      setRecap([
        ['Type de projet', val('type') || '—'],
        ['Objectif', val('objective') || '—'],
        ['Destinataires', val('audience') || '—'],
        ['Fonctionnalités', val('features') || '—'],
        ['Budget', val('budget') || '—'],
        ['Délai souhaité', val('deadline') || '—'],
      ]);
    }
    setCurrent(next);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepValid(current)) {
      shake(current);
      return;
    }
    if (current < STEPS.length) {
      go(current + 1);
      return;
    }
    const form = e.currentTarget;
    if ((form.elements.namedItem('website') as HTMLInputElement | null)?.value) return; /* robot */
    const brief: ProjectBriefRequest = {
      type: val('type'),
      objective: val('objective'),
      audience: val('audience') || undefined,
      features: Array.from(form.querySelectorAll<HTMLInputElement>('input[name="features"]:checked')).map((i) => i.value),
      otherFeature: val('otherFeature') || undefined,
      budget: val('budget'),
      deadline: val('deadline'),
      priority: val('priority') || undefined,
      name: val('name'),
      organisation: val('organisation') || undefined,
      email: val('email'),
      phone: val('phone'),
    };
    setSending(true);
    try {
      await submitProjectBrief(brief);
      setDone(true);
    } catch {
      window.alert("L'envoi a échoué. Vérifiez votre connexion ou écrivez-nous directement à contact@tic-solutions.com.");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const panelClass = (n: number) => 'wpanel' + (!done && n === current ? ' is-active' : '');

  return (
    <section className="wiz">
        <div className="wiz__shell">
          <div className="wiz__head">
            <ol className="wsteps" id="wSteps">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const reachable = n < current || (n === current + 1 && stepValid(current));
                return (
                  <li key={label} className={'wstep' + (n === current ? ' is-now' : '') + (n < current ? ' is-done' : '')} aria-current={n === current ? 'step' : undefined}>
                    <button type="button" className="wstep__b" disabled={!reachable && n !== current} onClick={() => reachable && go(n)}>
                      <span className="wstep__n">{n}</span>
                      <small>{label}</small>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <form className="wform" id="briefForm" ref={formRef} noValidate onSubmit={onSubmit} onChange={() => setTick((t) => t + 1)}>
            <p className="cpanel__honey" aria-hidden="true">
              <label>
                Ne pas remplir :{' '}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className={panelClass(1)} data-panel="1">
              <p className="wpanel__tag">Étape 1 sur 5</p>
              <h2>
                Quel type de projet
                <br />
                souhaitez-vous confier ?
              </h2>
              <p>Sélectionnez l'option la plus proche de votre besoin — nous affinerons ensemble ensuite.</p>
              <div className="choices" id="typeChoices">
                <label className="choice">
                  <input type="radio" name="type" value="Site web / vitrine" required />
                  {' '}
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z"></path>
                      </svg>
                    </i>
                    {' '}
                    <b>Site web / vitrine</b>
                    {' '}
                    <span>Site institutionnel, plateforme de contenu ou landing page.</span>
                  </span>
                </label>
                {' '}
                <label className="choice">
                  <input type="radio" name="type" value="Application web ou mobile" />
                  {' '}
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="2" width="12" height="20" rx="2.5"></rect>
                        <line x1="10" y1="19" x2="14" y2="19"></line>
                      </svg>
                    </i>
                    {' '}
                    <b>Application web ou mobile</b>
                    {' '}
                    <span>Outil métier, application client ou plateforme sur mesure.</span>
                  </span>
                </label>
                {' '}
                <label className="choice">
                  <input type="radio" name="type" value="Solution métier / ERP" />
                  {' '}
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                      </svg>
                    </i>
                    {' '}
                    <b>Solution métier / ERP</b>
                    {' '}
                    <span>Odoo, paie, gestion des talents ou processus internes.</span>
                  </span>
                </label>
                {' '}
                <label className="choice">
                  <input type="radio" name="type" value="Autre / je ne sais pas encore" />
                  {' '}
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 4"></path>
                        <circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none"></circle>
                      </svg>
                    </i>
                    {' '}
                    <b>Autre / à préciser</b>
                    {' '}
                    <span>Vous hésitez encore ? Décrivez-le simplement à l'étape suivante.</span>
                  </span>
                </label>
              </div>
            </div>
            <div className={panelClass(2)} data-panel="2">
              <p className="wpanel__tag">Étape 2 sur 5</p>
              <h2>
                Quel est le contexte
                <br />
                et l'objectif du projet ?
              </h2>
              <p>Plus votre réponse est précise, plus notre première proposition sera pertinente.</p>
              <div className="wfld">
                <label htmlFor="ctxObjectif">Objectif principal</label>
                {' '}
                <textarea id="ctxObjectif" name="objective" onChange={(e) => setObjCount(e.currentTarget.value.length)} required maxLength={700} placeholder="Ex. : moderniser notre image de marque, digitaliser un processus interne, lancer un nouveau service…" />
                {' '}
                <p className="wcount">
                  <span id="objCount">{objCount}</span>
                  /700
                </p>
              </div>
              <div className="wfld">
                <label htmlFor="ctxPublic">À qui s'adresse le projet ?</label>
                {' '}
                <input id="ctxPublic" name="audience" type="text" placeholder="Ex. : nos clients particuliers, nos équipes internes, nos partenaires…" />
              </div>
            </div>
            <div className={panelClass(3)} data-panel="3">
              <p className="wpanel__tag">Étape 3 sur 5</p>
              <h2>
                Quelles fonctionnalités
                <br />
                vous semblent essentielles ?
              </h2>
              <p>
                Cochez tout ce qui s'applique — vous pourrez ajuster ce périmètre avec votre chef de projet.
              </p>
              <div className="choices" id="featChoices">
                <label className="choice choice--sm">
                  <input type="checkbox" name="features" value="Design sur mesure" />
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3Z"></path>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"></path>
                      </svg>
                    </i>
                    <b>Design sur mesure</b>
                  </span>
                </label>
                {' '}
                <label className="choice choice--sm">
                  <input type="checkbox" name="features" value="Espace / compte utilisateur" />
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4"></circle>
                        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
                      </svg>
                    </i>
                    <b>Compte utilisateur</b>
                  </span>
                </label>
                {' '}
                <label className="choice choice--sm">
                  <input type="checkbox" name="features" value="Paiement en ligne" />
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2.5"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                      </svg>
                    </i>
                    <b>Paiement en ligne</b>
                  </span>
                </label>
                {' '}
                <label className="choice choice--sm">
                  <input type="checkbox" name="features" value="Multilingue" />
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z"></path>
                      </svg>
                    </i>
                    <b>Multilingue</b>
                  </span>
                </label>
                {' '}
                <label className="choice choice--sm">
                  <input type="checkbox" name="features" value="Intégration CRM / ERP" />
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                      </svg>
                    </i>
                    <b>Intégration CRM/ERP</b>
                  </span>
                </label>
                {' '}
                <label className="choice choice--sm">
                  <input type="checkbox" name="features" value="Tableau de bord / statistiques" />
                  <span className="choice__c">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="20" x2="4" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="20" y1="20" x2="20" y2="14"></line>
                      </svg>
                    </i>
                    <b>Statistiques</b>
                  </span>
                </label>
              </div>
              <div className="wfld">
                <label htmlFor="ctxAutre">Un besoin spécifique non listé ?</label>
                {' '}
                <input id="ctxAutre" name="otherFeature" type="text" placeholder="Précisez ici si besoin" />
              </div>
            </div>
            <div className={panelClass(4)} data-panel="4">
              <p className="wpanel__tag">Étape 4 sur 5</p>
              <h2>
                Quel budget et quel
                <br />
                calendrier envisagez-vous ?
              </h2>
              <p>Une fourchette suffit — elle nous aide à calibrer une proposition réaliste.</p>
              <div className="wgrid2">
                <div className="wfld">
                  <label htmlFor="budget">Budget indicatif</label>
                  {' '}
                  <select id="budget" name="budget" required defaultValue="">
                    <option value="" disabled>Choisir une fourchette</option>
                    <option>Moins de 1 000 000 FCFA</option>
                    <option>1 000 000 – 3 000 000 FCFA</option>
                    <option>3 000 000 – 8 000 000 FCFA</option>
                    <option>Plus de 8 000 000 FCFA</option>
                    <option>Je ne sais pas encore</option>
                  </select>
                </div>
                <div className="wfld">
                  <label htmlFor="delai">Délai souhaité</label>
                  {' '}
                  <select id="delai" name="deadline" required defaultValue="">
                    <option value="" disabled>Choisir un délai</option>
                    <option>Dès que possible</option>
                    <option>Sous 1 mois</option>
                    <option>1 à 3 mois</option>
                    <option>3 à 6 mois</option>
                    <option>Pas de contrainte particulière</option>
                  </select>
                </div>
              </div>
              <div className="wfld">
                <label htmlFor="priorite">Qu'est-ce qui compte le plus pour vous ?</label>
                {' '}
                <select id="priorite" name="priority" defaultValue="">
                  <option value="" disabled>Choisir une priorité</option>
                  <option>Respecter le budget</option>
                  <option>Respecter le délai</option>
                  <option>Qualité et finitions</option>
                </select>
              </div>
            </div>
            <div className={panelClass(5)} data-panel="5">
              <p className="wpanel__tag">Étape 5 sur 5</p>
              <h2>Vos coordonnées</h2>
              <p>Dernière étape : comment pouvons-nous vous recontacter ?</p>
              <div className="wgrid2">
                <div className="wfld">
                  <label htmlFor="ctNom">Nom complet</label>
                  <input id="ctNom" name="name" type="text" required autoComplete="name" placeholder="Votre nom" />
                </div>
                <div className="wfld">
                  <label htmlFor="ctOrg">Organisation</label>
                  <input id="ctOrg" name="organisation" type="text" autoComplete="organization" placeholder="Votre société ou institution" />
                </div>
                <div className="wfld">
                  <label htmlFor="ctMail">Email</label>
                  <input id="ctMail" name="email" type="email" required autoComplete="email" placeholder="vous@exemple.ci" />
                </div>
                <div className="wfld">
                  <label htmlFor="ctTel">Téléphone</label>
                  <input id="ctTel" name="phone" type="tel" required autoComplete="tel" placeholder="+225 ..." />
                </div>
              </div>
              <p className="wpanel__hint">Ces coordonnées servent uniquement à vous répondre au sujet de ce projet.</p>
              <div className="recap" id="recapBox" aria-live="polite">
                {recap.map(([k, v]) => (
                  <div className="recap__it" key={k}>
                    <b>{k}</b>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={'wdone' + (done ? ' is-active' : '')} id="wDone" tabIndex={-1} ref={doneRef}>
              <span className="wdone__ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              {' '}
              <h2>Merci, votre brief est transmis</h2>
              <p>
                Nous revenons vers vous sous 24 heures ouvrées avec un premier avis et une proposition de rendez-vous.
              </p>
              <div className="wdone__actions">
                <Link to="/solutions" className="btn btn--red btn--lg">
                  Découvrir nos solutions{' '}
                  <i className="arw"></i>
                </Link>
                {' '}
                <Link to="/" className="btn btn--ghost btn--lg">Retour à l'accueil</Link>
              </div>
            </div>
            <div className="wnav" id="wNav" hidden={done}>
              <button type="button" className="wnav__prev" id="wPrev" hidden={current === 1} onClick={() => go(current - 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                {' '}Précédent
              </button>
              {' '}
              <span className="wnav__pos" id="wPos">Étape {current} / {STEPS.length}</span>
              {' '}
              <button type="submit" className="btn btn--red" id="wNext" disabled={sending}>
                {sending ? 'Envoi en cours…' : current === STEPS.length ? 'Envoyer ma demande' : 'Continuer'} <i className="arw"></i>
              </button>
            </div>
          </form>
        </div>
      </section>
  );
}
