/* Données FICTIVES de l'espace client en mode démonstration (pas de backend). */
import type { ClientProfile, ClientProject } from './types';

export const DEMO_CLIENT: ClientProfile = {
  firstName: 'Aïcha',
  fullName: 'Aïcha Koffi',
  org: 'Koffi & Associés',
  initials: 'AK',
};

export const DEMO_PROJECTS: ClientProject[] = [
  {
    id: 'refonte-site',
    title: 'Refonte du site institutionnel',
    type: 'Web Design & Développement',
    icon: 'web',
    status: 'run',
    statusLabel: 'En cours',
    progress: 62,
    startedOn: '3 juin 2026',
    dueOn: '30 sept. 2026',
    lead: 'Grégoire A. — Chef de projet',
    summary:
      'Refonte complète du site vitrine : nouvelle arborescence, identité visuelle rafraîchie et formulaires connectés au CRM.',
    milestones: [
      { label: 'Brief validé', date: '3 juin', state: 'done' },
      { label: 'Design UI/UX', date: '28 juin', state: 'done' },
      { label: 'Développement', date: 'En cours', state: 'now' },
      { label: 'Tests & recette', date: 'Sept. 2026', state: 'todo' },
      { label: 'Mise en ligne', date: 'Sept. 2026', state: 'todo' },
    ],
    activity: [
      { title: 'Intégration de la page Solutions terminée', text: 'Livrée en pré-production, en attente de votre retour.', date: '26 août 2026' },
      { title: "Point d'avancement hebdomadaire", text: 'Intégration à 70 %, aucun blocage identifié.', date: '21 août 2026' },
      { title: 'Maquettes desktop validées', text: 'Validation Figma sans réserve.', date: '2 juillet 2026' },
    ],
    documents: [
      { name: 'Cahier des charges.pdf', size: '412 Ko' },
      { name: 'Maquettes UI — v3.fig', size: '8,1 Mo' },
      { name: 'Charte graphique.pdf', size: '2,3 Mo' },
    ],
  },
  {
    id: 'app-livraisons',
    title: 'Application mobile de gestion des livraisons',
    type: "Développement d'applications",
    icon: 'app',
    status: 'review',
    statusLabel: 'En revue',
    progress: 30,
    startedOn: '14 juillet 2026',
    dueOn: 'Déc. 2026',
    lead: 'Fatou D. — Cheffe de projet',
    summary: 'Application mobile pour vos livreurs : tournées en temps réel, preuve de livraison et tableau de supervision.',
    milestones: [
      { label: 'Cadrage', date: '14 juillet', state: 'done' },
      { label: 'Prototype', date: 'En revue', state: 'now' },
      { label: 'Développement', date: 'Oct. 2026', state: 'todo' },
      { label: 'Tests', date: 'Nov. 2026', state: 'todo' },
      { label: 'Déploiement', date: 'Déc. 2026', state: 'todo' },
    ],
    activity: [
      { title: 'Prototype cliquable partagé', text: 'Parcours livreur à valider sur Figma.', date: '25 août 2026' },
      { title: 'Atelier de cadrage fonctionnel', text: 'Besoins terrain précisés avec la logistique.', date: '18 juillet 2026' },
    ],
    documents: [
      { name: 'Spécifications fonctionnelles.pdf', size: '650 Ko' },
      { name: 'Prototype — lien Figma.pdf', size: '89 Ko' },
    ],
  },
];
