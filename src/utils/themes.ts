import { MomentKey } from '../types';
import { clsx } from 'clsx';

export const MOMENT_THEMES: Record<MomentKey, {
  bgPage: string;
  bgSection: string;
  bgCard: string;
  accentColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  pillBg: string;
  pillText: string;
  label: string;
  timeEmoji: string;
}> = {
  dawn: {
    bgPage: '#fcf8f2',
    bgSection: '#faf5ee',
    bgCard: '#f8f1e7',
    accentColor: '#be9a66',
    textColor: '#364252',
    mutedColor: '#8e8474',
    borderColor: 'rgba(190, 154, 102, 0.3)',
    pillBg: '#f4e8d2',
    pillText: '#79683f',
    label: 'Sớm Mai',
    timeEmoji: '🌅',
  },
  noon: {
    bgPage: '#fdf7ed',
    bgSection: '#f9f2e4',
    bgCard: '#f4ead9',
    accentColor: '#866437',
    textColor: '#22303f',
    mutedColor: '#79683f',
    borderColor: 'rgba(134, 100, 55, 0.3)',
    pillBg: '#eedcc0',
    pillText: '#5c4016',
    label: 'Trưa Hè',
    timeEmoji: '☀️',
  },
  sunset: {
    bgPage: '#fdf1e8',
    bgSection: '#f9ece2',
    bgCard: '#f4e2d4',
    accentColor: '#b8623b',
    textColor: '#3a2016',
    mutedColor: '#8d5035',
    borderColor: 'rgba(184, 98, 59, 0.3)',
    pillBg: '#f3ded0',
    pillText: '#7a3520',
    label: 'Hoàng Hôn',
    timeEmoji: '🌇',
  },
  night: {
    bgPage: '#141d2e',
    bgSection: '#1a2438',
    bgCard: '#1e2b44',
    accentColor: '#d8bc8e',
    textColor: '#f2e9da',
    mutedColor: '#8e97ad',
    borderColor: 'rgba(216, 188, 142, 0.25)',
    pillBg: 'rgba(216, 188, 142, 0.12)',
    pillText: '#d8bc8e',
    label: 'Đêm Sao',
    timeEmoji: '🌙',
  },
};

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceCompact(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(1)}M ₫`;
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)}K ₫`;
  }
  return `${price} ₫`;
}
