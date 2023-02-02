/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "768px",
      laptop: "1024px",
      desktop: "1440px",
    },
    colors: {
      // Primary colors
      primary: {
        100: "#5620c0", // Main Color
        150: "#743FDE", // For hover main color
        200: "#6666FF", // Selected color
        300: "#0f4b6e",
        400: "#166775",
      },

      // Background
      gray: {
        100: "#191919", // Main background
        200: "#252525",
        300: "#313131",
        400: "#858585", // For darker text
      },

      // Others
      red: "#CE4257", // For errors and etc.
      orange: "#FF7F51", // For warnings and etc.
      lime: "#9FFFCB", // For success and etc.
      cyan: "#4ECDC4", // For info and etc.
      white: "#ebebeb",
    },
  },
  plugins: [],
};
