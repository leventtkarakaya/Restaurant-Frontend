/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7f9eb2",
        secondary: "#005b96",
        tertiary: "#dae9f4",
        quaternary: "#03396c",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
