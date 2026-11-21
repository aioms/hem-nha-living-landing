import type { Language } from '../i18n/translations';
import { getFaqs } from './faqs';
import { LANDINGS } from './landings';
import { ORIGIN, findRoute, localizedPath, type Route } from './routes';

export function metadata(path: string, language: Language) {
  const route = findRoute(path);
  const index = language === 'vi' ? 0 : 1;
  return {
    title: route?.title[index] || (language === 'vi' ? 'Không tìm thấy trang | Hẻm Nhà Living' : 'Page not found | Hẻm Nhà Living'),
    description: route?.description[index] || 'Hẻm Nhà Living — 19/8A Tân Thuận Tây, Quận 7, TP.HCM.',
    canonical: ORIGIN + localizedPath(route?.path || path, language),
    image: ORIGIN + '/assets/og/hem-nha-living.jpg',
    route,
  };
}
export function structuredData(route: Route, language: Language) {
  const canonical = ORIGIN + localizedPath(route.path, language);
  const businessId = ORIGIN + '/#business';
  const address = { '@type': 'PostalAddress', streetAddress: '19/8A Tân Thuận Tây, Tân Thuận, Quận 7', addressLocality: 'Thành phố Hồ Chí Minh', addressRegion: 'Thành phố Hồ Chí Minh', addressCountry: 'VN' };
  const graph: Record<string, unknown>[] = [
    { '@type': 'LodgingBusiness', '@id': businessId, name: 'Hẻm Nhà Living', url: ORIGIN + '/', logo: ORIGIN + '/assets/branding/logo.jpeg', image: ORIGIN + '/assets/og/hem-nha-living.jpg', description: language === 'vi' ? 'Homestay, studio thuê tuần/tháng/năm, Quando Quando Cafe và rooftop tại Quận 7, TP.HCM. Dự kiến đón khách tháng 12/2026.' : 'Homestay, weekly/monthly/annual studios, Quando Quando Cafe and rooftop in District 7, Ho Chi Minh City. Planned opening: December 2026.', telephone: '+84912254657', email: 'hii.hemnhaliving@gmail.com', address, geo: { '@type': 'GeoCoordinates', latitude: 10.7483367, longitude: 106.7266712 }, hasMap: 'https://maps.app.goo.gl/AoTNEA5Tfnqa4qhK8', sameAs: ['https://www.facebook.com/profile.php?id=61594197129289', 'https://www.instagram.com/hemnhaliving/'], checkinTime: '14:00', checkoutTime: '12:00', amenityFeature: ['Quando Quando Cafe', 'Rooftop', 'Bida / Billiards', 'Bi lắc / Foosball', 'Wifi', 'Giặt sấy / Self-service laundry'].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })) },
    { '@type': 'WebSite', '@id': ORIGIN + '/#website', url: ORIGIN + '/', name: 'Hẻm Nhà Living', publisher: { '@id': businessId }, inLanguage: ['vi', 'en'] },
    { '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: route.title[language === 'vi' ? 0 : 1], description: route.description[language === 'vi' ? 0 : 1], inLanguage: language, isPartOf: { '@id': ORIGIN + '/#website' }, about: { '@id': businessId } },
    { '@type': 'FAQPage', '@id': canonical + '#faq', inLanguage: language, mainEntity: (route.landing ? LANDINGS[route.landing].faqs : getFaqs(language, route.view === 'faq')).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
  if (route.landing) {
    const page = LANDINGS[route.landing];
    const webpage = graph.find(node => node['@type'] === 'WebPage')!;
    webpage.breadcrumb = { '@id': canonical + '#breadcrumb' };
    webpage.mainEntity = { '@id': canonical + '#faq' };
    graph.push({ '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumb', itemListElement: [
      { '@type': 'ListItem', position: 1, name: page.labels.home, item: ORIGIN + localizedPath('/', language) },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: canonical },
    ] });
    // Same business identity; the four homestay rooms are the only room count the owner has published.
    if (route.landing !== 'studio-thue-thang-quan-7') graph.find(node => node['@type'] === 'LodgingBusiness')!.numberOfRooms = 4;
  }
  if (route.view === 'cafe' || route.view === 'home') graph.push({ '@type': 'CafeOrCoffeeShop', '@id': ORIGIN + '/#quando-quando', name: 'Quando Quando Cafe', url: ORIGIN + localizedPath('/cafe', language), address, telephone: '+84912254657', containedInPlace: { '@id': businessId } });
  // Studio rates are intentionally blurred. Do not publish numeric Offer/priceRange or availability.
  return { '@context': 'https://schema.org', '@graph': graph };
}
export function escapeHtml(value: string) { return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!); }
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
function alternates(route: Route | undefined, path: string): [string, string][] {
  if (route?.alternates) {
    const { vi, en } = route.alternates;
    return [...(vi ? [['vi', ORIGIN + vi]] : []), ...(en ? [['en', ORIGIN + en]] : []), ['x-default', ORIGIN + (vi || en!)]] as [string, string][];
  }
  const base = route?.path || path;
  return [['vi', ORIGIN + localizedPath(base, 'vi')], ['en', ORIGIN + localizedPath(base, 'en')], ['x-default', ORIGIN + localizedPath(base, 'vi')]];
}
export function renderHead(path: string, language: Language) {
  const { title, description, canonical, image, route } = metadata(path, language);
  const meta = (key: string, value: string, property = false) => `<meta data-seo ${property ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}" />`;
  return [
    `<title data-seo>${escapeHtml(title)}</title>`, meta('description', description), meta('robots', route ? 'index, follow, max-image-preview:large' : 'noindex, follow'),
    `<link data-seo rel="canonical" href="${escapeHtml(canonical)}" />`,
    ...alternates(route, path).map(([lang, href]) => `<link data-seo rel="alternate" hreflang="${lang}" href="${escapeHtml(href)}" />`),
    meta('og:type', 'website', true), meta('og:site_name', 'Hẻm Nhà Living', true), meta('og:locale', language === 'vi' ? 'vi_VN' : 'en_US', true), meta('og:locale:alternate', language === 'vi' ? 'en_US' : 'vi_VN', true), meta('og:url', canonical, true), meta('og:title', title, true), meta('og:description', description, true), meta('og:image', image, true), meta('og:image:width', '1200', true), meta('og:image:height', '630', true), meta('og:image:alt', 'Hẻm Nhà Living — Tân Thuận, Quận 7, TP.HCM', true),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', title), meta('twitter:description', description), meta('twitter:image', image), meta('twitter:image:alt', 'Hẻm Nhà Living — Tân Thuận, Quận 7, TP.HCM'),
    route ? `<script data-seo type="application/ld+json">${jsonLd(structuredData(route, language))}</script>` : '',
  ].join('\n    ');
}
export function updateHead(path: string, language: Language) {
  document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
  document.head.insertAdjacentHTML('beforeend', renderHead(path, language));
  document.documentElement.lang = language;
}
