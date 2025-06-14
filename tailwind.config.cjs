/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      // fontFamily is now defined in src/styles/global.css
    },
  },
  plugins: [require("@tailwindcss/typography")],
}; 