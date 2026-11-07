import type { ReactNode } from 'react';
import { keyFigures } from '~/content/stats';

/* « Pourquoi TIC » : quatre chiffres clés sur cartes, liseré aux couleurs
   du logo (styles/sections/why-tic.css, données : content/stats.ts). */
export function WhyTic({
  eyebrow = 'Pourquoi TIC',
  title = (
    <>
      Pourquoi les équipes nous <span className="txt-spectrum">choisissent</span>
    </>
  ),
  lead = 'Des résultats mesurés chez nos clients, secteur public comme secteur privé.',
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
}) {
  return (
    <section className="why" id="resultats">
      <div className="why__hd reveal">
        <p className="why__eyebrow">{eyebrow}</p>
        <h2 className="why__title">{title}</h2>
        <p className="why__lead">{lead}</p>
      </div>
      <div className="why__grid">
        {keyFigures.map((k) => (
          <div className="why__card reveal" key={k.value}>
            <span className="why__bar" aria-hidden="true" style={{ background: k.color }}></span>
            <p className="why__value">{k.value}</p>
            <p className="why__text">{k.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
