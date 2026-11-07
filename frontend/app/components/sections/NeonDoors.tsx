import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { services } from '~/content/services';

/* « Six portes. Une seule entrée. » (accueil) — les 6 expertises en portes
   néon. Styles et animations : styles/sections/neon-doors.css
   - à l'apparition, les néons s'allument une à une (grésillement) ;
   - au repos, un trait de lumière fait le tour de chaque cadre ;
   - survol / focus : le battant pivote en 3D, la pièce s'éclaire et un
     mini-couloir infini défile derrière la porte, la lumière déborde au sol ;
   - clic : transition « franchir la porte » (effet walkthrough) ;
   - écran tactile : premier appui = ouvrir, second = entrer. */
export function NeonDoors() {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  /* allumage quand la section entre à l'écran */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setLit(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const coarse = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  return (
    <section className={'ndoors' + (lit ? ' is-lit' : '')} id="corridor" ref={ref}>
      <div className="ndoors__in">
        <div className="ndoors__hd">
          <p className="ndoors__eyebrow">Le corridor</p>
          <h2 className="ndoors__title">
            Six portes.
            <br />
            Une seule <span className="txt-spectrum-dk">entrée</span>.
          </h2>
          <p className="ndoors__lead">Approchez une porte : elle s'ouvre sur son expertise. Franchissez-la pour découvrir la page complète.</p>
        </div>

        <div className="ndoors__grid">
          {services.map((s, i) => {
            const open = openSlug === s.slug;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className={'ndoor' + (open ? ' is-open' : '')}
                style={{ '--c': s.color, '--i': i }}
                aria-label={`${s.number} — ${s.name}`}
                onClick={(e) => {
                  /* tactile : le premier appui ouvre seulement la porte */
                  if (coarse() && !open) {
                    e.preventDefault();
                    setOpenSlug(s.slug);
                  }
                }}
              >
                {/* la pièce derrière la porte, avec son couloir infini */}
                <span className="ndoor__room">
                  <span className="ndoor__tunnel" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span className="ndoor__copy">
                    <span className="ndoor__name">{s.name}</span>
                    <span className="ndoor__text">{s.lead}</span>
                    <span className="ndoor__go">
                      Entrer <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </span>

                {/* le battant */}
                <span className="ndoor__leaf" aria-hidden="true">
                  <span className="ndoor__plate">{s.number.toUpperCase()}</span>
                  <span className="ndoor__leaf-name">{s.name}</span>
                  <span className="ndoor__hint">Approchez</span>
                  <span className="ndoor__handle"></span>
                </span>

                <span className="ndoor__frame" aria-hidden="true"></span>
                <span className="ndoor__spill" aria-hidden="true"></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
