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
            base: "#0C0C0E",       // Premium dark charcoal-black (warm slate base)
            surface: "#121214",    // Warm charcoal surface
          },
          card: {
            surface: "#1A1A1E",    // Cozy warm slate card background
            border: "rgba(255, 255, 255, 0.05)",
          },
          primary: "#E2953B",      // Honey amber (string light/woodfire glow)
          secondary: "#C84B31",    // Terracotta red (fresh tomato/brick oven)
          text: {
            primary: "#F4F3EF",    // Soft cream off-white text
            muted: "#8E8E93",      // Warm grey muted text
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
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
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
        "pulse-slow": {
          "0%, 100%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
