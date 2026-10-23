#!/usr/bin/env node
/**
 * Genera els assets de marca de la web a partir de
 * `docs/dosi/icona/app_icon.svg` (font de veritat de la icona):
 *
 *   · public/logo.svg               — marca amb cantonades arrodonides (iOS)
 *   · public/favicon.svg            — el mateix, per a favicon vectorial
 *   · public/favicon.png            — 32 × 32
 *   · public/apple-touch-icon.png   — 180 × 180
 *
 * El PNG es rasteritza amb Playwright (Chromium): no hi ha rsvg-convert ni
 * ImageMagick al projecte i el mateix navegador que renderitza les captures
 * de la Fase 3 serveix. Cal haver fet `npx playwright install chromium`.
 *
 * Ús: node scripts/build-icons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "docs/dosi/icona/app_icon.svg");

// La icona font és un quadrat ple 1024 × 1024: les botigues hi apliquen la
// màscara. Al web (favicon, navbar) la cantonada arrodonida l'apliquem nosaltres.
const SIZE = 1024;
const RADIUS = Math.round(SIZE * 0.2237); // cantonada iOS
let svg = readFileSync(src, "utf8").replace(
  /<rect width="1024" height="1024"([^>]*)\/>/,
  `<rect width="1024" height="1024" rx="${RADIUS}"$1/>`
);
svg = svg.replace(
  "<svg ",
  '<svg role="img" aria-label="Dosi" '
);

writeFileSync(join(root, "public/logo.svg"), svg);
writeFileSync(join(root, "public/favicon.svg"), svg);
console.log("✅ logo.svg i favicon.svg");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: SIZE, height: SIZE },
  deviceScaleFactor: 1,
});
// L'SVG font té mida fixa 1024: per renderitzar a 32/180 px se'n canvia la
// mida a 100% i es respetaria el viewBox.
const scalable = svg.replace(
  /(<svg[^>]*?)width="1024" height="1024"/,
  '$1width="100%" height="100%"'
);
await page.setContent(
  `<!doctype html><style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:100%;height:100%}</style>${scalable}`
);

for (const [file, px] of [
  ["favicon.png", 32],
  ["apple-touch-icon.png", 180],
]) {
  await page.setViewportSize({ width: px, height: px });
  await page.screenshot({
    path: join(root, "public", file),
    clip: { x: 0, y: 0, width: px, height: px },
    omitBackground: true,
  });
  console.log(`✅ ${file} (${px} × ${px})`);
}

await browser.close();
