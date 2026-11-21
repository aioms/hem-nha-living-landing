import { test, expect } from '@playwright/test';

const OPENING = '2026-12-15';
const OPENING_CHECKOUT_MIN = '2026-12-16';

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});

async function openBookingModal(page: import('@playwright/test').Page) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.getByRole('complementary', { name: /Kiểm tra phòng trống|Check availability/i }).getByRole('button').click();
  await expect(page.locator('#checkin')).toBeVisible();
}

async function openEarlyBirdModal(page: import('@playwright/test').Page, localePath: '/' | '/en') {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(localePath);
  await page.locator('#early-bird').scrollIntoViewIfNeeded();
  await page.locator('#early-bird button').click();
  await expect(page.locator('#earlybird-expected-date')).toBeVisible();
}

test('booking date inputs use opening min (short stay)', async ({ page }) => {
  await openBookingModal(page);
  await expect(page.locator('#checkin')).toHaveAttribute('min', OPENING);
  await expect(page.locator('#checkout')).toHaveAttribute('min', OPENING_CHECKOUT_MIN);
});

test('booking blocks continue when check-in is before opening (vi)', async ({ page }) => {
  await openBookingModal(page);
  await page.locator('#checkin').fill('2026-12-01');
  await page.locator('#checkin').blur();
  await expect(page.getByRole('alert')).toHaveText('Hẻm Nhà nhận khách từ 15/12/2026.');
  await expect(page.getByRole('button', { name: /Tiếp tục chọn phòng/ })).toBeDisabled();
});

test('booking monthly start date uses opening min and validation', async ({ page }) => {
  await openBookingModal(page);
  await page.getByRole('button', { name: 'Thuê tháng' }).click();
  await expect(page.locator('#monthstart')).toHaveAttribute('min', OPENING);
  await page.locator('#monthstart').fill('2026-11-20');
  await page.locator('#monthstart').blur();
  await expect(page.getByRole('alert')).toHaveText('Hẻm Nhà nhận khách từ 15/12/2026.');
  await expect(page.getByRole('button', { name: /Tiếp tục chọn phòng/ })).toBeDisabled();
});

test('early bird dropdown excludes pre-opening arrival (vi)', async ({ page }) => {
  await openEarlyBirdModal(page, '/');
  const select = page.locator('#earlybird-expected-date');
  const options = await select.locator('option').allTextContents();
  expect(options.some(t => t.includes('Đầu tháng 12/2026'))).toBe(false);
  expect(options.some(t => t.includes('Giữa tháng 12/2026'))).toBe(true);
  await expect(select).toHaveValue('mid_december');
});

test('early bird dropdown excludes pre-opening arrival (en)', async ({ page }) => {
  await openEarlyBirdModal(page, '/en');
  const select = page.locator('#earlybird-expected-date');
  const options = await select.locator('option').allTextContents();
  expect(options.some(t => /Early December 2026/i.test(t))).toBe(false);
  expect(options.some(t => /Mid December 2026/i.test(t))).toBe(true);
  await expect(select).toHaveValue('mid_december');
});

test('booking blocks continue when check-in is before opening (en)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/en');
  await page.getByRole('complementary', { name: /Check availability/i }).getByRole('button').click();
  await page.locator('#checkin').fill('2026-12-10');
  await page.locator('#checkin').blur();
  await expect(page.getByRole('alert')).toHaveText('We welcome guests from 15 Dec 2026.');
  await expect(page.getByRole('button', { name: /Continue to Select Room/ })).toBeDisabled();
});