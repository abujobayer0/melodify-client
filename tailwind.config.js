/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#111827",
        card: "#4b5563",
        lightCard: "#1b2640",
      },
    },
  },
  plugins: [],
};
