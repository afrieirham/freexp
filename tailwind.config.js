/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["[data-theme=synthwave]"],
          primary: "#ffffff",
          secondary: "#28252D",
          neutral: "#17151D",
          "base-100": "#14121A",
          ".btn-railway": {
            "background-color": "#211F2C",
            "border-color": "#33323D",
            color: "#ffffff",
          },
          ".btn-railway:hover": {
            "background-color": "#33323D",
            "border-color": "#53525F",
            color: "#ffffff",
          },
        },
      },
    ],
  },
};
