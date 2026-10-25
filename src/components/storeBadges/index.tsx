import {useContext} from "react";
import {ConfigContext} from "../../utils/configContext";
import {storeHref, storeLinkProps} from "../../utils/common";

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
 * `storeHref`/`storeLinkProps` mantenen les insígnies sempre visibles i fan
 * que apunten a la botiga real quan n'hi ha.
 */
function StoreBadges({ className = "h-14" }: Props) {
  const { googlePlayLink, appStoreLink } = useContext(ConfigContext)!;

  return (
    <>
      <a href={storeHref(googlePlayLink)} {...storeLinkProps(googlePlayLink)}>
        <img
            className={`${className} w-auto`}
          width={180}
          height={53}
          alt="Baixa Dosi a Google Play"
          src="/stores/google-play.svg"
          loading="lazy"
          decoding="async"
        />
      </a>
      <a href={storeHref(appStoreLink)} {...storeLinkProps(appStoreLink)}>
        <img
            className={`${className} w-auto`}
          width={118}
          height={38}
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
