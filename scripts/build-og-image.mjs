#!/usr/bin/env node
/**
 * Genera `public/og.png` (1200 × 630) per a Open Graph i Twitter.
 *
 * Les xarxes socials no accepten SVG a `og:image`, per això cal un PNG
 * raster. El disseny fa servir els tokens del sistema: fons `#101216`
 * (base-100), la icona de l'app i el lema en Bricolage Grotesque.
 *
 * Les fonts es incrusten en base64: el render és del navegador local, sense
 * cap petició externa.
 *
 * Ús: node scripts/build-og-image.mjs   (cal `npx playwright install chromium`)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const W = 1200;
const H = 630;

// La icona font és un quadrat ple; se'n redueixen les cantonades i s'afegeix
// una vora de superfície perquè es llegeixi com a tile d'app sobre el fons.
const RADIUS = Math.round(1024 * 0.2237);
const icon = readFileSync(join(root, "docs/dosi/icona/app_icon.svg"), "utf8")
  .replace(
    /<rect width="1024" height="1024" fill="#101216"\/>/,
    `<rect width="1024" height="1024" rx="${RADIUS}" fill="#101216" stroke="#2A2E36" stroke-width="8"/>`
  )
  .replace(/width="1024" height="1024"/, 'width="100%" height="100%"');

const b64 = (p) => readFileSync(join(root, p)).toString("base64");

const html = `<!doctype html><style>
@font-face { font-family: 'Bricolage Grotesque'; font-weight: 600 800; src: url(data:font/woff2;base64,${b64("public/fonts/bricolage-grotesque-latin.woff2")}) format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 400 600; src: url(data:font/woff2;base64,${b64("public/fonts/inter-latin.woff2")}) format('woff2'); }
html, body { margin: 0; }
#og {
  width: ${W}px; height: ${H}px; box-sizing: border-box;
  background: #101216; color: #F2F3F5;
  display: flex; align-items: center; gap: 72px; padding: 0 96px;
  font-family: 'Inter', system-ui, sans-serif;
}
.icon { width: 300px; height: 300px; flex: none; }
.icon svg { display: block; width: 100%; height: 100%; }
.text h1 {
  font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
  font-size: 96px; line-height: 1; margin: 0 0 24px;
}
.text p { font-size: 40px; line-height: 1.3; margin: 0; color: #C9CDD6; max-width: 620px; }
.dot { color: #FF8A3D; }
</style>
<div id="og">
  <div class="icon">${icon}</div>
  <div class="text">
    <h1>Dosi<span class="dot">.</span></h1>
    <p>Una dosi diària per entendre millor la gent</p>
  </div>
</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
});
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.locator("#og").screenshot({ path: join(root, "public/og.png") });
await browser.close();

const size = readFileSync(join(root, "public/og.png")).length;
console.log(`✅ public/og.png (${W} × ${H}, ${(size / 1024).toFixed(0)} KB)`);
