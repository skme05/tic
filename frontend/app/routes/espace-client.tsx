import type { Route } from './+types/espace-client';
import { seo } from '~/lib/seo';
import { ClientPortal } from '~/features/client-portal/ClientPortal';
import css from '~/styles/client.css?url';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: css }];

export const meta: Route.MetaFunction = () => seo({ title: "Espace client", path: "/espace-client", description: "Suivez l'avancement de vos projets confiés à TIC — The Infinite Corridor Software Solutions : jalons, livrables et échanges avec votre équipe projet.", noindex: true });

export const handle = { footerCover: false };

export default function ClientPortalPage() {
  return <ClientPortal />;
}
