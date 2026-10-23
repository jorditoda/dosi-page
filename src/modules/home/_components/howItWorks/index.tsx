import AnimatedText from "../../../../components/animatedText";
import {motion} from "framer-motion";
import {useContext} from "react";
import {ConfigContext} from "../../../../utils/configContext";

/**
 * "Com funciona" — passos amb captures reals de l'app.
 *
 * Les captures es generen des dels `.dc.html` de `docs/dosi/referencia-disseny`
 * amb `scripts/render-screens.mjs`.
 *
 * Ritme vertical controlat amb `gap-*`, numeració 01/02/03 en tipografia de
 * títols perquè guii la lectura sola. `aspect-[16/10]` amb `object-contain`
 * normalitza les mides sense retallar res.
 */
function HowItWorks() {
  const {
    name,
    home: { howItWorks },
  } = useContext(ConfigContext)!;

  if (!howItWorks) return null;

  return (
    <section id={howItWorks.id} className="section-y max-w-screen-lg mx-auto px-4">
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={howItWorks.title} />
        </h2>
        {howItWorks.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {howItWorks.subtitle}
          </motion.p>
        )}
      </div>

      <ol className="list-none p-0 m-0 flex flex-col gap-12 md:gap-16">
        {howItWorks.steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12"
          >
            <motion.div
              variants={{
                hidden: { x: index % 2 === 0 ? "-40px" : "40px", opacity: 0 },
                visible: { x: "0px", opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 120, mass: 0.6 }}
              className="flex-1 order-2 md:order-1 text-center md:text-left"
            >
              <div className="font-condensed font-bold text-6xl text-primary leading-none tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 mb-2 text-2xl font-condensed font-bold">
                {step.title}
              </h3>
              <p className="opacity-70 max-w-md mx-auto md:mx-0 leading-relaxed">
                {step.subtitle}
              </p>
            </motion.div>

            <motion.figure
              variants={{
                hidden: { x: index % 2 === 0 ? "40px" : "-40px", opacity: 0 },
                visible: { x: "0px", opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 120, mass: 0.6 }}
              className="flex-1 order-1 md:order-2 m-0"
            >
              <div className="surface-card bg-base-200 aspect-[16/10] overflow-hidden flex items-center justify-center">
                <img
                  src={step.image}
                  alt={`${step.title} — ${name}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.figure>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;