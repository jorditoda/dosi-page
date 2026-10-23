import type {TemplateConfig} from "./configType";
import {THEME_DEFAULT} from "./theme";

/**
 * Configuració de la landing de Dosi — font de veritat de tot el contingut.
 *
 * Cada frase ha de ser certa per a l'app tal com està descrita a
 * `docs/dosi/` (sobretot `01-producte.md` i `04-contingut.md`). Res
 * d'inventar preus, valoracions, descàrregues ni testimonis.
 *
 * ESTAT: esquelet mínim (Fase 2). La Fase 4 omple el contingut i la Fase 5
 * els textos legals.
 */
const templateConfig: TemplateConfig = {
  name: "Dosi",
  seo: {
    title: "Dosi — Una dosi diària per entendre millor la gent",
    description:
      "Microlearning en format scroll vertical: negociació, psicologia i comunicació en targetes de 20-30 segons. App gratuïta per a Android i iOS.",
  },
  // La quadrícula tècnica de fons és estètica de cotxes: fora (03-disseny.md).
  backgroundGrid: false,
  logo: "/logo.svg",
  // Les xarxes socials no accepten SVG a og:image, per això va a part.
  // Generat per scripts/build-og-image.mjs: 1200 × 630 amb la icona i el lema.
  ogImage: "/og.png",
  ogImageAlt: "Dosi — Una dosi diària per entendre millor la gent",
  theme: THEME_DEFAULT,
  // L'app només té tema fosc: es força i no se'n ofereix commutador.
  forceTheme: true,
  showThemeSwitch: false,
  // TODO 👤: enllaç real el dia del llançament (es pinten igualment les
  // insígnies apuntant a #descarrega; vegeu src/utils/common.ts).
  appStoreLink: undefined,
  googlePlayLink: undefined,
  footer: {
    legalLinks: {
      termsAndConditions: true,
      cookiesPolicy: true,
      privacyPolicy: true,
    },
    socials: {},
    links: [
      { href: "/#com-funciona", title: "Com funciona" },
      { href: "/#funcions", title: "Funcions" },
      { href: "/#preus", title: "Gratis i Pro" },
      { href: "/#faq", title: "Preguntes freqüents" },
    ],
  },
  topNavbar: {
    cta: "Baixa l'app",
    hideAppStore: false,
    hideGooglePlay: false,
    links: [
      { href: "/#com-funciona", title: "Com funciona" },
      { href: "/#funcions", title: "Funcions" },
      { href: "/#preus", title: "Gratis i Pro" },
      { href: "/#faq", title: "Preguntes freqüents" },
    ],
  },
  // CTA final de baixada; el seu id és l'objectiu dels botons de botiga.
  appBanner: undefined,
  home: {
    seo: {
      title: "Dosi — Microlearning en català per a Android i iOS",
      description:
        "Cada dia, una dosi de targetes que t'ensenya una idea útil de negociació, psicologia i comunicació en 20-30 segons. Res d'scroll infinit.",
    },
    header: {
      headline: "Una dosi diària per entendre millor la gent",
      subtitle:
        "Negociació, psicologia i comunicació en targetes de 20-30 segons, amb idees d'autors reconeguts. Una dosi al dia i prou.",
      // Es completes a la Fase 3, quan existeixen les captures.
      screenshots: [],
    },
  },
  app: {
    seo: {
      title: "Baixa Dosi",
      description:
        "T'enviem a la botiga del teu dispositiu. Dosi és gratuïta a l'App Store i a Google Play.",
    },
  },
  // TODO 👤/agent: la Fase 5 reescriu aquests textos des de zero.
  privacyPolicy: {
    seo: {
      title: "Política de privacitat - Dosi",
      description: "Política de privacitat",
    },
    content: `# Política de privacitat

Aquest text s'està completant. Per a qualsevol consulta sobre les teves dades, escriu a info@yapplic.com.
`,
  },
  cookiesPolicy: {
    seo: {
      title: "Política de galetes - Dosi",
      description: "Política de galetes",
    },
    content: `# Política de galetes

Aquest text s'està completant. Per a qualsevol consulta, escriu a info@yapplic.com.
`,
  },
  termsAndConditions: {
    seo: {
      title: "Condicions d'ús - Dosi",
      description: "Condicions d'ús",
    },
    content: `# Condicions d'ús

Aquest text s'està completant. Per a qualsevol consulta, escriu a info@yapplic.com.
`,
  },
};

export default templateConfig;
