/* Témoignages affichés dans le carrousel (accueil et page Témoignages).
   À VÉRIFIER : ces témoignages viennent du site d'origine ; ne publier que
   des témoignages réels, avec l'accord des personnes citées.
   Avec Django, cette liste viendra de GET /api/testimonials/ (publiés). */
export interface Testimonial {
  text: string;
  name: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    text: 'TIC a transformé notre présence digitale avec une approche sur mesure et une exécution irréprochable. Les délais ont été tenus au jour près.',
    name: 'Marie Kouassi',
    role: 'Directrice Marketing, Afrique Tech',
    rating: 5,
  },
  {
    text: "Une équipe professionnelle, réactive et à l'écoute. La qualité du livrable a dépassé nos attentes, et le transfert de compétences a été réel.",
    name: 'Jean-Paul Koffi',
    role: 'CEO, FinStart CI',
    rating: 5,
  },
  {
    text: 'Grâce à TIC, nous avons automatisé nos processus métiers et gagné un temps précieux sur chaque dossier traité.',
    name: 'Aminata Bamba',
    role: 'Directrice Générale, LogiGroup',
    rating: 5,
  },
  {
    text: "La migration de nos douze sites régionaux s'est faite sans une heure d'interruption. Du travail d'ingénieurs.",
    name: 'Sékou Diallo',
    role: 'DSI, Groupe Sahel Distribution',
    rating: 5,
  },
  {
    text: "School Manager a remplacé quatre tableurs et deux cahiers. Nos inscriptions se font aujourd'hui en dix minutes.",
    name: 'Fatou Traoré',
    role: 'Directrice, Institut Lumière',
    rating: 5,
  },
  {
    text: "La paie de 340 salariés est bouclée en une matinée, déclarations comprises. Le support répond en moins d'une heure.",
    name: 'Yao Olivier',
    role: 'Responsable Paie, Ivoire Industries',
    rating: 5,
  },
];
