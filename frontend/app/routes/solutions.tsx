import { Link } from 'react-router';
import type { Route } from './+types/solutions';
import { seo } from '~/lib/seo';
import { CtaContact } from '~/components/sections/CtaContact';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Nos solutions", path: "/solutions", description: "Odoo, Paie, FNE, School Manager, E-clinique, E-garage, E-Connaissance, E-emploi, Scraper Pro : les plateformes métiers déployées par TIC." });

export default function SolutionsPage() {
  useDomEffects(
    [
      () => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d),
    ],
    true,
  );
  return (
    <>
    <section className="phead">
      <span className="phead__grid" aria-hidden="true"></span>
      {' '}
      <div className="shell">
        <h1>
          Des plateformes déjà
          <br />
          <em>en production</em>
        </h1>
        <p>
          Nos solutions métiers ne sont pas des maquettes : elles tournent chez des clients ivoiriens et de la sous-région, et nos équipes les maintiennent au quotidien.
        </p>
      </div>
    </section>
    <section className="sec" data-scene="cubes" data-scene-tone="light">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Choisissez votre{' '}
            <em>solution</em>
          </h2>
          <p>Chaque plateforme a sa propre page : fonctionnalités, périmètre et prochaines étapes.</p>
        </div>
        <div className="related" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          <Link viewTransition to="/solutions/odoo">
            <i>ERP</i>
            <b>Odoo</b>
            <span>Intégration, personnalisation et hébergement de l'ERP open source.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/paie">
            <i>RH</i>
            <b>Paie</b>
            <span>Bulletins, CNPS et déclarations conformes à la réglementation ivoirienne.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/fne">
            <i>FNE</i>
            <b>Facture Normalisée</b>
            <span>Facturation électronique conforme aux exigences de la DGI.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/hr">
            <i>HR</i>
            <b>HR Suite</b>
            <span>Dossiers du personnel, entretiens, compétences et organigramme.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/school-manager">
            <i>EDU</i>
            <b>School Manager</b>
            <span>Inscriptions, notes, bulletins et espace parents.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/e-clinique">
            <i>MED</i>
            <b>E-clinique</b>
            <span>Dossier patient, rendez-vous et facturation médicale.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/e-garage">
            <i>AUTO</i>
            <b>E-garage</b>
            <span>Atelier, devis, pièces et suivi de parc automobile.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/e-connaissance">
            <i>LMS</i>
            <b>E-Connaissance</b>
            <span>Formation interne, quiz, certificats et suivi de progression.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/e-emploi">
            <i>JOB</i>
            <b>E-emploi</b>
            <span>Offres, candidatures, présélection et suivi des entretiens.</span>
          </Link>
          {' '}
          <Link viewTransition to="/solutions/scraper-pro">
            <i>DATA</i>
            <b>Scraper Pro</b>
            <span>Collecte, nettoyage et structuration de données à grande échelle.</span>
          </Link>
        </div>
      </div>
    </section>
    <section className="sec sec--soft" data-scene="torus" data-scene-tone="light">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Comment nous{' '}
            <em>déployons</em>
          </h2>
          <p>Un cadrage clair, des livraisons visibles, une mise en production maîtrisée.</p>
        </div>
        <div className="steps3">
          <div className="steps3__art reveal">
            <img loading="lazy" decoding="async" src="/assets/img/consultante.webp" width="1000" height="666" alt="Consultante TIC" />
            {' '}
            <div className="steps3__art__c">
              <b>Un binôme dédié</b>
              {' '}
              <p>
                Un référent projet et un architecte technique vous suivent du premier échange à la mise en production.
              </p>
            </div>
          </div>
          <div className="steps3__l">
            <article className="stp reveal">
              <i>01</i>
              <div>
                <h3>Cadrage & devis gratuit</h3>
                <p>
                  Nous analysons vos besoins, vos contraintes et votre environnement existant, puis nous chiffrons précisément le projet.
                </p>
              </div>
            </article>
            <article className="stp reveal">
              <i>02</i>
              <div>
                <h3>Conception & développement</h3>
                <p>
                  Maquettes validées, développement en cycles courts, démonstration à chaque étape. Vous voyez le produit grandir.
                </p>
              </div>
            </article>
            <article className="stp reveal">
              <i>03</i>
              <div>
                <h3>Mise en production & suivi</h3>
                <p>
                  Recette avec vos équipes, formation, déploiement, puis maintenance et supervision continues.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <CtaContact />
    </>
  );
}
