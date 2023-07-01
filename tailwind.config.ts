import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'image-bg': '#000000', // Replace with your desired background color
      },
      backgroundImage: {
        'hero-pattern': "url('/back.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
