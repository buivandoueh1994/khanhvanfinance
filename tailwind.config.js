/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manulife: {
          DEFAULT: '#00A758',
          light: '#00C468',
          dark: '#003822',
          deep: '#002415',
        },
        midnight: {
          DEFAULT: '#0B1118',
          slate: '#0F172A',
          card: '#1E293B',
        },
        champagne: {
          DEFAULT: '#D4AF37',
          light: '#E5C07B',
          soft: '#F3E5AB',
          muted: '#9A7B2C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'emerald-glow': '0 0 35px -5px rgba(0, 167, 88, 0.35)',
        'gold-glow': '0 0 30px -5px rgba(212, 175, 55, 0.25)',
        'luxury-card': '0 20px 50px -12px rgba(0, 0, 0, 0.65)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
