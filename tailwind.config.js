/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#080C0A',
          elevated: '#0D1411',
          surface: '#121C17',
        },
        manulife: {
          DEFAULT: '#00A758',
          emerald: '#0B6E4F',
          deep: '#06291B',
        },
        champagne: {
          DEFAULT: '#C9A96E',
          light: '#E2C792',
          muted: '#8C7040',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
