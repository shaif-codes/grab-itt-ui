// GRABB ITT Theme Colors based on the design
export const colors = {
  // Primary brand colors - Bright Yellow from design
  primary: '#FFD700',        // Bright yellow (main accent)
  primaryDark: '#E6C200',    // Darker yellow for hover/pressed states
  primaryLight: '#FFF176',   // Lighter yellow for backgrounds
  primaryExtraDark: '#e6bf30',
  
  // Secondary colors
  secondary: '#FF6B35',      // Orange accent (if needed)
  secondaryDark: '#E55A2B',
  secondaryLight: '#FF8A5C',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray scale based on design
  gray: {
    50: '#F8F9FA',           // Light background
    100: '#F1F3F4',          // Very light gray
    200: '#E5E7EB',          // Light border
    300: '#D1D5DB',          // Medium light gray
    400: '#9CA3AF',          // Medium gray
    500: '#6B7280',          // Medium dark gray
    600: '#4B5563',          // Dark gray
    700: '#374151',          // Darker gray
    800: '#1F2937',          // Very dark gray
    900: '#111827',          // Almost black
  },
  
  // Text colors from design
  text: {
    primary: '#1C1C1E',      // Dark gray/black text (main text) - Success & Error
    secondary: '#8E8E93',    // Medium gray text (secondary text)
    tertiary: '#C7C7CC',     // Light gray text (placeholder)
    inverse: '#FFFFFF',      // White text on dark backgrounds - Success & Error
    yellow: '#FFD700',       // Yellow text for accents - Success & Error
    error: '#EF4444',        // Red text for errors
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',      // White background
    secondary: '#F8F9FA',    // Light gray background
    tertiary: '#F1F3F4',     // Very light gray background
    yellow: '#FFD700',       // Yellow background (banner, cards)
    dark: '#1C1C1E',         // Dark background
  },
  
  // Border colors
  border: {
    primary: '#E5E5E7',      // Light border
    secondary: '#D1D5DB',    // Medium border
    focus: '#FFD700',        // Yellow border for focus
    light: '#F1F3F4',        // Very light border
    error: '#EF4444',        // Red border for errors
  },
  
  // Shadow colors
  shadow: {
    primary: '#000000',      // Black shadow
    light: 'rgba(0, 0, 0, 0.1)',    // Light shadow
    medium: 'rgba(0, 0, 0, 0.15)',  // Medium shadow
    dark: 'rgba(0, 0, 0, 0.25)',    // Dark shadow
    yellow: 'rgba(255, 215, 0, 0.3)', // Yellow shadow
  },
  
  // Status colors
  success: '#10B981',        // Green for success
  warning: '#F59E0B',        // Orange for warnings
  error: '#EF4444',          // Red for errors
  info: '#3B82F6',           // Blue for info
  
  // Notification badges (red from design)
  badge: {
    red: '#FF0000',          // Red for notification badges
    redLight: '#FF4444',     // Lighter red
  },
  
  // Search bar colors
  search: {
    background: '#F1F3F4',   // Light gray background
    placeholder: '#8E8E93',  // Medium gray placeholder
    text: '#1C1C1E',         // Dark text
  },
  
  // Button colors
  button: {
    primary: '#1C1C1E',      // Dark button (Shop Now button)
    primaryDark: '#1C1C1E',
    primaryLight: '#1C1C1E',
    primaryExtraDark: '#1C1C1E',
    primaryText: '#FFFFFF',  // White text on dark button
    secondary: '#FFD700',    // Yellow button
    secondaryDark: '#FFD700',
    secondaryLight: '#FFD700',
    secondaryExtraDark: '#FFD700',
    secondaryText: '#1C1C1E', // Dark text on yellow button
    success: '#10B981',      // Green for success button
    successDark: '#10B981',
    successLight: '#10B981',
    successExtraDark: '#10B981',
    successText: '#FFFFFF',
    warning: '#F59E0B',      // Orange for warning button
    warningDark: '#F59E0B',
    warningLight: '#F59E0B',
    warningExtraDark: '#F59E0B',
    warningText: '#1C1C1E',
    error: '#EF4444',        // Red for error button
    errorDark: '#EF4444',
    errorLight: '#EF4444',
    errorExtraDark: '#EF4444',
    errorText: '#FFFFFF',
    outline: '#E5E5E7',
    outlineDark: '#E5E5E7',
    outlineLight: '#E5E5E7',
    outlineExtraDark: '#E5E5E7',
    outlineText: '#1C1C1E',

  },
  tag: {
    primary: {
      background: '#FFD700',
      text: '#1C1C1E',
    },      // Yellow for primary tag
    secondary: {
      background: '#FF6B35',
      text: '#1C1C1E',
    },    // Orange for secondary tag
    success: {
      background: '#10B981',
      text: '#1C1C1E',
    },      // Green for success tag
    warning: {
      background: '#F59E0B',
      text: '#1C1C1E',
    },      // Orange for warning tag
    error: {
      background: '#EF4444',
      text: '#1C1C1E',
    },        // Red for error tag
  },
} as const;

// Type exports for TypeScript
export type ColorKey = keyof typeof colors;
export type GrayColorKey = keyof typeof colors.gray;
export type BackgroundColorKey = keyof typeof colors.background;
export type TextColorKey = keyof typeof colors.text;
export type BorderColorKey = keyof typeof colors.border;
export type ShadowColorKey = keyof typeof colors.shadow;
export type BadgeColorKey = keyof typeof colors.badge;
export type SearchColorKey = keyof typeof colors.search;
export type ButtonColorKey = keyof typeof colors.button;