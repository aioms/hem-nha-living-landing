import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import sharp from 'sharp';

const origin = 'https://hemnhaliving.com';
const sitemap = load(await readFile('dist/sitemap.xml', 'utf8'), { xml: true });
const urls = sitemap('loc').map((_, node) => sitemap(node).text()).get();
assert.equal(urls.length, 46);
const landings = { '/homestay-quan-7': { vi: '/homestay-quan-7', en: '/en/short-stay-district-7', faq: 8 }, '/studio-thue-thang-quan-7': { vi: '/studio-thue-thang-quan-7', faq: 8 }, '/en/short-stay-district-7': { vi: '/homestay-quan-7', en: '/en/short-stay-district-7', faq: 10 }, '/homestay-gan-phu-my-hung': { vi: '/homestay-gan-phu-my-hung', faq: 8 }, '/cho-o-gan-secc': { vi: '/cho-o-gan-secc', faq: 7 }, '/en/monthly-studio-district-7': { vi: '/studio-thue-thang-quan-7', en: '/en/monthly-studio-district-7', faq: 8 } };
assert.equal(new Set(urls).size, urls.length);
const titles = new Set(), descriptions = new Set(), links = new Map(), imagePaths = new Set();
const htmlFile = pathname => pathname === '/' ? 'dist/index.html' : path.join('dist', pathname + '.html');
const normalize = text => text.replace(/\s+/g, ' ').trim();
const obsoleteTerms = /30%|(?:100%[^.]{0,45}(?:deposit|room charge)|(?:cọc|thanh toán)[^.]{0,45}100%)|72\s*(?:giờ|hours?|h\b)|7\s*(?:ngày|days?)|(?:8500000|2690000|7900000)|(?:8[.,]500[.,]000|2[.,]690[.,]000|7[.,]900[.,]000)|(?:8[.,]5|2[.,]69|7[.,]9)\s*(?:M|triệu)|(?:tầng|floor|floors)\s*2\s*[–-]\s*4/i;
const approved = {
  vi: { cancellation: 'Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ.', deposit: 'Homestay ngắn ngày đặt cọc 50%. Thuê dài hạn (studio theo tuần, tháng hoặc năm) đặt cọc theo thỏa thuận.' },
  en: { cancellation: 'Free cancellation up to 48 hours before check-in.', deposit: 'Short-stay homestays require a 50% deposit. Long-term studio rentals (weekly, monthly or annual) have a deposit by agreement.' },
};
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const html = await readFile(htmlFile(pathname), 'utf8');
  const $ = load(html);
  const language = /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'vi';
  assert.equal($('html').attr('lang'), language, url);
  assert.equal($('title').length, 1, url);
  const title = $('title').text(), description = $('meta[name="description"]').attr('content');
  assert.ok(title.includes('Hẻm Nhà Living') && !titles.has(title), `Unique title: ${url}`);
  assert.ok(description && !descriptions.has(description), `Unique description: ${url}`);
  titles.add(title); descriptions.add(description);
  assert.equal($('link[rel="canonical"]').length, 1, url);
  assert.equal($('link[rel="canonical"]').attr('href'), url);
  assert.equal($('meta[property="og:url"]').attr('content'), url);
  assert.equal($('meta[property="og:title"]').attr('content'), title);
  assert.equal($('meta[property="og:description"]').attr('content'), description);
  assert.equal($('meta[property="og:locale"]').attr('content'), language === 'vi' ? 'vi_VN' : 'en_US');
  assert.equal($('meta[name="twitter:title"]').attr('content'), title);
  assert.equal($('meta[name="title"]').length, 0);
  assert.ok($('meta[property="og:image"]').attr('content').startsWith(origin + '/'));
  assert.equal($('meta[property="og:image:width"]').attr('content'), '1200');
  assert.equal($('meta[property="og:image:height"]').attr('content'), '630');
  const ogImg = $('meta[property="og:image"]').attr('content');
  assert.ok($('meta[property="og:image:alt"]').attr('content'), `OG image alt: ${url}`);
  assert.equal($('meta[name="twitter:image"]').attr('content'), ogImg);
  assert.ok($('meta[name="twitter:image:alt"]').attr('content'), `Twitter image alt: ${url}`);
  assert.ok($('meta[name="robots"]').attr('content').includes('max-image-preview:large'), `max-image-preview:large: ${url}`);
  const landing = landings[pathname];
  const vi = landing ? landing.vi : pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const en = landing ? landing.en : '/en' + (vi === '/' ? '' : vi);
  assert.equal($('link[hreflang]').length, 1 + (vi ? 1 : 0) + (en ? 1 : 0), url);
  assert.equal($('link[hreflang="vi"]').attr('href'), origin + vi);
  assert.equal($('link[hreflang="en"]').attr('href'), en ? origin + en : undefined);
  assert.equal($('link[hreflang="x-default"]').attr('href'), origin + vi);
  assert.equal($('main h1').length, 1, `One H1: ${url}`);
  const text = normalize($('main').text());
  assert.doesNotMatch(text, obsoleteTerms, `Owner decisions: ${url}`);
  assert.ok(text.includes(approved[language].cancellation), `48h cancellation in footer: ${url}`);
  assert.ok(text.includes(approved[language].deposit), `Deposit in footer FAQ: ${url}`);
  if (pathname.includes('chinh-sach-huy-phong') || /\/chinh-sach$/.test(pathname)) {
    assert.equal($('#cancellation-policy tbody tr').length, 2, `Single cancellation threshold: ${url}`);
    assert.ok(normalize($('#cancellation-policy').text()).includes(approved[language].deposit));
  }
  if (/\/thue-thang\/(?:mo-japandi|hem-scandi)$/.test(pathname)) {
    assert.ok(text.includes(pathname.endsWith('hem-scandi') ? '8.x M đ' : '7.x M đ'));
    assert.ok(text.includes(language === 'vi' ? 'Tầng 2' : '2nd Floor'));
    if (pathname.endsWith('hem-scandi')) assert.ok(text.includes('3.x M đ'));
  }
  assert.ok(text.length > 1000 && text.includes('0912254657') && /19\/8A/.test(text), `Real text/NAP: ${url}`);
  assert.ok(!html.includes('hemnhaliving.vn') && !text.includes('Trưa Hè') && !text.includes('trung tâm Sài Gòn'));
  assert.equal($('script[type="application/ld+json"]').length, 1);
  assert.doesNotMatch($('script[type="application/ld+json"]').text(), obsoleteTerms, `Schema terms: ${url}`);
  const graph = JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
  const business = graph.find(node => node['@type'] === 'LodgingBusiness');
  assert.equal(business.telephone, '+84912254657');
  assert.equal(business.url, origin + '/');
  assert.equal(business.geo.latitude, 10.7483367);
  assert.equal(business.geo.longitude, 106.7266712);
  assert.equal(business.address.addressCountry, 'VN');
  assert.ok(business.address.streetAddress.includes('19/8A') && business.sameAs.length >= 2);
  assert.ok(Array.isArray(business.image) && business.image.length >= 4, `LodgingBusiness image array: ${url}`);
  for (const imgUrl of business.image) {
    assert.ok(imgUrl.startsWith(origin + '/'), `Absolute image URL in LodgingBusiness: ${imgUrl}`);
  }
  const webpage = graph.find(node => node['@type'] === 'WebPage');
  assert.ok(webpage.image && webpage.image.url && webpage.image.width && webpage.image.height, `WebPage ImageObject: ${url}`);
  assert.ok(webpage.image.url.startsWith(origin + '/assets/optimized/'), `WebPage image URL: ${webpage.image.url}`);
  if (pathname.includes('/homestay/') || pathname.includes('/thue-thang/')) {
    const roomNode = graph.find(node => ['HotelRoom', 'Accommodation'].includes(node['@type']));
    assert.ok(roomNode, `Room schema on ${url}`);
    assert.ok(roomNode.name && Array.isArray(roomNode.image) && roomNode.image.length > 0, `Room schema properties on ${url}`);
    assert.equal(roomNode.containedInPlace['@id'], origin + '/#business', `Room containedInPlace on ${url}`);
  }
  assert.doesNotMatch(JSON.stringify(graph), /"(?:offers|price|priceRange)"/, 'No invented numeric offers/rates');
  const faq = graph.find(node => node['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, landing ? landing.faq : /\/faq$/.test(pathname) ? 13 : 5);
  if (landing) {
    assert.ok(graph.some(node => node['@type'] === 'BreadcrumbList' && node.itemListElement.length === 2), `Breadcrumb: ${url}`);
    assert.equal(graph.find(node => node['@type'] === 'WebPage').about['@id'], origin + '/#business');
    assert.ok(text.includes('0912254657') || text.includes('+84 912 254 657'));
    assert.doesNotMatch(normalize($('main > section').first().text()), /\b\d+\s*(?:phút|minutes?|mins?)\b/i, `Distances in km only: ${url}`);
  }
  for (const question of faq.mainEntity) {
    assert.ok(text.includes(normalize(question.name)), `Visible FAQ question: ${url}`);
    assert.ok(text.includes(normalize(question.acceptedAnswer.text)), `Visible FAQ answer: ${url}`);
  }
  const outgoing = [];
  for (const node of $('a[href]').toArray()) {
    const href = $(node).attr('href');
    const target = new URL(href, url);
    if (target.origin !== origin || !['http:', 'https:'].includes(target.protocol)) continue;
    assert.ok(urls.includes(origin + target.pathname), `Real internal link: ${href} on ${url}`);
    outgoing.push(origin + target.pathname);
    if (target.hash) {
      const targetHtml = load(await readFile(htmlFile(target.pathname), 'utf8'));
      assert.ok(targetHtml(`[id="${target.hash.slice(1)}"]`).length, `Anchor target: ${href}`);
    }
  }
  links.set(url, outgoing);
  for (const node of $('img').toArray()) {
    const img = $(node), src = img.attr('src');
    assert.ok(img.attr('alt') || img.attr('aria-hidden') === 'true', `Alt: ${src}`);
    assert.ok(img.attr('width') && img.attr('height'), `Intrinsic size: ${src}`);
    assert.ok(img.attr('loading'), `Loading: ${src}`);
    assert.ok(src.startsWith('/assets/optimized/') && img.attr('srcset') && img.attr('sizes'), `Responsive WebP: ${src}`);
    imagePaths.add(src);
    for (const variant of img.attr('srcset').split(', ')) imagePaths.add(variant.split(' ')[0]);
  }
}
const seen = new Set();
function walk(url) { if (seen.has(url)) return; seen.add(url); for (const target of links.get(url) || []) walk(target); }
walk(origin + '/');
assert.equal(seen.size, urls.length, 'Every page reachable through HTML links from homepage');
for (const src of imagePaths) {
  const meta = await sharp('dist' + src).metadata();
  assert.equal(meta.format, 'webp', src);
}
const ogFiles = [
  'hem-nha-living.jpg', 'og-homestay.jpg', 'og-som-mai.jpg', 'og-mo-trua.jpg', 'og-hoang-hon.jpg',
  'og-dem-sao.jpg', 'og-thue-thang.jpg', 'og-hem-diy-1.jpg', 'og-hem-diy-2.jpg', 'og-hem-minimal.jpg',
  'og-hem-japandi.jpg', 'og-mo-japandi.jpg', 'og-hem-scandi.jpg', 'og-cafe.jpg', 'og-tien-ich.jpg',
  'og-landing-homestay-quan-7.jpg', 'og-landing-short-stay-district-7.jpg',
  'og-landing-studio-thue-thang-quan-7.jpg', 'og-landing-monthly-studio-district-7.jpg',
  'og-landing-homestay-gan-phu-my-hung.jpg', 'og-landing-cho-o-gan-secc.jpg',
];
for (const file of ogFiles) {
  const meta = await sharp(`dist/assets/og/${file}`).metadata();
  assert.equal(meta.width, 1200, `OG width 1200 on ${file}`);
  assert.equal(meta.height, 630, `OG height 630 on ${file}`);
}
const sitemapRaw = await readFile('dist/sitemap.xml', 'utf8');
assert.ok(sitemapRaw.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'), 'Sitemap image namespace');
const sitemapDoc = load(sitemapRaw, { xml: true });
const imageLocs = sitemapDoc('image\\:loc').map((_, node) => sitemapDoc(node).text()).get();
assert.ok(imageLocs.length >= 46, `Sitemap has ${imageLocs.length} images (expected >= 46)`);
for (const loc of imageLocs) {
  assert.ok(loc.startsWith(origin + '/assets/optimized/'), `Sitemap image is optimized WebP: ${loc}`);
  const imgPath = 'dist' + new URL(loc).pathname;
  assert.ok(await access(imgPath).then(() => true, () => false), `Sitemap image exists: ${imgPath}`);
}
for (const file of ['robots.txt', 'llms.txt']) {
  const content = await readFile('dist/' + file, 'utf8');
  assert.equal(content, await readFile('public/' + file, 'utf8'));
  assert.doesNotMatch(content, obsoleteTerms, file);
}
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(origin + '/sitemap.xml'));
const notFound = load(await readFile('dist/404.html', 'utf8'));
assert.equal(notFound('meta[name="robots"]').attr('content'), 'noindex, follow');
assert.equal(notFound('main h1').length, 1);
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.ok(config.redirects.some(rule => rule.has?.some(item => item.value === 'www.hemnhaliving.com') && rule.statusCode === 301));
assert.ok(config.redirects.some(rule => rule.source === '/index.html' && rule.statusCode === 301));
assert.ok(!config.rewrites, 'No SPA catch-all that masks missing pages');
assert.ok(config.headers.every(rule => rule.headers.some(header => header.value.includes('31536000, immutable'))));
console.log(`PASS: ${urls.length} pages; unique metadata, full HTML/NAP, linked crawl graph, bilingual alternates, FAQ parity, ${imagePaths.size} real WebP derivatives, OG dimensions, discovery files and host configuration.`);
