/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'primary':"#f59e0b",
        'background':"#FEFDFC",
        'third': "#FEEAAB"
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        mlg: "1572px",
        xl: "1700px",
      },
    },
  },
  plugins: [], 
}

