/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",
          primary: "#1E293B",
          accent: "#C5A47E",
          light: "#F8FAFC",
          muted: "#64748B",
        }
      },
    },
  },
  plugins: [],
}