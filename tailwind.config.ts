import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "app-black": {
          200: "#0B0D10",
          300: "#141414",
        },
        "app-white": {
          100: "#FFFFFF",
          200: "#EFEFF0",
        },
        "app-copper": {
          100: "#CCA373",
          200: "#B08451",
          300: "#9A6B36",
        },
        "app-blue": {
          100: "#1D68E3",
          200: "#337AFF",
          300: "#80AFFF",
          400: "#BAD3F",
          500: "#EBF2FF",
          1337: "#1E90FF",
        },
        "app-gris": {
          200: "#808080",
          300: "#D1D5DB",
          400: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
export default config;
