import { Link } from 'react-router';
import type { Route } from './+types/about';
import { seo } from '~/lib/seo';
import { PageHero } from '~/components/sections/PageHero';
import { WhyTic } from '~/components/sections/WhyTic';
import { CorridorMotion } from '~/components/sections/CorridorMotion';
import { Manifesto } from '~/components/sections/Manifesto';
import { CtaContact } from '~/components/sections/CtaContact';
import { TeamRoles } from '~/components/sections/TeamRoles';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/about.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "À propos", path: "/about", description: "Qui sommes-nous : TIC — The Infinite Corridor Software Solutions, société d'ingénierie logicielle basée à Abidjan, Côte d'Ivoire." });

export default function AboutPage() {
  useDomEffects(
    [
      () => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d),
    ],
    true,
  );
  return (
    <>
    <PageHero
      crumbs={[{ label: 'Accueil', to: '/' }, { label: 'À propos' }]}
      eyebrow="Qui sommes-nous"
      title={<>Nous ouvrons des portes depuis <em>2021</em></>}
      lead="The Infinite Corridor Software Solutions est une société d'ingénierie logicielle basée à Abidjan. Nous concevons, développons et maintenons les plateformes numériques des entreprises et institutions africaines."
      image="/assets/img/equipe-open-space.webp"
      badge={{ k: 'Depuis 2021', v: 'Abidjan · Cocody' }}
    >
      <Link viewTransition to="/contact" className="btn btn--red btn--lg">
        Travailler avec nous <i className="arw"></i>
      </Link>
    </PageHero>
    <TeamRoles />
    <Manifesto
      eyebrow="Notre manifeste"
      title={
        <>
          Nous existons pour l'<span className="mfx__mark">exécution</span>.
        </>
      }
      lead="Le numérique africain ne manque ni d'idées ni d'énergie : il manque d'exécution. Nous existons pour ça."
      commitments={[
        {
          kicker: 'Exécution',
          title: 'Des solutions qui tiennent',
          text: "Chaque solution que nous concevons doit tenir en production, rester maintenable et demeurer la propriété de nos clients.",
          color: '#1D5FAE',
          viz: 'deploy',
        },
        {
          kicker: 'Transmission',
          title: 'Des équipes autonomes',
          text: 'Nous formons vos équipes et documentons tout, pour que vous gardiez la pleine maîtrise de vos outils.',
          color: '#1E8F5E',
          viz: 'growth',
        },
        {
          kicker: 'Proximité',
          title: 'Joignables, longtemps après',
          text: 'Depuis Cocody, nous restons joignables longtemps après la mise en ligne : support, évolutions, supervision.',
          color: '#B88A00',
          viz: 'pin',
        },
        {
          kicker: 'Promesse',
          title: 'Toujours derrière vous',
          text: 'Nous ouvrons des portes, une à une, et nous restons derrière vous quand elles sont ouvertes.',
          color: '#C9361C',
          viz: 'door',
        },
      ]}
    />
    <CorridorMotion
      eyebrow="Notre quotidien"
      title="Une équipe, un lieu, une culture"
      lead="Nos équipes travaillent ensemble à Cocody : développeurs, designers, architectes et chefs de projet dans la même pièce."
      cta={{ label: 'Venir nous rencontrer', to: '/contact' }}
    />
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
    <section className="sec" data-scene="neural" data-scene-tone="light">
      <div className="shell split">
        <div className="split__img reveal">
          <img loading="lazy" decoding="async" src="/assets/img/equipe-open-space.webp" width="1600" height="1066" alt="L'équipe TIC au travail à Abidjan" />
          {' '}
          <div className="split__img__c">
            <b>+200</b>
            <span>Projets livrés depuis 2021</span>
          </div>
        </div>
        <div className="split__txt reveal">
          <h2>
            Une équipe basée à
            <br />
            <em>Abidjan</em>
            , pour l'Afrique
          </h2>
          <p>
            Nous connaissons le terrain : connexions instables, contraintes réglementaires locales, paiements mobiles, multilinguisme. Nos solutions sont conçues pour fonctionner ici, pas seulement en démonstration.
          </p>
          <ul className="ticks">
            <li>Équipes pluridisciplinaires 100 % basées en Côte d'Ivoire</li>
            <li>Méthodologie agile et livraisons continues</li>
            <li>Conformité aux obligations locales : FNE, déclarations sociales</li>
            <li>Support et maintenance applicative sur le long terme</li>
          </ul>
          {' '}
          <Link viewTransition to="/expertise" className="btn btn--red btn--lg">
            Voir nos expertises{' '}
            <i className="arw"></i>
          </Link>
        </div>
      </div>
    </section>
    <section className="sec sec--soft" data-scene="ico" data-scene-tone="light">
      <div className="shell">
        <div className="sec__hd sec__hd--c reveal">
          <h2>
            Quatre principes
            <br />
            qui ne se{' '}
            <em>négocient pas</em>
          </h2>
          <p>Ils décident de la façon dont nous travaillons, y compris quand c'est inconfortable.</p>
        </div>
        <div className="bento">
          <article className="bx reveal">
            <div className="bx__t">
              <h3>Franchise</h3>
              <p>
                Nous disons ce qui est faisable, dans quel délai et à quel prix. Nous refusons les projets que nous ne saurions pas tenir.
              </p>
            </div>
          </article>
          <article className="bx reveal">
            <div className="bx__t">
              <h3>Qualité mesurable</h3>
              <p>
                Tests, revues de code et supervision : la qualité se prouve avec des indicateurs, pas avec des promesses.
              </p>
            </div>
          </article>
          <article className="bx reveal">
            <div className="bx__t">
              <h3>Transmission</h3>
              <p>
                Un projet réussi est un projet que vos équipes savent faire vivre sans nous. Nous formons et documentons systématiquement.
              </p>
            </div>
          </article>
          <article className="bx reveal">
            <div className="bx__t">
              <h3>Durée</h3>
              <p>
                Nous restons. Maintenance, évolutions, montées de version : nos clients de 2021 sont toujours nos clients.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
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
