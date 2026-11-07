# Audit du site d'origine et corrections apportées

Site audité : `tic-infinit.netlify.app` (copie HTTrack, 27 pages, 28 Mo), novembre 2026.
Méthode : validation HTML (html-validate), navigateur automatisé (erreurs console, requêtes,
liens), lecture du CSS et du JavaScript, comparaison visuelle page par page.

## Erreurs corrigées

| # | Problème | Gravité | Correction |
|---|---|---|---|
| 1 | **Mot de passe stocké en clair** dans le navigateur (localStorage) à la fin du formulaire « Démarrer un projet », puis « vérifié » côté navigateur dans l'espace client ; sans compte enregistré, n'importe quels identifiants ouvraient le tableau de bord | Critique (sécurité) | Champ mot de passe supprimé, aucune donnée stockée ; espace client clairement signalé comme **démonstration** ; vraie authentification prévue côté Django (`backend/README.md`) |
| 2 | Brief projet envoyé par **mailto** : ouvrait la messagerie du visiteur, et la demande était perdue s'il n'envoyait pas l'email | Élevée | Envoi réel via la couche API (Netlify Forms en attendant Django) |
| 3 | Témoignages « publiés immédiatement » : en réalité stockés **uniquement dans le navigateur** du visiteur ; l'équipe ne les recevait jamais | Élevée | Envoi réel, publication après relecture, textes corrigés |
| 4 | Les **10 pages Solutions** avaient une section contact vide et non fermée (`<section class="cta">` sans contenu ni fermeture) | Élevée | Bloc contact complet, partagé par toutes les pages |
| 5 | Liens « Mentions légales » et « Confidentialité » menant à la page Contact (pages inexistantes) | Moyenne (légal) | Pages créées (champs juridiques à compléter, marqués `[À COMPLÉTER]`) |
| 6 | Icônes LinkedIn / Facebook / X pointant vers les pages d'accueil génériques de ces réseaux | Moyenne | Masquées tant que les vrais liens ne sont pas renseignés (`content/site.ts`) |
| 7 | 1 582 erreurs de validation HTML : `<div>`, `<h3>`, `<p>` dans des `<button>` et des `<span>`, navigation sans nom accessible, etc. | Moyenne | Balisage corrigé, 0 erreur restante (hors convention de nommage des cases à cocher) |
| 8 | Bouton « activer le son » sur une vidéo **sans piste audio** | Faible | Bouton retiré |
| 9 | Civilité (M. / Mme) **devinée d'après le prénom** dans l'espace client | Faible (respect) | Salutation par le prénom uniquement |
| 10 | Validation du formulaire projet : un email invalide (`pas-un-email`) était accepté | Faible | Validation réelle des champs à chaque étape |
| 11 | Pages Solutions sans le voile de transition « franchir la porte » (éclair blanc à l'arrivée) | Faible | Transition gérée de façon identique partout |
| 12 | Police Syne chargée sur toutes les pages (`@import` bloquant) mais **jamais utilisée** | Perf | Supprimée |
| 13 | Code mort : bandeau « confiance » (CSS jamais utilisé), effet 3D `rsDepth` (élément `#rs3d` absent), vieux balisage commenté | Maintenance | Supprimé |
| 14 | 3 copies identiques du CSS et 6 du JS principal (`style0ad6.css`, `main60f4.js`…), versions gérées à la main (`?v=20260905i`) | Maintenance | Un seul source, empreinte automatique dans le nom des fichiers compilés |
| 15 | Vidéos non muettes à l'écran mais avec piste audio, images PNG de 2 à 4 Mo | Perf | Médias optimisés (voir ci-dessous) |
| 16 | Pas de balises canonical / Open Graph, pas de sitemap, pas de robots.txt, pas de page 404, pas de données structurées | SEO | Ajoutés |
| 17 | Vidéos en lecture automatique même quand le visiteur demande moins d'animations | Accessibilité | Affiche fixe (poster) dans ce cas |
| 18 | Pas de lien « Aller au contenu » pour la navigation au clavier | Accessibilité | Ajouté |

## Optimisation

| | Avant | Après |
|---|---|---|
| Médias | 28 Mo (PNG, MP4 avec audio) | 4,9 Mo (WebP, MP4 sans audio en `faststart`, affiches) |
| CSS par page | 132 Ko (tout le site, partout) | 69 à 92 Ko selon la page, minifié |
| JavaScript | 67 Ko + 250 Ko de données du globe 3D | Découpé par page ; le globe 3D est remplacé par un hero en CSS/SVG animé (plus aucune donnée géographique à charger) |
| Vidéo « corridor en mouvement » | 1,3 Mo | Remplacée par une animation SVG de quelques Ko |

## Points à vérifier par l'équipe TIC

- Numéro de téléphone `+225 07 08 09 10 11` : il ressemble à un numéro provisoire.
- Les 6 témoignages et les chiffres clés (+200 projets, −38 %, 99,8 %) doivent être réels et justifiables.
- Mentions légales : RCCM, NCC, forme juridique, directeur de la publication.
- Politique de confidentialité : durée de conservation, relecture au regard de la loi ivoirienne n° 2013-450 (ARTCI).
