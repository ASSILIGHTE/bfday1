/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyblue: {
          50: '#F4F8FA',
          100: '#EDF4F8',
          200: '#D0E3F0',
          300: '#B8D5EA',
          400: '#7CB5EC',
          500: '#5B9BD5',
          600: '#4A88C7',
          700: '#3A75B4',
          900: '#1E3A5F',
        },
        navyblue: {
          100: '#E2E8F0',
          500: '#334155',
          700: '#1E293B',
          900: '#0F172A',
        },
        amberaccent: {
          400: '#FBBF24',
          500: '#F59E0B',
        }
      },
      fontFamily: {
        handwriting: ['Caveat', 'Patrick Hand', 'cursive'],
        rounded: ['Fredoka', 'Quicksand', 'sans-serif'],
        accent: ['Sacramento', 'Grand Hotel', 'cursive'],
      },
      animation: {
        'wobble-slow': 'wobble 4s ease-in-out infinite',
        'float-gentle': 'float 3.5s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
