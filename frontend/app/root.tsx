import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useMatches, useNavigate } from 'react-router';
import type { Route } from './+types/root';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { site } from '~/content/site';
import { useDomEffects } from '~/lib/hooks/useDomEffects';
import { reveal } from '~/features/reveal/reveal-effect';
import { videos } from '~/features/videos/videos-effect';
import { rails } from '~/features/rails/rails-effect';
import { doors } from '~/features/doors/doors-effect';
import { walkthrough } from '~/features/walkthrough/walkthrough-effect';
import siteCss from '~/styles/site.css?url';
import { LOADER_KEY, SiteLoader } from '~/features/loader/SiteLoader';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap',
  },
];

/* Transition « franchir la porte » lors d'un rechargement complet : un voile
   est posé AVANT tout rendu pour qu'aucun blanc n'apparaisse. */
const WALK_PRE = `(function(){try{var c=sessionStorage.getItem("tic_walk_c");if(!c){return;}var o=document.createElement("div");o.id="walkPre";o.style.cssText="position:fixed;inset:0;z-index:999999;background:"+c;document.body.appendChild(o);setTimeout(function(){var e=document.getElementById("walkPre");if(e){e.remove();}},2500);}catch(e){}})();`;

/** Données de mise en page qu'une route peut déclarer via `handle`. */
export interface PageHandle {
  /** true : en-tête sur fond plein dès le haut de page (hero sombre) */
  headerSolid?: boolean;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f1115" />
        {/* loader déjà vu pendant la visite : masqué avant tout rendu */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem('${LOADER_KEY}')==='1')document.documentElement.classList.add('tic-seen')}catch(e){}` }} />
        <Meta />
        <Links />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: WALK_PRE }} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigate = useNavigate();
  const matches = useMatches();
  const handle = (matches[matches.length - 1]?.handle ?? {}) as PageHandle;

  /* effets communs à toutes les pages */
  useDomEffects([reveal, videos, rails, doors, (scope) => walkthrough(scope, (href: string) => navigate(href))]);

  return (
    <>
      <SiteLoader />
      <a className="skip" href="#top">
        Aller au contenu
      </a>
      <Header forceSolid={handle.headerSolid === true} />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  /* la page en erreur n'a pas chargé sa feuille de style : on charge le socle */
  let title = 'Une erreur est survenue';
  let details = 'Merci de réessayer dans un instant.';
  if (isRouteErrorResponse(error) && error.status === 404) {
    title = "Cette porte n'existe pas";
    details = "La page demandée a été déplacée ou n'a jamais existé.";
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }
  return (
    <main id="top">
      <link rel="stylesheet" href={siteCss} precedence="default" />
      <section className="phead">
        <div className="shell">
          <h1>{title}</h1>
          <p>{details}</p>
          <p className="legal__actions">
            <a className="btn btn--red btn--lg" href="/">
              Retour à l'accueil <i className="arw"></i>
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
