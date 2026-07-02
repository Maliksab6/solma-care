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
        brand: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d4',
          300: '#86efad',
          400: '#4ade7f',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803c',
          800: '#166533',
          900: '#0f4a25',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f7f4',
          raised: '#f2f0eb',
          border: '#e8e5de',
        },
        accent: '#c2573a',
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
