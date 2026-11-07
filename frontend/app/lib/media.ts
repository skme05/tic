/* Dimensions intrinsèques des images de contenu : renseignées sur chaque
   <img> (width/height) pour éviter les décalages de mise en page au
   chargement (CLS). À mettre à jour si une image change (npm run media). */
const SIZES: Record<string, [number, number]> = {
  '/assets/img/equipe-presentation.webp': [1600, 900],
  '/assets/img/equipe-open-space.webp': [1600, 1066],
  '/assets/img/equipe-reunion.webp': [1600, 900],
  '/assets/img/consultante.webp': [1000, 666],
};

export function imgSize(src: string): { width?: number; height?: number } {
  const s = SIZES[src];
  return s ? { width: s[0], height: s[1] } : {};
}
