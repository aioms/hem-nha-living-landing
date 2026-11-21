import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const paths = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>https:\/\/hemnhaliving.com([^<]*)<\/loc>/g)].map(match => match[1]);

test.beforeEach(async ({ page }) => {
  // No external maps/font/social requests or booking writes during local verification.
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

test('all routes serve their own HTML and hydrate without React errors', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /hydrat|react|#4\d\d/i.test(message.text())) errors.push(message.text()); });
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const raw = await response.text();
    expect(raw).toContain('data-prerendered="true"');
    expect(raw).toContain('application/ld+json');
    expect(raw).toContain('0912254657');
    expect(raw).toContain(`rel="canonical" href="https://hemnhaliving.com${path}"`);
    await page.goto(path);
    const lang = /^\/en(?:\/|$)/.test(path) ? 'en' : 'vi';
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://hemnhaliving.com' + path);
    await expect(page.locator('main h1')).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test('navigation, language, policy tabs, legacy hashes and history stay functional', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { (window as Window & { seoProbe?: boolean }).seoProbe = true; });
  await page.locator('nav a[href="/homestay"]').first().click();
  await expect(page).toHaveURL(/\/homestay$/);
  await page.locator('main a[href="/homestay/mo-trua"]').click();
  await expect(page.locator('main h1')).toHaveText('Mơ Trưa');
  await expect(page).toHaveTitle(/Mơ Trưa/);
  expect(await page.evaluate(() => (window as Window & { seoProbe?: boolean }).seoProbe)).toBe(true);
  await page.locator('nav a[href="/en/homestay/mo-trua"]').first().click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/District 7 homestay/);
  await expect(page.locator('main')).toContainText('2 adults', { ignoreCase: true });
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://hemnhaliving.com/homestay/mo-trua');
  await page.goForward();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/#moments/trua-he');
  await expect(page).toHaveURL(/\/homestay\/mo-trua$/);
  await expect(page.locator('main h1')).toHaveText('Mơ Trưa');
  await page.goto('/#diy-living/hem-scandi');
  await expect(page).toHaveURL(/\/thue-thang\/hem-scandi$/);
  await expect(page.locator('main')).toContainText('3.x M đ');
  await expect(page.locator('main')).toContainText('8.x M đ');
  await page.goto('/chinh-sach');
  await page.locator('main a[href="/chinh-sach-bao-mat"]').first().click();
  await expect(page).toHaveURL(/\/chinh-sach-bao-mat$/);
  await expect(page.locator('#privacy-policy')).toBeAttached();
  await expect(page.locator('#cancellation-policy')).toHaveCount(0);
  await page.goto('/');
  await page.locator('nav a[href="/#contact"]').first().click();
  await expect(page).toHaveURL(/#contact$/);
  await expect.poll(() => page.locator('#contact').evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(100);
});

test('HTML works without JavaScript on desktop and mobile', async ({ browser }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport, locale: 'en-US' });
    const page = await context.newPage();
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    for (const path of ['/', '/homestay/mo-trua', '/thue-thang', '/cafe', '/faq', '/dieu-khoan', '/en/faq']) {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', path.startsWith('/en') ? 'en' : 'vi');
      const visibleContent = path === '/' ? page.locator('main p').first() : page.locator('main h1');
      await expect(visibleContent).toHaveCSS('opacity', '1');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBe(true);
      const firstImage = page.locator('main img').first();
      if (await firstImage.count()) {
        await expect.poll(() => firstImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }
    }
    // Native links still reach another pre-rendered document with scripting disabled.
    await page.goto('/homestay/mo-trua');
    await page.locator('main a[href="/homestay"]').first().click();
    await expect(page.locator('main')).toContainText('Chọn khoảnh khắc');
    await context.close();
  }
});

test('mobile menu, room detail and booking controls still work without submission', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/homestay/mo-trua');
  await page.getByRole('button', { name: /menu/i }).click();
  await page.locator('nav a[href="/cafe"]').last().click();
  await expect(page).toHaveURL(/\/cafe$/);
  await expect(page.locator('main h1')).toContainText('Quando');
  await page.goto('/homestay/mo-trua');
  await page.getByRole('button', { name: /Chi tiết|Xem chi tiết/ }).click();
  await expect(page.getByRole('button', { name: /Đặt phòng|Đặt ngay|Chọn phòng/ }).last()).toBeAttached();
});

for (const language of ['vi', 'en'] as const) {
  test(`owner decisions remain consistent in studio modals and booking (${language})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const prefix = language === 'vi' ? '' : '/en';
    await page.goto(`${prefix}/thue-thang/hem-scandi`);
    await page.getByRole('button', { name: /Xem chi tiết Hẻm Scandi|View Details Hẻm Scandi/ }).click();
    const detail = page.getByRole('dialog');
    await expect(detail).toContainText('3.x M đ');
    await expect(detail).toContainText('8.x M đ');
    await expect(detail).toContainText(language === 'vi' ? 'Tầng 2' : '2nd Floor');
    await detail.getByRole('button', { name: /^(Đóng|Close)$/ }).click();
    await page.getByRole('button', { name: /Đăng ký thuê phòng Hẻm Scandi|Inquire & Apply Hẻm Scandi/ }).click();
    const booking = page.getByRole('dialog');
    await booking.locator('#monthstart').fill('2027-01-01');
    await booking.locator('#months').selectOption('3');
    await booking.getByRole('button', { name: /Tiếp tục chọn phòng|Continue to Select Room/ }).click();
    await expect(booking.getByRole('button', { name: /Chọn phòng Mo-Japandi|Select room Mo-Japandi/ })).toContainText('7.x M đ');
    await booking.getByRole('button', { name: /Chọn phòng Hẻm Scandi|Select room Hẻm Scandi/ }).click();
    await booking.getByRole('button', { name: /Tiếp tục →|Continue →/ }).click();
    await booking.locator('#fullName').fill('Local verification');
    await booking.locator('#phone').fill('0900000000');
    await booking.getByRole('button', { name: /Xem lại|Review details/ }).click();
    await expect(booking).toContainText(language === 'vi'
      ? '8.x M đ/tháng × 3 tháng · Liên hệ xác nhận tổng'
      : '8.x M đ/mo × 3 month(s) · Contact us for total');
    await expect(booking).toContainText(language === 'vi' ? 'Thuê dài hạn đặt cọc theo thỏa thuận.' : 'Long-term rentals have a deposit by agreement.');
    await expect(booking).toContainText(language === 'vi' ? 'Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ.' : 'Free cancellation up to 48 hours before check-in.');
    await expect(booking).not.toContainText(/30%|100%|8[.,]5\s*M|7[.,]9\s*M|2[.,]69\s*M/);
    expect(await booking.evaluate(el => el.scrollWidth <= window.innerWidth)).toBe(true);
    // No submission: never create a real lead during verification.
  });

  test(`homestay booking uses a 50% deposit and 48h cancellation (${language})`, async ({ page }) => {
    await page.goto(`${language === 'vi' ? '' : '/en'}/homestay/mo-trua`);
    await page.locator('main').getByRole('button', { name: /Kiểm tra & Đặt phòng|Check & Reserve/ }).click();
    const booking = page.getByRole('dialog');
    await booking.locator('#checkin').fill('2027-01-01');
    await booking.locator('#checkout').fill('2027-01-03');
    await booking.getByRole('button', { name: /Tiếp tục chọn phòng|Continue to Select Room/ }).click();
    await booking.getByRole('button', { name: /Chọn phòng Mơ Trưa|Select room Mơ Trưa/ }).click();
    await booking.getByRole('button', { name: /Tiếp tục →|Continue →/ }).click();
    await booking.locator('#fullName').fill('Local verification');
    await booking.locator('#phone').fill('0900000000');
    await booking.getByRole('button', { name: /Xem lại|Review details/ }).click();
    await expect(booking).toContainText('978K ₫');
    await expect(booking).toContainText(language === 'vi' ? 'Homestay ngắn ngày đặt cọc 50%.' : 'Short-stay homestays require a 50% deposit.');
    await expect(booking).toContainText(language === 'vi' ? 'Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ.' : 'Free cancellation up to 48 hours before check-in.');
  });
}

const landings = [
  { path: '/homestay-quan-7', lang: 'vi', title: 'Homestay Quận 7 tại Tân Thuận | Hẻm Nhà Living', h1: 'Homestay Quận 7 trong hẻm Tân Thuận', faqs: 8, hreflang: { vi: '/homestay-quan-7', en: '/en/short-stay-district-7' } },
  { path: '/studio-thue-thang-quan-7', lang: 'vi', title: 'Studio thuê tháng Quận 7 tại Tân Thuận | Hẻm Nhà Living', h1: 'Studio thuê tháng ở Tân Thuận, Quận 7', faqs: 8, hreflang: { vi: '/studio-thue-thang-quan-7' } },
  { path: '/en/short-stay-district-7', lang: 'en', title: 'Short Stay in District 7, Saigon | Hẻm Nhà Living', h1: 'A short stay in District 7 — Tan Thuan, not downtown', faqs: 10, hreflang: { vi: '/homestay-quan-7', en: '/en/short-stay-district-7' } },
  { path: '/homestay-gan-phu-my-hung', lang: 'vi', title: 'Homestay gần Phú Mỹ Hưng, Quận 7 | Hẻm Nhà Living', h1: 'Homestay gần Phú Mỹ Hưng — 4,1 km từ khu Tôn Dật Tiên', faqs: 8, hreflang: { vi: '/homestay-gan-phu-my-hung' } },
  { path: '/cho-o-gan-secc', lang: 'vi', title: 'Chỗ ở gần SECC Quận 7 — Homestay Hẻm Nhà Living', h1: 'Chỗ ở gần SECC — cách 3,8 km tại Tân Thuận, Quận 7', faqs: 7, hreflang: { vi: '/cho-o-gan-secc' } },
  { path: '/en/monthly-studio-district-7', lang: 'en', title: 'Monthly Studio in District 7, Saigon | Hẻm Nhà Living', h1: 'Monthly studio in District 7 — Tan Thuan, not a hotel tower', faqs: 8, hreflang: { vi: '/studio-thue-thang-quan-7', en: '/en/monthly-studio-district-7' } },
] as const;

for (const landing of landings) {
  test(`landing ${landing.path} has metadata, JSON-LD, sitemap entry and km-only copy`, async ({ page, request }) => {
    expect(paths).toContain(landing.path);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain(`<loc>https://hemnhaliving.com${landing.path}</loc>`);
    const llms = await (await request.get('/llms.txt')).text();
    expect(llms).toContain(`https://hemnhaliving.com${landing.path}`);
    const raw = await (await request.get(landing.path)).text();
    expect(raw).toContain(`<title data-seo>${landing.title}</title>`);
    expect(raw).toContain(`rel="canonical" href="https://hemnhaliving.com${landing.path}"`);
    expect(raw).toContain(`property="og:url" content="https://hemnhaliving.com${landing.path}"`);
    await page.goto(landing.path);
    await expect(page).toHaveTitle(landing.title);
    await expect(page.locator('html')).toHaveAttribute('lang', landing.lang);
    await expect(page.locator('main h1')).toHaveText(landing.h1);
    const hreflang = await page.locator('link[hreflang]').evaluateAll(nodes => Object.fromEntries(nodes.map(node => [node.getAttribute('hreflang'), node.getAttribute('href')])));
    expect(hreflang.vi).toBe('https://hemnhaliving.com' + landing.hreflang.vi);
    expect(hreflang['x-default']).toBe('https://hemnhaliving.com' + landing.hreflang.vi);
    expect(hreflang.en).toBe('en' in landing.hreflang ? 'https://hemnhaliving.com' + landing.hreflang.en : undefined);
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}')['@graph'] as Record<string, any>[];
    const types = graph.map(node => node['@type']);
    expect(types).toEqual(expect.arrayContaining(['LodgingBusiness', 'WebPage', 'BreadcrumbList', 'FAQPage']));
    const business = graph.find(node => node['@type'] === 'LodgingBusiness')!;
    if (landing.path.includes('studio')) {
      expect(business.numberOfRooms).toBeUndefined();
    } else {
      expect(business.numberOfRooms).toBe(4);
    }
    expect(graph.find(node => node['@type'] === 'FAQPage')!.mainEntity).toHaveLength(landing.faqs);
    expect(graph.find(node => node['@type'] === 'WebPage')!.about['@id']).toBe('https://hemnhaliving.com/#business');
    const text = await page.locator('main > section').first().innerText();
    expect(text).not.toMatch(/\b\d+\s*(phút|minutes?|mins?)\b/i);
    expect(text).toMatch(/\d(?:[.,]\d)? km/);
  });
}

test('existing pages keep visible text except the floor heading and loosened meta titles', async ({ page }) => {
  await page.goto('/thue-thang');
  await expect(page.locator('main')).toContainText('Tầng 2');
  await expect(page.locator('main')).not.toContainText('Tầng 2 — Tầng 4');
  await expect(page).toHaveTitle(/^Studio Hẻm DIY & Living/);
  await page.goto('/en/thue-thang');
  await expect(page.locator('main')).not.toContainText('Floors 2 — 4');
  await page.goto('/homestay');
  await expect(page).toHaveTitle(/^Hẻm Nhà Moments/);
});

test('prerendered hero text is visible when the JS bundle never runs', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: true });
  const page = await context.newPage();
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' && !url.pathname.endsWith('.js') ? route.continue() : route.abort();
  });
  await page.goto('/');
  await page.waitForTimeout(3200);
  await expect(page.locator('main p').first()).toHaveCSS('opacity', '1');
  await page.goto('/thue-thang');
  await page.waitForTimeout(3200);
  await expect(page.locator('main h1')).toHaveCSS('opacity', '1');
  await context.close();
});

test('hero still animates in for JS users', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true');
  await expect(page.locator('main p').first()).toHaveCSS('opacity', '1');
});
