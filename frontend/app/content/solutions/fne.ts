import type { Solution } from '../types';

export const solution: Solution = {
  "slug": "fne",
  "order": 3,
  "menuLabel": "FNE",
  "tag": "FNE",
  "name": "Facture Normalisée Électronique",
  "description": "Facturation électronique conforme aux exigences de la DGI, intégrée à votre outil de gestion existant.",
  "color": "#0F766E",
  "heroImage": "/assets/img/equipe-reunion.webp",
  "lead": "Facturation électronique conforme aux exigences de la DGI, intégrée à votre outil de gestion existant.",
  "overview": {
    "title": "Émettez, archivez et suivez vos factures FNE sans casser votre chaîne de facturation.",
    "bullets": [
      "Émission conforme FNE",
      "Archivage légal des factures",
      "Connexion à votre ERP / caisse",
      "Suivi des rejets et corrections"
    ],
    "image": "/assets/img/equipe-open-space.webp",
    "imageAlt": "Facture Normalisée Électronique chez TIC"
  },
  "coverage": {
    "title": "Ce que <em>Facture Normalisée Électronique</em> couvre",
    "intro": "Facturation électronique conforme aux exigences de la DGI, intégrée à votre outil de gestion existant.",
    "features": [
      {
        "title": "Conformité DGI",
        "text": "Respect des formats et contrôles exigés par la facture normalisée."
      },
      {
        "title": "Intégration métier",
        "text": "Branchement sur Odoo ou vos outils existants."
      },
      {
        "title": "Traçabilité",
        "text": "Historique des émissions, statuts et anomalies."
      },
      {
        "title": "Accompagnement",
        "text": "Paramétrage, formation et support au quotidien."
      }
    ]
  },
  "process": {
    "steps": [
      {
        "title": "Diagnostic",
        "text": "Outil de facturation actuel et flux DGI."
      },
      {
        "title": "Branchement",
        "text": "Connexion FNE à l'ERP ou à la caisse."
      },
      {
        "title": "Tests",
        "text": "Émissions d'essai, gestion des rejets."
      },
      {
        "title": "Production",
        "text": "Bascule, formation, suivi des anomalies."
      }
    ],
    "stats": [
      {
        "value": "DGI",
        "label": "conformité ciblée"
      },
      {
        "value": "ERP",
        "label": "connecteurs possibles"
      },
      {
        "value": "Audit",
        "label": "historique des émissions"
      }
    ]
  },
  "useCases": {
    "cases": [
      {
        "title": "Commerçant",
        "text": "Émettre des factures normalisées sans changer d'outil."
      },
      {
        "title": "Industrie",
        "text": "Intégrer la FNE à Odoo / ERP existant."
      },
      {
        "title": "Cabinet",
        "text": "Archiver et tracer chaque émission."
      }
    ]
  },
  "faq": [
    {
      "q": "Est-ce compatible avec notre ERP actuel ?",
      "a": "Oui. Nous branchons la FNE sur Odoo ou vos outils de facturation existants."
    },
    {
      "q": "Que se passe-t-il en cas de rejet DGI ?",
      "a": "Les rejets sont visibles, corrigibles, et historisés pour audit."
    },
    {
      "q": "L'archivage est-il inclus ?",
      "a": "Oui, avec conservation des preuves d'émission nécessaires."
    }
  ],
  "related": [
    "odoo",
    "paie",
    "hr"
  ]
};
