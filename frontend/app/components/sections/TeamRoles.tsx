import type { CSSProperties, ReactNode } from 'react';

/* ==========================================================================
   « Qui ouvre les portes » (À propos) — les métiers de l'équipe en badges
   d'accès au corridor (préfixe .team). Pas de noms ni de photos : les rôles,
   leur mission et ce qu'ils vous livrent. Au survol, le badge se balance au
   bout de son cordon et un faisceau de lecture le parcourt.
   Styles : styles/sections/team-roles.css
   ========================================================================== */
const ROLES: { role: string; mission: string; gives: string[]; color: string; icon: ReactNode }[] = [
  {
    role: 'Chefs de projet',
    mission: 'Votre interlocuteur unique, du cadrage à la mise en production.',
    gives: ['Planning', 'Jalons', 'Comptes rendus'],
    color: '#1D5FAE',
    icon: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6" />
      </>
    ),
  },
  {
    role: 'Designers UI / UX',
    mission: 'Des parcours clairs et des interfaces comprises dès le premier écran.',
    gives: ['Parcours', 'Maquettes', 'Design system'],
    color: '#1E8F5E',
    icon: (
      <>
        <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.6-1 1-2-.7-1.2.2-2.5 1.5-2.5H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5Z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10.5" cy="7" r="1" />
        <circle cx="15" cy="7.5" r="1" />
      </>
    ),
  },
  {
    role: 'Développeurs web & mobile',
    mission: 'Des applications robustes, documentées et maintenables dans la durée.',
    gives: ['Sites & apps', 'API', 'Intégrations'],
    color: '#B88A00',
    icon: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  },
  {
    role: 'Data & IA',
    mission: 'Vos données mises au travail : tableaux de bord, assistants, automatisations.',
    gives: ['Tableaux de bord', 'Assistants IA', 'Automatisation'],
    color: '#D9531E',
    icon: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
  },
  {
    role: 'Consultants métiers',
    mission: 'Odoo, paie, facturation : vos processus traduits dans les bons outils.',
    gives: ['Paramétrage', 'Processus', 'Conformité'],
    color: '#E2452B',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
  },
  {
    role: 'Support & formation',
    mission: 'Vos équipes formées sur site et accompagnées au quotidien, depuis Abidjan.',
    gives: ['Formation', 'Assistance', 'Documentation'],
    color: '#1D5FAE',
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
        <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
        <path d="M19.5 19a4 4 0 0 1-4 3H13" />
      </>
    ),
  },
];

export function TeamRoles() {
  return (
    <section className="team" id="equipe" aria-labelledby="team-title">
      <div className="team__in">
        <header className="team__hd reveal">
          <p className="team__k">L'équipe</p>
          <h2 id="team-title">
            Qui ouvre les <em>portes</em>
          </h2>
          <p>Nos métiers, réunis dans un même atelier à Cocody. Chaque projet mobilise ceux dont il a besoin, autour d'un chef de projet dédié.</p>
        </header>
        <ul className="team__grid">
          {ROLES.map((r, i) => (
            <li key={r.role} className="team__item reveal" style={{ '--c': r.color, '--i': i } as CSSProperties}>
              <span className="team__cord" aria-hidden="true"></span>
              <article className="team__badge" tabIndex={0}>
                <span className="team__slot" aria-hidden="true"></span>
                <header className="team__top">
                  <span>Accès · Corridor</span>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </header>
                <span className="team__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{r.icon}</svg>
                </span>
                <h3>{r.role}</h3>
                <p>{r.mission}</p>
                <ul className="team__gives" aria-label="Ce qu'ils vous livrent">
                  {r.gives.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
                <span className="team__code" aria-hidden="true">
                  {Array.from({ length: 22 }, (_, k) => (
                    <i key={k} style={{ width: `${1 + ((k * 7 + i * 3) % 4)}px` }}></i>
                  ))}
                </span>
                <span className="team__scan" aria-hidden="true"></span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
