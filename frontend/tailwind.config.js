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
          navy: '#0b3b5c',
          navyLight: '#123c5a',
          green: '#16be53',
          greenHover: '#13a849',
          border: '#6c7c94',
          bg: '#a4c2ba',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
