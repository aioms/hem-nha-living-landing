import { MomentKey, Room } from '../types';
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
    bgPage: '#faf7f2',
    bgSection: '#f2f7f4',
    bgCard: '#eef5f1',
    accentColor: '#79a594',
    textColor: '#223035',
    mutedColor: '#668074',
    borderColor: 'rgba(121, 165, 148, 0.35)',
    pillBg: '#d8e8e0',
    pillText: '#2f5244',
    label: 'Sớm Mai',
    timeEmoji: '🌅',
  },
  noon: {
    bgPage: '#faf6f0',
    bgSection: '#f9f4eb',
    bgCard: '#f4ede1',
    accentColor: '#9b7848',
    textColor: '#2a231c',
    mutedColor: '#847360',
    borderColor: 'rgba(217, 199, 176, 0.55)',
    pillBg: '#efe6d8',
    pillText: '#684c25',
    label: 'Mơ Trưa',
    timeEmoji: '☀️',
  },
  sunset: {
    bgPage: '#faf5f1',
    bgSection: '#f9efeb',
    bgCard: '#f4e5de',
    accentColor: '#ae7055',
    textColor: '#362118',
    mutedColor: '#8c5743',
    borderColor: 'rgba(174, 112, 85, 0.35)',
    pillBg: '#f3ded5',
    pillText: '#7a3a24',
    label: 'Hoàng Hôn',
    timeEmoji: '🌇',
  },
  night: {
    bgPage: '#162024',
    bgSection: '#1e2a2e',
    bgCard: '#25353c',
    accentColor: '#d9c7b0',
    textColor: '#faf6f0',
    mutedColor: '#9baebe',
    borderColor: 'rgba(109, 130, 177, 0.3)',
    pillBg: 'rgba(109, 130, 177, 0.22)',
    pillText: '#a2b5e2',
    label: 'Đêm Sao',
    timeEmoji: '🌙',
  },
};

export const DIY_THEME = {
  bgPage: '#faf7f2',
  bgSection: '#f4ede1',
  bgCard: '#ece3d4',
  accentColor: '#ae7055',
  textColor: '#223035',
  mutedColor: '#79a594',
  borderColor: 'rgba(174, 112, 85, 0.25)',
  pillBg: '#efe6d8',
  pillText: '#4f6b73',
  label: 'Hẻm DIY',
  timeEmoji: '🛠️',
};

export const LIVING_THEME = {
  bgPage: '#faf6f0',
  bgSection: '#f4ece1',
  bgCard: '#eef5f1',
  accentColor: '#4f6b73',
  textColor: '#223035',
  mutedColor: '#9a958f',
  borderColor: 'rgba(79, 107, 115, 0.25)',
  pillBg: '#d8e8e0',
  pillText: '#2f5244',
  label: 'Hẻm Living',
  timeEmoji: '🛋️',
};


export function getRoomTheme(room: Room | null) {
  if (!room) return MOMENT_THEMES.dawn;
  if (room.momentKey && MOMENT_THEMES[room.momentKey]) {
    return MOMENT_THEMES[room.momentKey];
  }
  if (room.category === 'diy') {
    return DIY_THEME;
  }
  return LIVING_THEME;
}

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
