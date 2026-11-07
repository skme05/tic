import type { Solution } from '../types';

export const solution: Solution = {
  "slug": "hr",
  "order": 4,
  "menuLabel": "HR",
  "tag": "HR",
  "name": "HR Suite",
  "description": "Dossiers du personnel, entretiens, compétences et organigramme : le socle RH de votre organisation.",
  "color": "#C2410C",
  "heroImage": "/assets/img/consultante.webp",
  "lead": "Dossiers du personnel, entretiens, compétences et organigramme : le socle RH de votre organisation.",
  "overview": {
    "title": "Centralisez le capital humain : dossiers, entretiens, compétences et organigramme.",
    "bullets": [
      "Dossiers salariés complets",
      "Entretiens annuels et suivis",
      "Organigramme dynamique",
      "Tableaux de bord RH"
    ],
    "image": "/assets/img/equipe-open-space.webp",
    "imageAlt": "HR Suite chez TIC"
  },
  "coverage": {
    "title": "Ce que <em>HR Suite</em> couvre",
    "intro": "Dossiers du personnel, entretiens, compétences et organigramme : le socle RH de votre organisation.",
    "features": [
      {
        "title": "Dossiers unifiés",
        "text": "Contrats, documents et historique dans un seul espace sécurisé."
      },
      {
        "title": "Compétences",
        "text": "Cartographie des talents et plans de développement."
      },
      {
        "title": "Entretiens",
        "text": "Campagnes structurées, comptes rendus et actions de suivi."
      },
      {
        "title": "Pilotage",
        "text": "Indicateurs RH pour décider plus vite."
      }
    ]
  },
  "process": {
    "steps": [
      {
        "title": "Socle RH",
        "text": "Dossiers, organigramme, droits d'accès."
      },
      {
        "title": "Processus",
        "text": "Entretiens, validations, documents."
      },
      {
        "title": "Formation",
        "text": "Formation managers et équipes RH."
      },
      {
        "title": "Pilotage",
        "text": "Indicateurs et campagnes récurrentes."
      }
    ],
    "stats": [
      {
        "value": "1",
        "label": "dossier salarié unifié"
      },
      {
        "value": "360°",
        "label": "vue compétences"
      },
      {
        "value": "RH",
        "label": "tableaux de bord"
      }
    ]
  },
  "useCases": {
    "cases": [
      {
        "title": "Direction RH",
        "text": "Centraliser contrats et historiques."
      },
      {
        "title": "Managers",
        "text": "Préparer et suivre les entretiens."
      },
      {
        "title": "DG",
        "text": "Lire les indicateurs talents rapidement."
      }
    ]
  },
  "faq": [
    {
      "q": "HR Suite remplace-t-il la paie ?",
      "a": "Non : il complète la paie (dossiers, entretiens, compétences). Les deux peuvent coexister."
    },
    {
      "q": "Les données sont-elles sécurisées ?",
      "a": "Accès par rôles, journalisation et hébergement maîtrisé."
    },
    {
      "q": "Peut-on démarrer par un module seulement ?",
      "a": "Oui, par exemple dossiers salariés puis entretiens."
    }
  ],
  "related": [
    "odoo",
    "paie",
    "fne"
  ]
};
