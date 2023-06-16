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
          primary: "#c4b5fd",
          secondary: "#706a80",
          neutral: "#2a2040",
          "base-100": "#08060d",
        },
      },
    ],
  },
};
