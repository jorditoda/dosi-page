import Footer from "@components/footer";
import type {TemplateConfig} from "utils/configType";
import {ConfigContext} from "utils/configContext";

/**
 * Pàgina 404.
 *
 * És un mòdul com els altres perquè el Footer consumeix `ConfigContext`, i a
 * Astro només es pot satisfer dins d'una illa de React: un
 * `<ConfigContext.Provider>` escrit directament al `.astro` no es renderitza,
 * perquè Astro només munta illes de components, no proveïdors.
 *
 * `noindex` i `seo` els posa el `Layout` de `pages/404.astro`.
 */
interface Props {
  config: TemplateConfig;
}

function NotFound({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <main className="min-h-[70vh] flex items-center">
        <section className="section-y max-w-screen-lg mx-auto px-4 w-full">
          <p className="font-condensed font-bold text-primary leading-none tabular-nums mb-2">
            404
          </p>
          <h1 className="mt-0 mb-3 font-condensed font-bold text-4xl md:text-5xl">
            Aquesta carretera no és al mapa
          </h1>
          <p className="opacity-70 max-w-md mb-8">
            La pàgina que busques no existeix. Potser s'ha mogut o l'enllaç és
            equivocat.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/" className="btn btn-primary px-6">
              Torna a l'inici
            </a>
            <a href="/#funcions" className="btn btn-outline px-6">
              Veure les funcions
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </ConfigContext.Provider>
  );
}

export default NotFound;