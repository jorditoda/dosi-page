import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import { themes } from "./src/utils/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      "3xs": "350px",
      "2xs": "400px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        // Famílies del sistema de disseny de Dosi (03-disseny.md):
        //   Inter              -> text, botons i interfície · 400/500/600
        //   Bricolage Grotesque -> títols, ganxos i números · 600/700/800
        // Autoallotjades a public/fonts (vegeu scripts/fetch-fonts.mjs).
        condensed: [
          "Bricolage Grotesque",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        // Xifres i títols: Bricolage, amb xifres tabulars on calgui.
        numeric: [
          "Bricolage Grotesque",
          "Inter",
          ...defaultTheme.fontFamily.mono,
        ],
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: [themes],
  },
};