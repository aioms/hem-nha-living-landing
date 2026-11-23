import type { Language } from '../i18n/translations';
import { getFaqs } from './faqs';
import { LANDINGS } from './landings';
import { ORIGIN, findRoute, localizedPath, languageFromPath, type Route, type LandingId } from './routes';
import { ROOMS } from '../data/rooms';
import { DIY_LIVING_ROOMS } from '../data/diyLivingRooms';
import { LANDING_IMAGES } from '../components/LandingPage';
import manifest from '../../.generated/image-manifest.json';

const manifestMap = manifest as Record<string, { src: string; width: number; height: number }>;

export function getRouteOg(route: Route | undefined, language: Language): { image: string; alt: string } {
  if (!route) {
    return {
      image: ORIGIN + '/assets/og/hem-nha-living.jpg',
      alt: language === 'vi' ? 'Hẻm Nhà Living — Tân Thuận, Quận 7, TP.HCM' : 'Hẻm Nhà Living — Tan Thuan, District 7, HCMC',
    };
  }
  if (route.roomId) {
    const homestay = ROOMS.find(r => r.id === route.roomId);
    if (homestay) {
      const alts: Record<string, [string, string]> = {
        'som-mai': ['Phòng homestay Sớm Mai — Không gian sofa thư giãn với đèn mây bồng bềnh và ánh nắng sớm', 'Sớm Mai homestay room — Lounge with cloud light and morning sunlight'],
        'trua-he': ['Phòng homestay Mơ Trưa — Không gian phòng khách ấm cúng với sofa êm ái và mảng tường cam đất', 'Mơ Trưa homestay room — Warm lounge with terracotta wall and sofa'],
        'hoang-hon': ['Phòng homestay Hoàng Hôn — Không gian phòng ngủ ấm áp với giường nệm êm ái, rèm sáo và đèn trần cam hổ phách', 'Hoàng Hôn homestay room — Warm bedroom with comfortable bed, blinds and amber ceiling light'],
        'dem-sao': ['Phòng homestay Đêm Sao — Giường Queen êm ái, màn chiếu thư giãn và không gian tone xanh đêm', 'Đêm Sao homestay room — Deep blue nocturnal atmosphere with Queen bed and projector'],
      };
      const key = route.roomId === 'trua-he' ? 'mo-trua' : route.roomId;
      return {
        image: `${ORIGIN}/assets/og/og-${key}.jpg`,
        alt: alts[route.roomId]?.[language === 'vi' ? 0 : 1] || homestay.name,
      };
    }
    const studio = DIY_LIVING_ROOMS.find(r => r.id === route.roomId);
    if (studio) {
      const alts: Record<string, [string, string]> = {
        'hem-diy-1': ['Studio Hẻm DIY 1 — Sân hiên riêng với cửa sổ gập mở và giàn lam gỗ pergola', 'Hẻm DIY 1 studio — Private patio with wooden pergola and fold-out windows'],
        'hem-diy-2': ['Studio Hẻm DIY 2 — Phòng ngủ ấm cúng bên bậu cửa sổ ngập tràn cây xanh', 'Hẻm DIY 2 studio — Cozy bedroom by window nook overlooking green trees'],
        'hem-minimal': ['Studio Hẻm Minimal — Không gian tối giản tinh tế ngập tràn ánh sáng tự nhiên', 'Hẻm Minimal studio — Minimalist living space with natural light'],
        'hem-japandi': ['Studio Hẻm Japandi — Phòng ngủ phong cách Japandi ấm áp với nội thất gỗ sáng', 'Hẻm Japandi studio — Warm Japandi bedroom with natural oak furniture'],
        'mo-japandi': ['Studio Mo-Japandi — Không gian làm việc và nghỉ ngơi với bàn làm việc gỗ tự nhiên', 'Mo-Japandi studio — Living and workspace with natural wood desk'],
        'hem-scandi': ['Studio Hẻm Scandi — Không gian phòng khách và góc làm việc phong cách Scandinavian thanh lịch', 'Hẻm Scandi studio — Elegant Scandinavian lounge and workspace'],
      };
      return {
        image: `${ORIGIN}/assets/og/og-${route.roomId}.jpg`,
        alt: alts[route.roomId]?.[language === 'vi' ? 0 : 1] || studio.name,
      };
    }
  }
  if (route.landing) {
    const landingOg: Record<LandingId, { file: string; vi: string; en: string }> = {
      'homestay-quan-7': {
        file: 'og-landing-homestay-quan-7.jpg',
        vi: 'Homestay Quận 7 tại Hẻm Nhà Living — Phòng Sớm Mai đón ánh sáng tự nhiên',
        en: 'Homestay in District 7 at Hẻm Nhà Living — Sớm Mai room with natural sunlight',
      },
      'short-stay-district-7': {
        file: 'og-landing-short-stay-district-7.jpg',
        vi: 'Short stay in District 7 at Hẻm Nhà Living — Phòng Sớm Mai',
        en: 'Short stay in District 7 at Hẻm Nhà Living — Sớm Mai room with morning sunlight',
      },
      'studio-thue-thang-quan-7': {
        file: 'og-landing-studio-thue-thang-quan-7.jpg',
        vi: 'Studio thuê tháng Quận 7 tại Hẻm Nhà Living — Studio Mo-Japandi đầy đủ nội thất',
        en: 'Monthly studio in District 7 at Hẻm Nhà Living — Furnished Mo-Japandi studio',
      },
      'monthly-studio-district-7': {
        file: 'og-landing-monthly-studio-district-7.jpg',
        vi: 'Monthly studio in District 7 at Hẻm Nhà Living — Studio Mo-Japandi',
        en: 'Monthly studio in District 7 at Hẻm Nhà Living — Furnished Mo-Japandi studio',
      },
      'homestay-gan-phu-my-hung': {
        file: 'og-landing-homestay-gan-phu-my-hung.jpg',
        vi: 'Homestay gần Phú Mỹ Hưng — Phòng Mơ Trưa ấm cúng tại Hẻm Nhà Living',
        en: 'Homestay near Phu My Hung — Mơ Trưa room at Hẻm Nhà Living',
      },
      'cho-o-gan-secc': {
        file: 'og-landing-cho-o-gan-secc.jpg',
        vi: 'Chỗ ở gần SECC Quận 7 — Phòng Đêm Sao với màn chiếu tại Hẻm Nhà Living',
        en: 'Stay near SECC District 7 — Đêm Sao room with projector at Hẻm Nhà Living',
      },
    };
    const item = landingOg[route.landing];
    if (item) {
      return {
        image: `${ORIGIN}/assets/og/${item.file}`,
        alt: language === 'vi' ? item.vi : item.en,
      };
    }
  }
  if (route.view === 'moments') {
    return {
      image: `${ORIGIN}/assets/og/og-homestay.jpg`,
      alt: language === 'vi' ? 'Hẻm Nhà Moments — Bốn khoảnh khắc homestay tại Quận 7' : 'Hẻm Nhà Moments — Four homestay moments in District 7',
    };
  }
  if (route.view === 'diy-living') {
    return {
      image: `${ORIGIN}/assets/og/og-thue-thang.jpg`,
      alt: language === 'vi' ? 'Studio Hẻm DIY & Living — Bảng phòng thuê tuần, tháng, năm tại Quận 7' : 'Hẻm DIY & Living studios — Weekly, monthly and annual rooms in District 7',
    };
  }
  if (route.view === 'cafe') {
    return {
      image: `${ORIGIN}/assets/og/og-cafe.jpg`,
      alt: language === 'vi' ? 'Quando Quando Cafe — Góc cà phê, sách và đĩa than tại Quận 7' : 'Quando Quando Cafe — Coffee, books and vinyl in District 7',
    };
  }
  if (route.view === 'amenities') {
    return {
      image: `${ORIGIN}/assets/og/og-tien-ich.jpg`,
      alt: language === 'vi' ? 'Rooftop, bàn bida và tiện ích chung tại Hẻm Nhà Living' : 'Rooftop, billiards and shared spaces at Hẻm Nhà Living',
    };
  }
  return {
    image: `${ORIGIN}/assets/og/hem-nha-living.jpg`,
    alt: language === 'vi' ? 'Hẻm Nhà Living — Tân Thuận, Quận 7, TP.HCM' : 'Hẻm Nhà Living — Tan Thuan, District 7, HCMC',
  };
}

function getPagePrimaryPhoto(route: Route | undefined, language: Language): { url: string; width: number; height: number; caption: string } {
  let photoPath = '/assets/photos/architecture/facade-main.webp';
  let caption = language === 'vi' ? 'Mặt tiền boutique của Hẻm Nhà Living — ngôi nhà 5 tầng với ban công vòm' : 'Boutique facade of Hẻm Nhà Living — 5-storey townhouse with arch balconies';

  if (route?.roomId) {
    const homestay = ROOMS.find(r => r.id === route.roomId);
    if (homestay) {
      photoPath = homestay.images[0]?.url || photoPath;
      caption = homestay.images[0]?.caption || `Phòng ${homestay.name}`;
    } else {
      const studio = DIY_LIVING_ROOMS.find(r => r.id === route.roomId);
      if (studio) {
        photoPath = studio.images[0]?.url || photoPath;
        caption = studio.images[0]?.caption || studio.name;
      }
    }
  } else if (route?.landing && LANDING_IMAGES[route.landing]) {
    photoPath = LANDING_IMAGES[route.landing].src;
    caption = LANDING_IMAGES[route.landing].alt;
  } else if (route?.view === 'cafe') {
    photoPath = '/assets/photos/cafe/cafe-main-lounge.webp';
    caption = language === 'vi' ? 'Không gian lounge chính của Quando Quando Cafe' : 'Main lounge of Quando Quando Cafe';
  } else if (route?.view === 'amenities') {
    photoPath = '/assets/photos/amenities/rooftop/rooftop-billiards-sunset.webp';
    caption = language === 'vi' ? 'Khu vực rooftop ngắm hoàng hôn với bàn bida và quầy bar tại Hẻm Nhà Living' : 'Rooftop terrace sunset with billiards and bar at Hẻm Nhà Living';
  } else if (route?.view === 'moments') {
    photoPath = '/assets/photos/rooms/som-mai/hero.webp';
    caption = language === 'vi' ? 'Không gian sofa thư giãn với đèn mây bồng bềnh và ánh nắng sớm' : 'Sunlit relaxation lounge with cloud pendant and morning light';
  } else if (route?.view === 'diy-living') {
    photoPath = '/assets/photos/diy-living/mo-japandi/page_085.jpeg';
    caption = language === 'vi' ? 'Studio Mo-Japandi tại Hẻm Nhà Living' : 'Mo-Japandi studio at Hẻm Nhà Living';
  }

  const manifestEntry = manifestMap[photoPath];
  return {
    url: ORIGIN + (manifestEntry?.src || photoPath),
    width: manifestEntry?.width || 1600,
    height: manifestEntry?.height || 1066,
    caption,
  };
}

export function routeSitemapImages(path: string): { url: string; title: string; caption?: string }[] {
  const route = findRoute(path);
  const images: { url: string; title: string; caption?: string }[] = [];
  const add = (photoPath: string, title: string, caption?: string) => {
    const optimized = manifestMap[photoPath]?.src;
    if (optimized) {
      images.push({ url: ORIGIN + optimized, title, caption });
    }
  };

  if (route?.roomId) {
    const homestay = ROOMS.find(r => r.id === route.roomId);
    if (homestay) {
      for (const img of homestay.images) {
        add(img.url, `Phòng ${homestay.name} — Hẻm Nhà Living`, img.caption);
      }
    } else {
      const studio = DIY_LIVING_ROOMS.find(r => r.id === route.roomId);
      if (studio) {
        for (const img of studio.images) {
          add(img.url, `${studio.name} — Hẻm Nhà Living`, img.caption);
        }
      }
    }
  } else if (route?.landing && LANDING_IMAGES[route.landing]) {
    const lImg = LANDING_IMAGES[route.landing];
    const page = LANDINGS[route.landing];
    add(lImg.src, `${page.breadcrumb} — Hẻm Nhà Living`, lImg.alt);
  } else if (route?.view === 'cafe') {
    add('/assets/photos/cafe/cafe-main-lounge.webp', 'Quando Quando Cafe — Hẻm Nhà Living', 'Không gian lounge chính của Quando Quando Cafe');
    add('/assets/photos/cafe/cafe-bar.webp', 'Quầy bar Quando Quando Cafe', 'Quầy bar pha chế cà phê tại Quando Quando Cafe');
    add('/assets/photos/cafe/cafe-library-nook.webp', 'Góc sách Quando Quando Cafe', 'Góc đọc sách thư giãn và đĩa than tại Quando Quando Cafe');
  } else if (route?.view === 'amenities') {
    add('/assets/photos/amenities/rooftop/rooftop-billiards-sunset.webp', 'Rooftop Hẻm Nhà Living', 'Khu vực rooftop ngắm hoàng hôn với bàn bida tại Hẻm Nhà Living');
    add('/assets/photos/amenities/rooftop/rooftop-foosball.webp', 'Bi lắc Rooftop Hẻm Nhà Living', 'Bàn bi lắc giải trí trên sân thượng');
    add('/assets/photos/amenities/laundry/laundry-lounge.webp', 'Giặt sấy tự phục vụ Hẻm Nhà Living', 'Khu vực giặt sấy tự phục vụ thanh toán QR');
  } else if (route?.view === 'moments') {
    add('/assets/photos/rooms/som-mai/hero.webp', 'Phòng Sớm Mai — Hẻm Nhà Living', 'Không gian sofa thư giãn với đèn mây bồng bềnh và ánh nắng sớm');
    add('/assets/photos/rooms/trua-he/hero.webp', 'Phòng Mơ Trưa — Hẻm Nhà Living', 'Không gian phòng khách Mơ Trưa ấm cúng');
    add('/assets/photos/rooms/hoang-hon/hero.webp', 'Phòng Hoàng Hôn — Hẻm Nhà Living', 'Không gian phòng khách Hoàng Hôn ấm áp');
    add('/assets/photos/rooms/dem-sao/hero.webp', 'Phòng Đêm Sao — Hẻm Nhà Living', 'Phòng homestay Đêm Sao với giường Queen và màn chiếu');
  } else if (route?.view === 'diy-living') {
    add('/assets/photos/diy-living/mo-japandi/page_085.jpeg', 'Studio Mo-Japandi — Hẻm Nhà Living', 'Studio Mo-Japandi với góc làm việc bàn gỗ tự nhiên');
    add('/assets/photos/diy-living/hem-scandi/page_090.jpeg', 'Studio Hẻm Scandi — Hẻm Nhà Living', 'Studio phong cách Scandinavian thanh lịch');
    add('/assets/photos/diy-living/hem-diy-1/page_016.jpeg', 'Studio Hẻm DIY 1 — Hẻm Nhà Living', 'Sân hiên riêng với cửa sổ gập mở và giàn lam gỗ pergola');
  } else {
    add('/assets/photos/architecture/facade-main.webp', 'Hẻm Nhà Living', 'Mặt tiền boutique của Hẻm Nhà Living tại 19/8A Tân Thuận Tây, Quận 7');
    add('/assets/photos/architecture/facade-entrance.webp', 'Lối vào Hẻm Nhà Living', 'Lối vào boutique của Hẻm Nhà Living');
    add('/assets/photos/courtyard/atrium-tree.webp', 'Giếng trời Hẻm Nhà Living', 'Giếng trời ngập ánh sáng tự nhiên với cây xanh');
  }

  return images;
}

export function metadata(path: string, language: Language) {
  const route = findRoute(path);
  const index = language === 'vi' ? 0 : 1;
  const og = getRouteOg(route, language);
  return {
    title: route?.title[index] || (language === 'vi' ? 'Không tìm thấy trang | Hẻm Nhà Living' : 'Page not found | Hẻm Nhà Living'),
    description: route?.description[index] || 'Hẻm Nhà Living — 19/8A Tân Thuận Tây, Quận 7, TP.HCM.',
    canonical: ORIGIN + localizedPath(route?.path || path, language),
    image: og.image,
    imageAlt: og.alt,
    imageWidth: '1200',
    imageHeight: '630',
    route,
  };
}

export function structuredData(route: Route, language: Language) {
  const canonical = ORIGIN + localizedPath(route.path, language);
  const businessId = ORIGIN + '/#business';
  const address = { '@type': 'PostalAddress', streetAddress: '19/8A Tân Thuận Tây, Tân Thuận, Quận 7', addressLocality: 'Thành phố Hồ Chí Minh', addressRegion: 'Thành phố Hồ Chí Minh', addressCountry: 'VN' };
  const primary = getPagePrimaryPhoto(route, language);

  const businessPhotos = [
    ORIGIN + '/assets/og/hem-nha-living.jpg',
    ORIGIN + (manifestMap['/assets/photos/architecture/facade-main.webp']?.src || '/assets/photos/architecture/facade-main.webp'),
    ORIGIN + (manifestMap['/assets/photos/architecture/facade-entrance.webp']?.src || '/assets/photos/architecture/facade-entrance.webp'),
    ORIGIN + (manifestMap['/assets/photos/courtyard/atrium-tree.webp']?.src || '/assets/photos/courtyard/atrium-tree.webp'),
    ORIGIN + (manifestMap['/assets/photos/rooms/som-mai/hero.webp']?.src || '/assets/photos/rooms/som-mai/hero.webp'),
    ORIGIN + (manifestMap['/assets/photos/rooms/trua-he/hero.webp']?.src || '/assets/photos/rooms/trua-he/hero.webp'),
    ORIGIN + (manifestMap['/assets/photos/rooms/hoang-hon/hero.webp']?.src || '/assets/photos/rooms/hoang-hon/hero.webp'),
    ORIGIN + (manifestMap['/assets/photos/rooms/dem-sao/hero.webp']?.src || '/assets/photos/rooms/dem-sao/hero.webp'),
    ORIGIN + (manifestMap['/assets/photos/diy-living/mo-japandi/page_085.jpeg']?.src || '/assets/photos/diy-living/mo-japandi/page_085.jpeg'),
    ORIGIN + (manifestMap['/assets/photos/diy-living/hem-scandi/page_090.jpeg']?.src || '/assets/photos/diy-living/hem-scandi/page_090.jpeg'),
    ORIGIN + (manifestMap['/assets/photos/amenities/rooftop/rooftop-billiards-sunset.webp']?.src || '/assets/photos/amenities/rooftop/rooftop-billiards-sunset.webp'),
    ORIGIN + (manifestMap['/assets/photos/cafe/cafe-main-lounge.webp']?.src || '/assets/photos/cafe/cafe-main-lounge.webp'),
  ];

  const graph: Record<string, unknown>[] = [
    { '@type': 'LodgingBusiness', '@id': businessId, name: 'Hẻm Nhà Living', url: ORIGIN + '/', logo: ORIGIN + '/assets/branding/logo.jpeg', image: businessPhotos, description: language === 'vi' ? 'Homestay, studio thuê tuần/tháng/năm, Quando Quando Cafe và rooftop tại Quận 7, TP.HCM. Dự kiến đón khách tháng 12/2026.' : 'Homestay, weekly/monthly/annual studios, Quando Quando Cafe and rooftop in District 7, Ho Chi Minh City. Planned opening: December 2026.', telephone: '+84912254657', email: 'hii.hemnhaliving@gmail.com', address, geo: { '@type': 'GeoCoordinates', latitude: 10.7483367, longitude: 106.7266712 }, hasMap: 'https://maps.app.goo.gl/AoTNEA5Tfnqa4qhK8', sameAs: ['https://www.facebook.com/profile.php?id=61594197129289', 'https://www.instagram.com/hemnhaliving/'], checkinTime: '14:00', checkoutTime: '12:00', amenityFeature: ['Quando Quando Cafe', 'Rooftop', 'Bida / Billiards', 'Bi lắc / Foosball', 'Wifi', 'Giặt sấy / Self-service laundry'].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })) },
    { '@type': 'WebSite', '@id': ORIGIN + '/#website', url: ORIGIN + '/', name: 'Hẻm Nhà Living', publisher: { '@id': businessId }, inLanguage: ['vi', 'en'] },
    {
      '@type': 'WebPage',
      '@id': canonical + '#webpage',
      url: canonical,
      name: route.title[language === 'vi' ? 0 : 1],
      description: route.description[language === 'vi' ? 0 : 1],
      inLanguage: language,
      isPartOf: { '@id': ORIGIN + '/#website' },
      about: { '@id': businessId },
      primaryImageOfPage: { '@id': canonical + '#primaryimage' },
      image: {
        '@type': 'ImageObject',
        '@id': canonical + '#primaryimage',
        url: primary.url,
        contentUrl: primary.url,
        width: primary.width,
        height: primary.height,
        caption: primary.caption,
      },
    },
    {
      '@type': 'ImageObject',
      '@id': canonical + '#primaryimage',
      url: primary.url,
      contentUrl: primary.url,
      width: primary.width,
      height: primary.height,
      caption: primary.caption,
    },
    { '@type': 'FAQPage', '@id': canonical + '#faq', inLanguage: language, mainEntity: (route.landing ? LANDINGS[route.landing].faqs : getFaqs(language, route.view === 'faq')).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];

  if (route.roomId) {
    const homestay = ROOMS.find(r => r.id === route.roomId);
    const studio = DIY_LIVING_ROOMS.find(r => r.id === route.roomId);
    const room = homestay || studio;
    if (room) {
      const isHomestay = !!homestay;
      const roomPhotoUrls = room.images.map(img => ORIGIN + (manifestMap[img.url]?.src || img.url));
      graph.push({
        '@type': isHomestay ? 'HotelRoom' : 'Accommodation',
        '@id': canonical + '#room',
        name: room.name,
        description: route.description[language === 'vi' ? 0 : 1],
        image: roomPhotoUrls,
        containedInPlace: { '@id': businessId },
        occupancy: {
          '@type': 'QuantitativeValue',
          value: 2,
        },
        bed: room.bedType,
      });
    }
  }

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
    if (route.landing !== 'studio-thue-thang-quan-7' && route.landing !== 'monthly-studio-district-7') graph.find(node => node['@type'] === 'LodgingBusiness')!.numberOfRooms = 4;
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
  const { title, description, canonical, image, imageAlt, imageWidth, imageHeight, route } = metadata(path, language);
  const meta = (key: string, value: string, property = false) => `<meta data-seo ${property ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}" />`;
  return [
    `<title data-seo>${escapeHtml(title)}</title>`, meta('description', description), meta('robots', route ? 'index, follow, max-image-preview:large' : 'noindex, follow'),
    `<link data-seo rel="canonical" href="${escapeHtml(canonical)}" />`,
    ...alternates(route, path).map(([lang, href]) => `<link data-seo rel="alternate" hreflang="${lang}" href="${escapeHtml(href)}" />`),
    meta('og:type', 'website', true), meta('og:site_name', 'Hẻm Nhà Living', true), meta('og:locale', language === 'vi' ? 'vi_VN' : 'en_US', true), meta('og:locale:alternate', language === 'vi' ? 'en_US' : 'vi_VN', true), meta('og:url', canonical, true), meta('og:title', title, true), meta('og:description', description, true), meta('og:image', image, true), meta('og:image:width', imageWidth, true), meta('og:image:height', imageHeight, true), meta('og:image:alt', imageAlt, true),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', title), meta('twitter:description', description), meta('twitter:image', image), meta('twitter:image:alt', imageAlt),
    route ? `<script data-seo type="application/ld+json">${jsonLd(structuredData(route, language))}</script>` : '',
  ].join('\n    ');
}

export function updateHead(path: string, language: Language) {
  document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
  document.head.insertAdjacentHTML('beforeend', renderHead(path, language));
  document.documentElement.lang = language;
}
