/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./KalingaArts.jsx",
  ],
  theme: {
    extend: {
      colors: {
        cream:     '#F5ECD7',
        sand:      '#E8D5B0',
        tan:       '#C4A882',
        gold:      '#D4AF37',
        'gold-light': '#F0D060',
        'gold-dark':  '#8B6914',
        brown:     '#6B4E35',
        'brown-mid':  '#4A3728',
        'brown-dark': '#2C1810',
        ink:       '#1A0F0A',
        copper:    '#B87333',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        luxury:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
