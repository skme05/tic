import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { clientPortalIsDemo, getClientProjects, login, logout } from '~/lib/api/endpoints';
import type { ClientProfile, ClientProject, ProjectStatus } from '~/lib/api/types';

/* Espace client : connexion puis tableau de bord des projets.
   Sans backend Django : DÉMONSTRATION (données fictives, rien n'est vérifié
   ni enregistré). Avec Django : session authentifiée via lib/api. */

const BADGE: Record<ProjectStatus, string> = { run: 'badge--run', review: 'badge--review', done: 'badge--done', pause: 'badge--pause' };

const IconWeb = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
  </svg>
);
const IconApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <line x1="10" y1="19" x2="14" y2="19" />
  </svg>
);
const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" />
    <polyline points="7 10 12 15 17 10" />
    <path d="M5 21h14" />
  </svg>
);
const IconEye = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

export function ClientPortal() {
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);
  function notify(msg: string) {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    setError(false);
    try {
      const profile = await login(String(f.get('email') ?? ''), String(f.get('password') ?? ''));
      const list = await getClientProjects();
      setClient(profile);
      setProjects(list);
      setActiveId(list[0]?.id ?? null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      notify(clientPortalIsDemo ? 'Démonstration — données fictives' : 'Bienvenue dans votre espace projet');
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    await logout().catch(() => undefined);
    setClient(null);
    setProjects([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const active = projects.find((p) => p.id === activeId) ?? null;

  return (
    <>
      <section className="plog" id="plog" hidden={client !== null}>
        <div className="plog__glow" aria-hidden="true"></div>
        <div className="plog__layout">
          <aside className="plog__brand reveal" aria-label="Espace client TIC">
            <h1>
              Votre corridor
              <br />
              <em>de projets</em>
            </h1>
            <p>Suivez jalons, livrables et échanges avec votre équipe TIC en un seul endroit.</p>
          </aside>
          <div className="pcard plog__card reveal d1">
            <div className="plog__card-top">
              <div>
                <h2>Connexion</h2>
                <p>Accédez à votre espace projet.</p>
              </div>
            </div>
            <form id="loginForm" noValidate onSubmit={onLogin}>
              <p className="plog__err" id="loginErr" role="alert" hidden={!error}>
                Connexion impossible : vérifiez vos identifiants ou <Link to="/contact">contactez-nous</Link>.
              </p>
              {clientPortalIsDemo && (
                <p className="plog__demo" role="note">
                  <b>Démonstration.</b> L'espace client sécurisé ouvrira prochainement : les projets affichés après « connexion »
                  sont fictifs et aucun identifiant n'est vérifié ni enregistré.
                </p>
              )}
              <div className="fld">
                <label htmlFor="lgMail">Email</label>{' '}
                <input id="lgMail" name="email" type="email" autoComplete="email" placeholder="vous@exemple.ci" required={!clientPortalIsDemo} />
              </div>
              <div className="fld">
                <label htmlFor="lgPass">Mot de passe</label>{' '}
                <div className="plog__pass">
                  <input
                    id="lgPass"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required={!clientPortalIsDemo}
                  />{' '}
                  <button
                    className="plog__eye"
                    type="button"
                    id="togglePass"
                    aria-label={showPass ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={showPass}
                    onClick={() => setShowPass((s) => !s)}
                  >
                    <IconEye open={showPass} />
                  </button>
                </div>
              </div>{' '}
              <button className={'btn btn--red btn--lg plog__submit' + (loading ? ' is-load' : '')} type="submit" id="loginBtn" disabled={loading}>
                <span className="plog__submit-label">
                  {loading ? 'Ouverture…' : clientPortalIsDemo ? 'Voir la démonstration' : 'Se connecter'}
                </span>{' '}
                <i className="arw"></i>
              </button>
            </form>
            <p className="plog__note">
              Vos accès vous seront communiqués par votre chef de projet. · <Link to="/demarrer-un-projet">Démarrer un projet</Link> ·{' '}
              <Link to="/contact">Aide</Link>
            </p>
          </div>
        </div>
      </section>

      {client && (
        <section className="port" id="portDash">
          <div className="port__glow" aria-hidden="true"></div>
          <div className="shell">
            <div className="port__top">
              <div className="port__intro">
                <p className="port__hello">Espace projet{clientPortalIsDemo && ' — démonstration'}</p>
                <h1>
                  Bonjour <em id="clientFirstName">{client.firstName}</em>
                </h1>
                <p>Voici l’avancement de vos projets confiés à TIC.</p>
              </div>
              <div className="port__actions">
                <Link to="/demarrer-un-projet" className="btn btn--ghost">
                  + Nouveau projet
                </Link>{' '}
                <button className="btn btn--ink" type="button" id="logoutBtn" onClick={onLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>{' '}
                  Déconnexion
                </button>
              </div>
            </div>

            <Stats projects={projects} />

            <div className="port__shell">
              <aside className="pcard pcard--side" aria-label="Informations du projet">
                <div className="pid">
                  <span className="pid__av" id="clientAvatar" aria-hidden="true">
                    {client.initials}
                  </span>
                  <div>
                    <b id="clientName">{client.fullName}</b> <span id="clientOrg">{client.org}</span>
                  </div>
                </div>
                <nav className="plist" id="projectNav" aria-label="Vos projets">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      className={'plist__i' + (p.id === activeId ? ' is-on' : '')}
                      type="button"
                      aria-current={p.id === activeId ? 'true' : undefined}
                      onClick={() => setActiveId(p.id)}
                    >
                      {p.icon === 'app' ? <IconApp /> : <IconWeb />}
                      <span>{p.title}</span>
                      <em></em>
                    </button>
                  ))}
                </nav>
                <div className="psupport">
                  <b>Votre chef de projet</b> <p>Une question sur l’avancement ? Réponse sous 24&nbsp;h ouvrées.</p>{' '}
                  <Link to="/contact">
                    Contacter l’équipe <i className="arw arw--sm"></i>
                  </Link>
                </div>
              </aside>{' '}
              <label className="port__mobile-nav">
                <span>Projet</span>{' '}
                <select id="projectSelect" value={activeId ?? ''} onChange={(e) => setActiveId(e.target.value)}>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </label>{' '}
              {active && <ProjectDetail key={active.id} project={active} onDownload={(name) => notify('Téléchargement simulé — ' + name)} />}
            </div>
          </div>
        </section>
      )}

      <div className="ptoast" id="portToast" hidden={!toast} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

function Stats({ projects }: { projects: ClientProject[] }) {
  const n = projects.length || 1;
  const avg = Math.round(projects.reduce((s, p) => s + p.progress, 0) / n);
  const docs = projects.reduce((s, p) => s + p.documents.length, 0);
  const running = projects.filter((p) => p.status === 'run' || p.status === 'review').length;
  return (
    <div className="port__stats" id="portStats" role="region" aria-label="Synthèse">
      <div className="pstat" style={{ '--c': 'var(--b)' }}>
        <b>{projects.length}</b>
        <span>Projets actifs</span>
      </div>
      <div className="pstat" style={{ '--c': 'var(--g)' }}>
        <b>{avg}%</b>
        <span>Avancement moyen</span>
      </div>
      <div className="pstat" style={{ '--c': 'var(--o)' }}>
        <b>{running}</b>
        <span>En cours / revue</span>
      </div>
      <div className="pstat" style={{ '--c': 'var(--red)' }}>
        <b>{docs}</b>
        <span>Documents</span>
      </div>
    </div>
  );
}

function ProjectDetail({ project: p, onDownload }: { project: ClientProject; onDownload: (name: string) => void }) {
  const [tab, setTab] = useState<'feed' | 'docs'>('feed');
  /* les jauges partent de 0 puis s'animent jusqu'à leur valeur */
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const doneCount = p.milestones.filter((m) => m.state === 'done').length;
  const donePct = p.milestones.length > 1 ? (doneCount / (p.milestones.length - 1)) * 100 : 0;
  const pct = shown ? p.progress : 0;

  return (
    <div className="pmain is-swap" id="projectDetail">
      <div className="pcard">
        <div className="phdr2">
          <div className="phdr2__t">
            <span className={'badge ' + BADGE[p.status]}>{p.statusLabel}</span>
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
            <div className="phdr2__meta">
              <div>
                <b>Type de projet</b>
                <span>{p.type}</span>
              </div>
              <div>
                <b>Démarré le</b>
                <span>{p.startedOn}</span>
              </div>
              <div>
                <b>Échéance visée</b>
                <span>{p.dueOn}</span>
              </div>
              <div>
                <b>Interlocuteur</b>
                <span>{p.lead}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="prog">
          <div className="pring" id="progRing" data-pct={`${pct}%`} style={{ '--v': pct }} role="img" aria-label={`Avancement : ${p.progress} %`}></div>
          <div className="prog__side">
            <div className="prog__top">
              <b>Avancement global</b>
              <span id="progPctLabel">{pct}%</span>
            </div>
            <div className="prog__track">
              <div className="prog__fill" id="progFill" style={{ '--pct': `${pct}%` }}></div>
            </div>
          </div>
        </div>
        <div className="mstones">
          <h3>Jalons du projet</h3>
          <div className="mtrack" style={{ '--n': p.milestones.length }}>
            <div className="mtrack__done" id="mtrackDone" style={{ '--donepct': `${shown ? donePct : 0}%` }}></div>
            {p.milestones.map((m) => (
              <div className={'mst is-' + m.state} key={m.label}>
                <span className="mst__dot">
                  {m.state === 'done' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <b>{m.label}</b>
                <span>{m.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ptabs" role="tablist">
          <button className={'ptab' + (tab === 'feed' ? ' is-on' : '')} type="button" role="tab" aria-selected={tab === 'feed'} onClick={() => setTab('feed')}>
            Activité
          </button>
          <button className={'ptab' + (tab === 'docs' ? ' is-on' : '')} type="button" role="tab" aria-selected={tab === 'docs'} onClick={() => setTab('docs')}>
            Documents ({p.documents.length})
          </button>
        </div>
        <div className="pgrid2">
          <div className="pblock ppane" role="tabpanel" hidden={tab !== 'feed'}>
            <ul className="feed">
              {p.activity.map((a) => (
                <li key={a.title}>
                  <span className="feed__dot"></span>
                  <div>
                    <b>{a.title}</b>
                    <p>{a.text}</p>
                    <time>{a.date}</time>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="pblock ppane" role="tabpanel" hidden={tab !== 'docs'}>
            <div className="docs">
              {p.documents.map((d) => (
                <div className="doc" key={d.name}>
                  <span className="doc__ic">
                    <IconDoc />
                  </span>
                  <div className="doc__t">
                    <b>{d.name}</b>
                    <span>{d.size}</span>
                  </div>
                  <button className="doc__dl" type="button" title="Télécharger" aria-label={`Télécharger ${d.name}`} onClick={() => onDownload(d.name)}>
                    <IconDownload />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
