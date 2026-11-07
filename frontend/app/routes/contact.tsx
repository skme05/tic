import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/contact';
import { seo } from '~/lib/seo';
import { PageHero } from '~/components/sections/PageHero';
import { ContactForm } from '~/features/contact/ContactForm';
import { nbsp, site } from '~/content/site';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Contact", path: "/contact", description: "Contactez TIC — The Infinite Corridor Software Solutions à Abidjan, Cocody : +225 07 08 09 10 11, contact@tic-solutions.com." });

export default function ContactPage() {
  return (
    <>
    <PageHero
      crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]}
      eyebrow="Parlons de votre projet"
      color="#1E8F5E"
      title={<>Franchissons la première <em>porte</em></>}
      lead="Décrivez-nous votre besoin. Nous revenons sous 24 heures ouvrées avec un premier avis et une proposition de rendez-vous."
      image="/assets/img/consultante.webp"
      badge={{ k: 'Réponse', v: `sous ${site.contact.responseTime}` }}
      compact
    />
    <section className="ctd" id="ecrire" aria-labelledby="ctd-title">
      <div className="ctd__in">
        <div className="ctd__card reveal">
          <div className="ctd__form">
            <p className="ctd__eyebrow">Formulaire</p>
            <h2 id="ctd-title">
              Écrivez-<em>nous</em>
            </h2>
            <p className="ctd__lead">Trois étapes, deux minutes. Un membre de l'équipe vous répond sous {site.contact.responseTime}.</p>
            <ContactForm />
          </div>

          <aside className="ctd__side" aria-label="Coordonnées">
            <span className="ctd__glow" aria-hidden="true"></span>
            <OpenNow />
            <h3>Le seuil est ouvert</h3>
            <ul className="ctd__links">
              <li>
                <span className="ctd__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                </span>
                <span className="ctd__t">
                  <small>Téléphone</small>
                  <a href={`tel:${site.contact.phoneHref}`}>{nbsp(site.contact.phone)}</a>
                </span>
                <CopyButton value={site.contact.phone} label="le numéro" />
              </li>
              <li>
                <span className="ctd__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
                </span>
                <span className="ctd__t">
                  <small>Email</small>
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </span>
                <CopyButton value={site.contact.email} label="l'adresse email" />
              </li>
            </ul>

            <div className="ctd__map" aria-label={`${site.contact.district}, ${site.contact.city} — ${site.contact.country}`}>
              <svg viewBox="0 0 320 150" aria-hidden="true">
                <path className="ctd__lagoon" d="M0 118 C60 100 90 132 150 120 S250 92 320 110 V150 H0Z" />
                <path className="ctd__road" d="M0 40 L320 70 M40 0 L110 150 M200 0 L170 150 M0 90 L320 30" />
                <path className="ctd__road ctd__road--s" d="M0 64 L320 52 M90 0 L60 150 M260 0 L290 150" />
              </svg>
              <span className="ctd__pin" aria-hidden="true"></span>
              <span className="ctd__place">
                <b>
                  {site.contact.district}, {site.contact.city}
                </b>
                <small>{site.contact.country} · Lun – Ven, 08 h – 18 h GMT</small>
              </span>
            </div>

            <ol className="ctd__steps">
              <li>
                <b>Vous écrivez</b>
                <span>un message suffit</span>
              </li>
              <li>
                <b>Réponse sous 24 h</b>
                <span>un premier avis</span>
              </li>
              <li>
                <b>Rendez-vous</b>
                <span>sur place ou en visio</span>
              </li>
            </ol>

            <Link viewTransition to="/demarrer-un-projet" className="ctd__cta">
              <span>
                <small>Projet plus large ?</small>
                Démarrer un projet en 5 étapes
              </span>
              <i aria-hidden="true">→</i>
            </Link>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
}

/* Heure d'Abidjan (GMT) et état ouvert / fermé, lun-ven 8 h-18 h.
   Calculé côté navigateur : la page pré-rendue affiche d'abord les horaires. */
function OpenNow() {
  const [state, setState] = useState<{ time: string; open: boolean } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Africa/Abidjan', hour: '2-digit', minute: '2-digit' }).format(now);
      const day = now.getUTCDay();
      const h = now.getUTCHours();
      setState({ time, open: day >= 1 && day <= 5 && h >= 8 && h < 18 });
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="ctd__live" data-open={state ? String(state.open) : undefined}>
      <i aria-hidden="true"></i>
      {state ? `Abidjan · ${state.time} · ${state.open ? 'nous sommes ouverts' : 'réponse dès l’ouverture'}` : 'Lun – Ven · 08 h – 18 h GMT'}
    </p>
  );
}

/* Copier un numéro ou une adresse (repli : sélection du texte) */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="ctd__copy"
      aria-label={`Copier ${label}`}
      data-done={done || undefined}
      onClick={() => {
        navigator.clipboard
          ?.writeText(value)
          .then(() => {
            setDone(true);
            window.setTimeout(() => setDone(false), 1600);
          })
          .catch(() => {});
      }}
    >
      {done ? 'Copié' : 'Copier'}
    </button>
  );
}
