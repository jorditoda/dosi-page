#!/usr/bin/env node
/**
 * Comprova el contrast WCAG 2.1 (mínim 4,5:1) dels parells de colors del
 * tema `dosi-dark` definit a `src/utils/theme.ts`.
 *
 * Els hexes es llegeixen del theme.ts: si un token desapareix o canvia de
 * valor, aquest script falla en lloc de comprovar un color antic.
 *
 * Ús: node scripts/check-contrast.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/utils/theme.ts"), "utf8");

// Token -> hex del bloc "dosi-dark". Els colors de tema referencien
// TOPIC_COLORS, es resolen després.
const tokens = {};
for (const m of src.matchAll(/^\s*"?([A-Za-z0-9-]+)"?:\s*("(#[0-9A-Fa-f]{6})"|TOPIC_COLORS\.([a-z]+))/gm)) {
  tokens[m[1]] = m[3] ?? { topic: m[4] };
}

// Resol TOPIC_COLORS.*
const topicBlock = src.match(/TOPIC_COLORS = \{([\s\S]*?)\} as const/)?.[1] ?? "";
const topicColors = Object.fromEntries(
  [...topicBlock.matchAll(/([a-z]+):\s*"(#[0-9A-Fa-f]{6})"/g)].map((m) => [
    m[1],
    m[2],
  ])
);
for (const [k, v] of Object.entries(tokens)) {
  if (typeof v === "object" && v.topic) {
    tokens[k] = topicColors[v.topic];
  }
}

const required = [
  "base-100", "base-200", "base-300", "base-content",
  "--dosi-text-secondary", "--dosi-text-muted", "--dosi-border",
  "primary", "primary-content",
  "secondary", "secondary-content", "accent", "accent-content",
  "success", "success-content", "warning", "warning-content",
  "error", "error-content",
  "--dosi-accent-soft", "--dosi-border-strong",
];
const missing = required.filter((t) => !tokens[t]);
if (missing.length) {
  console.error(`❌ Tokens que falten a theme.ts: ${missing.join(", ")}`);
  process.exit(1);
}

const hex = (h) =>
  h.replace("#", "").match(/../g).map((v) => parseInt(v, 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
/** Barreja un color sobre un fons amb opacitat (etiquetes de tema al 14%). */
const blend = (fg, bg, alpha) => {
  const f = hex(fg).map((c) => c * 255);
  const b = hex(bg).map((c) => c * 255);
  const m = f.map((c, i) => Math.round(c * alpha + b[i] * (1 - alpha)));
  return "#" + m.map((c) => c.toString(16).padStart(2, "0")).join("");
};

const t = tokens;
const surfaces = [t["base-100"], t["base-200"], t["base-300"]];
const pairs = [
  // Text sobre les tres superfícies
  ...surfaces.flatMap((s, i) => [
    [`base-content sobre base-${100 + i * 100}`, t["base-content"], s],
    [`text-secondary sobre base-${100 + i * 100}`, t["--dosi-text-secondary"], s],
    [`text-muted sobre base-${100 + i * 100}`, t["--dosi-text-muted"], s],
  ]),
  // Acció
  ["primary com a text sobre base-100", t["primary"], t["base-100"]],
  ["primary-content sobre primary", t["primary-content"], t["primary"]],
  ["accent-soft sobre base-100", t["--dosi-accent-soft"], t["base-100"]],
  ["accent-soft sobre base-200", t["--dosi-accent-soft"], t["base-200"]],
  // Semàntics
  ["success sobre base-100", t["success"], t["base-100"]],
  ["success-content sobre success", t["success-content"], t["success"]],
  ["error sobre base-100", t["error"], t["base-100"]],
  ["error-content sobre error", t["error-content"], t["error"]],
  ["warning sobre base-100", t["warning"], t["base-100"]],
  ["secondary sobre base-100", t["secondary"], t["base-100"]],
  ["accent sobre base-100", t["accent"], t["base-100"]],
];

// Colors de tema amb el text de la seva etiqueta (03-disseny.md), sobre la
// superfície i sobre la pròpia etiqueta al 14%.
const topicText = {
  negotiation: "#FFB27A",
  psychology: "#C4B5FD",
  communication: "#5EEAD4",
};
for (const [id, color] of Object.entries(
  Object.fromEntries(
    Object.entries(t).filter(([k]) => k.startsWith("--dosi-topic-"))
  )
)) {
  const label = id.replace("--dosi-topic-", "");
  const fg = topicText[label];
  if (!fg) continue;
  pairs.push([`text tema ${label} sobre base-100`, fg, t["base-100"]]);
  pairs.push([
    `text tema ${label} sobre etiqueta 14%`,
    fg,
    blend(color, t["base-100"], 0.14),
  ]);
}

let fail = 0;
for (const [name, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= 4.5;
  if (!ok) fail++;
  console.log(
    `${ok ? "✅" : "❌"} ${r.toFixed(2).padStart(6)} : ${name} (${fg} sobre ${bg})`
  );
}
if (fail) {
  console.error(`\n${fail} parell(s) per sota de 4,5:1`);
  process.exit(1);
}
console.log("\n✅ Tot el tema passa el contrast mínim de 4,5:1");
