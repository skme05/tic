/* Contrat d'échange avec l'API Django — doit rester aligné sur
   backend/README.md (sérialiseurs DRF). */

export interface ContactRequest {
  name: string;
  organisation?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  consent: boolean;
}

export interface ProjectBriefRequest {
  type: string;
  objective: string;
  audience?: string;
  features: string[];
  otherFeature?: string;
  budget: string;
  deadline: string;
  priority?: string;
  name: string;
  organisation?: string;
  email: string;
  phone: string;
}

export interface TestimonialRequest {
  name: string;
  role?: string;
  text: string;
  rating: number;
}

/* ---- Espace client (lecture) ---- */

export type ProjectStatus = 'run' | 'review' | 'done' | 'pause';

export interface Milestone {
  label: string;
  date: string;
  state: 'done' | 'now' | 'todo';
}

export interface ProjectDocument {
  name: string;
  size: string;
}

export interface ActivityItem {
  title: string;
  text: string;
  date: string;
}

export interface ClientProject {
  id: string;
  title: string;
  type: string;
  icon: 'web' | 'app';
  status: ProjectStatus;
  statusLabel: string;
  progress: number;
  startedOn: string;
  dueOn: string;
  lead: string;
  summary: string;
  milestones: Milestone[];
  activity: ActivityItem[];
  documents: ProjectDocument[];
}

export interface ClientProfile {
  firstName: string;
  fullName: string;
  org: string;
  initials: string;
}
