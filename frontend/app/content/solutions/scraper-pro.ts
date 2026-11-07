import type { Solution } from '../types';

export const solution: Solution = {
  "slug": "scraper-pro",
  "order": 10,
  "tag": "DATA",
  "name": "Scraper Pro",
  "description": "Collecte, nettoyage et structuration de données à grande échelle pour vos études de marché et votre veille.",
  "color": "#0E7490",
  "heroImage": "/assets/img/equipe-reunion.webp",
  "lead": "Collecte, nettoyage et structuration de données à grande échelle pour vos études de marché et votre veille.",
  "overview": {
    "title": "Des données propres, structurées et planifiées pour votre veille et vos analyses.",
    "bullets": [
      "Collecte multi-sources",
      "Nettoyage et déduplication",
      "Exports structurés",
      "Planification automatique"
    ],
    "image": "/assets/img/equipe-open-space.webp",
    "imageAlt": "Scraper Pro chez TIC"
  },
  "coverage": {
    "title": "Ce que <em>Scraper Pro</em> couvre",
    "intro": "Collecte, nettoyage et structuration de données à grande échelle pour vos études de marché et votre veille.",
    "features": [
      {
        "title": "Collecte",
        "text": "Sources web et flux configurables selon vos besoins."
      },
      {
        "title": "Qualité",
        "text": "Nettoyage, normalisation et suppression des doublons."
      },
      {
        "title": "Exports",
        "text": "CSV, API ou bases destinées à vos équipes data."
      },
      {
        "title": "Automatisation",
        "text": "Jobs planifiés et alertes en cas d'échec."
      }
    ]
  },
  "process": {
    "steps": [
      {
        "title": "Cadrage data",
        "text": "Sources, champs, fréquence."
      },
      {
        "title": "Collecte",
        "text": "Connecteurs et règles d'extraction."
      },
      {
        "title": "Nettoyage",
        "text": "Normalisation et contrôles qualité."
      },
      {
        "title": "Livraison",
        "text": "Exports / API vers vos outils."
      }
    ],
    "stats": [
      {
        "value": "Multi",
        "label": "sources"
      },
      {
        "value": "Clean",
        "label": "déduplication"
      },
      {
        "value": "Cron",
        "label": "collectes planifiées"
      }
    ]
  },
  "useCases": {
    "cases": [
      {
        "title": "Marketing",
        "text": "Veille concurrentielle automatisée."
      },
      {
        "title": "Études",
        "text": "Jeu de données marché propre."
      },
      {
        "title": "Data",
        "text": "Alimenter un tableau de bord."
      }
    ]
  },
  "faq": [
    {
      "q": "Quelles sources peut-on collecter ?",
      "a": "Sources web et flux configurables selon votre besoin métier."
    },
    {
      "q": "Les données sont-elles nettoyées ?",
      "a": "Oui : normalisation, déduplication et exports structurés."
    },
    {
      "q": "Peut-on planifier des collectes ?",
      "a": "Oui, jobs planifiés avec alertes en cas d'échec."
    }
  ],
  "related": [
    "e-connaissance",
    "e-emploi",
    "odoo"
  ]
};
