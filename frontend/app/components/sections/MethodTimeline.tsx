/* Les 3 étapes d'un projet (accueil, Solutions, pages services). */
export const METHOD_STEPS = [
  {
    title: 'Cadrage & devis gratuit',
    text: 'Nous analysons vos besoins, vos contraintes et votre environnement existant, puis nous chiffrons précisément le projet.',
  },
  {
    title: 'Conception & développement',
    text: 'Maquettes validées, développement en cycles courts, démonstration à chaque étape. Vous voyez le produit grandir.',
  },
  {
    title: 'Mise en production & suivi',
    text: 'Recette avec vos équipes, formation, déploiement, puis maintenance et supervision continues.',
  },
];

/* Couleurs des numéros : bleu, vert, jaune (versions foncées, lisibles sur
   fond clair), assorties au liseré des cartes (base/brand-accents.css). */
const STEP_COLORS = ['#1D5FAE', '#1E8F5E', '#B88A00'];

/* « Votre projet démarre en 3 étapes simples » (accueil) : en-tête + carte
   « binôme dédié », ligne parcourue par un point lumineux, 3 cartes.
   Styles : styles/sections/method-timeline.css. */
export function MethodTimeline({
  eyebrow = 'Notre méthode',
  title = 'Votre projet démarre en 3 étapes simples',
  lead = 'Un cadrage clair, des livraisons visibles, une mise en production maîtrisée.',
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section className="mtl" id="methode">
      <div className="mtl__in">
        <div className="mtl__hd">
          <div className="mtl__intro reveal">
            <p className="mtl__eyebrow">{eyebrow}</p>
            <h2 className="mtl__title">{title}</h2>
            <p className="mtl__lead">{lead}</p>
          </div>
          <div className="mtl__duo reveal">
            <span className="mtl__avatars" aria-hidden="true">
              <span style={{ background: '#1D5FAE' }}></span>
              <span style={{ background: '#F28A26' }}></span>
            </span>
            <span className="mtl__duo-txt">
              <strong>Un binôme dédié</strong>
              <span>Un référent projet et un architecte technique vous suivent du premier échange à la mise en production.</span>
            </span>
          </div>
        </div>
        <div className="mtl__line" aria-hidden="true">
          <span className="mtl__walker"></span>
        </div>
        <ol className="mtl__steps">
          {METHOD_STEPS.map((s, i) => (
            <li className="mtl__card reveal" key={s.title}>
              <span className="mtl__n" style={{ color: STEP_COLORS[i] }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mtl__h">{s.title}</h3>
              <p className="mtl__p">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
