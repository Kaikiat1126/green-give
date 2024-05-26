import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "grey-1": "#1d2129",
        "grey-2": "#4e5969",
        "grey-3": "#86909c",
        "grey-4": "#c9cdd4",
        "blue-1": "#0e42d2",
        "blue-2": "#165dff",
        "blue-3": "#4080ff",
        "blue-4": "#6aa1ff",
        // for levels badge
        "lvl-light-red": "#f96153",
        "lvl-red": "#db1414",
        "lvl-light-orange": "#fe9600",
        "lvl-orange": "#ff8826",
        "lvl-light-yellow": "#fdec6f",
        "lvl-yellow": "#ffee4a",
        "lvl-light-green": "#6ecf42",
        "lvl-green": "#00b34c",
        "lvl-light-blue": "#d2fdfe",
        "lvl-blue": "#0074b4",
        "lvl-light-purple": "#c97ba5",
        "lvl-purple": "#5b1d99",
        "lvl-light-pink": "#e86f9e",
        "lvl-pink": "#f4436f",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config