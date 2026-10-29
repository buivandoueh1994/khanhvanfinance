/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#FAF9F5',
        linen: '#F2EFE9',
        stone: '#E4E1D8',
        botanical: {
          DEFAULT: '#0A3622',
          emerald: '#008746',
          mist: '#EBF2EE',
        },
        ink: {
          DEFAULT: '#181F1C',
          secondary: '#56605B',
          muted: '#858E89',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
