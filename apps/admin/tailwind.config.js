/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: "#2D1B3D",
        terracotta: "#C4622D",
        ivory: "#FAF7F2",
        ivory2: "#F1EDE5",
        sage: "#5C6E54",
        gold: "#C8952A",
        ink: "#1E1A16",
        ink2: "#5C5650",
        violet: "#7A5C8A",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "680px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
