import type { Config } from '@react-router/dev/config';
import { services } from './app/content/services';
import { solutions } from './app/content/solutions';
import { poles } from './app/content/poles';

/* Site vitrine : chaque page est PRÉ-RENDUE en HTML au moment du build
   (SEO, affichage immédiat, hébergement statique sur Netlify), puis React
   prend le relais dans le navigateur. Le backend Django ne sert que l'API. */
export default {
  ssr: false,
  async prerender() {
    return [
      '/',
      '/about',
      '/expertise',
      '/innovation',
      '/solutions',
      '/temoignages',
      '/contact',
      '/demarrer-un-projet',
      '/espace-client',
      '/mentions-legales',
      '/confidentialite',
      '/404',
      ...poles.map((p) => `/expertise/${p.slug}`),
      ...services.map((s) => `/services/${s.slug}`),
      ...solutions.map((s) => `/solutions/${s.slug}`),
    ];
  },
} satisfies Config;
