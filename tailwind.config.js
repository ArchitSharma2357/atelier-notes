/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#f6f1e8",
        ivory: "#fffaf3",
        sand: "#dfd0bd",
        stone: "#9d8f80",
        ink: "#231d18",
        bronze: "#9b6c45",
        pine: "#415043",
        blush: "#e7d1c0",
      },
      fontFamily: {
        body: ["Instrument Sans", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      boxShadow: {
        card: "0 18px 45px rgba(35, 29, 24, 0.08)",
        float: "0 24px 80px rgba(35, 29, 24, 0.14)",
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at top left, rgba(255,255,255,0.85), rgba(255,255,255,0) 35%), linear-gradient(135deg, rgba(223,208,189,0.2), rgba(255,250,243,0.95))",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
