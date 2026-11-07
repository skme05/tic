import type { Route } from './+types/confidentialite';
import { seo } from '~/lib/seo';
import { site } from '~/content/site';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Politique de confidentialité", path: "/confidentialite", description: "Comment TIC — The Infinite Corridor Software Solutions collecte et utilise les informations transmises via ses formulaires." });

export const handle = { footerCover: false };

export default function PrivacyPage() {
  return (
    <>
    <section className="phead">
      <div className="shell">
        <h1>
          Politique de{' '}
          <em>confidentialité</em>
        </h1>
        <p>Ce que nous faisons des informations que vous nous confiez.</p>
      </div>
    </section>
    <section className="sec">
      <div className="shell legal">
        <h2>Responsable du traitement</h2>
        <p>
          The Infinite Corridor Software Solutions, Cocody, Abidjan — Côte d'Ivoire. Contact :{' '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          .
        </p>
        <h2>Données collectées</h2>
        <ul className="ticks">
          <li>
            <b>Formulaire de contact</b>
            {' '}: nom, organisation, email, téléphone, service concerné, message.
          </li>
          <li>
            <b>« Démarrer un projet »</b>
            {' '}: description du projet (type, objectifs, fonctionnalités, budget, délai) et vos coordonnées.
          </li>
          <li>
            <b>Dépôt de témoignage</b>
            {' '}: nom, fonction, texte et note. Un témoignage n'est publié qu'après relecture et avec votre accord.
          </li>
        </ul>
        <h2>Finalités</h2>
        <p>
          Ces informations servent uniquement à répondre à votre demande, à préparer une proposition commerciale et, pour les témoignages, à les publier après validation. Elles ne sont ni vendues ni cédées.
        </p>
        <h2>Hébergement et durée de conservation</h2>
        <p>
          Les messages envoyés via les formulaires sont reçus par notre hébergeur Netlify (États-Unis) puis traités par notre équipe. Ils sont conservés [durée À DÉFINIR, ex. 3 ans après le dernier contact].
        </p>
        <h2>Mesure d'audience et stockage local</h2>
        <p>
          Le site n'utilise pas de cookie publicitaire. Il garde seulement en mémoire, pour la durée de votre visite (sessionStorage), le fait que la vidéo d'introduction a déjà été vue et la couleur de la transition entre deux pages.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à{' '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          . Vous pouvez également saisir l'ARTCI (Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire).
        </p>
      </div>
    </section>
    </>
  );
}
