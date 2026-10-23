import type {TemplateConfig} from "./configType";
import {THEME_DEFAULT} from "./theme";
import rawCards from "../../docs/dosi/cards.json";

/**
 * Configuració de la landing de Dosi — font de veritat de tot el contingut.
 *
 * Cada frase ha de ser certa per a l'app tal com està descrita a
 * `docs/dosi/` (sobretot `01-producte.md` i `04-contingut.md`). Res
 * d'inventar preus, valoracions, descàrregues ni testimonis.
 */

/** Selecciona una targeta d'idees de `docs/dosi/cards.json` pel seu id. */
function ideaCard(id: string) {
  const card = (rawCards as Array<Record<string, unknown>>).find(
    (c) => c.id === id
  );
  if (!card || card.type !== "idea") {
    throw new Error(`No s'ha trobat la idea "${id}" a docs/dosi/cards.json`);
  }
  return {
    concept: String(card.concept),
    hook: String(card.hook),
    source: String(card.source),
  };
}

const templateConfig: TemplateConfig = {
  name: "Dosi",
  seo: {
    title: "Dosi — Una dosi diària per entendre millor la gent",
    description:
      "Microlearning en català: cada dia, una dosi de targetes sobre negociació, psicologia i comunicació. App gratuïta per a Android i iOS.",
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
  // Analítica opcional i sense cookies. Buida: no s'injecta cap script.
  // TODO 👤 (opcional): crear el compte a GoatCounter i posar-ne el codi.
  goatcounterCode: undefined,
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
  appBanner: {
    id: "descarrega",
    title: "Baixa Dosi i fes la teva primera dosi",
    subtitle:
      "Android i iOS. El feed, la notificació diària, els quizzes i el repàs són gratuïts.",
    screenshots: [
      "/screens/main.webp",
      "/screens/tancament.webp",
      "/screens/quiz.webp",
    ],
  },
  home: {
    seo: {
      title: "Dosi — Microlearning en català per a Android i iOS",
      description:
        "Cada dia, una dosi de targetes que t'ensenyen una idea útil de negociació, psicologia i comunicació en 20-30 segons. La dosi té final: no és un scroll infinit.",
    },
    header: {
      headline: "Una dosi diària per entendre millor la gent",
      subtitle:
        "Negociació, psicologia i comunicació en targetes de 20-30 segons, amb idees d'autors reconeguts i repàs perquè te'n recordis de debò.",
      // Idees noves i un quiz de repàs, tal com es veuen a l'app.
      screenshots: [
        "/screens/main.webp",
        "/screens/targeta.webp",
        "/screens/quiz.webp",
      ],
      // Sense "usuaris" inventats.
      usersDescription: undefined,
      // "Una **dosi diària** per entendre millor la gent".
      headlineMark: [1, 3],
    },
    features: {
      id: "funcions",
      title: "El que trobaràs a dins",
      subtitle:
        "Dissenyat perquè aprenguis en pocs minuts al dia i ho recordis de debò.",
      cards: [
        {
          icon: "feed",
          title: "Feed de targetes",
          subtitle:
            "Una targeta, una idea. Llisques en vertical com a Reels, però cada pantalla t'enseny alguna cosa útil en 20-30 segons.",
        },
        {
          icon: "review",
          title: "Repàs espaiat",
          subtitle:
            "Cada idea torna en forma de pregunta al cap d'uns dies, quan ja l'estaves oblidant. Així la records de debò.",
        },
        {
          icon: "bell",
          title: "Una notificació al dia",
          subtitle:
            "Només una, amb l'aprenentatge del dia. La resta del dia no et truquem.",
        },
        {
          icon: "flame",
          title: "Ratxa",
          subtitle:
            "Cada dosi completada suma un dia a la teva ratxa. Motiva sense pressió.",
        },
        {
          icon: "check",
          title: "Sessions amb final",
          subtitle:
            "No és un scroll infinit: en arribar a l'objectiu del dia surt la pantalla de tancament i ja has acabat.",
        },
        {
          icon: "target",
          title: "Fonts citades",
          subtitle:
            "Cada idea es basa en autors reconeguts —Kahneman, Cialdini, Fisher i Ury, Carnegie— i la targeta en cita la font.",
        },
      ],
    },
    howItWorks: {
      id: "com-funciona",
      title: "Tres passos i ja aprens",
      subtitle: "Es configura una vegada; després només has de lliscar.",
      steps: [
        {
          title: "Tries com vols aprendre",
          subtitle:
            "Els temes que t'interessen, quantes targetes al dia (5, 12 o 20) i a quina hora vols la notificació.",
          image: "/screens/onboarding.webp",
        },
        {
          title: "Llisques la teva dosi",
          subtitle:
            "Cada dia t'espera una barreja d'idees noves i repassos. Una targeta, una idea, 20-30 segons.",
          image: "/screens/main.webp",
        },
        {
          title: "Les idees tornen com a pregunta",
          subtitle:
            "Al cap d'uns dies, cada idea torna en forma de quiz. Si l'encertes, la records més temps.",
          image: "/screens/quiz.webp",
        },
      ],
    },
    showcase: {
      id: "pantalles",
      title: "Així es veu per a dins",
      subtitle: "Les pantalles reals de l'app, tal com les veuràs cada dia.",
      items: [
        {
          image: "/screens/main.webp",
          caption: "Feed · La dosi del dia",
          note: "Una targeta, una idea. Llisques i ja saps una cosa nova; quan arribes a l'objectiu, la dosi es tanca.",
        },
        {
          image: "/screens/explorar.webp",
          caption: "Explorar · Temes i progrés",
          note: "Tots els temes amb el teu progrés, les mini-sèries i el que has guardat.",
        },
        {
          image: "/screens/quiz.webp",
          caption: "Quiz · Repàs",
          note: "Al cap d'uns dies cada idea torna com a pregunta. Si l'encertes, avances de caixa.",
        },
        {
          image: "/screens/tancament.webp",
          caption: "Tancament · Dosi feta",
          note: "Resum del que has après, la setmana de ratxa i l'aprenentatge de demà.",
        },
      ],
    },
    samples: {
      id: "exemples",
      title: "Dosis reals de l'app",
      subtitle:
        "Tres targetes de cada tema, agafades literalment del contingut de Dosi. Així és el que veuràs cada dia.",
      doses: [
        {
          topic: "negotiation",
          topicName: "Negociació",
          topicColor: "#FF8A3D",
          topicLabelColor: "#FFB27A",
          cards: [ideaCard("neg-001"), ideaCard("neg-002"), ideaCard("neg-013")],
        },
        {
          topic: "psychology",
          topicName: "Psicologia",
          topicColor: "#A78BFA",
          topicLabelColor: "#C4B5FD",
          cards: [ideaCard("psy-001"), ideaCard("psy-002"), ideaCard("psy-008")],
        },
        {
          topic: "communication",
          topicName: "Comunicació",
          topicColor: "#2DD4BF",
          topicLabelColor: "#5EEAD4",
          cards: [ideaCard("com-001"), ideaCard("com-004"), ideaCard("com-013")],
        },
      ],
    },
    pricing: {
      id: "preus",
      title: "Gratis i Pro",
      subtitle:
        "El que fa venir i tornar la gent és gratis; el que té cost real, la IA, és de pagament. Els preus de Pro es publicaran el dia del llançament.",
      plans: [
        {
          name: "Gratis",
          features: [
            { label: "Feed de targetes", value: "Sí" },
            { label: "Notificació diària", value: "Sí" },
            { label: "Quizzes i repàs", value: "Sí" },
            { label: "Converses de pràctica amb IA", value: "1-2 de prova" },
            { label: "Temes avançats", value: "No" },
          ],
        },
        {
          name: "Pro",
          highlight: true,
          features: [
            { label: "Feed de targetes", value: "Sí" },
            { label: "Notificació diària", value: "Sí" },
            { label: "Quizzes i repàs", value: "Sí" },
            { label: "Converses de pràctica amb IA", value: "Sí" },
            { label: "Temes avançats", value: "Sí" },
          ],
        },
      ],
      actionText: "Baixa l'app",
    },
    proof: {
      id: "prova",
      title: "Contingut fiable",
      subtitle:
        "Dosi no inventa res: les idees són les de sempre i de cada una en diu la font.",
      items: [
        {
          icon: "bulb",
          title: "Idees que ja han funcionat",
          text: "Negociació, psicologia i comunicació amb el fonament que donen els autors clàssics del camp.",
        },
        {
          icon: "bookmark",
          title: "Cada targeta cita la font",
          text: "A baix de cada idea hi ha l'estudi o el llibre d'on surt. Ho pots comprovar tu mateix.",
        },
        {
          icon: "check",
          title: "Fet en català",
          text: "Contingut, interfície i notificacions de dalt a baix, i preparada per a castellà i anglès.",
        },
        {
          icon: "explore",
          title: "Tres temes per començar",
          text: "Negociació, psicologia i comunicació, amb mini-sèries per anar a fons en un tema.",
        },
      ],
    },
    faq: {
      id: "faq",
      title: "Preguntes freqüents",
      qa: [
        {
          question: "Què és Dosi?",
          answer:
            "Una app de microlearning en català. Cada dia et dona una dosi de targetes que t'ensenyen una idea útil de negociació, psicologia i comunicació en 20-30 segons. El format és un scroll vertical, com Reels o TikTok, però amb contingut que aprens de debò.",
        },
        {
          question: "Quant temps he de dedicar-hi al dia?",
          answer:
            "La dosi té 5, 12 o 20 targetes, segons l'objectiu que triïs a l'onboarding. Són pocs minuts al dia, i la dosi té final: no és un scroll infinit.",
        },
        {
          question: "És gratuïta?",
          answer:
            "Sí. El feed, la notificació diària, els quizzes i el repàs són gratuïts. Les converses de pràctica amb IA tenen 1 o 2 de prova; per a més, hi ha el pla Pro.",
        },
        {
          question: "Què inclou Pro?",
          answer:
            "Les converses de pràctica amb un personatge d'IA i els temes avançats. Serà una subscripció anual o mensual gestionada des de la pròpia botiga; el preu es publicarà el dia del llançament.",
        },
        {
          question: "Funciona sense connexió?",
          answer:
            "Sí: el contingut ve dins l'app i el progrés es desa al mòbil, així que la dosi es pot fer sense cobertura. La connexió cal per a les converses amb IA i per sincronitzar entre dispositius.",
        },
        {
          question: "En quins idiomes està?",
          answer:
            "De moment només en català. L'app està preparada des del principi per afegir castellà i anglès.",
        },
        {
          question: "Quantes notificacions envia?",
          answer:
            "Una al dia com a màxim, amb l'aprenentatge del dia, més un sol recordatori de ratxa si no has entrat. Cap més.",
        },
        {
          question: "Com puc contactar-hi?",
          answer: "Escriu-nos a info@yapplic.com i et respondrem.",
        },
      ],
    },
    // Sense testimonis ni partners: no n'hi ha, i no se n'inventen.
    testimonials: undefined,
    partners: undefined,
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
