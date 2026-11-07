/* Les 6 portes (expertises). Pour ajouter une porte : créer son fichier
   dans ce dossier puis l'ajouter à la liste ci-dessous. */
import type { Service } from '../types';
import { service as developpementApplications } from './developpement-applications';
import { service as emailMarketing } from './email-marketing';
import { service as integrationHubspot } from './integration-hubspot';
import { service as migrationSiteWeb } from './migration-site-web';
import { service as uiUxDesign } from './ui-ux-design';
import { service as webDesign } from './web-design';

export const services: Service[] = [developpementApplications, emailMarketing, integrationHubspot, migrationSiteWeb, uiUxDesign, webDesign].sort((a, b) => a.order - b.order);

export function getService(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}
