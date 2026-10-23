import {motion, useScroll} from "framer-motion";
import {useContext, useRef} from "react";
import {ConfigContext} from "../../../../utils/configContext";
import SingleScreenshot from "./singleScreenshot";
import SVGWave from "./svg/wave";
import SVGBlob from "./svg/blob";

function Header() {
  const {
    googlePlayLink,
    appStoreLink,
    home: { header, partners },
  } = useContext(ConfigContext)!;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section id={header.id} className="relative pb-8 md:pb-4">
      <div className="max-w-screen-lg mx-auto py-4 px-4 md:py-16">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center md:items-start md:h-[300vh]">
            <div className="static top-40 flex flex-col prose justify-center py-8 md:sticky md:h-[648px]">
              {/* Only <h1> on the page. Sections use <h2>. */}
              <motion.h1
                initial={{ opacity: 0, rotateZ: -10 }}
                animate={{ opacity: 1, rotateZ: 0 }}
                className="mt-0 mb-4 text-4xl md:text-6xl"
              >
                {header.headlineMark ? (
                  <>
                    {header.headline
                      .split(" ")
                      .slice(0, header.headlineMark[0])
                      .join(" ")}{" "}
                    <span className="inline-block relative">
                      <span>
                        {header.headline
                          .split(" ")
                          .slice(...header.headlineMark)
                          .join(" ")}
                      </span>
                      <motion.span
                        animate={{
                          width: "100%",
                          height: "100%",
                        }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="w-0 h-full top-0 left-0 z-[-1] absolute inline-block bg-primary/25 rounded-lg"
                      />
                    </span>{" "}
                    {header.headline
                      .split(" ")
                      .slice(header.headlineMark[1])
                      .join(" ")}
                  </>
                ) : (
                  header.headline
                )}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ delay: 0.5, ease: "easeInOut" }}
                className="whitespace-pre-wrap text-left m-0 my-1 max-w-md md:text-lg md:max-w-lg"
              >
                {header.subtitle}
              </motion.p>
              <motion.ul
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="list-none flex gap-4 m-0 p-0"
              >
                {googlePlayLink && (
                  <li className="m-0 p-0">
                    <a href={googlePlayLink}>
                      <img
                        className="h-14"
                        alt="google play logo"
                        src="/stores/google-play.svg"
                      />
                    </a>
                  </li>
                )}
                {appStoreLink && (
                  <li className="m-0 p-0">
                    <a href={appStoreLink}>
                      <img
                        className="h-14"
                        alt="app store logo"
                        src="/stores/app-store.svg"
                      />
                    </a>
                  </li>
                )}
              </motion.ul>
            </div>
          </div>
          <div className="min-h-[80vh] z-[-1]" ref={ref}>
            <div className="flex justify-center sticky top-28 md:top-40">
              <SVGBlob
                scrollYProgress={scrollYProgress}
                className="-z-10 absolute hidden w-[800px] -top-20 -right-60 md:hidden xl:block"
              />
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  mass: 0.4,
                  duration: 0.5,
                  delay: 0.3,
                }}
                className="relative h-[532px] 2xs:h-[720px] sm:h-[648px] rounded-[3rem] border-[10px] border-base-300 bg-base-100 shadow-2xl"
              >
                <div className="absolute inset-0 rounded-[2.2rem] md:rounded-[2.4rem] overflow-hidden">
                  {header.screenshots.map((src, index) => (
                    <SingleScreenshot
                      key={src}
                      src={src}
                      scrollYProgress={scrollYProgress}
                      index={index}
                      totalCount={header.screenshots.length}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {partners && (
        <SVGWave className="absolute -bottom-1 left-0 right-0 -z-10" />
      )}
    </section>
  );
}

export default Header;
