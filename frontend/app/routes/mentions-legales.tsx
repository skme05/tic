import { Link } from 'react-router';
import type { Route } from './+types/mentions-legales';
import { seo } from '~/lib/seo';
import { nbsp, site } from '~/content/site';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Mentions légales", path: "/mentions-legales", description: "Mentions légales du site de The Infinite Corridor Software Solutions (TIC), Abidjan, Côte d'Ivoire." });

export default function LegalNoticePage() {
  return (
    <>
    <section className="phead">
      <div className="shell">
        <h1>
          Mentions{' '}
          <em>légales</em>
        </h1>
        <p>Informations sur l'éditeur et l'hébergeur de ce site.</p>
      </div>
    </section>
    <section className="sec">
      <div className="shell legal">
        <h2>Éditeur du site</h2>
        <p>
          The Infinite Corridor Software Solutions (TIC)
          <br />
          {' '}Forme juridique : [À COMPLÉTER — ex. SARL]
          <br />
          {' '}Capital social : [À COMPLÉTER]
          <br />
          {' '}RCCM : [À COMPLÉTER] · Compte contribuable (NCC) : [À COMPLÉTER]
          <br />
          {' '}Siège : Cocody, Abidjan — Côte d'Ivoire [adresse complète À COMPLÉTER]
          <br />
          {' '}Téléphone :{' '}
          <a href={`tel:${site.contact.phoneHref}`}>{nbsp(site.contact.phone)}</a>
          {' '}· Email :{' '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
        <p>Directeur ou directrice de la publication : [À COMPLÉTER]</p>
        <h2>Hébergement</h2>
        <p>
          Netlify, Inc. — 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis —{' '}
          <a href="https://www.netlify.com" rel="noopener">netlify.com</a>
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus de ce site (textes, logos, visuels, vidéos, code) est la propriété de The Infinite Corridor Software Solutions ou de ses partenaires, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite.
        </p>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des informations que vous nous transmettez est décrit dans notre{' '}
          <Link viewTransition to="/confidentialite">politique de confidentialité</Link>
          .
        </p>
      </div>
    </section>
    </>
  );
}
