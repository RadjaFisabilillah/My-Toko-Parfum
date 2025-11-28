// tailwind.config.ts (FULL CODE)

import type { Config } from "tailwindcss";

const config: Config = {
  // Penting: Pastikan 'content' mencakup semua direktori yang menggunakan class Tailwind
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Anda bisa menambahkan warna, font, atau ukuran kustom di sini
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
