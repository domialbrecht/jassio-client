//See https://tailwindcss.com/docs/customizing-colors

module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./pages/**/*.tsx",
      "./components/**/*.tsx",
      "./layout/**/*.tsx",
      "./helpers/**/*.tsx",
    ],
    options: {
      safelist: ["h-4/5", "gap-10", "gap-4", "w-1/2"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      colors: {
        theme: {
          light: "#DAE1E7",
          DEFAULT: "#27496D",
          chroma: "#2B2E4A",
          dark: "#142850",
          darker: "#06132f",
          accent: "#00909E",
          deep: "#283149",
          sky: "#DBEDF3",
          skylight: "#abe2f5",
          subdue: "#903749",
          mellow: "#53354A",
          contrast: "#E84545",
          highlight: "#F73859",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
