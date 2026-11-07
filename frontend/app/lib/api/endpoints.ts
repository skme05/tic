/* ==========================================================================
   Fonctions d'API utilisées par les composants.
   Les composants n'appellent JAMAIS fetch directement : ils passent par ces
   fonctions. Quand Django sera prêt, il suffira de renseigner VITE_API_URL ;
   aucun composant ne changera.
   ========================================================================== */
import { apiRequest, hasBackend, postNetlifyForm } from './client';
import { DEMO_CLIENT, DEMO_PROJECTS } from './demo-data';
import type { ClientProfile, ClientProject, ContactRequest, ProjectBriefRequest, TestimonialRequest } from './types';

/** POST /api/contact/ */
export function submitContact(data: ContactRequest) {
  if (hasBackend) return apiRequest<void>('/contact/', { method: 'POST', body: data });
  return postNetlifyForm('contact', { ...data });
}

/** POST /api/project-briefs/ */
export function submitProjectBrief(data: ProjectBriefRequest) {
  if (hasBackend) return apiRequest<void>('/project-briefs/', { method: 'POST', body: data });
  return postNetlifyForm('brief-projet', { ...data });
}

/** POST /api/testimonials/  (publié après modération dans l'admin Django) */
export function submitTestimonial(data: TestimonialRequest) {
  if (hasBackend) return apiRequest<void>('/testimonials/', { method: 'POST', body: data });
  return postNetlifyForm('temoignage', { ...data });
}

/* ---------------- Espace client ----------------
   Sans backend : mode DÉMONSTRATION, données fictives, aucune vérification
   d'identifiants (une vérification côté navigateur ne protégerait rien).
   Avec Django : session authentifiée (cookie httpOnly + CSRF). */
export const clientPortalIsDemo = !hasBackend;

/** POST /api/auth/login/ */
export async function login(email: string, password: string): Promise<ClientProfile> {
  if (!hasBackend) return DEMO_CLIENT;
  return apiRequest<ClientProfile>('/auth/login/', { method: 'POST', body: { email, password } });
}

/** POST /api/auth/logout/ */
export async function logout(): Promise<void> {
  if (hasBackend) await apiRequest<void>('/auth/logout/', { method: 'POST' });
}

/** GET /api/client/projects/ */
export async function getClientProjects(): Promise<ClientProject[]> {
  if (!hasBackend) return DEMO_PROJECTS;
  return apiRequest<ClientProject[]>('/client/projects/');
}
