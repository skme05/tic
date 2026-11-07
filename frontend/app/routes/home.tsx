import { Link } from 'react-router';
import type { Route } from './+types/home';
import { seo } from '~/lib/seo';
import { HeroStudio } from '~/components/sections/HeroStudio';
import { Manifesto } from '~/components/sections/Manifesto';
import { ServiceGrid } from '~/components/sections/ServiceGrid';
import { MethodTimeline } from '~/components/sections/MethodTimeline';
import { WhyTic } from '~/components/sections/WhyTic';
import { CorridorMotion } from '~/components/sections/CorridorMotion';
import { TestimonialsRail } from '~/features/testimonials/TestimonialsRail';
import { TestimonialForm } from '~/features/testimonials/TestimonialForm';
import { CtaContact } from '~/components/sections/CtaContact';
import { organizationJsonLd } from '~/lib/seo';
import css from '~/styles/home.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => [...seo({ path: "/", description: "The Infinite Corridor Software Solutions accompagne entreprises et institutions dans leur transformation numérique : développement web et mobile, IA, plateformes métiers. Basés à Abidjan, Côte d'Ivoire." }), { 'script:ld+json': organizationJsonLd }];

export default function HomePage() {
  return (
    <>
    <HeroStudio />
    <Manifesto />
    <CorridorMotion />
    <section className="band" id="secteurs">
      <div className="shell band__hd reveal">
        <p>Ils avancent avec nous</p>
        <h2>
          Les organisations que nous{' '}
          <em>accompagnons</em>
        </h2>
      </div>
      <div className="rail" data-rail="">
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
    <section className="sec sec--soft" id="capacites">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Tout ce qu'il faut pour
            <br />
            industrialiser votre{' '}
            <em>numérique</em>
            .
          </h2>
          <p>
            Une équipe pluridisciplinaire, des plateformes éprouvées et une exigence d'ingénierie sur chaque livrable.
          </p>
        </div>
        <div className="bento">
          <article className="bx reveal">
            <div className="bx__t">
              <h3>Développement sur mesure</h3>
              <p>Applications web et mobiles taillées pour vos processus réels, pas l'inverse.</p>
            </div>
            <div className="bx__art">
              <div className="mui">
                <div className="mui__hd">
                  <b>Sprint 14</b>
                  <span className="mui__pill">En cours</span>
                </div>
                <div className="mui__row" style={{ "--c": "#175F9E" }}>
                  <i></i>
                  <span>API paiement mobile</span>
                  <em>92 %</em>
                </div>
                <div className="mui__bar mui__bar--b">
                  <i style={{ width: "92%" }}></i>
                </div>
                <div className="mui__row" style={{ "--c": "#63B843" }}>
                  <i></i>
                  <span>Portail agences</span>
                  <em>68 %</em>
                </div>
                <div className="mui__bar mui__bar--g">
                  <i style={{ width: "68%" }}></i>
                </div>
                <div className="mui__row" style={{ "--c": "#b91c1c" }}>
                  <i></i>
                  <span>Recette client</span>
                  <em>41 %</em>
                </div>
                <div className="mui__bar">
                  <i style={{ width: "41%" }}></i>
                </div>
              </div>
            </div>
          </article>
          <article className="bx reveal">
            <div className="bx__t">
              <h3>Automatisation & IA</h3>
              <p>
                Assistants métiers, traitement documentaire et modèles prédictifs branchés sur vos données.
              </p>
            </div>
            <div className="bx__art">
              <div className="mui">
                <div className="mui__hd">
                  <b>Traitements automatisés</b>
                  <span className="mui__pill">24 / 7</span>
                </div>
                <div className="mui__big">
                  <b>18 420</b>
                  <span>+34 % ce mois</span>
                </div>
                {' '}
                <svg className="mui__chart" viewBox="0 0 240 74" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points="4,62 34,54 64,58 94,40 124,44 154,26 184,30 214,12 236,16" fill="none" stroke="#b91c1c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></polyline>
                  <polyline points="4,68 34,66 64,62 94,60 124,54 154,50 184,44 214,38 236,34" fill="none" stroke="#dfe3ea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                </svg>
                {' '}
                <ul className="mui__legend">
                  <li style={{ "--c": "#b91c1c" }}>
                    <i></i>
                    Avec TIC
                  </li>
                  <li style={{ "--c": "#c9ced8" }}>
                    <i></i>
                    Traitement manuel
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <article className="bx bx--tall reveal">
            <div className="bx__t">
              <h3>Support & infogérance</h3>
              <p>
                Un interlocuteur unique, des délais engagés et une supervision continue de vos plateformes.
              </p>
            </div>
            <div className="bx__art">
              <div className="mui">
                <div className="mui__hd">
                  <b>Fil de support</b>
                  <span className="mui__pill">3 ouverts</span>
                </div>
                <div className="mui__msg">
                  <u>KA</u>
                  <div>
                    <b>Kouassi A.</b>
                    <em>Migration terminée sur l'agence de Yopougon.</em>
                  </div>
                </div>
                <div className="mui__msg">
                  <u>TIC</u>
                  <div>
                    <b>Équipe TIC</b>
                    <em>Sauvegarde vérifiée · 04:12</em>
                  </div>
                </div>
                <div className="mui__msg">
                  <u>BD</u>
                  <div>
                    <b>Bamba D.</b>
                    <em>Besoin d'un export comptable mensuel.</em>
                  </div>
                </div>
                <div className="mui__hd" style={{ marginTop: "4px" }}>
                  <b>Disponibilité</b>
                  <span className="mui__pill">30 j</span>
                </div>
                <div className="mui__bar">
                  <i style={{ width: "99.8%" }}></i>
                </div>
                <ul className="mui__legend">
                  <li style={{ "--c": "#63B843" }}>
                    <i></i>
                    99,8 % de disponibilité mesurée
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <article className="bx bx--w bx--row reveal">
            <div className="bx__t">
              <h3>Pilotage & données</h3>
              <p>
                Tableaux de bord, indicateurs consolidés et rapports automatiques : vos décisions reposent sur des chiffres à jour, pas sur des ressentis.
              </p>
            </div>
            <div className="bx__art">
              <div className="mui">
                <div className="mui__hd">
                  <b>Direction générale</b>
                  <span className="mui__pill">Temps réel</span>
                </div>
                <div className="mui__row" style={{ "--c": "#F5891F" }}>
                  <i></i>
                  <span>Chiffre d'affaires</span>
                  <em>+21 %</em>
                </div>
                <div className="mui__row" style={{ "--c": "#63B843" }}>
                  <i></i>
                  <span>Délai de traitement</span>
                  <em>−38 %</em>
                </div>
                <div className="mui__row" style={{ "--c": "#175F9E" }}>
                  <i></i>
                  <span>Satisfaction client</span>
                  <em>4,7 / 5</em>
                </div>
                <div className="mui__ava">
                  <span>DG</span>
                  <span>RH</span>
                  <span>IT</span>
                  <span>CO</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <WhyTic />
    <MethodTimeline />
    <ServiceGrid />
    <section className="sec" id="solutions">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Des solutions métiers
            <br />
            déjà{' '}
            <em>en production</em>
          </h2>
          <p>
            Des produits éprouvés, déployés et maintenus par nos équipes chez des clients ivoiriens et de la sous-région.
          </p>
        </div>
        <div className="solrail reveal">
          <div className="rail">
            <div className="rail__track" data-speed="46">
              <Link viewTransition to="/solutions/odoo" className="sol">
                <b>Odoo</b>
                <span>Intégration et personnalisation de l'ERP open source.</span>
                <u>Découvrir →</u>
              </Link>
              {' '}
              <Link viewTransition to="/solutions/paie" className="sol">
                <b>Paie</b>
                <span>Gestion complète de la paie et des déclarations sociales.</span>
                <u>Découvrir →</u>
              </Link>
              {' '}
              <Link viewTransition to="/solutions/fne" className="sol">
                <b>Facture normalisée</b>
                <span>Facturation électronique conforme à la réglementation.</span>
                <u>Découvrir →</u>
              </Link>
              {' '}
              <Link viewTransition to="/solutions/school-manager" className="sol">
                <b>School Manager</b>
                <span>Inscriptions, notes et suivi complet de la scolarité.</span>
                <u>Découvrir →</u>
              </Link>
            </div>
          </div>
          <div className="rail rail--rev">
            <div className="rail__track" data-speed="46">
              <Link viewTransition to="/solutions/e-clinique" className="sol">
                <b>E-clinique</b>
                <span>Dossier patient, rendez-vous et facturation médicale.</span>
                <u>Découvrir →</u>
              </Link>
              {' '}
              <Link viewTransition to="/solutions/e-garage" className="sol">
                <b>E-garage</b>
                <span>Ateliers, interventions et suivi de parc automobile.</span>
                <u>Découvrir →</u>
              </Link>
              {' '}
              <Link viewTransition to="/solutions/e-connaissance" className="sol">
                <b>E-Connaissance</b>
                <span>Base de savoir et formation en ligne pour vos équipes.</span>
                <u>Découvrir →</u>
              </Link>
              {' '}
              <Link viewTransition to="/solutions/scraper-pro" className="sol">
                <b>Scraper Pro</b>
                <span>Collecte et structuration de données à grande échelle.</span>
                <u>Découvrir →</u>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="sec sec--soft" id="lab">
      <div className="shell split split--rev">
        <div className="split__txt reveal">
          <h2>
            Le{' '}
            <em>Corridor Lab</em>
          </h2>
          <p>
            Un espace dédié à l'exploration : prototypage rapide, veille technologique et recherche appliquée. Nous testons aujourd'hui les usages de demain, puis nous les industrialisons avec vous.
          </p>
          {' '}
          <Link viewTransition to="/innovation" className="btn btn--red btn--lg">
            Découvrir le Lab{' '}
            <i className="arw"></i>
          </Link>
        </div>
        <ul className="labl reveal">
          <li>
            <b>Recherche & Développement</b>
            <span>Veille technologique et recherche appliquée à vos métiers.</span>
          </li>
          <li>
            <b>Prototypage & Fablab</b>
            <span>Du concept au prototype fonctionnel en quelques semaines.</span>
          </li>
          <li>
            <b>IA générative</b>
            <span>Assistants métiers et automatisation documentaire.</span>
          </li>
        </ul>
      </div>
    </section>
    <section className="sec" id="temoignages">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Résultats réels,
            <br />
            impact{' '}
            <em>réel</em>
            .
          </h2>
          <p>Ce que disent les organisations qui ont franchi la porte avant vous.</p>
        </div>
        <TestimonialsRail />
        <TestimonialForm className="qform reveal" />
      </div>
    </section>
    <CtaContact />
    </>
  );
}
