export type ThemeId = 'rose-berry' | 'vanilla-gold' | 'sage-pistachio' | 'midnight-noir';

export interface BakeryTheme {
  id: ThemeId;
  name: string;
  label: string;
  icon: string;
  bgClass: string;
  bgHex: string;
  cardBgClass: string;
  subtleBgClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  textMutedClass: string;
  accentClass: string;
  accentBgClass: string;
  accentHoverBgClass: string;
  goldClass: string;
  goldBgClass: string;
  borderClass: string;
  glow1Hex: string;
  glow2Hex: string;
  isDark: boolean;
  navBgClass: string;
}

export const BAKERY_THEMES: Record<ThemeId, BakeryTheme> = {
  'rose-berry': {
    id: 'rose-berry',
    name: 'Velvet Rose & Berry',
    label: 'Rose & Berry',
    icon: '🌹',
    bgClass: 'bg-gradient-to-br from-[#fdf7f5] via-[#faf0ec] to-[#f6e6e2]',
    bgHex: '#fdf7f5',
    cardBgClass: 'bg-white/95',
    subtleBgClass: 'bg-[#faf0ec]/80',
    textPrimaryClass: 'text-[#2a141b]',
    textSecondaryClass: 'text-[#2a141b]/80',
    textMutedClass: 'text-[#2a141b]/60',
    accentClass: 'text-[#c22d48]',
    accentBgClass: 'bg-[#c22d48]',
    accentHoverBgClass: 'hover:bg-[#a6223b]',
    goldClass: 'text-[#c6894c]',
    goldBgClass: 'bg-[#c6894c]',
    borderClass: 'border-[#2a141b]/10',
    glow1Hex: '#c22d48',
    glow2Hex: '#c6894c',
    isDark: false,
    navBgClass: 'bg-[#fdf7f5]/90',
  },
  'vanilla-gold': {
    id: 'vanilla-gold',
    name: 'French Vanilla & Warm Amber',
    label: 'Vanilla & Gold',
    icon: '✨',
    bgClass: 'bg-gradient-to-br from-[#fbf8f0] via-[#f7f2e4] to-[#f2ebd5]',
    bgHex: '#fbf8f0',
    cardBgClass: 'bg-white/95',
    subtleBgClass: 'bg-[#f7f2e4]/80',
    textPrimaryClass: 'text-[#2e2115]',
    textSecondaryClass: 'text-[#2e2115]/80',
    textMutedClass: 'text-[#2e2115]/60',
    accentClass: 'text-[#b85d19]',
    accentBgClass: 'bg-[#b85d19]',
    accentHoverBgClass: 'hover:bg-[#994a0f]',
    goldClass: 'text-[#c99738]',
    goldBgClass: 'bg-[#c99738]',
    borderClass: 'border-[#2e2115]/10',
    glow1Hex: '#c99738',
    glow2Hex: '#b85d19',
    isDark: false,
    navBgClass: 'bg-[#fbf8f0]/90',
  },
  'sage-pistachio': {
    id: 'sage-pistachio',
    name: 'Parisian Sage & Pistachio',
    label: 'Sage & Pistachio',
    icon: '🍃',
    bgClass: 'bg-gradient-to-br from-[#f4f7f4] via-[#eaf0eb] to-[#e0eae1]',
    bgHex: '#f4f7f4',
    cardBgClass: 'bg-white/95',
    subtleBgClass: 'bg-[#eaf0eb]/80',
    textPrimaryClass: 'text-[#16251b]',
    textSecondaryClass: 'text-[#16251b]/80',
    textMutedClass: 'text-[#16251b]/60',
    accentClass: 'text-[#377047]',
    accentBgClass: 'bg-[#377047]',
    accentHoverBgClass: 'hover:bg-[#2b5837]',
    goldClass: 'text-[#b97d53]',
    goldBgClass: 'bg-[#b97d53]',
    borderClass: 'border-[#16251b]/10',
    glow1Hex: '#377047',
    glow2Hex: '#b97d53',
    isDark: false,
    navBgClass: 'bg-[#f4f7f4]/90',
  },
  'midnight-noir': {
    id: 'midnight-noir',
    name: 'Midnight Ganache Noir',
    label: 'Midnight Noir',
    icon: '🌙',
    bgClass: 'bg-gradient-to-br from-[#161214] via-[#1f181c] to-[#120e10]',
    bgHex: '#161214',
    cardBgClass: 'bg-[#221c20]/95',
    subtleBgClass: 'bg-[#2a2227]',
    textPrimaryClass: 'text-[#faf3eb]',
    textSecondaryClass: 'text-[#faf3eb]/80',
    textMutedClass: 'text-[#faf3eb]/60',
    accentClass: 'text-[#e6526e]',
    accentBgClass: 'bg-[#e6526e]',
    accentHoverBgClass: 'hover:bg-[#cc3d58]',
    goldClass: 'text-[#e5b56b]',
    goldBgClass: 'bg-[#e5b56b]',
    borderClass: 'border-white/10',
    glow1Hex: '#e6526e',
    glow2Hex: '#e5b56b',
    isDark: true,
    navBgClass: 'bg-[#161214]/90',
  },
};
