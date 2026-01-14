// Theme and Branding Constants - Updated to match web app design
export const COLORS = {
  // Primary Brand Colors (Purple theme from web app)
  primary: '#4B3FFF',
  primaryDark: '#3B2FE8',
  primaryLight: '#6B5FFF',
  
  // Secondary Colors (Orange accent from web app)
  secondary: '#FFB84D',
  secondaryDark: '#FF9F1A',
  secondaryLight: '#FFD180',
  
  // Accent Colors
  accent: '#FFB84D',
  accentDark: '#FF9F1A',
  accentLight: '#FFD180',
  
  // Status Colors
  success: '#28a745',
  warning: '#FFB84D',
  error: '#dc3545',
  info: '#4B3FFF',
  
  // Income/Expense
  income: '#28a745',
  expense: '#dc3545',
  
  // Neutral Colors (matching web app)
  background: '#F8F9FE',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text Colors
  text: '#2D3436',
  textSecondary: '#636E72',
  textLight: '#B2BEC3',
  textWhite: '#FFFFFF',
  textDark: '#1a1a1a',
  
  // Border & Divider
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Gradient Colors (Purple to Orange like web app)
  gradientStart: '#4B3FFF',
  gradientEnd: '#FFB84D',
};

export const SIZES = {
  // Font Sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 16,
  bodySmall: 14,
  caption: 12,
  tiny: 10,
  
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Border Radius
  radiusSmall: 8,
  radius: 12,
  radiusLarge: 16,
  radiusXL: 24,
  radiusFull: 9999,
  
  // Icon Sizes
  iconSmall: 20,
  icon: 24,
  iconLarge: 32,
  iconXL: 48,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const BRANDING = {
  appName: 'ExpenseWise',
  tagline: 'Smart Money Management',
  description: 'Track expenses, predict spending, and achieve your financial goals with AI-powered insights.',
  
  // Feature Highlights
  features: [
    {
      icon: 'chart-line',
      title: 'Smart Tracking',
      description: 'Automatically categorize and track your expenses',
    },
    {
      icon: 'brain',
      title: 'AI Insights',
      description: 'Get intelligent predictions and recommendations',
    },
    {
      icon: 'target',
      title: 'Goal Setting',
      description: 'Set and achieve your financial goals',
    },
    {
      icon: 'chart-pie',
      title: 'Visual Reports',
      description: 'Beautiful charts and detailed analytics',
    },
  ],
};
