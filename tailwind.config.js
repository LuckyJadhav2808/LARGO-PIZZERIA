/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        largo: {
          bg: {
            base: "#0D0D11",
            surface: "#121216",
          },
          card: {
            surface: "#18181C",
            border: "rgba(255, 255, 255, 0.05)",
          },
          primary: "#FF9F1C",
          secondary: "#FF6B00",
          text: {
            primary: "#F5F5F0",
            muted: "#6B6B72",
          },
          success: "#22C55E",
        }
      },
      fontFamily: {
        display: ["var(--font-bebas-neue)", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        largoCard: "16px",
        largoBtn: "8px",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
