import { Link } from 'react-router';
import type { Route } from './+types/innovation';
import { seo } from '~/lib/seo';
import { PageHero } from '~/components/sections/PageHero';
import { ServiceGrid } from '~/components/sections/ServiceGrid';
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
    <PageHero
      crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Innovation & Lab' }]}
      eyebrow="Innovation"
      color="#B88A00"
      title={<>Le <em>Corridor Lab</em></>}
      lead="Un espace dédié à l'exploration : prototypage rapide, veille technologique et recherche appliquée. Nous testons aujourd'hui les usages de demain, puis nous les industrialisons avec vous."
      image="/assets/img/equipe-reunion.webp"
      badge={{ k: 'Corridor Lab', v: 'Prototyper · tester · industrialiser' }}
    />
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
    <ServiceGrid
      eyebrow="Du Lab aux portes"
      title={
        <>
          Le Lab alimente les <em>six portes</em>
        </>
      }
      lead="Ce que nous validons au Lab finit par renforcer chacune de nos expertises."
    />
    <CtaContact />
    </>
  );
}
