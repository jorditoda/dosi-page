# Dosi — Landing Page

Landing de **Dosi**, una app de microlearning de negociació, psicologia i
comunicació per a Android i iOS. Cada dia dóna una "dosi" de targetes d'uns
20-30 segons amb idees d'autors reconeguts.

Construïda amb **Astro 4 + React + Tailwind + daisyUI**. Contingut, README i
tota la interfície en català; preparada per a més idiomes (vegeu
[Com afegir un idioma](#com-afegir-un-idioma)).

## Desenvolupament

```bash
source ~/.nvm/nvm.sh       # Node 22.14.0 + pnpm 9.15.9
pnpm install --frozen-lockfile

pnpm run dev               # servidor de desenvolupament a :4321
pnpm run check             # type-check: ha de donar 0 errors / 0 warnings / 0 hints
pnpm run build             # build estàtic a dist/
pnpm run preview           # serveix el build (dist/) a :4321
```

El lloc es publica sol a **GitHub Pages** des de la branca `master` (vegeu
`.github/workflows/`). El domini `dosi.yapplic.com` surt de `public/CNAME`.

## On és el contingut

| Què | On és |
| --- | --- |
| **Tot el text de la landing** (header, `features`, `howItWorks`, `samples`, `pricing`, `faq`, `appBanner`…) i els **textos legals** | `src/utils/config.ts` |
| Colors i tipografia (tokens `--dosi-*`) | `src/styles/styles.scss` |
| Fonts autoallotjades (Bricolage Grotesque + Inter, llatí i llatí-ext) | `public/fonts/` (generades per `scripts/fetch-fonts.mjs`) |
| Icona de l'app i actius de marca | `docs/dosi/icona/`, `public/` (generats per `scripts/build-icons.mjs`) |
| Pantalles reals de l'app | `public/screens/` (generades per `scripts/render-screens.mjs`) |
| Imatge d'Open Graph (`og.png`) | `public/og.png` (generada per `scripts/build-og-image.mjs`) |
| Source of truth del producte (per no inventar res) | `docs/dosi/` |

Els preus, testimonis, partners i notes **no s'han d'inventar**: surten de
`docs/dosi/`. Mentre `appStoreLink` / `googlePlayLink` siguin `undefined` al
config, les insígnies de botiga es veuen igualment i apunten a `#descarrega`;
el dia del llançament n'hi ha prou amb omplir aquests dos camps.

## Scripts de suport

```bash
node scripts/check-contrast.mjs   # comprova el contrast WCAG (≥ 4.5:1) dels tokens
node scripts/fetch-fonts.mjs      # descarrega i autoallotja les fonts (sense Google Fonts en execució)
node scripts/build-icons.mjs      # genera les icones i el favicon des de l'SVG de docs/dosi/icona/
node scripts/render-screens.mjs   # renderitza les pantalles de l'app a public/screens/*.webp
node scripts/build-og-image.mjs   # genera public/og.png (1200×630) per a les xarxes
```

Els tres últims necessiten Playwright amb el seu Chromium
(`npx playwright install chromium`); `render-screens` i `build-icons` també
fan servir `sharp`. Si `render-screens` no pot arrencar l'app (perquè encara
té `[PREU]` o no compila), s'omet i ja es fa servir la imatge de reserva.

## Com afegir un idioma

El text viu al `config.ts`; la infraestructura d'i18n encara no hi és (és una
millora futura). Quan s'afegeixi, el camí previst és:

1. Moure les cadenes de `src/utils/config.ts` a un fitxer per idioma
   (`ca`, després `en`, …) amb la mateixa forma.
2. Resoldre l'idioma per `Astro.currentLocale` (Astro té i18n nadiu) o per la
   ruta (`/ca/…`, `/en/…`).
3. Fer `lang="ca"` → `lang={locale}` a `src/Layout.astro` i `og:locale`
   en conseqüència (`ca_ES`, `en_US`, …).

## Comprovacions de la definició de fets

- `pnpm run check` → 0 errors / 0 warnings / 0 hints.
- `grep -ri "rally\|barlow" src public tailwind.config.mjs` → buit.
- Sense text en anglès a la pàgina (revisa també `aria-label` i `alt`).
- Contrast de text ≥ 4,5:1 (comprovat per `check-contrast.mjs`).
- Fonts autoallotjades: cap petició a Google Fonts en temps d'execució (RGPD).

## Tasques pendents 👤

- [ ] **GitHub Pages**: configurar el repo per publicar des de la branca `master` (Actions).
- [ ] **DNS**: crear el registre `CNAME` `dosi` → `jorditoda.github.io` i activar *Enforce HTTPS*.
- [ ] **Textos legals**: substituir `TODO 👤` (responsable: nom/NIF/adreça, fur i jurisdicció) i revisar-los amb un professional abans de publicar a les botigues.
- [ ] **Enllaços de botiga**: omplir `appStoreLink` i `googlePlayLink` a `src/utils/config.ts` el dia del llançament.
- [ ] **Analítica (opcional)**: si es vol, crear compte a GoatCounter i posar el codi a `goatcounterCode`; l'script s'injecta sol. Si no, la web continua sense cap analítica.
- [ ] **Llicència**: `package.json` diu `"license": "MIT"` però el repo duu la llicència **GPL-3.0** de la plantilla original; cal decidir quina es vol i fer-la coherent.

## Crèdits

Basada en la plantilla
[Automatic App Landing Page Repository](https://github.com/sofiyevsr/mobile-app-landing-template)
(codi de la plantilla sota llicència MIT). La marca, les icones, les pantalles
i tot el contingut de Dosi són de `docs/dosi/`.

## Llicència

[GPL-3.0](LICENSE) — vegeu la nota de l'`package.json` a les tasques pendents.
