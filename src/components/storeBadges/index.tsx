import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { storeHref, storeLinkProps } from "../../utils/common";

interface Props {
  /** Alçada de les insígnies (classe Tailwind). */
  className?: string;
}

/**
 * Insígnies oficials d'App Store i Google Play, sempre totes dues.
 *
 * Els enllaços surten de `appStoreLink` / `googlePlayLink` del config; mentre
 * no hi hagi enllaç real apunten a `#descarrega` (el CTA final) i no obren
 * pestanya nova. El dia del llançament n'hi ha prou amb omplir els camps del
 * config.
 *
 * `data-goatcounter-click` deixa la pàgina preparada per a l'analítica
 * opcional de GoatCounter (sense cookies).
 */
function StoreBadges({ className = "h-14" }: Props) {
  const { googlePlayLink, appStoreLink } = useContext(ConfigContext)!;

  return (
    <>
      <a href={storeHref(googlePlayLink)} data-goatcounter-click="badge-google-play" {...storeLinkProps(googlePlayLink)}>
        <img
          className={className}
          alt="Baixa Dosi a Google Play"
          src="/stores/google-play.svg"
          loading="lazy"
          decoding="async"
        />
      </a>
      <a href={storeHref(appStoreLink)} data-goatcounter-click="badge-app-store" {...storeLinkProps(appStoreLink)}>
        <img
          className={className}
          alt="Baixa Dosi a l'App Store"
          src="/stores/app-store.svg"
          loading="lazy"
          decoding="async"
        />
      </a>
    </>
  );
}

export default StoreBadges;
