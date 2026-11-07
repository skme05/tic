import { Link } from 'react-router';
import { exploreNav, legalNav } from '~/content/navigation';
import { services } from '~/content/services';
import { nbsp, site } from '~/content/site';
import { Arrow } from '~/components/ui/Arrow';
import { IconEmail, IconFacebook, IconLinkedIn, IconX } from '~/components/ui/icons';

/* Pied de page. `cover` : il remonte par-dessus le bloc contact, sur fond
   vidéo (pages qui se terminent par <CtaContact />). */
export function Footer({ cover = true }: { cover?: boolean }) {
  const c = site.contact;
  return (
    <footer className={'foot' + (cover ? ' foot--cover' : '')}>
      {cover && (
        <video
          className="foot__v"
          data-auto=""
          src="/assets/video/pied-de-page.mp4"
          poster="/assets/video/pied-de-page.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}
      <div className="shell foot__in">
        <div className="foot__top">
          <div className="foot__brand">
            <img src="/assets/img/logo-tic.webp" width="600" height="138" loading="lazy" decoding="async" alt="TIC — The Infinite Corridor Software Solutions" />
            <p>
              {site.legalName} — {site.tagline}
            </p>
            <Link className="btn btn--red" to="/demarrer-un-projet">
              Démarrer un projet <Arrow />
            </Link>
            <div className="foot__soc">
              {site.social.linkedin && (
                <a href={site.social.linkedin} aria-label="LinkedIn" rel="noopener">
                  <IconLinkedIn />
                </a>
              )}
              {site.social.facebook && (
                <a href={site.social.facebook} aria-label="Facebook" rel="noopener">
                  <IconFacebook />
                </a>
              )}
              {site.social.x && (
                <a href={site.social.x} aria-label="X" rel="noopener">
                  <IconX />
                </a>
              )}
              <a href={`mailto:${c.email}`} aria-label="Email">
                <IconEmail />
              </a>
            </div>
          </div>
          <nav className="foot__col" aria-label="Le corridor">
            <h2 className="foot__h">Le corridor</h2>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </nav>
          <nav className="foot__col" aria-label="Explorer">
            <h2 className="foot__h">Explorer</h2>
            {exploreNav.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="foot__col">
            <h2 className="foot__h">Nous joindre</h2>
            <a href={`tel:${c.phoneHref}`}>{nbsp(c.phone)}</a>
            <a href={`mailto:${c.email}`}>{c.email}</a>
            <span>
              {c.district}, {c.city}
              <br />
              {c.country}
            </span>
            <span>
              Lundi – Vendredi
              <br />
              08 h – 18 h GMT
            </span>
          </div>
        </div>
        <div className="foot__bar">
          <p>
            © {new Date().getFullYear()} TIC — {site.legalName}. Tous droits réservés.
          </p>
          <ul>
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href="#top">Haut de page ↑</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
