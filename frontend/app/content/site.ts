/* Informations générales : modifiez-les ici, elles se propagent partout
   (en-tête, pied de page, bloc contact, balises SEO, données structurées). */
export const site = {
  name: 'TIC — The Infinite Corridor Software Solutions',
  shortName: 'TIC',
  legalName: 'The Infinite Corridor Software Solutions',
  /** domaine de production, sans « / » final */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://tic-infinit.netlify.app',
  lang: 'fr',
  locale: 'fr_CI',
  description:
    "The Infinite Corridor Software Solutions accompagne entreprises et institutions dans leur transformation numérique : développement web et mobile, IA, plateformes métiers. Basés à Abidjan, Côte d'Ivoire.",
  tagline: "l'ingénierie logicielle au service des entreprises et institutions africaines. Basés à Abidjan, Côte d'Ivoire.",
  contact: {
    /** À VÉRIFIER : ce numéro ressemble à un numéro provisoire */
    phone: '+225 07 08 09 10 11',
    phoneHref: '+2250708091011',
    email: 'contact@tic-solutions.com',
    city: 'Abidjan',
    district: 'Cocody',
    country: "Côte d'Ivoire",
    countryCode: 'CI',
    responseTime: '24 heures ouvrées',
  },
  /** Réseaux sociaux : laisser vide pour masquer l'icône (le site d'origine
   *  pointait vers les pages d'accueil génériques de LinkedIn, Facebook, X). */
  social: {
    linkedin: '',
    facebook: '',
    x: '',
  },
  ogImage: '/assets/img/equipe-open-space.webp',
} as const;

/** numéros de téléphone : espaces insécables (pas de coupure de ligne) */
export const nbsp = (s: string) => s.replace(/ /g, ' ');
