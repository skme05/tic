/* ==========================================================================
   Client HTTP unique vers l'API Django.
   Toutes les requêtes du site passent par ici : un seul endroit pour l'URL
   de base, les en-têtes, le jeton CSRF, la gestion des erreurs.
   ========================================================================== */

/** URL de base de l'API (voir .env.example). Vide = pas encore de backend. */
export const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');
export const hasBackend = API_URL !== '';

/** Erreur renvoyée par l'API : statut HTTP + erreurs par champ (format DRF). */
export class ApiError extends Error {
  constructor(
    public status: number,
    public fieldErrors: Record<string, string[]> = {},
  ) {
    super(`Erreur API (${status})`);
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(name + '='))
    ?.split('=')[1];
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, signal }: { method?: string; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  /* Django : protection CSRF pour les requêtes avec session (espace client) */
  const csrf = getCookie('csrftoken');
  if (csrf && method !== 'GET') headers['X-CSRFToken'] = decodeURIComponent(csrf);

  const res = await fetch(API_URL + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: 'include',
    signal,
  });

  if (!res.ok) {
    let fieldErrors: Record<string, string[]> = {};
    try {
      fieldErrors = await res.json();
    } catch {
      /* corps non JSON : on garde seulement le statut */
    }
    throw new ApiError(res.status, fieldErrors);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

/* Repli tant que Django n'est pas en ligne : Netlify Forms (le site est
   hébergé sur Netlify). Les formulaires correspondants sont déclarés dans
   public/__forms.html pour que Netlify les détecte au déploiement. */
export async function postNetlifyForm(formName: string, data: Record<string, string | string[] | number | boolean | undefined>) {
  const params = new URLSearchParams({ 'form-name': formName });
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    params.append(key, Array.isArray(value) ? value.join(', ') : String(value));
  }
  const res = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) throw new ApiError(res.status);
}
