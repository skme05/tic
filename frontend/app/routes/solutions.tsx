import { Link } from 'react-router';
import type { Route } from './+types/solutions';
import { seo } from '~/lib/seo';
import { PageHero } from '~/components/sections/PageHero';
import { MethodTimeline } from '~/components/sections/MethodTimeline';
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
    <PageHero
      crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Solutions' }]}
      eyebrow="Nos solutions"
      color="#1E8F5E"
      title={<>Des plateformes déjà <em>en production</em></>}
      lead="Nos solutions métiers ne sont pas des maquettes : elles tournent chez des clients ivoiriens et de la sous-région, et nos équipes les maintiennent au quotidien."
      image="/assets/img/equipe-presentation.webp"
      badge={{ k: 'En production', v: 'Maintenues au quotidien' }}
    />
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
    <MethodTimeline eyebrow="Déploiement" title="Comment nous déployons" />
    <CtaContact />
    </>
  );
}
