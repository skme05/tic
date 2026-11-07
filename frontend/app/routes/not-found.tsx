import { Link } from 'react-router';
import type { Route } from './+types/not-found';
import { seo } from '~/lib/seo';
import css from '~/styles/site.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Page introuvable", path: "/404", description: "Cette porte n'existe pas (ou plus). Retrouvez votre chemin dans le corridor.", noindex: true });

export const handle = { footerCover: false };

export default function NotFoundPage() {
  return (
    <>
    <section className="phead">
      <div className="shell">
        <h1>
          Cette porte{' '}
          <em>n'existe pas</em>
        </h1>
        <p>
          La page demandée a été déplacée ou n'a jamais existé. Reprenons depuis l'entrée du corridor.
        </p>
        <p className="legal__actions">
          <Link to="/" className="btn btn--red btn--lg">
            Retour à l'accueil{' '}
            <i className="arw"></i>
          </Link>
          {' '}
          <Link to="/contact" className="btn btn--ghost btn--lg">Nous contacter</Link>
        </p>
      </div>
    </section>
    </>
  );
}
