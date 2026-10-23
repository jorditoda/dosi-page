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
  // Mentre un enllaç és `undefined`, la seva insígnia es pinta igualment
  // apuntant a #descarrega (vegeu src/utils/common.ts).
  // TODO 👤: pendent l'enllaç real de l'App Store.
  appStoreLink: undefined,
  googlePlayLink:
    "https://play.google.com/store/apps/details?id=com.stormfkrs.dosi",
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
  // TODO 👤: revisar amb un professional abans de publicar a les botigues.
  privacyPolicy: {
    seo: {
      title: "Política de privacitat - Dosi",
      description:
        "Com tractem les teves dades a Dosi: dades anònimes de progrés, notificacions, analítica, converses amb IA i subscripcions.",
    },
    content: `# Política de privacitat

Darrera actualització: octubre de 2026.

## Qui gestiona les teves dades

El responsable del tractament és [TODO 👤: nom i cognoms o raó social, NIF i adreça completa].

Per a qualsevol consulta sobre privacitat pots escriure a [info@yapplic.com](mailto:info@yapplic.com).

## Què és Dosi i què fa amb les teves dades

Dosi és una app de microlearning. No et demanem cap registre: no et creem un compte amb correu ni contrasenya. Tot el que s'hi desa queda lligat a una identificació anònima generada al teu dispositiu.

## Quines dades tractem

- **Identificació anònima** (Firebase Auth): un identificador aleatori, sense cap dada personal, que lliga el teu progrés al dispositiu.
- **Progrés i preferències** (Cloud Firestore): els temes que has triat, l'objectiu diari, l'hora de la notificació, la ratxa, les targetes vistes i les respostes als quizzes. Es desen al teu identificador anònim, es sincronitzen i tenen persistència local per funcionar sense connexió.
- **Token de notificacions** (Firebase Cloud Messaging): un identificador del dispositiu, per als missatges opcionals de novetats. La notificació diària i el recordatori de ratxa es generen al mòbil i no passen per cap servidor.
- **Analítica bàsica** (Firebase Analytics): estadístiques agregades d'ús (retenció, pantalles més usades) per millorar l'app.
- **Converses amb la IA**: els missatges que escrigues a les sessions de pràctica passen pel nostre servidor (una funció de Firebase) i per un proveïdor d'IA extern per generar la resposta.

## Per a què els fem servir

Per calcular la teva dosi diària, desar i sincronitzar el teu progrés, programar la notificació diària i el recordatori de ratxa que has activat, mesurar l'ús agregat de l'app i generar les respostes de les converses de pràctica. No fem publicitat personalitzada ni venem dades a tercers.

## Converses amb la IA

Quan escrius a una conversa de pràctica, el teu missatge i el context de la conversa s'envien al nostre servidor, que els reenvia a un proveïdor d'IA per generar la resposta. El proveïdor les processa sota el seu contracte i segons les nostres instruccions. No fem servir aquests missatges per a cap altre ús. Evita escriure-hi dades personals teves o de terceres persones.

## Subscripcions

Si contractes el pla Pro, el pagament i la gestió de la subscripció els fan Apple (App Store) o Google (Google Play), a través de RevenueCat, el sistema que gestiona les compres de l'app. Dosi no ve ni desa cap dada de targeta: tot el cobrament passa per la botiga. Les condicions de la subscripció també són les de les [Condicions d'ús](/terms-and-conditions) i les de cada botiga.

## Base jurídica i conservació

Tractem les dades per executar el servei que demanes (fer servir l'app) i, de manera agregada, per al nostre interès legítim de millorar-la. Conservem les dades mentre l'app sigui publicada i tu la tens instal·lada; pots demanar-ne l'esborrat en qualsevol moment (vegeu més avall).

## Compartim les dades amb algú?

Només amb els proveïdors necessaris per fer funcionar l'app: Google (Firebase i les botigues), RevenueCat i el proveïdor d'IA de les converses de pràctica. No venem dades personals a ningú.

## Els teus drets

Pots demanar l'accés, la rectificació, la supressió, l'oposició, la portabilitat i la limitació del tractament de les teves dades, i retirar el consentiment, escrivint a [info@yapplic.com](mailto:info@yapplic.com). Com que no tenim el teu correu, et localitzem pel teu identificador anònim; si ho demanes, et direm com trobar-lo des de l'app.

També pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades ([www.aepd.es](https://www.aepd.es)) si consideres que el tractament no és correcte.

## Menors

L'app és adreçada a majors d'edat. Si ets menor, necessites l'autorització dels teus pares o tutors legals per fer-la servir.

## Canvis en aquesta política

Si fem canvis importants en com tractem les dades, n'avisarem dins l'app o publicarem la versió nova en aquesta pàgina.
`,
  },
  // TODO 👤: revisar amb un professional abans de publicar a les botigues.
  cookiesPolicy: {
    seo: {
      title: "Política de galetes - Dosi",
      description:
        "Aquesta web no fa servir cookies. Analítica agregada sense cookies i sense publicitat.",
    },
    content: `# Política de galetes

Darrera actualització: octubre de 2026.

## Aquesta web no fa servir cookies

La pàgina **dosi.yapplic.com** no instal·la cookies pròpies ni de tercers, no desa cap identificador al teu navegador i no fa seguiment entre webs. Per tant, no cal cap consentiment per fer-la servir.

## Analítica

Aquesta web no té cap eina d'analítica ni de mesurament activa. No comptem visites ni fem cap seguiment del teu comportament. En cas que això canviï en el futur, ho explicarem en aquesta pàgina i, si calgués consentiment, te'l demanaríem.

## Com pots controlar les galetes igualment

Tot i que aquesta web no n'usa, el navegador et permet bloquejar, limitar o esborrar galetes des de la seva configuració de privaciat (Normalment a Configuració → Privacitat o Seguretat). En aquesta web continuaràs podent navegar igual.

## Contacte

Per a qualsevol consulta, escriu a [info@yapplic.com](mailto:info@yapplic.com).
`,
  },
  // TODO 👤: revisar amb un professional abans de publicar a les botigues.
  termsAndConditions: {
    seo: {
      title: "Condicions d'ús - Dosi",
      description:
        "Condicions d'ús de Dosi: ús de l'app, subscripció Pro, ús acceptable de la IA i caràcter educatiu del contingut.",
    },
    content: `# Condicions d'ús

Darrera actualització: octubre de 2026.

## Què és Dosi i per a què serveix

Dosi és una app de microlearning per a Android i iOS: cada dia et dóna una dosi de targetes que t'ensenyen una idea útil de negociació, psicologia i comunicació en pocs segons. La versió base és gratuïta i no té cost per fer-la servir.

## El teu compte

No cal registre: l'app crea una identificació anònima al teu dispositiu i el teu progrés queda lligada a ella. Si esborres l'app o perds el dispositiu abans que el progrés s'hagi sincronitzat, pots perdre'l. Més informació a la [Política de privacitat](/privacy-policy).

## Pla Pro i subscripcions

- El pla Pro inclou les converses de pràctica amb IA i els temes avançats.
- La subscripció es contracta, es cobra i es gestiona a l'App Store (Apple) o a Google Play (Google), a través de RevenueCat. Els preus es mostren a la botiga abans de confirmar la compra.
- La subscripció es renova automàticament cada període fins que la cancel·lis.
- Per cancel·lar-la, ho has de fer des de la configuració de la botiga al teu dispositiu (Comptes i subscripcions a Google Play; Subscripcions a l'App Store). Mantindràs el Pro fins al final del període ja pagat.
- Els reemborsaments es regeixen per les condicions de cada botiga.

## Ús acceptable de la IA

- Les converses són una eina d'aprenentatge. La IA pot equivocar-se: no és una persona professional ni una persona.
- No la facis servir per a assessorament legal, mèdic, financer o d'alt risc; el contingut és educatiu.
- No escriguis dades personals teves ni de terceres persones a les converses.
- No abusis del servei: qualsevol ús massiu, automatitzat o per a activitats il·legals queda prohibit.

## Contingut educatiu

Les idees i les fonts que cita cada targeta són materials educatius. No constitueixen assessorament professional de cap mena, i s'han d'interpretar com a tal.

## Propietat intel·lectual

L'app i el contingut de Dosi són propietat del seu autor. Pots fer-ne ús personal i no comercial; no pots reproduir-ne o redistribuir-ne el contingut comercialment sense permís escrit.

## Responsabilitat

L'app es proporciona tal com és. Treballem perquè sigui útil i fiable, però no podem garantir que el contingut estigui lliure d'errors ni que el servei estigui disponible sempre.

## Canvis i llei aplicable

Podem actualitzar aquestes condicions; si els canvis són importants, n'avisarem dins l'app o en aquesta pàgina. Aquestes condicions es regeixen per la legislació espanyola. [TODO 👤: concretar amb un professional el fur i la jurisdicció aplicables]

## Contacte

Per a qualsevol consulta, escriu a [info@yapplic.com](mailto:info@yapplic.com).
`,
  },
};

export default templateConfig;
