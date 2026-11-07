import { Link } from 'react-router';
import type { Route } from './+types/expertise';
import { seo } from '~/lib/seo';
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
    <section className="phead phead--photo phead--expertise">
      <div className="shell">
        <h1>
          Trois pôles.
          <br />
          Six{' '}
          <em>portes</em>
          .
        </h1>
        <p>
          Nos expertises sont organisées en trois pôles complémentaires. Chacun mobilise des équipes dédiées et des plateformes déjà éprouvées en production.
        </p>
      </div>
    </section>
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
    <section className="corridor" id="corridor">
      <div className="corr__arch" aria-hidden="true">
        <span className="corr__bg"></span>
        {' '}
        <span className="corr__tint"></span>
        {' '}
        <span className="corr__pool"></span>
        {' '}
        <span className="corr__dust"></span>
        {' '}
        <span className="corr__vig"></span>
      </div>
      <div className="shell">
        <div className="sec__hd sec__hd--c sec__hd--w reveal">
          <h2>
            Six portes.
            <br />
            Une seule{' '}
            <em>entrée</em>
            .
          </h2>
          <p>
            Approchez une porte : elle s'ouvre sur son expertise. Franchissez-la pour découvrir la page complète.
          </p>
        </div>
        <div className="doors">
          <Link to="/services/web-design" className="door reveal" style={{ "--c": "#175F9E" }}>
            <span className="door__frame"></span>
            {' '}
            <div className="door__room">
              <span className="door__room__bg" aria-hidden="true"></span>
              {' '}
              <b>Web Design & Développement</b>
              {' '}
              <p>
                Sites vitrines et plateformes web sur mesure, rapides, accessibles et pensées pour convertir.
              </p>
              {' '}
              <span className="door__go">
                Entrer{' '}
                <i></i>
              </span>
            </div>
            {' '}
            <span className="door__leaf">
              <span className="door__panel door__panel--t"></span>
              {' '}
              <span className="door__panel door__panel--b"></span>
              {' '}
              <span className="door__plate">Porte 01</span>
              {' '}
              <span className="door__title">
                Web Design &
                <br />
                Développement
              </span>
              {' '}
              <span className="door__knob"></span>
              {' '}
              <span className="door__hinge door__hinge--t"></span>
              {' '}
              <span className="door__hinge door__hinge--b"></span>
            </span>
            {' '}
            <span className="door__under"></span>
            {' '}
            <span className="door__spill"></span>
            {' '}
            <span className="door__sill"></span>
          </Link>
          {' '}
          <Link to="/services/ui-ux-design" className="door reveal" style={{ "--c": "#63B843" }}>
            <span className="door__frame"></span>
            {' '}
            <div className="door__room">
              <span className="door__room__bg" aria-hidden="true"></span>
              {' '}
              <b>UI / UX Design</b>
              {' '}
              <p>
                Parcours utilisateurs clairs, maquettes testées et interfaces que vos usagers comprennent immédiatement.
              </p>
              {' '}
              <span className="door__go">
                Entrer{' '}
                <i></i>
              </span>
            </div>
            {' '}
            <span className="door__leaf">
              <span className="door__panel door__panel--t"></span>
              {' '}
              <span className="door__panel door__panel--b"></span>
              {' '}
              <span className="door__plate">Porte 02</span>
              {' '}
              <span className="door__title">
                UI / UX
                <br />
                Design
              </span>
              {' '}
              <span className="door__knob"></span>
              {' '}
              <span className="door__hinge door__hinge--t"></span>
              {' '}
              <span className="door__hinge door__hinge--b"></span>
            </span>
            {' '}
            <span className="door__under"></span>
            {' '}
            <span className="door__spill"></span>
            {' '}
            <span className="door__sill"></span>
          </Link>
          {' '}
          <Link to="/services/migration-site-web" className="door reveal" style={{ "--c": "#F5C400" }}>
            <span className="door__frame"></span>
            {' '}
            <div className="door__room">
              <span className="door__room__bg" aria-hidden="true"></span>
              {' '}
              <b>Migration de site web</b>
              {' '}
              <p>
                Refonte et transfert de vos plateformes existantes, sans perte de référencement ni interruption de service.
              </p>
              {' '}
              <span className="door__go">
                Entrer{' '}
                <i></i>
              </span>
            </div>
            {' '}
            <span className="door__leaf">
              <span className="door__panel door__panel--t"></span>
              {' '}
              <span className="door__panel door__panel--b"></span>
              {' '}
              <span className="door__plate">Porte 03</span>
              {' '}
              <span className="door__title">
                Migration
                <br />
                de site web
              </span>
              {' '}
              <span className="door__knob"></span>
              {' '}
              <span className="door__hinge door__hinge--t"></span>
              {' '}
              <span className="door__hinge door__hinge--b"></span>
            </span>
            {' '}
            <span className="door__under"></span>
            {' '}
            <span className="door__spill"></span>
            {' '}
            <span className="door__sill"></span>
          </Link>
          {' '}
          <Link to="/services/developpement-applications" className="door reveal" style={{ "--c": "#F5891F" }}>
            <span className="door__frame"></span>
            {' '}
            <div className="door__room">
              <span className="door__room__bg" aria-hidden="true"></span>
              {' '}
              <b>Développement d'applications</b>
              {' '}
              <p>Applications métiers web et mobiles, robustes, documentées et maintenables dans la durée.</p>
              {' '}
              <span className="door__go">
                Entrer{' '}
                <i></i>
              </span>
            </div>
            {' '}
            <span className="door__leaf">
              <span className="door__panel door__panel--t"></span>
              {' '}
              <span className="door__panel door__panel--b"></span>
              {' '}
              <span className="door__plate">Porte 04</span>
              {' '}
              <span className="door__title">
                Développement
                <br />
                d'applications
              </span>
              {' '}
              <span className="door__knob"></span>
              {' '}
              <span className="door__hinge door__hinge--t"></span>
              {' '}
              <span className="door__hinge door__hinge--b"></span>
            </span>
            {' '}
            <span className="door__under"></span>
            {' '}
            <span className="door__spill"></span>
            {' '}
            <span className="door__sill"></span>
          </Link>
          {' '}
          <Link to="/services/integration-hubspot" className="door reveal" style={{ "--c": "#D9201B" }}>
            <span className="door__frame"></span>
            {' '}
            <div className="door__room">
              <span className="door__room__bg" aria-hidden="true"></span>
              {' '}
              <b>Intégration HubSpot</b>
              {' '}
              <p>Déploiement et paramétrage de votre CRM pour unifier vente, marketing et support.</p>
              {' '}
              <span className="door__go">
                Entrer{' '}
                <i></i>
              </span>
            </div>
            {' '}
            <span className="door__leaf">
              <span className="door__panel door__panel--t"></span>
              {' '}
              <span className="door__panel door__panel--b"></span>
              {' '}
              <span className="door__plate">Porte 05</span>
              {' '}
              <span className="door__title">
                Intégration
                <br />
                HubSpot
              </span>
              {' '}
              <span className="door__knob"></span>
              {' '}
              <span className="door__hinge door__hinge--t"></span>
              {' '}
              <span className="door__hinge door__hinge--b"></span>
            </span>
            {' '}
            <span className="door__under"></span>
            {' '}
            <span className="door__spill"></span>
            {' '}
            <span className="door__sill"></span>
          </Link>
          {' '}
          <Link to="/services/email-marketing" className="door reveal" style={{ "--c": "#8B5CF6" }}>
            <span className="door__frame"></span>
            {' '}
            <div className="door__room">
              <span className="door__room__bg" aria-hidden="true"></span>
              {' '}
              <b>Email Marketing</b>
              {' '}
              <p>
                Campagnes et automatisations qui fidélisent vos clients et génèrent des ventes mesurables.
              </p>
              {' '}
              <span className="door__go">
                Entrer{' '}
                <i></i>
              </span>
            </div>
            {' '}
            <span className="door__leaf">
              <span className="door__panel door__panel--t"></span>
              {' '}
              <span className="door__panel door__panel--b"></span>
              {' '}
              <span className="door__plate">Porte 06</span>
              {' '}
              <span className="door__title">
                Email
                <br />
                Marketing
              </span>
              {' '}
              <span className="door__knob"></span>
              {' '}
              <span className="door__hinge door__hinge--t"></span>
              {' '}
              <span className="door__hinge door__hinge--b"></span>
            </span>
            {' '}
            <span className="door__under"></span>
            {' '}
            <span className="door__spill"></span>
            {' '}
            <span className="door__sill"></span>
          </Link>
        </div>
      </div>
    </section>
    <section className="sec" data-scene="cubes" data-scene-tone="light">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Ce que produit
            <br />
            notre{' '}
            <em>exigence</em>
          </h2>
          <p>Des résultats mesurés chez nos clients, secteur public comme secteur privé.</p>
        </div>
        <div className="stats">
          <div className="st reveal">
            <i></i>
            <b>+200</b>
            <p>Projets livrés depuis 2021, du site vitrine à l'ERP complet.</p>
          </div>
          <div className="st reveal">
            <i></i>
            <b>−38 %</b>
            <p>De temps de traitement sur les processus que nous automatisons.</p>
          </div>
          <div className="st reveal">
            <i></i>
            <b>99,8 %</b>
            <p>De disponibilité mesurée sur les plateformes que nous infogérons.</p>
          </div>
          <div className="st reveal">
            <i></i>
            <b>6</b>
            <p>Portes d'expertise, une équipe dédiée derrière chacune d'elles.</p>
          </div>
        </div>
      </div>
    </section>
    <CtaContact />
    </>
  );
}
