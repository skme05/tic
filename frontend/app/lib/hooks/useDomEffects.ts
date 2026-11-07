import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { createScope, type Scope } from '~/lib/dom/scope';

export type DomEffect = (scope: Scope) => void;
/** Effet chargé à la demande (code découpé par Vite : téléchargé seulement
 *  sur les pages qui l'utilisent). */
export type LazyDomEffect = () => Promise<DomEffect>;

/**
 * Lance des effets d'animation impératifs après le rendu de la page et les
 * nettoie tous quand la page change ou que le composant est démonté.
 *
 *   useDomEffects([() => import('~/features/scenes-3d/scenes-3d-effect').then((m) => m.scenes3d)], true);
 */
export function useDomEffects(effects: (DomEffect | LazyDomEffect)[], lazy = false) {
  const { pathname } = useLocation();
  useEffect(() => {
    const scope = createScope();
    for (const fx of effects) {
      if (lazy) {
        (fx as LazyDomEffect)()
          .then((run) => {
            if (!scope.disposed) run(scope);
          })
          .catch((err) => console.error('[TIC] effet non chargé', err));
      } else {
        (fx as DomEffect)(scope);
      }
    }
    return () => scope.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- relancé à chaque page
  }, [pathname]);
}
