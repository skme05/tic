import { Link } from 'react-router';
import { nbsp, site } from '~/content/site';

/* ==========================================================================
   « La première porte est toujours ouverte » — bloc de contact en fin de
   page (avant le pied de page). Carte en deux parties :
   - à gauche, une porte néon qui s'ouvre quand la section apparaît
     (classe « in » posée par l'effet d'apparition .reveal) ;
   - à droite, le message, 3 tuiles de contact et les actions.
   Styles : styles/sections/cta-door.css (préfixe .ctad).
   ========================================================================== */
export function CtaContact() {
  const c = site.contact;
  return (
    <section className="ctad" id="contact" aria-labelledby="ctad-title">
      <div className="ctad__card">
        <div className="ctad__scene reveal" aria-hidden="true">
          <span className="ctad__grid"></span>
          <span className="ctad__glow"></span>
          <span className="ctad__door">
            <span className="ctad__room"></span>
            <span className="ctad__leaf">
              <i></i>
            </span>
            <span className="ctad__frame"></span>
          </span>
          <span className="ctad__spill"></span>
          <span className="ctad__badge">
            <span className="ctad__dot"></span>
            Réponse sous {c.responseTime}
          </span>
        </div>

        <div className="ctad__body">
          <p className="ctad__eyebrow">Parlons de votre projet</p>
          <h2 className="ctad__title" id="ctad-title">
            La première porte est toujours <em>ouverte</em>
          </h2>
          <p className="ctad__lead">Une idée, un projet, un audit ? Écrivez-nous : un échange suffit pour démarrer.</p>

          <ul className="ctad__tiles">
            <li>
              <a href={`tel:${c.phoneHref}`} style={{ '--c': '#1D5FAE' }}>
                <span className="ctad__ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                </span>
                <span className="ctad__t">
                  <small>Téléphone</small>
                  <b>{nbsp(c.phone)}</b>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`} style={{ '--c': '#1E8F5E' }}>
                <span className="ctad__ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span className="ctad__t">
                  <small>Email</small>
                  <b>{c.email}</b>
                </span>
              </a>
            </li>
            <li>
              <Link viewTransition to="/contact" style={{ '--c': '#B88A00' }}>
                <span className="ctad__ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </span>
                <span className="ctad__t">
                  <small>Adresse</small>
                  <b>
                    {c.district}, {c.city} — {c.country}
                  </b>
                </span>
              </Link>
            </li>
          </ul>

          <div className="ctad__actions">
            <Link viewTransition to="/demarrer-un-projet" className="ctad__btn">
              Démarrer un projet <i className="arw"></i>
            </Link>
            <Link viewTransition to="/contact" className="ctad__link">
              Nous écrire <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
