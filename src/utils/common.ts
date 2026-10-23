export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent;
  if (/android/i.test(userAgent)) {
    return "android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "ios";
  }
}

/**
 * Enllaç d'una insígnia de botiga: el real si n'hi ha; sinó, `#descarrega`
 * (el CTA final de baixada). Així les insígnies sempre són visibles "com si
 * l'app ja hi fos", fins al dia del llançament.
 */
export function storeHref(link?: string): string {
  return link ?? "#descarrega";
}

/**
 * Atributs d'enllaç d'una insígnia: `target="_blank"` només si hi ha enllaç
 * real a la botiga. Apuntar a `#descarrega` no ha d'obrir pestanya nova.
 */
export function storeLinkProps(link?: string) {
  return link ? { target: "_blank" as const, rel: "noopener" } : {};
}
