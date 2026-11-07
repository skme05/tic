# TIC — The Infinite Corridor Software Solutions

Site web de TIC (Abidjan, Côte d'Ivoire) : frontend **React + TypeScript** (React Router 7,
pages pré-rendues) et, à venir, une API **Django**.

- `frontend/` — le site
- `backend/` — l'API Django (à construire ; contrat d'API dans `backend/README.md`)
- `docs/ARCHITECTURE.md` — organisation du code
- `docs/AUDIT.md` — erreurs trouvées sur l'ancien site et corrections

## Démarrer

Prérequis : Node.js 20 ou plus.

```bash
cd frontend
npm install
npm run dev
```

Le site tourne sur http://localhost:5173.

## Commandes (dans `frontend/`)

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement (rechargement à chaud) |
| `npm run build` | Build de production : pages pré-rendues dans `build/client/` + 404, sitemap, robots, redirections |
| `npm run preview` | Sert le build localement |
| `npm run typecheck` | Vérification TypeScript |
| `npm run check:links` | Vérifie liens, ancres et médias du build |
| `npm run media -- <dossier>` | Optimise de nouveaux médias (ImageMagick + ffmpeg requis) |

## Modifier le contenu

| Je veux changer… | Fichier |
|---|---|
| Téléphone, email, adresse, réseaux sociaux | `frontend/app/content/site.ts` |
| Un service (« porte ») | `frontend/app/content/services/<slug>.ts` |
| Une solution | `frontend/app/content/solutions/<slug>.ts` |
| Les menus | `frontend/app/content/navigation.ts` |
| Les témoignages / les chiffres clés | `frontend/app/content/testimonials.ts`, `stats.ts` |
| Le texte d'une page | `frontend/app/routes/<page>.tsx` |

## Brancher le backend Django

Renseigner `VITE_API_URL` (voir `frontend/.env.example`). Sans cette variable, les formulaires
sont envoyés à Netlify Forms et l'espace client fonctionne en démonstration.

## Déploiement

Netlify, configuré par `netlify.toml` (dossier `frontend`, publication de `build/client`).
