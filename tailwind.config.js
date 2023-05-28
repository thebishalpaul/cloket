/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: ["responsive"],
      colors: {
        Cloket: "#7867df",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        syne: ["Syne", "sans-serif"],
      },
      width: {
        600: "600px", // Replace 'custom' with your desired class name and '300px' with your desired width value
      },
      width: {
        500: "510px",
      },
      width: {
        12: "12px",
      },
      width: {
        10: "10px",
      },
      width: {
        200: "202px",
      },
    },
  },
  plugins: [],
};
