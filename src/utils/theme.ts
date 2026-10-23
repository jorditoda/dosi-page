/**
 * Sistema de disseny de Dosi — tokens
 * ───────────────────────────────────────────────────────────────
 * FONT DE VERITAT: `docs/dosi/03-disseny.md`. Els valors no estan inventats:
 * estan trascrits del document de disseny de l'app.
 *
 * Regles del sistema que condicionen el mapeig amb daisyUI:
 *  · Taronja (`primary`) és l'acció principal: un sol botó taronja per
 *    pantalla, res més porta el taronja d'acció.
 *  · Els colors de tema (negociació, psicologia, comunicació) només serveixen
 *    per identificar temes, mai per a accions.
 *  · Contrast mínim de 4,5:1 per a tot el text (verificat a
 *    `scripts/check-contrast.mjs`).
 *  · L'app només té tema fosc a la Fase 1: existeix un sol tema.
 */

export const THEME_DEFAULT = "dosi-dark";

/**
 * Colors de tema (per identificar temes, mai per a accions). Surten de
 * `docs/dosi/topics.json`; aquí només es reflecteixen com a variables CSS
 * perquè la pàgina pugui pintar etiquetes de tema.
 */
export const TOPIC_COLORS = {
  negotiation: "#FF8A3D", // negociació
  psychology: "#A78BFA", // psicologia
  communication: "#2DD4BF", // comunicació
} as const;

/** Tema fosc únic. */
export const themes = {
  "dosi-dark": {
    "color-scheme": "dark",

    // Superfícies
    "base-100": "#101216", // bg · fons de pantalla · 16.9:1 amb el text
    "base-200": "#1A1D23", // surface · targetes, llistes, camps
    "base-300": "#262A32", // surfaceHigh · botons d'icona, xips, camps alts
    "base-content": "#F2F3F5", // textPrimary · títols i text important

    // Text secundari i muted, exposat per a utilitats pròpies
    "--dosi-text-secondary": "#C9CDD6", // textSecondary · cos de text llarg · 11.8:1
    "--dosi-text-muted": "#A3A8B3", // textMuted · subtítols, etiquetes · 7.9:1

    // Vora d'1 px i barres de progrés buides
    "--dosi-border": "#2A2E36",

    // PRIMARY = taronja. L'acció principal i res més.
    "primary": "#FF8A3D", // accent · 8.0:1 sobre base-100
    "primary-content": "#101216", // onAccent · text sobre taronja · 8.0:1

    // Colors de tema, prestats per a daisyUI (mai per a accions)
    "secondary": "#A78BFA", // psicologia · 6.9:1
    "secondary-content": "#101216",
    "accent": "#2DD4BF", // comunicació · 11.6:1
    "accent-content": "#101216",

    // Semàntics. Correcte i incorrecte sempre amb icona i text, mai sols de color.
    "success": "#34D399", // 9.7:1
    "success-content": "#06281C",
    "warning": "#FFB27A", // accentSoft prestat · 10.6:1
    "warning-content": "#101216",
    "error": "#F87171", // 6.8:1
    "error-content": "#3A0B0B",
    "info": "#A78BFA", // el sistema no defineix info; presta el violeta
    "info-content": "#101216",

    "neutral": "#1A1D23",
    "neutral-content": "#C9CDD6",

    // Text taronja sobre fons fosc (enllaços, xifres destacades) i vora dels
    // botons secundaris (borderStrong).
    "--dosi-accent-soft": "#FFB27A",
    "--dosi-border-strong": "#343843",

    // Colors de tema, com a variables CSS (mai per a accions). El text de les
    // etiquetes és el color del tema aclarit, definit a 03-disseny.md.
    "--dosi-topic-negotiation": TOPIC_COLORS.negotiation,
    "--dosi-topic-psychology": TOPIC_COLORS.psychology,
    "--dosi-topic-communication": TOPIC_COLORS.communication,
  },
} as const;
