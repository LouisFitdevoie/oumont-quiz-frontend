/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1e1e1e",
        darkGray: "#5a5a5a",
        gray: "#dfdfdf",
        green: "#50cd64",
        orange: "#f49546",
        placeholder: "#a0a0a0",
        red: "#f46546",
        white: "#f0f0f0",
        yellow: "#f4c546",
      },
      spacing: {
        50: "50px",
        400: "400px",
      },
      fontSize: {
        logoSplashscreen: "48px",
        logoTitle: "24px",
      },
      rotate: {
        25: "25deg",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
};
