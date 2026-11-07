/* Menus de l'en-tête et du pied de page. */

export interface MenuLink {
  title: string;
  text: string;
  to: string;
}

export interface NavItem {
  label: string;
  to: string;
  /** sous-menu simple */
  menu?: MenuLink[];
  /** méga-menu en colonnes (slugs de solutions) */
  columns?: { title: string; items: string[] }[];
}

export const mainNav: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/about' },
  {
    label: 'Expertise',
    to: '/expertise',
    menu: [
      { title: 'Pôle Digital & IA', text: 'Web, mobile, data et intelligence artificielle', to: '/expertise#digital-ia' },
      { title: 'Solutions Métiers & Conseil', text: 'ERP, processus et accompagnement', to: '/expertise#solutions-metiers' },
      { title: 'Capital Humain', text: 'Paie, RH et gestion des talents', to: '/expertise#capital-humain' },
    ],
  },
  {
    label: 'Solutions',
    to: '/solutions',
    columns: [
      { title: 'Gestion', items: ['odoo', 'paie', 'fne', 'hr'] },
      { title: 'Métiers', items: ['school-manager', 'e-clinique', 'e-garage'] },
      { title: 'Data & savoir', items: ['e-connaissance', 'e-emploi', 'scraper-pro'] },
    ],
  },
  {
    label: 'Innovation',
    to: '/innovation',
    menu: [
      { title: 'Recherche & Développement', text: 'Veille et recherche appliquée', to: '/innovation#rd' },
      { title: 'Prototypage & Fablab', text: 'Du concept au prototype fonctionnel', to: '/innovation#fablab' },
    ],
  },
  { label: 'Témoignages', to: '/temoignages' },
];

export const exploreNav = [
  { label: 'À propos', to: '/about' },
  { label: 'Nos expertises', to: '/expertise' },
  { label: 'Nos solutions', to: '/solutions' },
  { label: 'Innovation & Lab', to: '/innovation' },
  { label: 'Témoignages', to: '/temoignages' },
  { label: 'Contact', to: '/contact' },
];

export const legalNav = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/confidentialite' },
];
