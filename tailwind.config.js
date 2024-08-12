/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        RobotoMono: "RobotoMono",
      },
      animation: {
        blink: "blink 750ms step-start infinite",
      },
      colors: {
        "primary-gray": "#646669",
        "primary-red": "#ca4754",
        "primary-green": "#47ca5bcb",
      },
      keyframes: {
        blink: {
          "0%": { color: "#fff" },
          "50%": { color: "#646669" },
          "100%": { color: "#fff" },
        },
      },
    },
  },
  plugins: [],
};
