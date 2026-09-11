/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
      colors: {
        mica: {
          light: 'rgba(255, 255, 255, 0.40)',
          dark: 'rgba(15, 15, 20, 0.45)',
          borderLight: 'rgba(255, 255, 255, 0.25)',
          borderDark: 'rgba(255, 255, 255, 0.10)',
        }
      },
      boxShadow: {
        'mica': '0 20px 50px rgba(0, 0, 0, 0.35)',
        'window': '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
