import type { Route } from './+types/temoignages';
import { seo } from '~/lib/seo';
import { WhyTic } from '~/components/sections/WhyTic';
import { CorridorMotion } from '~/components/sections/CorridorMotion';
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
    <WhyTic
      eyebrow="Nos résultats"
      title={
        <>
          Ce que produit notre <span className="txt-spectrum">exigence</span>
        </>
      }
    />
    <CorridorMotion
      eyebrow="À votre tour"
      title="Le prochain témoignage sera peut-être le vôtre"
      lead="Parlons de votre projet : cadrage gratuit, devis chiffré, aucune obligation."
      cta={{ label: 'Prendre rendez-vous', to: '/contact' }}
    />
    <CtaContact />
    </>
  );
}
