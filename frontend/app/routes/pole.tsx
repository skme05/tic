import type { CSSProperties } from 'react';
import { Link, data } from 'react-router';
import type { Route } from './+types/pole';
import { seo } from '~/lib/seo';
import { getPole, poles } from '~/content/poles';
import { services } from '~/content/services';
import { solutions } from '~/content/solutions';
import { PageHero } from '~/components/sections/PageHero';
import { MethodTimeline } from '~/components/sections/MethodTimeline';
import { RelatedCards } from '~/components/sections/RelatedCards';
import { CtaContact } from '~/components/sections/CtaContact';
import { Arrow } from '~/components/ui/Arrow';
import css from '~/styles/site.css?url';

/* Gabarit des 3 pages « pôle » (/expertise/<slug>). Contenu : app/content/poles.ts.
   Styles : styles/pages/pole.css (préfixe .pl). */

export function loader({ params }: Route.LoaderArgs) {
  const pole = getPole(params.slug);
  if (!pole) throw data('Pôle introuvable', { status: 404 });
  return { pole };
}

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = ({ data: d }) =>
  d ? seo({ title: d.pole.name, description: d.pole.lead, path: `/expertise/${d.pole.slug}` }) : [];

export default function PolePage({ loaderData }: Route.ComponentProps) {
  const { pole } = loaderData;
  const svc = pole.services.map((s) => services.find((x) => x.slug === s)).filter((x) => x !== undefined);
  const sol = pole.solutions.map((s) => solutions.find((x) => x.slug === s)).filter((x) => x !== undefined);
  const others = poles
    .filter((p) => p.slug !== pole.slug)
    .map((p) => ({ to: `/expertise/${p.slug}`, tag: p.number, name: p.name, text: p.lead }));

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Expertise', to: '/expertise' }, { label: pole.short }]}
        eyebrow={pole.number}
        color={pole.color}
        title={pole.name}
        lead={pole.lead}
        image={pole.image}
        badge={{ k: pole.number, v: `${svc.length + sol.length} pages dédiées` }}
      >
        <Link viewTransition to="/contact" className="btn btn--red btn--lg">
          Parler à un expert <Arrow />
        </Link>
      </PageHero>

      <section className="pl" style={{ '--c': pole.color } as CSSProperties}>
        <div className="shell">
          <div className="pl__hd reveal">
            <p className="pl__k">Ce que couvre le pôle</p>
            <h2>
              Nos terrains, <em>une équipe</em>
            </h2>
            <p>{pole.intro}</p>
          </div>
          <ul className="pl__offers">
            {pole.offers.map((o, i) => (
              <li key={o.label} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                {o.to ? (
                  <Link viewTransition to={o.to}>
                    <span className="pl__n">{String(i + 1).padStart(2, '0')}</span>
                    <b>{o.label}</b>
                    <span className="pl__t">{o.text}</span>
                    <span className="pl__go">Voir la page →</span>
                  </Link>
                ) : (
                  <div>
                    <span className="pl__n">{String(i + 1).padStart(2, '0')}</span>
                    <b>{o.label}</b>
                    <span className="pl__t">{o.text}</span>
                    <span className="pl__go pl__go--soon">Sur demande</span>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="pl__why reveal">
            {pole.benefits.map((b) => (
              <div key={b.title}>
                <b>{b.title}</b>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          {(svc.length > 0 || sol.length > 0) && (
            <div className="pl__pages">
              {svc.length > 0 && (
                <div className="reveal">
                  <p className="pl__k">Expertises du pôle</p>
                  <div className="pl__list">
                    {svc.map((s) => (
                      <Link viewTransition key={s.slug} to={`/services/${s.slug}`} style={{ '--c2': s.color } as CSSProperties}>
                        <i></i>
                        <span>
                          <small>{s.number}</small>
                          {s.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {sol.length > 0 && (
                <div className="reveal">
                  <p className="pl__k">Solutions du pôle</p>
                  <div className="pl__list">
                    {sol.map((s) => (
                      <Link viewTransition key={s.slug} to={`/solutions/${s.slug}`} style={{ '--c2': s.color } as CSSProperties}>
                        <i></i>
                        <span>
                          <small>{s.tag}</small>
                          {s.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <MethodTimeline />

      <section className="sec">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <span className="tag">Continuer l'exploration</span>{' '}
            <h2>
              Les autres <em>pôles</em>
            </h2>
            <p>Nos trois pôles travaillent ensemble sur la plupart des projets.</p>
          </div>
          <RelatedCards items={others} />
        </div>
      </section>

      <CtaContact />
    </>
  );
}
