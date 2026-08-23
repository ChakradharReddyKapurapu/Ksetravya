/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#040d09',
          900: '#07170f',
          800: '#0c2619',
          700: '#123825',
          600: '#1a4d33',
        },
        emerald: {
          500: '#22c55e',
          400: '#4ade80',
          300: '#86efac',
        },
        earth: {
          900: '#24170f',
          700: '#4a3424',
          500: '#8c6848',
          300: '#d4b494',
        },
        sun: {
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fde68a',
        },
        river: {
          600: '#0284c7',
          400: '#38bdf8',
          200: '#bae6fd',
        },
        cream: {
          50: '#fafaf5',
          100: '#f4f4eb',
          200: '#e5e6d6',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}
