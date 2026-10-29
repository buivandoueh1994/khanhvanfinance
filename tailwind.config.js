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
          hover: '#008A47',
          deep: '#003822',
          forest: '#052E1E',
          tint: '#F0F9F4',
          soft: '#E6F5EC',
        },
        slate: {
          ink: '#111827',
          body: '#4B5563',
          muted: '#6B7280',
          line: '#E5E7EB',
          surface: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(17, 24, 39, 0.05)',
        'elevated': '0 16px 40px -8px rgba(17, 24, 39, 0.08)',
        'emerald-sm': '0 8px 20px -4px rgba(0, 167, 88, 0.25)',
      },
    },
  },
  plugins: [],
};
