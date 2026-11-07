import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/not-found';
import { seo } from '~/lib/seo';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Page introuvable", path: "/404", description: "Cette porte n'existe pas (ou plus). Retrouvez votre chemin dans le corridor.", noindex: true });

/* Raccourcis proposés : les portes les plus empruntées */
const SHORTCUTS = [
  { to: '/expertise', label: 'Nos expertises', c: '#1D5FAE' },
  { to: '/solutions', label: 'Nos solutions', c: '#1E8F5E' },
  { to: '/innovation', label: 'Le Corridor Lab', c: '#B88A00' },
  { to: '/demarrer-un-projet', label: 'Démarrer un projet', c: '#D9531E' },
  { to: '/temoignages', label: 'Témoignages', c: '#E2452B' },
];

/* Page 404 « couloir sans issue » — styles : styles/pages/not-found.css (.nf) */
export default function NotFoundPage() {
  return (
    <section className="nf" aria-labelledby="nf-title">
      <span className="nf__floor" aria-hidden="true"></span>
      <span className="nf__glow" aria-hidden="true"></span>

      <div className="nf__in">
        {/* « 404 » : le zéro est une porte entrouverte */}
        <div className="nf__code" aria-hidden="true">
          <span className="nf__digit">4</span>
          <span className="nf__door">
            <span className="nf__room"></span>
            <span className="nf__leaf">
              <i></i>
            </span>
            <span className="nf__frame"></span>
            <span className="nf__spill"></span>
          </span>
          <span className="nf__digit">4</span>
        </div>

        <p className="nf__k">Erreur 404</p>
        <h1 id="nf-title">
          Cette porte <em>n'existe pas</em>
        </h1>
        <p className="nf__lead">La page demandée a été déplacée ou n'a jamais existé. Pas d'inquiétude : le corridor a d'autres portes.</p>

        <div className="nf__actions">
          <Link viewTransition to="/" className="btn btn--red btn--lg">
            Retour à l'accueil <i className="arw"></i>
          </Link>
          <Link viewTransition to="/contact" className="nf__ghost">
            Nous contacter
          </Link>
        </div>

        <nav className="nf__links" aria-label="Pages les plus visitées">
          <p>Les portes les plus empruntées</p>
          <ul>
            {SHORTCUTS.map((s) => (
              <li key={s.to}>
                <Link viewTransition to={s.to} style={{ '--c': s.c } as CSSProperties}>
                  <i></i>
                  {s.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
