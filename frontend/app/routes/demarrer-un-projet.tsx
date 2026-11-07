import type { Route } from './+types/demarrer-un-projet';
import { seo } from '~/lib/seo';
import { ProjectWizard } from '~/features/project-wizard/ProjectWizard';
import css from '~/styles/wizard.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Démarrer un projet", path: "/demarrer-un-projet", description: "Décrivez votre projet en quelques étapes guidées : TIC — The Infinite Corridor Software Solutions revient vers vous avec une proposition adaptée." });

export const handle = { footerCover: false };

export default function ProjectBriefPage() {
  return (
    <>
    <section className="phead phead--photo phead--projet">
      <div className="shell">
        <h1>
          Racontez-nous
          <br />
          <em>votre projet</em>
        </h1>
        <p>
          Cinq étapes rapides pour bien cerner votre besoin — environ 3 minutes. Vous pourrez toujours revenir en arrière.
        </p>
      </div>
    </section>
    <ProjectWizard />
    </>
  );
}
