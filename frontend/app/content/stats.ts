/* Chiffres clés « Pourquoi TIC » (accueil).
   À VÉRIFIER : chaque chiffre doit pouvoir être justifié (source interne). */
export interface KeyFigure {
  value: string;
  text: string;
  /** couleur du liseré, prise dans le dégradé du logo */
  color: string;
}

export const keyFigures: KeyFigure[] = [
  { value: '+200', text: "Projets livrés depuis 2021, du site vitrine à l'ERP complet.", color: '#1D5FAE' },
  { value: '−38 %', text: 'De temps de traitement sur les processus que nous automatisons.', color: '#22A06B' },
  { value: '99,8 %', text: 'De disponibilité mesurée sur les plateformes que nous infogérons.', color: '#F4C531' },
  { value: '6', text: "Portes d'expertise, une équipe dédiée derrière chacune d'elles.", color: '#E2452B' },
];
