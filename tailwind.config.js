/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        AnimalPaw: ["AnimalPaw", 'sans-serif'],
        Modak: ["Modak", 'cursive'],
      },
    },
  },
  plugins: [],
}
