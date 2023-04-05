/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "sidebar-width": "var(--sidebar-width)",
      },
      colors: {
        blue: "#4923fc",
        purple: "#a291bf",
        red: "#f20a70",
        pink: "#f385cd",
        background: "#1F2046",
        text: "#fff",
        black: "#000",
        transparent: "transparent",
        line: "rgba(255, 255, 255, 0.4)",
      },
    },
    fontFamily: {
      custom: ["ubuntu-mono", "Ubuntu", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
