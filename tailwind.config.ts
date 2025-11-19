import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff4c00",
          dark: "#e64400",
          light: "#ff6b33",
        },
        background: {
          DEFAULT: "#fff6f4",
          secondary: "#f9e8e0",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "orange-bottom": "0 3px 0 #ff4c00",
        "orange-bottom-hover": "0 4px 0 #ff4c00",
      },
    },
  },
  plugins: [],
};

export default config;
