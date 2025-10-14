// GRABB ITT Typography System
export const typography = {
  // Font families (using system fonts for better performance)
  fontFamily: {
    regular: "System",
    medium: "System",
    bold: "System",
    light: "System",
  },

  // Font sizes based on design
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
    "6xl": 48,
  },

  // Font weights
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.4,
    relaxed: 1.5,
    loose: 1.6,
  },

  // Text styles based on design components
  textStyles: {
    // Brand/Logo styles
    brand: {
      fontSize: 24,
      fontWeight: "700" as const,
    //   lineHeight: 1.4,
    },
    tagline: {
      fontSize: 14,
      fontWeight: "400" as const,
    //   lineHeight: 1.4,
    },

    // Heading styles
    h1: {
      fontSize: 28,
      fontWeight: "700" as const,
    //   lineHeight: 1.2,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
    //   lineHeight: 1.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
    //   lineHeight: 1.4,
    },
    h4: {
      fontSize: 18,
      fontWeight: "600" as const,
    //   lineHeight: 1.4,
    },

    // Body text styles
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
    //   lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: "400" as const,
    //   lineHeight: 1.4,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: "400" as const,
    //   lineHeight: 1.5,
    },

    // Caption and small text
    caption: {
      fontSize: 12,
      fontWeight: "400" as const,
    //   lineHeight: 1.3,
    },
    captionBold: {
      fontSize: 12,
      fontWeight: "600" as const,
    //   lineHeight: 1.3,
    },

    // Button styles
    button: {
      fontSize: 16,
      fontWeight: "500" as const,
    //   lineHeight: 1.2,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: "600" as const,
    //  lineHeight: 1.2,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: "500" as const,
    //   lineHeight: 1.2,
    },

    // Navigation styles
    tabLabel: {
      fontSize: 12,
      fontWeight: "500" as const,
    //   lineHeight: 1.2,
    },

    // Search and input styles
    search: {
      fontSize: 16,
      fontWeight: "400" as const,
    //   lineHeight: 1.4,
    },
    searchPlaceholder: {
      fontSize: 16,
      fontWeight: "400" as const,
    //   lineHeight: 1.4,
    },

    // Card and category styles
    cardTitle: {
      fontSize: 16,
      fontWeight: "700" as const,
    //   lineHeight: 1.3,
    },
    cardSubtitle: {
      fontSize: 14,
      fontWeight: "400" as const,
    //   lineHeight: 1.4,
    },

    // Banner styles
    bannerTitle: {
      fontSize: 24,
      fontWeight: "700" as const,
    //   lineHeight: 1.2,
    },
    bannerSubtitle: {
      fontSize: 16,
      fontWeight: "400" as const,
    //  lineHeight: 1.4,
    },

    // Badge styles
    badge: {
      fontSize: 12,
      fontWeight: "600" as const,
    //   lineHeight: 1.2,
    },
  },
} as const;

// Type exports for TypeScript
export type TypographyKey = keyof typeof typography;
export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type TextStyleKey = keyof typeof typography.textStyles;