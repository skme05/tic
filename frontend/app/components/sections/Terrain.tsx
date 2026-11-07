import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router';

/* ==========================================================================
   « Une équipe basée à Abidjan, pour l'Afrique » (À propos) — préfixe .terr
   À gauche la photo, habillée de petits widgets animés qui montrent le
   terrain : réseau qui varie et synchronisation différée, paiement mobile
   confirmé, langues. À droite, chaque contrainte du terrain est reliée à la
   réponse que nous y apportons.
   Styles : styles/sections/terrain.css
   ========================================================================== */
const PAIRS: { k: string; q: string; a: string; color: string; icon: ReactNode }[] = [
  {
    k: 'Connexions instables',
    q: 'Le réseau coupe, l’activité continue.',
    a: 'Mode hors-ligne et synchronisation différée.',
    color: '#1D5FAE',
    icon: <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />,
  },
  {
    k: 'Paiements mobiles',
    q: 'Vos clients paient avec leur téléphone.',
    a: 'Intégration des paiements Mobile Money.',
    color: '#1E8F5E',
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M10 18h4M9.5 9.5l2 2 3.5-3.5" />
      </>
    ),
  },
  {
    k: 'Obligations locales',
    q: 'La conformité n’est pas une option.',
    a: 'FNE, déclarations sociales, barèmes à jour.',
    color: '#B88A00',
    icon: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5M9 14l2 2 4-4" />
      </>
    ),
  },
  {
    k: 'Multilinguisme',
    q: 'Vos usagers ne parlent pas tous la même langue.',
    a: 'Interfaces pensées pour plusieurs langues.',
    color: '#E2452B',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
      </>
    ),
  },
];

export function Terrain() {
  return (
    <section className="terr" aria-labelledby="terr-title">
      <div className="terr__in">
        <div className="terr__visual reveal">
          <figure className="terr__photo">
            <img loading="lazy" decoding="async" src="/assets/img/equipe-open-space.webp" width="1600" height="1066" alt="L'équipe TIC au travail à Abidjan" />
          </figure>

          {/* réseau qui varie, données synchronisées */}
          <div className="terr__w terr__w--net" aria-hidden="true">
            <span className="terr__bars">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span className="terr__net">
              <b>
                <span>4G</span>
                <span>Edge</span>
                <span>Hors-ligne</span>
                <span>4G</span>
              </b>
              <small>
                <i></i>Synchronisation automatique
              </small>
            </span>
          </div>

          {/* paiement mobile confirmé */}
          <div className="terr__w terr__w--pay" aria-hidden="true">
            <span className="terr__ok">✓</span>
            <span>
              <small>Paiement mobile</small>
              <b>Transaction confirmée</b>
            </span>
          </div>

          {/* langues */}
          <div className="terr__w terr__w--lang" aria-hidden="true">
            <span className="is-on">FR</span>
            <span>EN</span>
            <span>+</span>
          </div>

          <div className="terr__stat">
            <b>+200</b>
            <span>Projets livrés et accompagnés</span>
          </div>
        </div>

        <div className="terr__txt">
          <p className="terr__k reveal">Conçu pour le terrain</p>
          <h2 id="terr-title" className="reveal">
            Une équipe basée à <em>Abidjan</em>, pour l'Afrique
          </h2>
          <p className="terr__lead reveal">Nos solutions sont conçues pour fonctionner ici, pas seulement en démonstration. Chaque contrainte du terrain a sa réponse.</p>

          <ul className="terr__pairs">
            {PAIRS.map((p, i) => (
              <li key={p.k} className="reveal" style={{ '--c': p.color, transitionDelay: `${i * 70}ms` } as CSSProperties}>
                <span className="terr__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{p.icon}</svg>
                </span>
                <span className="terr__pt">
                  <small>{p.k}</small>
                  <b>{p.q}</b>
                  <span className="terr__ans">
                    <i aria-hidden="true">→</i>
                    {p.a}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="terr__foot reveal">
            <ul className="terr__tags">
              <li>Équipes pluridisciplinaires en Côte d'Ivoire</li>
              <li>Méthode agile, livraisons continues</li>
              <li>Support et maintenance sur le long terme</li>
            </ul>
            <Link viewTransition to="/expertise" className="btn btn--red btn--lg">
              Voir nos expertises <i className="arw"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
