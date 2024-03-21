/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},

      'xl': {'max': '1280px'},

      'lg': {'max': '1175px'},

      'md': {'max': '738px'},

      'sm': {'max': '640px'},

      '2sm': {'max': '493px'}
    }
  },
  plugins: [],
}
