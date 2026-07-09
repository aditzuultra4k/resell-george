import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090b",
        bone: "#f7f4ef",
        mint: "#a7f3d0"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(15, 23, 42, 0.16)"
      }
    }
  },
  plugins: []
} satisfies Config;
