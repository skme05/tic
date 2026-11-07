import { Link } from 'react-router';
import type { Route } from './+types/temoignages';
import { seo } from '~/lib/seo';
import { TestimonialsRail } from '~/features/testimonials/TestimonialsRail';
import { TestimonialForm } from '~/features/testimonials/TestimonialForm';
import { CtaContact } from '~/components/sections/CtaContact';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Témoignages clients", path: "/temoignages", description: "Ce que disent les organisations qui travaillent avec TIC — The Infinite Corridor Software Solutions." });

export default function TemoignagesPage() {
  useDomEffects(
    [
      () => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d),
    ],
    true,
  );
  return (
    <>
    <section className="phead phead--photo phead--temo">
      <div className="shell">
        <h1>
          Résultats réels,
          <br />
          impact{' '}
          <em>réel</em>
        </h1>
        <p>
          Six organisations, six contextes différents, une même exigence : que ça fonctionne en production.
        </p>
        {' '}
        <a href="#deposer" className="btn btn--red btn--lg">
          Laisser un témoignage{' '}
          <i className="arw"></i>
        </a>
      </div>
    </section>
    <section className="sec" id="voix" data-scene="cubes" data-scene-tone="light">
      <div className="shell">
        <div className="temo-hd reveal">
          <div>
            <h2>
              Ce qu’ils disent
              <br />
              de notre{' '}
              <em>travail</em>
            </h2>
          </div>
        </div>
      </div>
      <TestimonialsRail />
    </section>
    <section className="sec sec--soft" id="deposer">
      <div className="shell">
        <TestimonialForm />
      </div>
    </section>
    <section className="sec">
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
    <section className="vpanel vpanel--top">
      <div className="shell shell--wide">
        <div className="vpanel__wrap reveal">
          <video id="secVideo" data-auto="" aria-hidden="true" src="/assets/video/corridor-mouvement.mp4" poster="/assets/video/corridor-mouvement.webp" muted loop playsInline preload="metadata"></video>
          <div className="vpanel__ov">
            <h2>Le prochain témoignage sera peut-être le vôtre</h2>
            <p>Parlons de votre projet : cadrage gratuit, devis chiffré, aucune obligation.</p>
            {' '}
            <Link viewTransition to="/contact" className="btn btn--white">
              Prendre rendez-vous{' '}
              <i className="arw"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <CtaContact />
    </>
  );
}
