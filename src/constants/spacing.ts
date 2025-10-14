// GRABB ITT Spacing System
export const spacing = {
  // Base spacing unit (8px system)
  unit: 8,
  
  // Spacing scale
  xs: 4,      // 0.5 * unit
  sm: 8,      // 1 * unit
  md: 16,     // 2 * unit
  lg: 24,     // 3 * unit
  xl: 32,     // 4 * unit
  '2xl': 40,  // 5 * unit
  '3xl': 48,  // 6 * unit
  '4xl': 64,  // 8 * unit
  '5xl': 80,  // 10 * unit
  '6xl': 96,  // 12 * unit
  
  // Component-specific spacing
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
  },
  
  margin: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
  },
  
  // Border radius (rounded corners from design)
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
  
  // Elevation/shadows
  elevation: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    '2xl': 16,
  },
  
  // Component heights
  height: {
    button: 48,
    input: 48,
    tabBar: 70,
    header: 60,
    card: 120,
    banner: 140,
  },
  
  // Component widths
  width: {
    button: 'auto',
    input: '100%',
    card: '48%',
    full: '100%',
  },
  
  // Icon sizes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },
  
  // Logo sizes
  logo: {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  },
} as const;

// Type exports for TypeScript
export type SpacingKey = keyof typeof spacing;
export type PaddingKey = keyof typeof spacing.padding;
export type MarginKey = keyof typeof spacing.margin;
export type BorderRadiusKey = keyof typeof spacing.borderRadius;
export type ElevationKey = keyof typeof spacing.elevation;
export type HeightKey = keyof typeof spacing.height;
export type WidthKey = keyof typeof spacing.width;
export type IconSizeKey = keyof typeof spacing.icon;
export type LogoSizeKey = keyof typeof spacing.logo;
