import type { Solution } from '../types';

export const solution: Solution = {
  "slug": "e-garage",
  "order": 7,
  "tag": "AUTO",
  "name": "E-garage",
  "description": "Réception, devis, ordres de réparation, pièces et suivi de parc pour garages et flottes d'entreprise.",
  "color": "#EA580C",
  "heroImage": "/assets/img/equipe-reunion.webp",
  "lead": "Réception, devis, ordres de réparation, pièces et suivi de parc pour garages et flottes d'entreprise.",
  "overview": {
    "title": "De la réception au suivi de parc : atelier, devis, pièces et facturation synchronisés.",
    "bullets": [
      "Ordres de réparation",
      "Devis et facturation",
      "Stock de pièces",
      "Suivi de parc automobile"
    ],
    "image": "/assets/img/equipe-open-space.webp",
    "imageAlt": "E-garage chez TIC"
  },
  "coverage": {
    "title": "Ce que <em>E-garage</em> couvre",
    "intro": "Réception, devis, ordres de réparation, pièces et suivi de parc pour garages et flottes d'entreprise.",
    "features": [
      {
        "title": "Atelier",
        "text": "Réception véhicule, diagnostic et ordres de réparation."
      },
      {
        "title": "Commercial",
        "text": "Devis, validations client et facturation."
      },
      {
        "title": "Pièces",
        "text": "Stocks, fournisseurs et consommations liées aux OR."
      },
      {
        "title": "Flottes",
        "text": "Historique d'entretien pour véhicules d'entreprise."
      }
    ]
  },
  "process": {
    "steps": [
      {
        "title": "Réception",
        "text": "Véhicule, diagnostic, devis."
      },
      {
        "title": "Atelier",
        "text": "OR, pièces, temps passés."
      },
      {
        "title": "Facturation",
        "text": "Validation client et encaissement."
      },
      {
        "title": "Parc",
        "text": "Historique pour flottes d'entreprise."
      }
    ],
    "stats": [
      {
        "value": "OR",
        "label": "ordres de réparation"
      },
      {
        "value": "Pièces",
        "label": "stock lié"
      },
      {
        "value": "Flotte",
        "label": "historique entretien"
      }
    ]
  },
  "useCases": {
    "cases": [
      {
        "title": "Garage indépendant",
        "text": "Sortir du carnet papier."
      },
      {
        "title": "Concession",
        "text": "Suivre atelier et stocks."
      },
      {
        "title": "Flotte entreprise",
        "text": "Planifier l'entretien des véhicules."
      }
    ]
  },
  "faq": [
    {
      "q": "Utile pour une flotte d'entreprise ?",
      "a": "Oui : historique d'entretien et suivi de parc inclus."
    },
    {
      "q": "Comment gérer le stock de pièces ?",
      "a": "Pièces liées aux ordres de réparation, avec fournisseurs."
    },
    {
      "q": "Les devis clients sont-ils traçables ?",
      "a": "De la réception à la facturation, tout est historisé."
    }
  ],
  "related": [
    "school-manager",
    "e-clinique",
    "odoo"
  ]
};
