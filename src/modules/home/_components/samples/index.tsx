import AnimatedText from "../../../../components/animatedText";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * Dosis d'exemple, una per tema.
 *
 * Les targetes vénen literalment de `docs/dosi/cards.json` (agafades al
 * config): res d'aquesta secció està inventat. És la prova real del producte:
 * el mateix ganxo i la mateixa font que veuràs a l'app.
 *
 * L'etiqueta de tema fa servir els colors de `topics.json`: el color del tema
 * al 14 % de fons i el text aclarit. Els colors de tema identifiquen temes,
 * mai són accions (03-disseny.md).
 */
function Samples() {
  const {
    home: { samples },
  } = useContext(ConfigContext)!;
  if (!samples) return null;

  return (
    <section id={samples.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={samples.title} />
        </h2>
        {samples.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {samples.subtitle}
          </motion.p>
        )}
      </div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start"
      >
        {samples.doses.map((dose) => (
          <motion.li
            key={dose.topic}
            variants={{
              hidden: { y: 24, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-4"
          >
            {/* Etiqueta de tema: color del tema al 14 %, text aclarit. */}
            <span
              className="self-start inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: `color-mix(in srgb, ${dose.topicColor} 14%, transparent)`,
                color: dose.topicLabelColor,
              }}
            >
              {dose.topicName}
            </span>

            {dose.cards.map((card) => (
              <article
                key={card.concept}
                className="surface-card bg-base-200 p-5 flex flex-col gap-3"
              >
                <h3 className="m-0 font-condensed font-bold text-lg leading-snug">
                  {card.hook}
                </h3>
                <p className="m-0 text-sm opacity-80 leading-relaxed">
                  {card.concept}
                </p>
                <p className="m-0 text-xs text-3 leading-relaxed">
                  {card.source}
                </p>
              </article>
            ))}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default Samples;
