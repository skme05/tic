# Backend — API Django (à construire)

Le frontend React (`../frontend`) est **déjà prêt** pour cette API : tous ses appels passent par
`frontend/app/lib/api/endpoints.ts`. Tant que `VITE_API_URL` est vide, les formulaires partent vers
Netlify Forms et l'espace client fonctionne en **mode démonstration**. Il suffira de renseigner
`VITE_API_URL` pour basculer sur Django, sans toucher aux composants.

## Pile recommandée

- Django 5 + Django REST Framework
- PostgreSQL
- `django-cors-headers` si l'API est sur un autre domaine que le site
- Authentification de l'espace client par **session Django** (cookie `httpOnly`, `Secure`,
  `SameSite=Lax`) + jeton CSRF (le frontend envoie déjà `X-CSRFToken`)
- Admin Django pour modérer les témoignages et suivre les demandes
- Envoi d'emails de notification (contact, brief) : `django-anymail` ou SMTP

## Contrat d'API

Les noms de champs sont ceux de `frontend/app/lib/api/types.ts`. Les erreurs de validation
renvoient le format DRF standard (`{"champ": ["message"]}`, HTTP 400) : le formulaire de contact
les affiche sous chaque champ.

| Méthode | Route | Corps / réponse | Notes |
|---|---|---|---|
| POST | `/api/contact/` | `ContactRequest` → 201 | anti-spam (throttling DRF + pot de miel) |
| POST | `/api/project-briefs/` | `ProjectBriefRequest` → 201 | `features` est une liste de chaînes |
| POST | `/api/testimonials/` | `TestimonialRequest` → 201 | enregistré `is_published = False` (modération) |
| GET | `/api/testimonials/` | `Testimonial[]` | uniquement les témoignages publiés |
| POST | `/api/auth/login/` | `{email, password}` → `ClientProfile` | ouvre la session |
| POST | `/api/auth/logout/` | → 204 | |
| GET | `/api/client/projects/` | `ClientProject[]` | projets du client connecté uniquement |

### Modèles suggérés

- `ContactMessage(name, organisation, email, phone, service, message, consent, created_at, handled)`
- `ProjectBrief(type, objective, audience, features[], other_feature, budget, deadline, priority, name, organisation, email, phone, created_at, status)`
- `Testimonial(name, role, text, rating, is_published, created_at)`
- `ClientAccount` (utilisateur Django) ↔ `Project(title, type, status, progress, started_on, due_on, lead, summary)`
  → `Milestone`, `ProjectActivity`, `ProjectDocument` (fichier téléchargeable, accès contrôlé)

## Sécurité — à ne pas reproduire

Le site d'origine stockait le mot de passe du client **en clair dans le navigateur** (localStorage)
et « vérifiait » la connexion côté navigateur. Ce code a été supprimé. L'authentification doit
exister **uniquement côté serveur** : mots de passe hachés par Django, sessions, limitation des
tentatives de connexion.
