/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: '#8F88DD',
          pink: '#F3A9C7',
          dark: '#202024',
          purple: '#6860B8',
          white: '#FFFFFF',
          softbg: '#F8F7FF',
          'lavender-light': '#B8B3EE',
          'lavender-dark': '#6860B8',
          'pink-dark': '#E890B5',
          'purple-light': '#9B94E8',
          'purple-deep': '#4A4399',
          'gray-muted': '#6B7280',
          'surface': '#FFFFFF',
          'surface-alt': '#F3F2FF',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(143, 136, 221, 0.15)',
        'card': '0 4px 24px rgba(143, 136, 221, 0.18)',
        'pink': '0 4px 16px rgba(243, 169, 199, 0.35)',
        'purple': '0 4px 20px rgba(104, 96, 184, 0.25)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #8F88DD 0%, #6860B8 100%)',
        'gradient-pink': 'linear-gradient(135deg, #F3A9C7 0%, #E890B5 100%)',
        'gradient-hero': 'linear-gradient(135deg, #F8F7FF 0%, #EAE8FF 50%, #F8F7FF 100%)',
      }
    },
  },
  plugins: [],
}
