import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

// GRABB ITT Main Theme Object
export const theme = {
  colors,
  typography,
  spacing,
} as const;

// Theme type for TypeScript
export type Theme = typeof theme;

// Export individual modules for convenience
export { colors, typography, spacing };

// Default export
export default theme;
