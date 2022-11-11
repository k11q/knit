import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
