import { Link } from 'react-router';
import type { Route } from './+types/innovation';
import { seo } from '~/lib/seo';
import { CtaContact } from '~/components/sections/CtaContact';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Innovation & Lab", path: "/innovation", description: "Le Corridor Lab : recherche & développement, prototypage, fablab et IA générative chez TIC." });

export default function InnovationPage() {
  useDomEffects(
    [
      () => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d),
    ],
    true,
  );
  return (
    <>
    <section className="phead phead--photo phead--lab">
      <div className="shell">
        <h1>
          Le{' '}
          <em>Corridor Lab</em>
        </h1>
        <p>
          Un espace dédié à l'exploration : prototypage rapide, veille technologique et recherche appliquée. Nous testons aujourd'hui les usages de demain, puis nous les industrialisons avec vous.
        </p>
      </div>
    </section>
    <section className="sec" id="rd" data-scene="helix" data-scene-tone="light">
      <div className="shell split">
        <div className="split__txt reveal">
          <h2>
            Chercher avant de
            <br />
            <em>proposer</em>
          </h2>
          <p>
            Nos équipes consacrent une part de leur temps à la veille et à l'expérimentation : nouveaux modèles d'IA, frameworks, protocoles de paiement, architectures hors-ligne. Ce qui passe nos tests entre dans notre catalogue ; le reste est documenté et écarté.
          </p>
          <ul className="ticks">
            <li>Veille technologique structurée et partagée</li>
            <li>Bancs d'essai comparatifs avant adoption</li>
            <li>Publications internes et transfert vers les projets clients</li>
          </ul>
          {' '}
          <Link viewTransition to="/contact" className="btn btn--red btn--lg">
            Proposer un sujet{' '}
            <i className="arw"></i>
          </Link>
        </div>
        <div className="split__img reveal">
          <img loading="lazy" decoding="async" src="/assets/img/equipe-reunion.webp" width="1600" height="900" alt="Recherche et développement chez TIC" />
        </div>
      </div>
    </section>
    <section className="sec sec--soft" id="fablab" data-scene="sphere" data-scene-tone="light">
      <div className="shell split split--rev">
        <div className="split__txt reveal">
          <h2>
            Du concept au
            <br />
            prototype{' '}
            <em>fonctionnel</em>
          </h2>
          <p>
            Une idée se juge mieux quand on peut la manipuler. Nous construisons des prototypes utilisables en quelques semaines, testés avec de vrais utilisateurs, avant d'engager un budget de développement complet.
          </p>
          <ul className="ticks">
            <li>Prototype cliquable en 2 à 4 semaines</li>
            <li>Tests utilisateurs sur le terrain</li>
            <li>Décision go / no-go documentée et chiffrée</li>
          </ul>
          {' '}
          <Link viewTransition to="/contact" className="btn btn--red btn--lg">
            Lancer un prototype{' '}
            <i className="arw"></i>
          </Link>
        </div>
        <ul className="labl reveal">
          <li>
            <b>IA générative</b>
            <span>Assistants métiers, résumé documentaire, extraction de données.</span>
          </li>
          <li>
            <b>Paiement mobile</b>
            <span>Intégrations Orange, MTN, Moov et agrégateurs régionaux.</span>
          </li>
          <li>
            <b>Hors-ligne d'abord</b>
            <span>Applications terrain qui fonctionnent sans réseau.</span>
          </li>
          <li>
            <b>Objets connectés</b>
            <span>Capteurs, télémétrie et supervision industrielle.</span>
          </li>
        </ul>
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
            Le Lab alimente
            <br />
            les{' '}
            <em>six portes</em>
            .
          </h2>
          <p>Ce que nous validons au Lab finit par renforcer chacune de nos expertises.</p>
        </div>
        <div className="doors">
          <Link viewTransition to="/services/web-design" className="door reveal" style={{ "--c": "#175F9E" }}>
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
          <Link viewTransition to="/services/ui-ux-design" className="door reveal" style={{ "--c": "#63B843" }}>
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
          <Link viewTransition to="/services/migration-site-web" className="door reveal" style={{ "--c": "#F5C400" }}>
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
          <Link viewTransition to="/services/developpement-applications" className="door reveal" style={{ "--c": "#F5891F" }}>
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
          <Link viewTransition to="/services/integration-hubspot" className="door reveal" style={{ "--c": "#D9201B" }}>
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
          <Link viewTransition to="/services/email-marketing" className="door reveal" style={{ "--c": "#8B5CF6" }}>
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
    <CtaContact />
    </>
  );
}
