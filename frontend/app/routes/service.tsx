import { Link, data } from 'react-router';
import type { Route } from './+types/service';
import { seo } from '~/lib/seo';
import { imgSize } from '~/lib/media';
import { getService, services } from '~/content/services';
import { CtaContact } from '~/components/sections/CtaContact';
import { MethodSteps } from '~/components/sections/MethodSteps';
import { RelatedCards } from '~/components/sections/RelatedCards';
import { Arrow } from '~/components/ui/Arrow';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/site.css?url';

/* Gabarit des 6 pages « porte » (expertises). Le contenu de chaque page est
   dans app/content/services/<slug>.ts. */

export function loader({ params }: Route.LoaderArgs) {
  const service = getService(params.slug);
  if (!service) throw data('Porte introuvable', { status: 404 });
  return { service };
}

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = ({ data: d }) =>
  d ? seo({ title: d.service.name, description: d.service.description, path: `/services/${d.service.slug}` }) : [];

export default function ServicePage({ loaderData }: Route.ComponentProps) {
  const { service } = loaderData;
  useDomEffects([() => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d)], true);

  const related = service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined)
    .map((s) => ({ to: `/services/${s.slug}`, tag: s.number, name: s.name, text: s.lead }));

  return (
    <>
      <section className="dhead" style={{ '--c': service.color }}>
        <div className="shell">
          <span className="dhead__n">{service.number}</span> <h1>{service.name}</h1>
          <p>{service.lead}</p>{' '}
          <Link to="/contact" className="btn btn--red btn--lg">
            Discutons-en <Arrow />
          </Link>
        </div>
      </section>

      <section className="sec" data-scene="sphere" data-scene-tone="light">
        <div className="shell split">
          <div className="split__txt reveal">
            <h2>
              Une expertise
              <br />
              <em>bout en bout</em>
            </h2>
            <ul className="ticks">
              {service.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>{' '}
            <Link to="/contact" className="btn btn--red btn--lg">
              Demander un devis <Arrow />
            </Link>
          </div>
          <div className="split__img reveal">
            <img loading="lazy" decoding="async" src={service.image} {...imgSize(service.image)} alt={service.imageAlt} />
          </div>
        </div>
      </section>

      <section className="sec sec--soft" data-scene="neural" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <h2>
              Notre <em>méthode</em>
            </h2>
            <p>Un cadrage clair, des livraisons visibles, une mise en production maîtrisée.</p>
          </div>
          <MethodSteps />
        </div>
      </section>

      <section className="sec" data-scene="cubes" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <span className="tag">Continuer l'exploration</span>{' '}
            <h2>
              Les autres <em>portes</em>
            </h2>
            <p>Chaque expertise se combine avec les autres. Voici les plus proches de celle-ci.</p>
          </div>
          <RelatedCards items={related} />
        </div>
      </section>

      <CtaContact />
    </>
  );
}
