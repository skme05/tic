# Architecture

```
tic/
├── frontend/                 Site React (TypeScript)
│   ├── app/
│   │   ├── root.tsx          Coquille HTML, en-tête, pied de page, effets communs
│   │   ├── routes.ts         Table des routes (une page = un fichier)
│   │   ├── routes/           Les pages
│   │   │   ├── home.tsx, about.tsx, expertise.tsx, innovation.tsx, solutions.tsx,
│   │   │   │   temoignages.tsx, contact.tsx, demarrer-un-projet.tsx, espace-client.tsx,
│   │   │   │   mentions-legales.tsx, confidentialite.tsx, not-found.tsx
│   │   │   ├── service.tsx   Gabarit des 6 « portes » (/services/:slug)
│   │   │   └── solution.tsx  Gabarit des 10 solutions (/solutions/:slug)
│   │   ├── content/          Le CONTENU éditorial, séparé de la mise en page
│   │   │   ├── site.ts           coordonnées, réseaux, textes généraux
│   │   │   ├── navigation.ts     menus
│   │   │   ├── services/*.ts     un fichier par porte
│   │   │   ├── solutions/*.ts    un fichier par solution
│   │   │   ├── testimonials.ts, stats.ts
│   │   │   └── types.ts
│   │   ├── components/
│   │   │   ├── layout/       Header, Footer
│   │   │   ├── sections/     Blocs réutilisables : HeroStudio, CtaContact, Manifesto, NeonDoors,
│   │   │   │                 CorridorMotion, WhyTic, MethodTimeline, MethodSteps, RelatedCards
│   │   │   └── ui/           Petits éléments : Arrow, icônes, Rich (texte riche sûr)
│   │   ├── features/         Fonctionnalités autonomes
│   │   │   ├── loader/ (loader architectural), contact/, project-wizard/, testimonials/, client-portal/
│   │   │   └── scenes-3d/, text-reveal/, doors/, rails/, reveal/,
│   │   │       videos/, walkthrough/   moteurs d'animation (voir plus bas)
│   │   ├── lib/
│   │   │   ├── api/          SEUL point de contact avec le backend (client, endpoints, types)
│   │   │   ├── dom/scope.ts  Nettoyage automatique des effets d'animation
│   │   │   ├── hooks/        useDomEffects
│   │   │   ├── seo.ts        Balises titre / description / canonical / Open Graph
│   │   │   └── media.ts      Dimensions des images
│   │   └── styles/           CSS découpé par composant + un « bundle » par type de page
│   ├── public/               Images, vidéos, favicons, déclaration Netlify Forms
│   └── scripts/              postbuild (404, sitemap, robots, redirections), médias, liens
├── backend/                  API Django (à venir) — contrat d'API dans backend/README.md
├── docs/                     Ce document, l'audit
└── netlify.toml              Déploiement
```

## Principes

1. **Une page = un fichier** (`app/routes/`). Les pages qui partagent une structure (services,
   solutions) ont **un gabarit + un fichier de contenu par page** (`app/content/`).
2. **Le contenu est séparé de la mise en page.** Modifier un texte, un service ou une solution ne
   touche aucun composant. Plus tard, ces fichiers pourront être remplacés par l'admin Django.
3. **Pré-rendu statique** (React Router 7, `prerender`) : chaque page est générée en HTML au
   build (référencement, affichage immédiat, hébergement statique), puis React prend le relais
   (navigation sans rechargement).
4. **Un seul accès au backend** : `app/lib/api/endpoints.ts`. Sans `VITE_API_URL`, repli sur
   Netlify Forms et espace client en démonstration ; avec, appels à Django.
5. **Blocs remplaçables** : chaque section de l'accueil est un composant de
   `components/sections/` avec son propre fichier CSS (`styles/sections/`). Pour changer un
   bloc : créer le composant, son CSS, l'importer dans la page et dans le bundle CSS.

## Effets d'animation

Les animations lourdes (scènes 3D, révélation de texte, défilements) sont du code
impératif sur le DOM, repris du site d'origine et testé. Elles sont lancées par
`useDomEffects` et reçoivent un **Scope** (`lib/dom/scope.ts`) qui retire écouteurs,
observateurs et boucles d'animation au changement de page : aucune fuite en navigation sans
rechargement. Les fonctionnalités d'interface (menus, formulaires, onglets, accordéons, espace
client) sont, elles, écrites en React avec état.

Chaque effet lourd est **chargé à la demande** (`import()` dynamique) : les scènes 3D ne
sont téléchargées que sur les pages qui en ont.

## CSS

Le CSS d'origine (2 624 lignes) a été découpé en fichiers par composant (`styles/base`,
`layout`, `components`, `sections`, `pages`, `responsive`). Chaque type de page charge un
**bundle** (`site.css`, `home.css`, `about.css`, `client.css`, `wizard.css`) qui importe ses
fichiers **dans l'ordre d'origine** (l'ordre compte : les règles responsive viennent après les
composants). Les nouveaux blocs ont des classes préfixées (`.hs`, `.mf`, `.ndoor`, `.cmo`, `.why`,
`.mtl`) pour ne rien casser autour d'eux.

## Animations d'entrée et de sortie

- **Loader** (`features/loader/SiteLoader.tsx`) : le corridor se construit comme un plan
  d'architecte, puis on y entre. Animation 100 % CSS (fonctionne sans JavaScript), une fois
  par visite, ignorée si le visiteur réduit les animations.
- **Changement de page** : chaque `<Link viewTransition>` passe par l'API View Transitions ;
  l'ancienne page sort, la nouvelle entre (`styles/base/atoms.css`). Navigateurs sans support :
  changement instantané.
- **Sections** : `.reveal` apparaît en entrant à l'écran et s'efface en sortant
  (`features/reveal`) ; le hero se retire au défilement (variable CSS `--out`).
