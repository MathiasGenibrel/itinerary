import {nextui} from "@nextui-org/react";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}", "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [nextui()]
}

