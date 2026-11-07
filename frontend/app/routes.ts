import { type RouteConfig, index, route } from '@react-router/dev/routes';

/* Une page = un fichier dans app/routes/.
   Les pages services et solutions partagent un gabarit, alimenté par
   app/content/services/*.ts et app/content/solutions/*.ts. */
export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('expertise', 'routes/expertise.tsx'),
  route('innovation', 'routes/innovation.tsx'),
  route('solutions', 'routes/solutions.tsx'),
  route('solutions/:slug', 'routes/solution.tsx'),
  route('services/:slug', 'routes/service.tsx'),
  route('temoignages', 'routes/temoignages.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('demarrer-un-projet', 'routes/demarrer-un-projet.tsx'),
  route('espace-client', 'routes/espace-client.tsx'),
  route('mentions-legales', 'routes/mentions-legales.tsx'),
  route('confidentialite', 'routes/confidentialite.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
