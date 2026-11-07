/* Les 10 solutions métiers. Pour en ajouter une : créer son fichier dans ce
   dossier, l'ajouter à la liste ci-dessous et au méga-menu (content/navigation.ts). */
import type { Solution } from '../types';
import { solution as eClinique } from './e-clinique';
import { solution as eConnaissance } from './e-connaissance';
import { solution as eEmploi } from './e-emploi';
import { solution as eGarage } from './e-garage';
import { solution as fne } from './fne';
import { solution as hr } from './hr';
import { solution as odoo } from './odoo';
import { solution as paie } from './paie';
import { solution as schoolManager } from './school-manager';
import { solution as scraperPro } from './scraper-pro';

export const solutions: Solution[] = [eClinique, eConnaissance, eEmploi, eGarage, fne, hr, odoo, paie, schoolManager, scraperPro].sort((a, b) => a.order - b.order);

export function getSolution(slug: string | undefined): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
