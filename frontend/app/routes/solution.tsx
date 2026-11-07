import { useEffect, useState } from 'react';
import { Link, data } from 'react-router';
import type { Route } from './+types/solution';
import { seo } from '~/lib/seo';
import { imgSize } from '~/lib/media';
import { getSolution, solutions } from '~/content/solutions';
import { CtaContact } from '~/components/sections/CtaContact';
import { RelatedCards } from '~/components/sections/RelatedCards';
import { Arrow } from '~/components/ui/Arrow';
import { Rich } from '~/components/ui/Rich';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import css from '~/styles/site.css?url';

/* Gabarit des 10 pages solution. Le contenu de chaque page est dans
   app/content/solutions/<slug>.ts. */

export function loader({ params }: Route.LoaderArgs) {
  const solution = getSolution(params.slug);
  if (!solution) throw data('Solution introuvable', { status: 404 });
  return { solution };
}

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = ({ data: d }) =>
  d ? seo({ title: d.solution.name, description: d.solution.description, path: `/solutions/${d.solution.slug}` }) : [];

const SECTIONS = [
  { id: 'apercu', label: 'Aperçu' },
  { id: 'couverture', label: 'Couverture' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'cas', label: "Cas d'usage" },
  { id: 'faq', label: 'Questions' },
  { id: 'autres', label: 'Autres solutions' },
];

/** lien du sommaire allumé selon la section visible */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const pad = (n: number) => String(n + 1).padStart(2, '0');
const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function SolutionPage({ loaderData }: Route.ComponentProps) {
  const { solution: s } = loaderData;
  useDomEffects([() => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d)], true);

  const [feature, setFeature] = useState<number | null>(0);
  const [step, setStep] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const active = useActiveSection(SECTION_IDS);

  /* changement de solution sans démontage du gabarit : on réinitialise */
  useEffect(() => {
    setFeature(0);
    setStep(0);
    setFaq(0);
  }, [s.slug]);

  const related = s.related
    .map((slug) => solutions.find((x) => x.slug === slug))
    .filter((x) => x !== undefined)
    .map((x) => ({ to: `/solutions/${x.slug}`, tag: x.tag, name: x.name, text: x.lead }));

  return (
    <>
      <section
        className="dhead dhead--sol"
        style={{ '--c': s.color, '--bg': `url('${s.heroImage}')` }}
      >
        <span className="dhead__photo" aria-hidden="true"></span>{' '}
        <div className="shell">
          <div className="dhead__copy">
            <span className="dhead__n">{s.tag}</span> <h1>{s.name}</h1>
            <p>{s.lead}</p>{' '}
            <Link to="/contact" className="btn btn--red btn--lg">
              Demander un devis <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <nav className="solnav" aria-label="Sections de la solution">
        <div className="shell solnav__in">
          {SECTIONS.map((sec) => (
            <a key={sec.id} href={`#${sec.id}`} className={active === sec.id ? 'is-on' : undefined}>
              {sec.label}
            </a>
          ))}{' '}
          <Link to="/contact" className="solnav__cta">
            Devis
          </Link>
        </div>
      </nav>

      <section className="sec" id="apercu" data-scene="sphere" data-scene-tone="light">
        <div className="shell split">
          <div className="split__txt reveal">
            <h2>
              <Rich text={s.overview.title} />
            </h2>
            <ul className="ticks">
              {s.overview.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>{' '}
            <Link to="/demarrer-un-projet" className="btn btn--red btn--lg">
              Démarrer un projet <Arrow />
            </Link>
          </div>
          <div className="split__img reveal">
            <img loading="lazy" decoding="async" src={s.overview.image} {...imgSize(s.overview.image)} alt={s.overview.imageAlt} />
          </div>
        </div>
      </section>

      <section className="sec sec--soft" id="couverture" data-scene="neural" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <h2>
              <Rich text={s.coverage.title} />
            </h2>
            <p>{s.coverage.intro}</p>
          </div>
          <div className="solfeat">
            {s.coverage.features.map((f, i) => (
              <button
                key={f.title}
                type="button"
                className={'solfeat__c reveal' + (feature === i ? ' is-on' : '')}
                aria-expanded={feature === i}
                onClick={() => setFeature(feature === i ? null : i)}
              >
                <i>{pad(i)}</i>
                <span className="sol__tx">
                  <strong className="sol__h">{f.title}</strong>
                  <span className="sol__p">{f.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--soft" id="parcours" data-scene="helix" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <h2>
              Comment se <em>passe</em> un projet
            </h2>
            <p>Cliquez chaque étape pour voir ce que nous livrons concrètement.</p>
          </div>
          <div className="solsteps">
            {s.process.steps.map((st, i) => (
              <button
                key={st.title}
                type="button"
                className={'solstep' + (step === i ? ' is-on' : '')}
                aria-expanded={step === i}
                onClick={() => setStep(i)}
              >
                <i>{pad(i)}</i>
                <span className="sol__tx">
                  <strong className="sol__h">{st.title}</strong>
                  <span className="sol__p">{st.text}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="solstats">
            {s.process.stats.map((st) => (
              <div className="solstat reveal" key={st.label}>
                <b>{st.value}</b>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="cas" data-scene="cubes" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <h2>
              Pour qui, <em>concrètement</em> ?
            </h2>
            <p>Des cas d'usage typiques que nous déployons en Côte d'Ivoire et en sous-région.</p>
          </div>
          <div className="solcases">
            {s.useCases.cases.map((c) => (
              <article className="solcase reveal" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
          <div className="solcta reveal">
            <div>
              <h3>Envie de voir une démo adaptée à votre métier ?</h3>
              <p>Nous préparons un scénario sur vos processus réels, pas une démo générique.</p>
            </div>{' '}
            <Link to="/demarrer-un-projet" className="btn btn--red btn--lg">
              Lancer un projet <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec sec--soft" id="faq" data-scene="torus" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <h2>
              Questions <em>fréquentes</em>
            </h2>
            <p>Les réponses les plus demandées avant de démarrer.</p>
          </div>
          <div className="solfaq">
            {s.faq.map((f, i) => (
              <details
                className="solfaq__i reveal"
                key={f.q}
                open={faq === i}
                onToggle={(e) => {
                  const open = (e.currentTarget as HTMLDetailsElement).open;
                  if (open) setFaq(i);
                  else if (faq === i) setFaq(null);
                }}
              >
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="autres" data-scene="cubes" data-scene-tone="light">
        <div className="shell">
          <div className="sec__hd sec__hd--c reveal">
            <h2>
              Autres <em>solutions</em>
            </h2>
            <p>Chaque plateforme peut s'articuler avec les autres selon votre métier.</p>
          </div>
          <RelatedCards items={related} />
        </div>
      </section>

      <CtaContact />
    </>
  );
}
