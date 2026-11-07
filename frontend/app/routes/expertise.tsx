import { Link } from 'react-router';
import type { Route } from './+types/expertise';
import { seo } from '~/lib/seo';
import { PageHero } from '~/components/sections/PageHero';
import { ServiceGrid } from '~/components/sections/ServiceGrid';
import { WhyTic } from '~/components/sections/WhyTic';
import { CtaContact } from '~/components/sections/CtaContact';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Nos expertises", path: "/expertise", description: "Les trois pôles d'expertise de TIC : Digital & IA, Solutions Métiers & Conseil, Capital Humain." });

export default function ExpertisePage() {
  useDomEffects(
    [
      () => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d),
    ],
    true,
  );
  return (
    <>
    <PageHero
      crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Expertise' }]}
      eyebrow="Nos expertises"
      title={<>Nos pôles, nos <em>portes</em></>}
      lead="Nos expertises sont organisées en trois pôles complémentaires. Chacun mobilise des équipes dédiées et des plateformes déjà éprouvées en production."
      image="/assets/img/equipe-presentation.webp"
      badge={{ k: 'Organisation', v: 'Pôles, portes et solutions' }}
    >
      <a href="#digital-ia" className="btn btn--red btn--lg">
        Découvrir les pôles <i className="arw"></i>
      </a>
    </PageHero>
    <section className="sec" data-scene="ico" data-scene-tone="light">
      <div className="shell">
        <article className="pole reveal" id="digital-ia">
          <span className="pole__n">01</span>
          {' '}
          <div>
            <h3>Pôle Digital & Intelligence Artificielle</h3>
            <p>
              Tout ce qui se voit et tout ce qui calcule : sites et applications, plateformes de données, modèles d'intelligence artificielle branchés sur vos processus réels.
            </p>
            <ul>
              <li>Sites & plateformes web</li>
              <li>Applications mobiles</li>
              <li>Data & tableaux de bord</li>
              <li>IA générative & assistants métiers</li>
              <li>Automatisation documentaire</li>
              <li>Cloud & infogérance</li>
            </ul>
            <Link viewTransition to="/expertise/digital-ia" className="pole__more">
              Découvrir le pôle <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
        <article className="pole reveal" id="solutions-metiers">
          <span className="pole__n">02</span>
          {' '}
          <div>
            <h3>Solutions Métiers & Conseil</h3>
            <p>
              Nous outillons vos opérations : ERP Odoo, facturation normalisée, plateformes sectorielles, et l'accompagnement organisationnel qui va avec.
            </p>
            <ul>
              <li>Intégration Odoo</li>
              <li>Facture normalisée (FNE)</li>
              <li>School Manager</li>
              <li>E-clinique</li>
              <li>E-garage</li>
              <li>Conseil & refonte de processus</li>
            </ul>
            <Link viewTransition to="/expertise/solutions-metiers" className="pole__more">
              Découvrir le pôle <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
        <article className="pole reveal" id="capital-humain">
          <span className="pole__n">03</span>
          {' '}
          <div>
            <h3>Capital Humain</h3>
            <p>
              La paie et les ressources humaines sont les processus les moins pardonnables. Nous les traitons avec des outils conformes et un accompagnement au quotidien.
            </p>
            <ul>
              <li>Logiciel de paie</li>
              <li>Déclarations sociales</li>
              <li>Gestion des talents</li>
              <li>E-emploi</li>
              <li>E-Connaissance (formation)</li>
              <li>Support RH</li>
            </ul>
            <Link viewTransition to="/expertise/capital-humain" className="pole__more">
              Découvrir le pôle <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </div>
    </section>
    <section className="band" id="secteurs">
      <div className="shell band__hd reveal">
        <p>Ils avancent avec nous</p>
        <h2>
          Les organisations que nous{' '}
          <em>accompagnons</em>
        </h2>
      </div>
      <div className="rail">
        <div className="rail__track" data-speed="52">
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-7.webp" width="240" height="240" alt="" />
            <b>Banque & Finance</b>
            <span>Agences, crédit, conformité</span>
          </span>
          {' '}
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-1.webp" width="240" height="287" alt="" />
            <b>Santé & Pharmacie</b>
            <span>Cliniques, officines, labos</span>
          </span>
          {' '}
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-6.webp" width="240" height="240" alt="" />
            <b>Éducation & Formation</b>
            <span>Écoles, universités, centres</span>
          </span>
          {' '}
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-3.webp" width="240" height="340" alt="" />
            <b>Industrie & Énergie</b>
            <span>Production, maintenance, HSE</span>
          </span>
          {' '}
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-4.webp" width="240" height="240" alt="" />
            <b>Distribution & Retail</b>
            <span>Points de vente, logistique</span>
          </span>
          {' '}
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-2.webp" width="240" height="309" alt="" />
            <b>Services & Administration</b>
            <span>Guichets, dossiers, archives</span>
          </span>
          {' '}
          <span className="band__i">
            <img loading="lazy" decoding="async" src="/assets/img/secteurs/secteur-5.webp" width="240" height="240" alt="" />
            <b>Data & Intelligence</b>
            <span>Décision, prévision, IA</span>
          </span>
        </div>
      </div>
    </section>
    <ServiceGrid />
    <WhyTic
      eyebrow="Nos résultats"
      title={
        <>
          Ce que produit notre <span className="txt-spectrum">exigence</span>
        </>
      }
    />
    <CtaContact />
    </>
  );
}
