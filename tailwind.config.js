/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        propel: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-25%)" },
          "40%": { transform: "translateX(25%)" },
          "60%": { transform: "translateX(-25%)" },
          "100%": { transform: "translateX(25%)" },
        },
        doubleClick: {
          "0%": { scale: 1 },
          "25%": { scale: 1.2 },
          "50%": { scale: 1 },
          "75%": { scale: 1.2 },
          "100%": { scale: 1 },
        },
      },
      colors: {
        customBlack: "#2b2d42",
        customWhite: "#ececec",
      },
    },
  },
  plugins: [],
};
