/** Earliest calendar date guests may check in or start a monthly stay (YYYY-MM-DD). */
export const OPENING_DATE = '2026-12-15';

const DAY_AFTER_OPENING = '2026-12-16';

export const OPENING_DATE_ERROR = {
  vi: 'Hẻm Nhà nhận khách từ 15/12/2026.',
  en: 'We welcome guests from 15 Dec 2026.',
} as const;

/** Expected-arrival dropdown values allowed on or after opening (excludes early December). */
export const EARLY_BIRD_EXPECTED_DATE_OPTIONS = [
  'mid_december',
  'festive_season',
  'jan_2027',
  'flexible',
] as const;

export type EarlyBirdExpectedDateOption = (typeof EARLY_BIRD_EXPECTED_DATE_OPTIONS)[number];

export const EARLY_BIRD_DEFAULT_EXPECTED_DATE: EarlyBirdExpectedDateOption = 'mid_december';

export function openingDateErrorMessage(language: 'vi' | 'en'): string {
  return OPENING_DATE_ERROR[language];
}

export function isBeforeOpeningDate(dateStr: string): boolean {
  return Boolean(dateStr) && dateStr < OPENING_DATE;
}

function addDaysIso(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function getCheckInMinDate(): string {
  return OPENING_DATE;
}

/** Short-stay check-out min = max(opening + 1 day, check-in + 1 day). */
export function getCheckOutMinDate(checkIn: string): string {
  const minAfterOpen = DAY_AFTER_OPENING;
  if (!checkIn) return minAfterOpen;
  const minAfterCheckIn = addDaysIso(checkIn, 1);
  return minAfterCheckIn > minAfterOpen ? minAfterCheckIn : minAfterOpen;
}

export function getMonthlyStartMinDate(): string {
  return OPENING_DATE;
}