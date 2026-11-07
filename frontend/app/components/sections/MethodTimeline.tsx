import { METHOD_STEPS } from './MethodSteps';

/* Couleurs des étapes : début, milieu et fin du dégradé du logo
   (versions foncées, lisibles sur fond clair). */
const STEP_COLORS = ['#1D5FAE', '#B88A00', '#C9361C'];

/* « Votre projet démarre en 3 étapes simples » (accueil) : en-tête + carte
   « binôme dédié », ligne parcourue par un point lumineux, 3 cartes.
   Styles : styles/sections/method-timeline.css. */
export function MethodTimeline() {
  return (
    <section className="mtl" id="methode">
      <div className="mtl__in">
        <div className="mtl__hd">
          <div className="mtl__intro reveal">
            <p className="mtl__eyebrow">Notre méthode</p>
            <h2 className="mtl__title">Votre projet démarre en 3 étapes simples</h2>
            <p className="mtl__lead">Un cadrage clair, des livraisons visibles, une mise en production maîtrisée.</p>
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
