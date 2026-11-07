/* Types du contenu éditorial. Chaque service et chaque solution est décrit
   dans SON fichier (content/services/*.ts, content/solutions/*.ts) ; les
   gabarits de page (routes/service.tsx, routes/solution.tsx) les affichent.
   Plus tard, ces mêmes types pourront décrire les réponses de l'API Django
   (ex. si le contenu passe dans l'admin Django). */

/** Texte pouvant contenir un peu de balisage simple : <em>, <br />. */
export type RichText = string;

export interface Service {
  slug: string;
  order: number;
  /** « Porte 01 » */
  number: string;
  name: string;
  /** meta description */
  description: string;
  /** couleur de la porte (variable CSS --c) */
  color: string;
  lead: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  /** slugs des 3 portes proposées en fin de page */
  related: string[];
}

export interface TitledText {
  title: string;
  text: string;
}

export interface Solution {
  slug: string;
  order: number;
  /** petit libellé du méga-menu, si différent du nom (ex. « FNE ») */
  menuLabel?: string;
  /** étiquette au-dessus du titre (ex. « ERP », « RH ») */
  tag: string;
  name: string;
  description: string;
  color: string;
  heroImage: string;
  lead: string;
  overview: { title: RichText; bullets: string[]; image: string; imageAlt: string };
  coverage: { title: RichText; intro: string; features: TitledText[] };
  process: { steps: TitledText[]; stats: { value: string; label: string }[] };
  useCases: { cases: TitledText[] };
  faq: { q: string; a: string }[];
  /** slugs des 3 solutions proposées en fin de page */
  related: string[];
}
