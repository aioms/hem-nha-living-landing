import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});

async function expectNavLinkContrastOverSection(
  page: import('@playwright/test').Page,
  sectionId: string,
  linkSelector: string,
) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 40));

  const { ratio, linkR } = await page.evaluate(({ selector, sectionId: id }) => {
    const cssToRgba = (cssColor: string, fallback = [0, 0, 0, 1]) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = cssColor;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      if (a === 0) return fallback;
      return [r / 255, g / 255, b / 255, a / 255];
    };
    const blend = (fg: number[], bg: number[]) => [
      fg[0] * fg[3] + bg[0] * (1 - fg[3]),
      fg[1] * fg[3] + bg[1] * (1 - fg[3]),
      fg[2] * fg[3] + bg[2] * (1 - fg[3]),
      1,
    ];
    const luminance = ([r, g, b]: number[]) => {
      const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };
    const contrast = (fg: number[], bg: number[]) => {
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };

    const link = document.querySelector<HTMLElement>(selector);
    const nav = document.querySelector('nav');
    if (!link || !nav) throw new Error('Nav elements missing');

    const sectionUnder = document.getElementById(id);
    const sectionCss = sectionUnder ? getComputedStyle(sectionUnder).backgroundColor : '#1e2a2e';
    const section = cssToRgba(sectionCss, [30 / 255, 42 / 255, 46 / 255, 1]);

    const navBg = blend(cssToRgba(getComputedStyle(nav).backgroundColor), section);
    const linkRgb = cssToRgba(getComputedStyle(link).color).slice(0, 3);
    return {
      ratio: contrast(linkRgb, navBg.slice(0, 3)),
      linkR: Math.round(linkRgb[0] * 255),
    };
  }, { selector: linkSelector, sectionId });

  expect(ratio, `${sectionId} nav contrast`).toBeGreaterThanOrEqual(4.5);
  expect(linkR).toBeGreaterThan(200);
}

test('desktop nav links stay light and AA-contrast over cafe and contact', async ({ page }) => {
  await expectNavLinkContrastOverSection(page, 'cafe', 'nav ul a[href="/homestay"]');
  await expectNavLinkContrastOverSection(page, 'contact', 'nav ul a[href*="contact"]');
});

test('rooftop description has gutter and no horizontal overflow on mobile', async ({ page }) => {
  for (const path of ['/tien-ich', '/en/tien-ich'] as const) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await page.waitForFunction(() =>
      Boolean(
        document.querySelector('#amenities .rounded-nagi-lg') &&
          getComputedStyle(document.querySelector('#amenities .rounded-nagi-lg')!).opacity === '1',
      ),
    );

    const card = page.locator('#amenities .relative.rounded-nagi-lg.overflow-hidden').first();
    await card.scrollIntoViewIfNeeded();
    const desc = card.locator('p').filter({
      hasText: /Khoảng trời chung cho những nhịp sống riêng|A shared sky for individual rhythms/i,
    });
    await expect(desc).toBeVisible();
    const cardBox = await card.boundingBox();
    const textBox = await desc.boundingBox();
    expect(cardBox).not.toBeNull();
    expect(textBox).not.toBeNull();

    const rightGutter = cardBox!.x + cardBox!.width - (textBox!.x + textBox!.width);
    expect(rightGutter, `${path} rooftop right gutter`).toBeGreaterThanOrEqual(20);

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  }
});