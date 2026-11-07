/* « Notre méthode » : le binôme dédié et les 3 étapes d'un projet.
   Bloc partagé par les pages services (et réutilisable ailleurs). */

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

export function MethodSteps() {
  return (
    <div className="steps3">
      <div className="steps3__art reveal">
        <img loading="lazy" decoding="async" src="/assets/img/consultante.webp" width="1000" height="666" alt="Consultante TIC" />{' '}
        <div className="steps3__art__c">
          <b>Un binôme dédié</b>{' '}
          <p>Un référent projet et un architecte technique vous suivent du premier échange à la mise en production.</p>
        </div>
      </div>
      <div className="steps3__l">
        {METHOD_STEPS.map((s, i) => (
          <article className="stp reveal" key={s.title}>
            <i>{String(i + 1).padStart(2, '0')}</i>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
