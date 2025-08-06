/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        'primary':'#EFCE1A',
        'secondary':"#0D08242",
        'blackBG':'#F3F3F3',
        'Favorite':'#FF5841'

      },
      fontFamily:{
        'primary':["Montserrat","sans-serif"],
         'secondary':["Nunito Sans","sans-serif"],
      }
    },
  },
  plugins: [],
}

