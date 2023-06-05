/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'white': '#f4f4f4',
      'grey': '#d4d0c5',
      'light-gold': '#e9ddb9',
      'gold': '#c9b167',
      'dark-grey': '#171627',
      'black': '#0a0a0b',
      'black-transparent': 'rgba(10, 10, 11, 0.85)',
      'black-transparent2': 'rgba(10, 10, 11, 0)'
    },
    extend: {},
  },
  plugins: [],
}

