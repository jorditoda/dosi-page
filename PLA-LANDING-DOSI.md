# Pla: landing page de Dosi (a partir de la de Rally HUD)

> **Com fer-lo servir:** crea un repo buit `dosi-landing-page`, posa-hi aquest fitxer a l'arrel i digues a l'agent:
>
> *"Llegeix `PLA-LANDING-DOSI.md` i executa'l fase per fase. Al final de cada fase, comprova els criteris d'acceptació i fes un commit. Les tasques marcades amb 👤 les faig jo: no les intentis i deixa-me-les apuntades al resum final."*

---

## 0. Context per a l'agent

**Producte.** Dosi és una app mòbil (Android i iOS) de microlearning en format scroll vertical, com Reels o TikTok. Cada pantalla és una targeta que ensenya una idea útil en 20-30 segons sobre **negociació, psicologia i comunicació**.
- **Lema:** "Una dosi diària per entendre millor la gent."
- Cada dia hi ha una dosi de 5, 12 o 20 targetes que barreja idees noves i repassos.
- Cada idea torna en forma de pregunta uns dies després (repetició espaiada).
- En acabar la dosi apareix una pantalla de tancament i se suma un dia a la ratxa. No és un scroll infinit.
- Una sola notificació diària amb "l'aprenentatge del dia".
- El contingut es basa en autors reconeguts (Kahneman, Cialdini, Fisher i Ury, Carnegie…) i cada targeta en cita la font.

**Model freemium:**

| | Gratis | Pro |
|---|---|---|
| Feed de targetes | Sí | Sí |
| Notificació diària | Sí | Sí |
| Quizzes i repàs | Sí | Sí |
| Converses de pràctica amb un personatge d'IA | 1-2 de prova | Sí |
| Temes avançats | No | Sí |

Plans anual i mensual, **sense preus decidits**: no n'escriguis cap.

**Estat.** L'app encara no és a les botigues, però la landing es construeix **com si ja hi fos**, amb les insígnies d'App Store i Google Play visibles.

**Idioma.** Només català. Deixa-ho preparat perquè afegir castellà i anglès sigui afegir un fitxer de configuració.

**Contacte:** `info@yapplic.com`.

---

## 1. Punt de partida: la landing de Rally HUD

Es parteix del repo públic **https://github.com/jorditoda/rally-hud-landing-page**, que ja funciona a `rallyhud.yapplic.com`. Es manté el seu stack i la seva manera de treballar:

| Tema | Com és a Rally HUD (es manté) |
|---|---|
| Stack | Astro 4 + illes React + Tailwind + daisyUI + SCSS, framer-motion, swiper |
| Paquets | pnpm 9 (`pnpm-lock.yaml`), Node 22 |
| Contingut | **Tot** a `src/utils/config.ts`, tipat a `src/utils/configType.ts` |
| Tema | Tokens a `src/utils/theme.ts`, mapejats sobre daisyUI |
| Seccions | `src/modules/home/_components/*`. Si una secció és `undefined` al config, no es pinta |
| Insígnies | `public/stores/app-store.svg` i `google-play.svg` (les oficials) |
| Redirecció a botiga | `/app` envia a la botiga del dispositiu (noindex, fora del sitemap) |
| SEO | `Layout.astro` (OG, Twitter, canonical) i JSON-LD a `src/utils/seo.ts` |
| Desplegament | `.github/workflows/main.yml`: `verify` (`astro check`) i `deploy` a GitHub Pages en fer push a `master` |
| Domini | Fitxer `CNAME` a l'arrel i `site` a `astro.config.mjs` |

**Coses de Rally HUD que s'han de canviar o treure** (no n'hi ha prou de canviar `config.ts`):
- Hi ha text "Rally" fixat al codi en uns 13 fitxers: `Layout.astro` (`og:image:alt`, clau `rally-theme` de localStorage), `seo.ts` (constant `APP` amb versió i SO mínims), `theme.ts`, `styles.scss`, `icons`, `404.astro`, `navbar`, `themeSwitcher`, `header`, `howItWorks`, `showcase`… Fes `grep -ri rally src` i no en pot quedar cap.
- `lang="en"` i `og:locale="en_US"` a `Layout.astro`.
- Textos de la interfície en anglès dins dels components (botons, aria-labels, "Join the early adopters", la pàgina `/app`…).
- Les fonts Barlow i Barlow Condensed (`public/fonts`, `tailwind.config.mjs`).
- La quadrícula de fons tècnica (`backgroundGrid`), que és d'estètica de cotxes.
- Tots els assets de `public/` de Rally: `screens/`, `screenshots/`, `stock/`, `3D/`, `avatars/`, `misc/companies/`, logos, `og.png`, favicons.
- El README fa referència a `scripts/` i `docs/design/` que **no són al repo públic**. Si els necessites, recrea'ls.
- Hi ha comentaris que citen `ROADMAP.md`, que tampoc hi és. Treu aquestes referències dels fitxers que toquis.

---

## 2. Material de Dosi que l'agent necessita

👤 **Abans de començar**, copio al repo, a `docs/dosi/`, aquests fitxers del projecte de Claude "MicroLearning app":
- `01-producte.md`, `03-disseny.md`, `04-contingut.md`
- `icona/app_icon.svg`
- `referencia-disseny/*.dc.html` (Main, Targeta, Quiz, Explorar, Practicar, Conversa, Subscripcio, Tancament, Onboarding, Perfil, Guia)
- `contingut/ca/cards.json` i `topics.json`

Si `docs/dosi/` no hi és, **para** i demana-me'l.

---

## 3. Fases

### Fase 1: Copiar la base i canviar el domini
1. Copia el contingut de `rally-hud-landing-page` a aquest repo **sense** la seva carpeta `.git`. Conserva `PLA-LANDING-DOSI.md` i `docs/dosi/`.
2. `CNAME` → `dosi.yapplic.com`.
3. `astro.config.mjs` → `site: "https://dosi.yapplic.com"`.
4. `public/robots.txt` → `Sitemap: https://dosi.yapplic.com/sitemap-index.xml`.
5. `package.json` → `"name": "dosi-landing-page"`.
6. Comprova que el workflow desplega des de la branca `master`. Si el repo nou fa servir `main`, adapta-ho.

**Criteris d'acceptació:** `pnpm install --frozen-lockfile`, `pnpm run check` i `pnpm run build` passen, i el `dist/` conté `sitemap-index.xml` i `robots.txt`.

### Fase 2: Identitat visual de Dosi
La font de veritat és `docs/dosi/03-disseny.md`: **no inventis colors ni tipografies**.

1. **Tema** (`theme.ts`): substitueix `rally-dark` i `rally-light` per un sol tema `dosi-dark`.
   - `base-100` `#101216`, `base-200` `#1A1D23`, `base-300` `#262A32`, `base-content` `#F2F3F5`
   - `primary` `#FF8A3D` amb `primary-content` `#101216` (l'acció principal i res més)
   - Variables pròpies per a `textSecondary` `#C9CDD6`, `textMuted` `#A3A8B3`, `border` `#2A2E36` i `accentSoft` `#FFB27A`
   - Colors de tema: negociació `#FF8A3D`, psicologia `#A78BFA` i comunicació `#2DD4BF`. Només serveixen per identificar temes, mai per a accions.
   - `forceTheme: true` i `showThemeSwitch: false`. L'app només té tema fosc.
   - Canvia els `theme-color` de `Layout.astro` a `#101216`.
2. **Tipografia:** **Bricolage Grotesque** (600, 700, 800) per a títols i números, i **Inter** (400, 500, 600) per a la resta. Autoallotjades en `woff2` a `public/fonts/`, mai enllaçades a Google Fonts (RGPD). Substitueix `sans` i `condensed` a `tailwind.config.mjs` i les classes `font-condensed` on calgui.
3. **Logo i icones:** genera `logo.svg`, `favicon.svg`, `favicon.png` (32 px) i `apple-touch-icon.png` (180 px) a partir de `docs/dosi/icona/app_icon.svg`.
4. **Icones d'interfície:** afegeix a `src/components/icons` les icones de línia de `03-disseny.md` que facin falta (feed, bell, review, flame, practice, target, lock, check…), amb traç d'1,8 i `currentColor`. Treu les de cotxes.
5. **Fons:** `backgroundGrid: false`. Si el `hero-glow` es queda, que faci servir el taronja.
6. Totes les parelles de text i fons han de tenir un contrast mínim de 4,5:1.

**Criteris d'acceptació:** `grep -ri "rally\|barlow" src public tailwind.config.mjs` no retorna res, i el build passa.

### Fase 3: Captures de l'app
1. Fes un script `scripts/render-screens.mjs` que, amb Playwright, renderitzi els `docs/dosi/referencia-disseny/*.dc.html` a PNG de **390 × 844** (escala 2x) i els desi a `public/screens/`. Comprova abans com estan fets els fitxers `.dc.html`: si un fitxer conté diverses pantalles, retalla-les.
2. Pantalles mínimes: Main (feed), Targeta, Quiz, Explorar, Conversa, Tancament.
3. Converteix-les a `webp` si el pes ho justifica.
4. Si algun `.dc.html` porta textos de mostra com `[PREU]`, **no** facis servir aquesta captura.

**Criteris d'acceptació:** les imatges es veuen nítides, sense barres de desplaçament ni marcs de navegador, i cap captura mostra `[PREU]` ni text de mostra.

### Fase 4: Contingut (`config.ts`, en català)
Abans d'escriure, llegeix `01-producte.md` i `04-contingut.md`. Tota frase ha de ser certa per a l'app tal com està descrita.

- **`seo`**: títol i descripció per a cercadors.
- **`header`**:
  - `headline`: proposa'n 2-3 i tria la més clara, per exemple *"Una dosi diària per entendre millor la gent"*.
  - `subtitle`: què fa l'app en una frase.
  - `screenshots`: feed, targeta i quiz.
  - `usersDescription`: treu-lo o posa-hi un text que no impliqui usuaris que no existeixen.
- **`howItWorks`** (3 passos, aquí sí que és una seqüència): tries temes, objectiu diari i hora; llisques la teva dosi; les idees tornen com a pregunta perquè te'n recordis.
- **`features`**: feed de targetes, repàs espaiat, notificació diària, ratxa, sessions amb final i fonts citades.
- **`showcase`**: 4 captures amb peu i nota.
- **`pricing`**: adapta el component perquè mostri **Gratis i Pro** com a la taula de §0, sense preus. El CTA ha de dir el mateix que els botons de botiga.
- **`proof`** amb el títol "Contingut fiable": idees d'autors reconeguts, cada targeta cita la font, i fet en català.
- **Exemples reals:** afegeix 3 dosis d'exemple, una per tema, agafades literalment de `cards.json`. Si cal, crea una secció nova `samples` al `configType` i un component, amb el color de cada tema per a l'etiqueta.
- **`faq`**: què és Dosi, quant temps al dia, si és gratis, què inclou Pro, si funciona sense connexió (només si ho diu la documentació), en quins idiomes està, quantes notificacions envia, i com contactar (`info@yapplic.com`).
- **`appBanner`**: CTA final amb `id: "descarrega"`.
- **`testimonials`** i **`partners`**: `undefined`. **No n'inventis.**
- **`topNavbar`** i **`footer`**: enllaços a les seccions en català.
- **`app.seo`** i la pàgina `/app`, en català.

**Botons de botiga "com si ja hi fos":** ara mateix els components només pinten les insígnies si hi ha enllaç. Afegeix a `config.ts` aquests camps:
```ts
appStoreLink: undefined,   // TODO 👤: enllaç real el dia del llançament
googlePlayLink: undefined, // TODO 👤: enllaç real el dia del llançament
```
Després crea un helper `storeHref(link)` que retorni l'enllaç o, si és `undefined`, `"#descarrega"`, i fes que el `header`, el `navbar`, el `pricing` i l'`appBanner` pintin **sempre** totes dues insígnies fent-lo servir. Sense enllaç real no han d'obrir pestanya nova (`target="_blank"` només si hi ha enllaç).

**Criteris d'acceptació:** no queda cap text en anglès a la pàgina (revisa també els `aria-label` i els `alt`), cap preu i cap testimoni.

### Fase 5: Pàgines legals (en català)
Reescriu de zero `privacyPolicy`, `termsAndConditions` i `cookiesPolicy`. El text de Rally prové d'un generador i no serveix.

- **Privacitat (RGPD):**
  - Responsable: `TODO 👤 nom/NIF/adreça`. Contacte: `info@yapplic.com`.
  - Dades i finalitats: autenticació anònima de Firebase, progrés desat a Firestore, token de notificacions (FCM) i analítica bàsica de Firebase.
  - Converses amb la IA: els missatges passen per un servidor propi (funció de Firebase) i un proveïdor d'IA per generar la resposta.
  - Subscripcions gestionades per Apple i Google, a través de RevenueCat.
  - També: drets d'accés, rectificació, supressió, oposició, portabilitat i limitació; conservació; menors; canvis i data.
- **Condicions:** subscripció Pro, renovació i cancel·lació des de la botiga, ús acceptable de la IA, i el contingut és educatiu, no assessorament professional.
- **Cookies:** la web no fa servir cookies. Si s'activa l'analítica sense cookies (vegeu la Fase 6), menciona-la.
- A dalt de cada text, un comentari: `TODO 👤: revisar amb un professional abans de publicar a les botigues`.
- Tradueix també les pàgines `404` i `/app`.

### Fase 6: SEO i analítica
- `Layout.astro`: `lang="ca"`, `og:locale="ca_ES"` i un `og:image:alt` que surti del config.
- `seo.ts` (JSON-LD): treu la versió i els SO mínims (ja que no se saben) i no posis `aggregateRating`. `downloadUrl` i `installUrl` només hi han de ser si hi ha enllaç real.
- `og.png` de 1200 × 630 amb el fons `#101216`, la icona i el lema. Genera'l amb un script a `scripts/`.
- Analítica opcional: GoatCounter (sense cookies). Afegeix `goatcounterCode?: string` al config, i injecta l'script només si té valor. Posa `data-goatcounter-click` a les insígnies de botiga.

### Fase 7: Verificació
1. `pnpm run check` amb 0 errors, 0 warnings i 0 hints. `pnpm run build` sense errors.
2. `pnpm run preview` i captures a 360 px, 768 px i 1280 px. Revisa-les i corregeix el que es vegi malament.
3. Lighthouse: Accessibility, Best Practices i SEO ≥ 95, i Performance ≥ 90. Si Performance no hi arriba per les illes React, **informa'n**: no reescriguis el stack.
4. Que no hi hagi cap enllaç intern trencat i que tots els botons de botiga portin a `#descarrega`.
5. Torna a fer `grep -ri "rally\|lorem\|\[PREU\]" src public` i comprova que no surt res.
6. Reescriu el `README.md` en català, amb el desenvolupament, on és el contingut, com afegir un idioma, els scripts i les tasques 👤 pendents.

---

## 4. Tasques que he de fer jo 👤

1. Crear el repo `dosi-landing-page` a GitHub i copiar-hi `docs/dosi/` (vegeu §2).
2. Després de la feina de l'agent: **Settings → Pages → Source: GitHub Actions.**
3. Al DNS de `yapplic.com`, afegir un registre **CNAME** `dosi` → `jorditoda.github.io`.
4. A **Settings → Pages → Custom domain**, posar `dosi.yapplic.com` i, quan el certificat estigui llest, activar **Enforce HTTPS**.
5. Si `yapplic.com` ja està verificat al compte de GitHub per a Rally HUD, no cal fer-ho de nou.
6. Omplir les dades del responsable als textos legals i fer-los revisar.
7. (Opcional) Crear el compte a GoatCounter i posar-ne el codi al config.
8. **El dia del llançament:** posar `appStoreLink` i `googlePlayLink` a `config.ts` i fer push.

## 5. Coses que l'agent NO ha de fer
- Tocar el DNS, la configuració del repo ni cap compte extern.
- Fer push al repo de Rally HUD ni modificar-lo.
- Inventar preus, valoracions, nombre de descàrregues, testimonis ni funcionalitats que no surtin a `docs/dosi/`.
- Posar claus, tokens o dades personals reals al codi.
- Canviar el stack (Astro, React, Tailwind, daisyUI) sense preguntar.

## 6. Més endavant (fora d'abast ara)
- Versions en castellà i anglès.
- `.well-known/assetlinks.json` i `apple-app-site-association` per als deep links, quan l'app tingui els identificadors.
- Pujar a Astro 5, a la vegada que a Rally HUD.
