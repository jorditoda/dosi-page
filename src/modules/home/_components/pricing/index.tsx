import AnimatedText from "../../../../components/animatedText";
import { Icon } from "../../../../components/icons";
import { motion } from "framer-motion";
import { useContext } from "react";
import {ConfigContext} from "../../../../utils/configContext";
import StoreBadges from "../../../../components/storeBadges";

/**
 * Taula de comparison Gratis / Pro (model freemium de §0).
 *
 * Sense preus: encara no n'hi ha de decidits. Els valors són text ("Sí",
 * "No", "1-2 de prova"), mai només color, perquè el contrast també es llegeix
 * en blanc i negre.
 *
 * El CTA és el mateix que els botons de botiga: "Baixa l'app".
 */
function Pricing() {
  const {
    home: { pricing },
  } = useContext(ConfigContext)!;
  if (!pricing) return null;

  // Etiqueta de cada fila: la intersecten els dos plans.
  const rowLabels = pricing.plans[0]?.features.map((f) => f.label) ?? [];

  return (
    <section
      id={pricing.id}
      className="section-y max-w-screen-lg mx-auto px-4"
    >
      <div className="section-head max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-3">
          <AnimatedText text={pricing.title} />
        </h2>
        {pricing.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 0.7 }}
            viewport={{ once: true }}
            className="text-md max-w-lg"
          >
            {pricing.subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="surface-card bg-base-200 overflow-hidden max-w-3xl mx-auto"
      >
        <table className="w-full text-left">
          <caption className="sr-only">
            Comparació entre el pla gratuït i Pro
          </caption>
          <thead>
            <tr className="border-b border-base-300">
              <th scope="col" className="p-4 md:p-5 font-normal w-1/2">
                <span className="sr-only">Funció</span>
              </th>
              {pricing.plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className="p-4 md:p-5 text-center align-bottom"
                >
                  <span className="font-condensed font-bold text-xl md:text-2xl block">
                    {plan.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((label, i) => (
              <tr
                key={label}
                className="border-b border-base-300/60 last:border-b-0"
              >
                <th
                  scope="row"
                  className="p-3 md:p-4 font-normal opacity-80 text-sm md:text-base"
                >
                  {label}
                </th>
                {pricing.plans.map((plan) => {
                  const value = plan.features[i]?.value ?? "—";
                  const included = value !== "No";
                  return (
                    <td
                      key={plan.name}
                      className={
                        "p-3 md:p-4 text-center text-sm md:text-base " +
                        (plan.highlight && included ? "text-primary font-semibold" : "")
                      }
                    >
                      <span className="inline-flex items-center gap-1.5 justify-center">
                        {value !== "Sí" && value !== "No" && (
                          <Icon
                            name="check"
                            className="w-4 h-4 shrink-0 text-primary"
                          />
                        )}
                        {value}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {pricing.actionText && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <a href="#descarrega" className="btn btn-primary px-8">
            {pricing.actionText}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <StoreBadges />
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default Pricing;
