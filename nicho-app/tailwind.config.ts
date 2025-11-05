import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
        secondary: "#f1f3f4",
        accent: "#d93025",
        'gray-50': '#f8f9fa',
        'gray-100': '#f1f3f4',
        'gray-200': '#e8eaed',
        'gray-300': '#dadce0',
        'gray-400': '#bdc1c6',
        'gray-500': '#9aa0a6',
        'gray-600': '#80868b',
        'gray-700': '#5f6368',
        'gray-800': '#3c4043',
        'gray-900': '#202124',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
