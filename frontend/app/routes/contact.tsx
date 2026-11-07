import { Link } from 'react-router';
import type { Route } from './+types/contact';
import { seo } from '~/lib/seo';
import { ContactForm } from '~/features/contact/ContactForm';
import { nbsp, site } from '~/content/site';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Contact", path: "/contact", description: "Contactez TIC — The Infinite Corridor Software Solutions à Abidjan, Cocody : +225 07 08 09 10 11, contact@tic-solutions.com." });

export default function ContactPage() {
  return (
    <>
    <section className="phead phead--photo phead--contact">
      <div className="shell">
        <h1>
          Franchissons la
          <br />
          première{' '}
          <em>porte</em>
        </h1>
        <p>
          Décrivez-nous votre besoin. Nous revenons sous 24 heures ouvrées avec un premier avis et une proposition de rendez-vous.
        </p>
      </div>
    </section>
    <section className="sec sec--soft" id="ecrire">
      <div className="shell">
        <div className="cpanel reveal">
          <div className="cpanel__form">
            <h2>Écrivez-nous</h2>
            <p className="cpanel__lead">Un message suffit. Réponse sous 24&nbsp;h ouvrées.</p>
            <ContactForm />
          </div>
          <aside className="cpanel__side">
            <p className="cpanel__side-k">Nous joindre</p>
            <h3>Coordonnées</h3>
            <ul className="cpanel__links">
              <li>
                <span>Téléphone</span>
                {' '}
                <a href={`tel:${site.contact.phoneHref}`}>{nbsp(site.contact.phone)}</a>
              </li>
              <li>
                <span>Email</span>
                {' '}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <span>Adresse</span>
                {' '}
                <b>
                  Cocody, Abidjan
                  <br />
                  Côte d'Ivoire
                </b>
              </li>
              <li>
                <span>Horaires</span>
                {' '}
                <b>Lun – Ven · 08 h – 18 h GMT</b>
              </li>
            </ul>
            <div className="cpanel__cta">
              <p>Besoin d’un parcours guidé en 5 étapes&nbsp;?</p>
              {' '}
              <Link viewTransition to="/demarrer-un-projet" className="btn btn--out">
                Démarrer un projet{' '}
                <i className="arw"></i>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
}
