/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verisure: "#E50000",
        navy: "#0B1324",
        silver: "#CBD5E1",
      },
      boxShadow: {
        glow: "0 0 32px rgba(229, 0, 0, 0.22)",
        "glow-sm": "0 0 16px rgba(229, 0, 0, 0.15)",
        "glow-green": "0 0 24px rgba(34, 197, 94, 0.18)",
        "glow-amber": "0 0 24px rgba(245, 158, 11, 0.18)",
      },
      animation: {
        "fade-in": "fade-in 0.35s ease both",
        "bounce-in": "bounce-in 0.45s cubic-bezier(.36,.07,.19,.97) both",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "60%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(229,0,0,0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(229,0,0,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(229,0,0,0)" },
        },
      },
    },
  },
  plugins: [],
};
