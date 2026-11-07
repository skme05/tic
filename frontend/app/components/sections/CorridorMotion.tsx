import { Link } from 'react-router';

/* « Le corridor en mouvement » (accueil) : carte sombre avec des pistes de
   circuit dessinées en SVG, parcourues par des impulsions de lumière aux
   couleurs du logo. Remplace l'ancienne vidéo de circuit imprimé (1,3 Mo)
   par quelques Ko de SVG animé en CSS (styles/sections/corridor-motion.css). */
export function CorridorMotion({
  eyebrow = 'Le corridor en mouvement',
  title = 'Une ingénierie qui se voit dans les résultats',
  lead = 'Du cadrage à la mise en production, nos équipes travaillent en cycles courts, avec des livraisons visibles chaque semaine.',
  cta = { label: 'Découvrir la méthode TIC', to: '#methode' },
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** `to` commençant par « # » : ancre dans la page ; sinon lien vers une page */
  cta?: { label: string; to: string };
}) {
  return (
    <section className="cmo">
      <div className="cmo__card">
        <svg className="cmo__art" viewBox="0 0 1240 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cmoTrace1" x1="0" x2="1">
              <stop offset="0" stopColor="#1D5FAE" />
              <stop offset=".5" stopColor="#22A06B" />
              <stop offset="1" stopColor="#F4C531" />
            </linearGradient>
            <linearGradient id="cmoTrace2" x1="0" x2="1">
              <stop offset="0" stopColor="#F4C531" />
              <stop offset="1" stopColor="#E2452B" />
            </linearGradient>
            <linearGradient id="cmoFade" x1="0" x2="1">
              <stop offset=".25" stopColor="#070B12" />
              <stop offset=".65" stopColor="#070B12" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="#1A2433" strokeWidth="2">
            <path d="M560 60 H760 L820 120 H1240" />
            <path d="M600 160 H880 L940 220 H1240" />
            <path d="M640 280 H900 L960 340 H1240" />
            <path d="M580 400 H820 L880 460 H1240" />
            <path d="M700 0 V60 M980 120 V500 M1100 0 V220" />
          </g>
          <g fill="none" strokeWidth="2.5" strokeLinecap="round">
            <path className="cmo__trace" d="M560 60 H760 L820 120 H1240" stroke="url(#cmoTrace1)" />
            <path className="cmo__trace cmo__trace--2" d="M600 160 H880 L940 220 H1240" stroke="url(#cmoTrace2)" />
            <path className="cmo__trace cmo__trace--3" d="M640 280 H900 L960 340 H1240" stroke="url(#cmoTrace1)" />
            <path className="cmo__trace cmo__trace--4" d="M580 400 H820 L880 460 H1240" stroke="url(#cmoTrace2)" />
          </g>
          <rect x="1010" y="170" width="140" height="140" rx="10" fill="#0F1724" stroke="#2A3648" strokeWidth="2" />
          <rect x="1040" y="200" width="80" height="80" rx="6" fill="none" stroke="#F4C531" strokeWidth="2" opacity=".7" />
          <rect width="1240" height="500" fill="url(#cmoFade)" />
        </svg>
        <div className="cmo__copy">
          <p className="cmo__eyebrow">{eyebrow}</p>
          <h2 className="cmo__title">{title}</h2>
          <p className="cmo__lead">{lead}</p>
          {cta.to.startsWith('#') ? (
            <a href={cta.to} className="btn btn--white btn--lg">
              {cta.label} <i className="arw"></i>
            </a>
          ) : (
            <Link viewTransition to={cta.to} className="btn btn--white btn--lg">
              {cta.label} <i className="arw"></i>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
