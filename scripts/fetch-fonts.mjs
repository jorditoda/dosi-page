#!/usr/bin/env node
/**
 * Descarrega les fonts de la landing a `public/fonts/` i regenera
 * `src/styles/fonts.css`. Autoallotjades: la web no fa cap petició a Google
 * Fonts en temps d'execució (RGPD).
 *
 * Famílies i gruixos segons `docs/dosi/03-disseny.md`:
 *   · Bricolage Grotesque 600-800 — títols i números
 *   · Inter 400-600 — text, botons i interfície
 *
 * Es demana la variació `wght` (font variable), de manera que un sol fitxer
 * per subconjunt cobreix tots els gruixos. Subconjunts: latin i latin-ext
 * (català inclòs: à, ç, ·, accents).
 *
 * Ús: node scripts/fetch-fonts.mjs   (cal connexió)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontsDir = join(root, "public/fonts");
const cssOut = join(root, "src/styles/fonts.css");

// UA de navegador: sense ella Google Fonts serveix TTF en lloc de woff2.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FAMILIES = [
  { api: "Bricolage+Grotesque:wght@600..800", slug: "bricolage-grotesque" },
  { api: "Inter:wght@400..600", slug: "inter" },
];
const SUBSETS = ["latin", "latin-ext"];

mkdirSync(fontsDir, { recursive: true });

const faces = [];
for (const { api, slug } of FAMILIES) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${api}&display=swap`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();

  // El css2 comenta el subconjunt abans de cada bloc @font-face.
  const blocks = [...css.matchAll(/\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/g)];
  if (!blocks.length) {
    throw new Error(`No s'ha pogut parsejar el CSS de ${api}:\n${css.slice(0, 400)}`);
  }
  for (const [, subset, block] of blocks) {
    if (!SUBSETS.includes(subset)) continue;
    const family = block.match(/font-family:\s*'([^']+)'/)?.[1];
    const weight = block.match(/font-weight:\s*([\d ]+)/)?.[1].trim();
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1].trim();
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    if (!family || !weight || !url) continue;

    const file = `${slug}-${subset}.woff2`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw Error(`Error ${res.status} baixant ${url}`);
    writeFileSync(join(fontsDir, file), Buffer.from(await res.arrayBuffer()));
    faces.push({ family, weight, range, file });
    console.log(`✅ ${file} (${family} ${weight})`);
  }
}

const css = `/* Generat per scripts/fetch-fonts.mjs. No editar a mano. */
${faces
  .map(
    (f) => `@font-face {
  font-family: '${f.family}';
  font-style: normal;
  font-weight: ${f.weight};
  font-display: swap;
  src: url('/fonts/${f.file}') format('woff2');
  unicode-range: ${f.range};
}`
  )
  .join("\n\n")}
`;
writeFileSync(cssOut, css);
console.log(`\n✅ ${faces.length} @font-face escrits a src/styles/fonts.css`);
