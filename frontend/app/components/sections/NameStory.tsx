import type { CSSProperties, ReactNode } from 'react';

/* ==========================================================================
   « Notre histoire » (À propos, juste après l'en-tête) — préfixe .story
   Pourquoi « The Infinite Corridor » : le clin d'œil au célèbre couloir du
   MIT, et l'idée qui en découle — quel que soit votre projet, il y a une
   issue, une porte qui ouvre sur une solution sur mesure.
   Illustration : le couloir en perspective, le soleil aligné au bout, les
   portes qui s'allument une à une aux couleurs TIC.
   Styles : styles/sections/name-story.css
   ========================================================================== */

/* couloir en perspective (repère 600 × 420), point de fuite = le soleil */
const W = 600;
const H = 420;
const VP = { x: 300, y: 178 };
const P = (x: number, y: number, s: number) => [VP.x + (x - VP.x) * s, VP.y + (y - VP.y) * s] as const;
const f = (n: number) => n.toFixed(1);
const DOOR_COLORS = ['#1D5FAE', '#22A06B', '#F4C531', '#F28A26', '#E2452B'];

function Corridor() {
  let k = 0;
  const st = (extra: Record<string, string | number> = {}) => ({ '--k': k++, ...extra }) as CSSProperties;
  const lines: ReactNode[] = [];
  const doors: ReactNode[] = [];
  for (const [x, y] of [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
  ] as const) {
    const [x2, y2] = P(x, y, 0.06);
    lines.push(<line key={`r${x}${y}`} pathLength={1} style={st()} x1={x} y1={y} x2={f(x2)} y2={f(y2)} />);
  }
  const scales = [0.86, 0.6, 0.42, 0.29, 0.2];
  scales.forEach((s, i) => {
    const [x0, y0] = P(0, 0, s);
    const [x1, y1] = P(W, H, s);
    lines.push(<rect key={`s${s}`} pathLength={1} style={st()} x={f(x0)} y={f(y0)} width={f(x1 - x0)} height={f(y1 - y0)} />);
    /* une porte par section, en alternant les murs ; elle s'allume ensuite */
    const dw = (x1 - x0) * 0.1;
    const dh = (y1 - y0) * 0.58;
    const dx = i % 2 ? x1 - (x1 - x0) * 0.07 - dw : x0 + (x1 - x0) * 0.07;
    const top = y1 - dh + dw / 2;
    const d = `M${f(dx)} ${f(y1)} V${f(top)} A${f(dw / 2)} ${f(dw / 2)} 0 0 1 ${f(dx + dw)} ${f(top)} V${f(y1)} Z`;
    doors.push(<path key={`d${s}`} className="story__door" d={d} style={{ '--c': DOOR_COLORS[i], '--i': i } as CSSProperties} />);
    lines.push(<path key={`dl${s}`} pathLength={1} style={st()} d={d} />);
  });
  for (const x of [100, 200, 400, 500]) {
    const [x2, y2] = P(x, H, 0.2);
    lines.push(<line key={`f${x}`} pathLength={1} style={st()} x1={x} y1={H} x2={f(x2)} y2={f(y2)} />);
  }
  const [cx0, cy0] = P(0, 0, 0.6);
  const [cx1] = P(W, 0, 0.6);
  return (
    <svg className="story__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="storySun">
          <stop offset="0" stopColor="#FFF4D6" />
          <stop offset=".35" stopColor="#F4C531" stopOpacity=".85" />
          <stop offset="1" stopColor="#F28A26" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="story__sun" cx={VP.x} cy={VP.y} r="70" fill="url(#storySun)" />
      <path className="story__beam" d={`M${VP.x - 6} ${VP.y} L${VP.x - 120} ${H} L${VP.x + 120} ${H} L${VP.x + 6} ${VP.y} Z`} />
      {doors}
      <g className="story__lines">{lines}</g>
      <line className="story__axis" x1={VP.x} y1={H} x2={VP.x} y2={0} />
      <g className="story__cote">
        <line x1={f(cx0)} y1={f(cy0 - 14)} x2={f(cx1)} y2={f(cy0 - 14)} />
        <text x={VP.x} y={f(cy0 - 22)} textAnchor="middle">
          ≈ 250 M · L'INFINITE CORRIDOR
        </text>
      </g>
    </svg>
  );
}

const BEATS = [
  {
    t: 'Le couloir',
    d: 'Au MIT, l’Infinite Corridor traverse le campus sur près de 250 mètres. Tout s’y croise : disciplines, laboratoires, idées. C’est l’artère où les projets se rencontrent.',
  },
  {
    t: 'La lumière au bout',
    d: 'Deux fois par an, le soleil couchant s’aligne exactement dans son axe et l’illumine de bout en bout. Une image que nous aimons : au bout du couloir, il y a toujours une issue.',
  },
  {
    t: 'Une porte pour chaque projet',
    d: 'C’est notre promesse. Quel que soit votre projet, nous trouvons la porte qui s’ouvre sur une solution sur mesure, et nous vous accompagnons jusqu’à la franchir.',
  },
];

export function NameStory() {
  return (
    <section className="story" id="histoire" aria-labelledby="story-title">
      <div className="story__in">
        <div className="story__txt">
          <p className="story__k reveal">Notre histoire</p>
          <h2 id="story-title" className="reveal">
            Pourquoi « The Infinite <em>Corridor</em> » ?
          </h2>
          <p className="story__lead reveal">
            Notre nom est un clin d’œil au célèbre couloir du Massachusetts Institute of Technology. Il dit ce que nous faisons : relier les idées, et ouvrir des portes.
          </p>
          <ol className="story__beats">
            {BEATS.map((b, i) => (
              <li key={b.t} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="story__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <b>{b.t}</b>
                  <p>{b.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <blockquote className="story__quote reveal">
            Quel que soit votre projet, il y a une issue : <em>une porte</em> qui s’ouvre sur la solution faite pour vous.
          </blockquote>
        </div>

        <figure className="story__art reveal">
          <Corridor />
          <figcaption>
            <span>
              <i></i>Le soleil aligné dans l’axe du couloir
            </span>
            <span>Chaque porte : une solution sur mesure</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
