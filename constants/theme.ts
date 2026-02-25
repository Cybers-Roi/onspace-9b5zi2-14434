import { Platform } from 'react-native';

export const colors = {
  base: '#000000',
  surface: '#0A0A0F',
  surface2: '#1A1D2E',
  surface3: '#0D0F1A',
  coral: '#FF4D4D',
  neonPink: '#FF005B',
  electric: '#FF2D78',
  mint: '#00FFB2',
  teal: '#00E5CC',
  gold: '#FFD700',
  purple: '#8B5CF6',
  white: '#F5F5F0',
  muted: '#6B7280',
  adminBg: '#1A0A2E',
  border: '#3A3D4E',
  borderLight: '#2A2D3E',
  participant: '#FF2D78',
  volunteer: '#00E5CC',
  organizer: '#00E5CC',
  recruiter: '#FFD700',
  localAdmin: '#8B5CF6',
  globalAdmin: '#FF4D4D',
};

export const fonts = {
  display: Platform.select({ ios: 'System', android: 'sans-serif-condensed', default: 'System' }),
  mono: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'monospace' }),
  body: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  none: 0,
  sm: 2,
  pill: 9999,
};

export const eventTypeConfig = {
  sport: { shape: 'circle' as const, color: '#FF4D4D', label: 'SPORT', symbol: '○' },
  science: { shape: 'triangle' as const, color: '#00E5CC', label: 'SCIENCE', symbol: '△' },
  charity: { shape: 'square' as const, color: '#FFD700', label: 'CHARITY', symbol: '□' },
  cultural: { shape: 'diamond' as const, color: '#FF005B', label: 'CULTURAL', symbol: '◇' },
};

export type EventType = keyof typeof eventTypeConfig;
export type ShapeType = 'circle' | 'triangle' | 'square' | 'diamond' | 'hexagon';

export const glowShadow = (color: string, intensity: number = 0.3) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: intensity,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
    default: {},
  });
