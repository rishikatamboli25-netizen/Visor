/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: "#00F5FF",
        green: "#B4FF39"

      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: [ 'DM Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

