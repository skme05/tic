/* Les 3 pôles d'expertise : chacun a sa page /expertise/<slug>.
   services / solutions : slugs des pages dédiées rattachées au pôle. */
import type { TitledText } from './types';

export interface Pole {
  slug: string;
  number: string;
  name: string;
  short: string;
  color: string;
  image: string;
  lead: string;
  intro: string;
  /** ce que couvre le pôle (avec lien quand une page dédiée existe) */
  offers: { label: string; text: string; to?: string }[];
  services: string[];
  solutions: string[];
  benefits: TitledText[];
}

export const poles: Pole[] = [
  {
    slug: 'digital-ia',
    number: 'Pôle 01',
    name: 'Digital & Intelligence Artificielle',
    short: 'Digital & IA',
    color: '#1D5FAE',
    image: '/assets/img/equipe-presentation.webp',
    lead: 'Tout ce qui se voit et tout ce qui calcule : sites et applications, plateformes de données, modèles d’IA branchés sur vos processus réels.',
    intro:
      'Nous concevons, développons et hébergeons les outils numériques de votre organisation, du site vitrine à l’assistant IA métier, avec une même équipe du cadrage à la mise en production.',
    offers: [
      { label: 'Sites & plateformes web', text: 'Vitrines, portails et plateformes sur mesure.', to: '/services/web-design' },
      { label: 'UI / UX Design', text: 'Parcours, maquettes et design system.', to: '/services/ui-ux-design' },
      { label: 'Applications mobiles & métiers', text: 'Web, iOS et Android à partir d’une base commune.', to: '/services/developpement-applications' },
      { label: 'Migration de plateformes', text: 'Refonte sans perte de référencement.', to: '/services/migration-site-web' },
      { label: 'Data & tableaux de bord', text: 'Collecte, nettoyage et visualisation de vos données.', to: '/solutions/scraper-pro' },
      { label: 'IA générative & assistants', text: 'Assistants métiers, automatisation documentaire.' },
    ],
    services: ['web-design', 'ui-ux-design', 'developpement-applications', 'migration-site-web'],
    solutions: ['scraper-pro'],
    benefits: [
      { title: 'Une équipe de bout en bout', text: 'Design, développement, hébergement et maintenance par les mêmes personnes.' },
      { title: 'Rapide et accessible', text: 'Performances mesurées et accessibilité intégrée dès la conception.' },
      { title: 'IA utile', text: 'Des modèles branchés sur vos vrais processus, pas des démonstrations.' },
    ],
  },
  {
    slug: 'solutions-metiers',
    number: 'Pôle 02',
    name: 'Solutions Métiers & Conseil',
    short: 'Solutions métiers',
    color: '#1E8F5E',
    image: '/assets/img/equipe-reunion.webp',
    lead: 'Nous outillons vos opérations : ERP Odoo, facturation normalisée, plateformes sectorielles et l’accompagnement organisationnel qui va avec.',
    intro:
      'Nos plateformes métiers tournent déjà en production chez des clients ivoiriens. Nous les adaptons à votre organisation et formons vos équipes pour qu’elles soient adoptées.',
    offers: [
      { label: 'Intégration Odoo', text: 'Ventes, stocks, comptabilité, achats.', to: '/solutions/odoo' },
      { label: 'Facture normalisée (FNE)', text: 'Conformité fiscale automatisée.', to: '/solutions/fne' },
      { label: 'School Manager', text: 'Gestion scolaire de l’inscription au bulletin.', to: '/solutions/school-manager' },
      { label: 'E-clinique', text: 'Dossier patient, rendez-vous, facturation.', to: '/solutions/e-clinique' },
      { label: 'E-garage', text: 'Ateliers, pièces et suivi des véhicules.', to: '/solutions/e-garage' },
      { label: 'CRM HubSpot & marketing', text: 'Vente, marketing et support unifiés.', to: '/services/integration-hubspot' },
    ],
    services: ['integration-hubspot', 'email-marketing'],
    solutions: ['odoo', 'fne', 'school-manager', 'e-clinique', 'e-garage'],
    benefits: [
      { title: 'Déjà en production', text: 'Des plateformes éprouvées, pas des maquettes.' },
      { title: 'Adaptées à vos règles', text: 'Paramétrage selon vos processus et la réglementation ivoirienne.' },
      { title: 'Adoptées par vos équipes', text: 'Formation sur site et support au quotidien.' },
    ],
  },
  {
    slug: 'capital-humain',
    number: 'Pôle 03',
    name: 'Capital Humain',
    short: 'Capital humain',
    color: '#D9531E',
    image: '/assets/img/consultante.webp',
    lead: 'La paie et les ressources humaines sont les processus les moins pardonnables. Nous les traitons avec des outils conformes et un accompagnement au quotidien.',
    intro:
      'Paie, déclarations sociales, recrutement et formation : nos outils couvrent tout le cycle de vie du collaborateur, avec un support qui répond en moins d’une heure.',
    offers: [
      { label: 'Logiciel de paie', text: 'Bulletins et déclarations en une matinée.', to: '/solutions/paie' },
      { label: 'Gestion des talents', text: 'Dossiers, congés, évaluations.', to: '/solutions/hr' },
      { label: 'E-emploi', text: 'Recrutement et candidatures en ligne.', to: '/solutions/e-emploi' },
      { label: 'E-Connaissance', text: 'Formation et partage des savoirs.', to: '/solutions/e-connaissance' },
      { label: 'Déclarations sociales', text: 'CNPS et obligations fiscales à jour.' },
      { label: 'Support RH', text: 'Une équipe qui répond en moins d’une heure.' },
    ],
    services: [],
    solutions: ['paie', 'hr', 'e-emploi', 'e-connaissance'],
    benefits: [
      { title: 'Conformité', text: 'Barèmes et déclarations tenus à jour avec la réglementation.' },
      { title: 'Gain de temps', text: 'La paie de centaines de salariés bouclée en une matinée.' },
      { title: 'Proximité', text: 'Un interlocuteur dédié à Abidjan.' },
    ],
  },
];

export const getPole = (slug: string | undefined) => poles.find((p) => p.slug === slug);
