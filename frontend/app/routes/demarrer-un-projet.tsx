import type { Route } from './+types/demarrer-un-projet';
import { seo } from '~/lib/seo';
import { PageHero } from '~/components/sections/PageHero';
import { ProjectWizard } from '~/features/project-wizard/ProjectWizard';
import css from '~/styles/wizard.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Démarrer un projet", path: "/demarrer-un-projet", description: "Décrivez votre projet en quelques étapes guidées : TIC — The Infinite Corridor Software Solutions revient vers vous avec une proposition adaptée." });

export default function ProjectBriefPage() {
  return (
    <>
    <PageHero
      crumbs={[{ label: 'Accueil', to: '/' }, { label: 'Démarrer un projet' }]}
      eyebrow="Brief projet"
      color="#E2452B"
      title={<>Racontez-nous <em>votre projet</em></>}
      lead="Cinq étapes rapides pour bien cerner votre besoin — environ 3 minutes. Vous pourrez toujours revenir en arrière."
      image="/assets/img/equipe-reunion.webp"
      badge={{ k: 'Durée', v: '≈ 3 minutes · 5 étapes' }}
      compact
    />
    <ProjectWizard />
    </>
  );
}
