import { HALLS } from '@/data/halls';
import { SITE } from '@/config/site';

function absoluteUrl(path: string, origin: string) {
  if (path.startsWith('http')) return path;
  const base = origin.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
  isProperty = attr === 'property'
) {
  const selector = isProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    if (isProperty) {
      el.setAttribute('property', key);
    } else {
      el.setAttribute('name', key);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function getPageOrigin() {
  if (SITE.siteUrl) return SITE.siteUrl.replace(/\/$/, '');
  if (typeof window === 'undefined') return '';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (base && base !== '') {
    return `${window.location.origin}${base}`;
  }
  return window.location.origin;
}

export function applySeoMetadata() {
  const origin = getPageOrigin();
  const title = `${SITE.name} — ${SITE.tagline} в Москве | ${SITE.metro}`;
  const description = SITE.metaDescription;
  const canonical = origin ? absoluteUrl('/', origin) : '';
  const ogImage = origin ? absoluteUrl(SITE.ogImagePath, origin) : SITE.ogImagePath;

  document.title = title;
  document.documentElement.lang = SITE.locale.split('_')[0];

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'keywords', SITE.keywords);
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
  upsertMeta('name', 'author', SITE.name);
  upsertMeta('name', 'theme-color', '#0A0A0A');

  if (canonical) {
    upsertLink('canonical', canonical);
  }

  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:locale', SITE.locale);
  upsertMeta('property', 'og:site_name', SITE.name);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:image', ogImage);
  if (canonical) {
    upsertMeta('property', 'og:url', canonical);
  }

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', ogImage);

  upsertMeta('name', 'geo.region', 'RU-MOW');
  upsertMeta('name', 'geo.placename', 'Москва');
}

export function buildLocalBusinessJsonLd(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NightClub',
    name: SITE.name,
    description: SITE.metaDescription,
    url: origin || undefined,
    telephone: SITE.phone.href.replace('tel:', ''),
    image: origin ? absoluteUrl(SITE.ogImagePath, origin) : SITE.ogImagePath,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: 'Москва',
      addressCountry: 'RU',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Караоке', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Индивидуальные залы', value: true },
    ],
    numberOfRooms: HALLS.length,
  };
}

export function injectJsonLd(origin: string) {
  const id = 'harizma-jsonld';
  document.getElementById(id)?.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(buildLocalBusinessJsonLd(origin));
  document.head.appendChild(script);
}
