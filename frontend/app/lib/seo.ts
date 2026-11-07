import type { MetaDescriptor } from 'react-router';
import { site } from '~/content/site';

/* Balises SEO d'une page : titre, description, canonical, Open Graph.
   Utilisation dans une route :
     export const meta = () => seo({ title: 'Contact', description: '…', path: '/contact' }); */
export function seo({
  title,
  description = site.description,
  path,
  image = site.ogImage,
  noindex = false,
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): MetaDescriptor[] {
  const fullTitle = title ? `${title} — TIC | ${site.legalName}` : site.name;
  const url = site.url + path;
  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: site.locale },
    { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: site.url + image },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
  if (noindex) tags.push({ name: 'robots', content: 'noindex' });
  return tags;
}

/** Données structurées schema.org de l'entreprise (page d'accueil). */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.legalName,
  alternateName: site.shortName,
  url: site.url,
  logo: site.url + '/assets/img/logo-tic.webp',
  image: site.url + site.ogImage,
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phoneHref,
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: `${site.contact.district}, ${site.contact.city}`,
    addressCountry: site.contact.countryCode,
  },
  areaServed: "Afrique de l'Ouest",
  sameAs: Object.values(site.social).filter(Boolean),
};
