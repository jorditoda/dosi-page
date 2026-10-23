#!/usr/bin/env node
/**
 * Renderitza les pantalles de `docs/dosi/referencia-disseny/*.dc.html` a
 * imatges nítides de 390 × 844 (@2x → 780 × 1688) a `public/screens/`.
 *
 * Cada `.dc.html` conté una sola pantalla (comprovat: el div de 390 × 844 és
 * l'arrel); si se'n troba més d'una, es retalla la primera i es fa servir el
 * locator. Els fitxers amb text de mostra (`[PREU]`) s'ometen automàticament:
 * no es pot publicar una captura amb un marcador (Subscripcio).
 *
 * Es desa en webp (qualitat 90) si pesa menys del 90% del PNG; en cas
 * contrari es conserva el PNG. Cal haver fet `npx playwright install chromium`.
 *
 * Ús: node scripts/render-screens.mjs
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "docs/dosi/referencia-disseny");
const outDir = join(root, "public/screens");

/** Nom del fitxer → nom de sortida. `Guia` és la guia d'estil (1440 × 2400). */
const SCREENS = {
  Main: "main", // feed
  Targeta: "targeta", // targeta oberta
  Quiz: "quiz",
  Explorar: "explorar",
  Conversa: "conversa", // pràctica amb IA
  Tancament: "tancament", // fi de la dosi
  Practicar: "practicar",
  Perfil: "perfil",
  Onboarding: "onboarding",
};

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
let rendered = 0;
let skipped = 0;

for (const [name, slug] of Object.entries(SCREENS)) {
  const file = join(srcDir, `${name}.dc.html`);
  const html = readFileSync(file, "utf8");

  // Text de mostra: mai es publica una captura amb un marcador.
  const placeholder = html.match(/\[[A-ZÀ-Ý][A-ZÀ-Ý ]*\]/);
  if (placeholder) {
    console.log(`⚠️  ${name}.dc.html conté "${placeholder[0]}" — omesa`);
    skipped++;
    continue;
  }

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await page.goto(`file://${file}`, { waitUntil: "networkidle" });
  // Les fonts (Google Fonts, dins del <helmet>) han d'estar carregades: sinó
  // la captura surt amb fallback i es veu diferent de l'app.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  // El div de la pantalla és l'arrel de 390 × 844 dins de x-dc.
  const screen = page.locator("x-dc > div").first();
  const png = await screen.screenshot({ type: "png" });
  await page.close();

  const webp = await sharp(png).webp({ quality: 90, smartSubsample: true }).toBuffer();
  if (webp.length < png.length * 0.9) {
    writeFileSync(join(outDir, `${slug}.webp`), webp);
    console.log(
      `✅ ${slug}.webp (780 × 1688, ${(webp.length / 1024).toFixed(0)} KB, PNG ${(png.length / 1024).toFixed(0)} KB)`
    );
  } else {
    writeFileSync(join(outDir, `${slug}.png`), png);
    console.log(`✅ ${slug}.png (780 × 1688, ${(png.length / 1024).toFixed(0)} KB)`);
  }
  rendered++;
}

await browser.close();
console.log(`\n✅ ${rendered} pantalles a public/screens/ (${skipped} omeses)`);
