// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        chili: {
          50:  "#fff1f0",
          100: "#ffccc7",
          500: "#e63946",   // dein Haupt-Rot
          600: "#c1121f",
          700: "#9b0f1a",
          900: "#45080d",
        },
        orange: {
          400: "#f4a261",
          500: "#e76f51",
        },
        background: "var(--color-bg)",
        surface:   "var(--color-surface)",
        text:      "var(--color-text)",
        primary:   "var(--color-primary)",
        accent:    "var(--color-accent)",
      },
      boxShadow: {
        card: "0 20px 40px -12px rgba(230,57,70,0.25)",
        button: "0 10px 30px -5px rgba(230,57,70,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;