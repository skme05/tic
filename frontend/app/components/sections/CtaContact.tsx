import { Link } from 'react-router';
import { nbsp, site } from '~/content/site';
import { Arrow } from '~/components/ui/Arrow';

/* « La première porte est toujours ouverte » : fin de la plupart des pages.
   Le pied de page vient le recouvrir au défilement (coverstack). */
export function CtaContact() {
  const c = site.contact;
  return (
    <div className="coverstack">
      <section className="cta" id="contact">
        <video
          className="cta__v"
          data-auto=""
          src="/assets/video/cta-fond.mp4"
          poster="/assets/video/cta-fond.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="shell cta__in reveal">
          <h2>
            La première porte est
            <br />
            toujours ouverte
          </h2>
          <p>Une idée, un projet, un audit ? Écrivez-nous : nous répondons sous {c.responseTime}.</p>
          <div className="cta__g">
            <a className="cta__c" href={`tel:${c.phoneHref}`}>
              <span>Téléphone</span>
              <b>{nbsp(c.phone)}</b>
            </a>
            <a className="cta__c" href={`mailto:${c.email}`}>
              <span>Email</span>
              <b>{c.email}</b>
            </a>
            <div className="cta__c">
              <span>Adresse</span>
              <b>
                {c.city}, {c.district} — {c.country}
              </b>
            </div>
          </div>
          <Link className="btn btn--white btn--lg" to="/contact">
            Démarrer la conversation <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
