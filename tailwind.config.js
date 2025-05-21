/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Safelist patterns for dynamic colors
    { pattern: /bg-\[#([0-9a-fA-F]{3,8})\]/ },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        popover: "var(--popover)",
        popoverForeground: "var(--popover-foreground)",
        input: "var(--input)",
        ring: "var(--ring)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
          6: "var(--chart-6)",
        },
        input: "var(--input)",
      },
    },

    keyframes: {
      slideUp: {
        "0%": { transform: "translateY(100%)" },
        "100%": { transform: "translateY(0)" },
      },
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "fade-in": {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      "fade-out": {
        from: { opacity: "1" },
        to: { opacity: "0" },
      },
      "zoom-in": {
        from: { transform: "scale(0.95)" },
        to: { transform: "scale(1)" },
      },
      "zoom-out": {
        from: { transform: "scale(1)" },
        to: { transform: "scale(0.95)" },
      },
      "collapsible-down": {
        from: { height: 0 },
        to: { height: "var(--radix-collapsible-content-height)" },
      },
      "collapsible-up": {
        from: { height: "var(--radix-collapsible-content-height)" },
        to: { height: 0 },
      },
      "slide-up-fade": {
        "0%": { opacity: 0, transform: "translateY(2px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      "slide-right-fade": {
        "0%": { opacity: 0, transform: "translateX(-2px)" },
        "100%": { opacity: 1, transform: "translateX(0)" },
      },
      "slide-down-fade": {
        "0%": { opacity: 0, transform: "translateY(-2px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      "slide-left-fade": {
        "0%": { opacity: 0, transform: "translateX(2px)" },
        "100%": { opacity: 1, transform: "translateX(0)" },
      },
    },

    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "collapsible-down": "collapsible-down 0.2s ease-out",
      "collapsible-up": "collapsible-up 0.2s ease-out",
      "fade-in": "fade-in 0.2s ease-out",
      "fade-out": "fade-out 0.2s ease-out",
      "zoom-in": "zoom-in 0.2s ease-out",
      "zoom-out": "zoom-out 0.2s ease-out",
      "slide-in-from-top": "slide-in-from-top 0.2s ease-out",
      "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-out",
      "slide-in-from-left": "slide-in-from-left 0.2s ease-out",
      "slide-in-from-right": "slide-in-from-right 0.2s ease-out",
    },
  },

  darkMode: "class",
  plugins: [],
};

export default config;
