/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        white: '#FFFFFF',
        offWhite: '#F9FAFB',
        offWhiteAlt: '#F3F4F6',
        // Accent colors
        teal: '#4FE3C1',
        tealDark: '#14B8A6',
        pink: '#FF77E9',
        pinkDark: '#EC4899',
        purple: '#C69CFF',
        purpleDark: '#A855F7',
        // Neutral colors
        bgMuted: '#F1F5F9',
        borderSubtle: '#E5E7EB',
        borderStrong: '#CBD5F5',
        textPrimary: '#0F172A',
        textSecondary: '#4B5563',
        textMuted: '#6B7280',
        textOnDark: '#F9FAFB',
        iconMuted: '#9CA3AF',
        // Feedback colors
        success: '#22C55E',
        warning: '#F97316',
        error: '#EF4444',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: ['2.25rem', { lineHeight: '2.75rem', fontWeight: 600 }],
        h2: ['1.5rem', { lineHeight: '2rem', fontWeight: 600 }],
        h3: ['1.25rem', { lineHeight: '1.75rem', fontWeight: 500 }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: 400 }],
        small: ['0.875rem', { lineHeight: '1.45', fontWeight: 400 }],
        eyebrow: [
          '0.75rem',
          { lineHeight: '1.5', fontWeight: 600, letterSpacing: '0.16em' },
        ],
      },
      boxShadow: {
        card: '0 12px 30px rgba(15, 23, 42, 0.08)',
        cardHover: '0 18px 40px rgba(15, 23, 42, 0.12)',
        button: '0 8px 20px rgba(56, 189, 248, 0.25)',
        nav: '0 8px 24px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(135deg, #4FE3C1 0%, #FF77E9 50%, #C69CFF 100%)',
        'gradient-subtle':
          'linear-gradient(135deg, #F9FAFB 0%, #ECFEFF 50%, #FDF2FF 100%)',
        'gradient-underline':
          'linear-gradient(90deg, #4FE3C1 0%, #FF77E9 100%)',
      },
      maxWidth: {
        page: '64rem',
      },
    },
  },
  plugins: [],
};
