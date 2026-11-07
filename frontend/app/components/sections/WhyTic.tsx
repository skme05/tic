import { keyFigures } from '~/content/stats';

/* « Pourquoi TIC » : quatre chiffres clés sur cartes, liseré aux couleurs
   du logo (styles/sections/why-tic.css, données : content/stats.ts). */
export function WhyTic() {
  return (
    <section className="why" id="resultats">
      <div className="why__hd reveal">
        <p className="why__eyebrow">Pourquoi TIC</p>
        <h2 className="why__title">
          Pourquoi les équipes nous <span className="txt-spectrum">choisissent</span>
        </h2>
        <p className="why__lead">Des résultats mesurés chez nos clients, secteur public comme secteur privé.</p>
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
