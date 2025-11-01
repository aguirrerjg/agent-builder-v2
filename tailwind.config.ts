import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores estilo OpenAI
        background: {
          primary: "#FFFFFF",
          secondary: "#F7F7F8",
          code: "#F8F8F8",
        },
        text: {
          primary: "#202123",
          secondary: "#6E6E80",
          disabled: "#ACACBE",
        },
        border: {
          DEFAULT: "#E5E5E5",
          active: "#10A37F",
        },
        accent: {
          DEFAULT: "#10A37F",
          hover: "#0E8C6C",
          secondary: "#5B5BD6",
        },
        error: "#EF4444",
        success: "#10A37F",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "'Inter'",
          "sans-serif",
        ],
        mono: ["'SF Mono'", "'Monaco'", "'Inconsolata'", "'Fira Code'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.08)",
        modal: "0 8px 32px rgba(0, 0, 0, 0.12)",
        dropdown: "0 4px 16px rgba(0, 0, 0, 0.1)",
        "accent-sm": "0 0 0 3px rgba(16, 163, 127, 0.1)",
      },
      spacing: {
        sidebar: "260px",
        header: "64px",
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      transitionDuration: {
        fast: "150ms",
        standard: "200ms",
        complex: "300ms",
      },
      transitionTimingFunction: {
        "openai": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

