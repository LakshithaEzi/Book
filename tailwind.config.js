/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "serif"],
        poppins: ["Poppins", "sans-serif"],
        Diphylleia:["Inter","serif"],
      },
    },
  },
  plugins: [],
};
