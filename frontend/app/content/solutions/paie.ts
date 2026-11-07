import type { Solution } from '../types';

export const solution: Solution = {
  "slug": "paie",
  "order": 2,
  "tag": "RH",
  "name": "Paie",
  "description": "Gestion complète de la paie : bulletins, congés, primes, déclarations sociales et fiscales conformes à la réglementation ivoirienne.",
  "color": "#B91C1C",
  "heroImage": "/assets/img/equipe-open-space.webp",
  "lead": "Gestion complète de la paie : bulletins, congés, primes, déclarations sociales et fiscales conformes à la réglementation ivoirienne.",
  "overview": {
    "title": "Une paie fiable, conforme CNPS / DGI, sans tableurs fragiles.",
    "bullets": [
      "Bulletins et journaux de paie",
      "CNPS et déclarations sociales",
      "Congés, absences et primes",
      "Exports comptables prêts pour votre ERP"
    ],
    "image": "/assets/img/equipe-open-space.webp",
    "imageAlt": "Paie chez TIC"
  },
  "coverage": {
    "title": "Ce que <em>Paie</em> couvre",
    "intro": "Gestion complète de la paie : bulletins, congés, primes, déclarations sociales et fiscales conformes à la réglementation ivoirienne.",
    "features": [
      {
        "title": "Conformité locale",
        "text": "Règles ivoiriennes intégrées et mises à jour avec la réglementation."
      },
      {
        "title": "Automatisation",
        "text": "Calculs, retenues et générations de documents sans ressaisie."
      },
      {
        "title": "Espace RH",
        "text": "Suivi des dossiers salariés et historique des bulletins."
      },
      {
        "title": "Intégrations",
        "text": "Connexion possible avec Odoo, HR Suite et votre comptabilité."
      }
    ]
  },
  "process": {
    "steps": [
      {
        "title": "Audit paie",
        "text": "Règles actuelles, exceptions, historiques."
      },
      {
        "title": "Paramétrage",
        "text": "Barèmes, retenues, organigramme salarial."
      },
      {
        "title": "Bulletins tests",
        "text": "Simulation sur un mois réel avant bascule."
      },
      {
        "title": "Exploitation",
        "text": "Génération mensuelle, exports, assistance."
      }
    ],
    "stats": [
      {
        "value": "CNPS",
        "label": "déclarations préparées"
      },
      {
        "value": "24h",
        "label": "support ouvrable"
      },
      {
        "value": "0",
        "label": "tableur fragile en production"
      }
    ]
  },
  "useCases": {
    "cases": [
      {
        "title": "PME 50 salariés",
        "text": "Sécuriser la paie mensuelle et les déclarations."
      },
      {
        "title": "Groupe multi-sites",
        "text": "Homogénéiser les règles entre filiales."
      },
      {
        "title": "ONG",
        "text": "Gérer contrats, primes et reporting bailleurs."
      }
    ]
  },
  "faq": [
    {
      "q": "La paie est-elle conforme à la réglementation ivoirienne ?",
      "a": "Oui. CNPS, retenues et déclarations sont paramétrées pour le contexte local et mises à jour."
    },
    {
      "q": "Peut-on l'interfacer avec Odoo ou notre compta ?",
      "a": "Oui, via exports et connecteurs selon votre environnement."
    },
    {
      "q": "Combien de salariés peut-on gérer ?",
      "a": "De quelques dizaines à plusieurs milliers, selon le plan de déploiement."
    }
  ],
  "related": [
    "odoo",
    "fne",
    "hr"
  ]
};
