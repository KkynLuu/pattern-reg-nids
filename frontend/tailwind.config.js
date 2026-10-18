/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F8FAFC",
          deep: "#F1F5F9",
          surface: "#FFFFFF",
          panel: "#FFFFFF",
          card: "#F8FAFC",
        },
        telemetry: {
          cyan: "#0284C7",
          blue: "#2563EB",
          teal: "#0D9488",
        },
        threat: {
          crimson: "#E11D48",
          coral: "#F43F5E",
          amber: "#D97706",
          yellow: "#CA8A04",
        },
        benign: {
          emerald: "#059669",
          green: "#10B981",
        },
        border: {
          subtle: "#E2E8F0",
          glow: "#CBD5E1",
          accent: "#0284C7",
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Roboto Mono", "ui-monospace", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 4px 20px -2px rgba(2, 132, 199, 0.18)",
        "glow-crimson": "0 4px 20px -2px rgba(225, 29, 72, 0.22)",
        "glow-emerald": "0 4px 20px -2px rgba(5, 150, 105, 0.18)",
        "panel": "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 1px 3px 0 rgba(15, 23, 42, 0.05)",
      }
    },
  },
  plugins: [],
}
