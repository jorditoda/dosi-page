import AnimatedList from "../../components/animatedList";
import MenuToggle from "../../components/menuToggle";
import clsx from "clsx";
import {useContext, useEffect, useState} from "react";
import {ConfigContext} from "../../utils/configContext";

/**
 * Navbar superior.
 *
 * Amplada fixa: abans animava de 100% a 80% en fer scroll i el contingut
 * s'encavalcava (el logo passava per sobre del commutador de tema). El que
 * canvia en fer scroll és només l'ombra i el fons, que és el que separa la
 * barra del contingut.
 *
 * El tall complet passa de `md` (768px) a `lg` (1024px): a 800px el nav
 * complet era visible i no hi cabia.
 */
function Navbar() {
  const { name, topNavbar } = useContext(ConfigContext)!;

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    // The mobile menu closes when Esc is pressed and when returning to desktop.
  useEffect(() => {
    if (!isMobileNavVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileNavVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileNavVisible]);

  return (
    <nav className="max-w-screen-lg mx-auto sticky top-0 z-50 px-4">
      <div
        className={clsx(
          "navbar relative rounded-2xl px-4 transition-shadow duration-200",
          isScrolled
            ? "bg-base-200/90 backdrop-blur shadow-lg border border-base-300"
            : "bg-base-200/60 backdrop-blur-sm border border-transparent"
        )}
      >
        <div className="navbar-start">
          <a href="/" className="flex items-center gap-2">
            {/*
              Marca: la icona de l'app (SVG inline o /logo.svg) més el nom.
              El SVG de l'icona és pla i hereta `currentColor` allà on cal.
            */}
            <img src="/logo.svg" alt="" className="h-8 w-8" aria-hidden="true" />
            <span className="font-condensed font-bold text-lg md:text-xl">
              {name}
            </span>
          </a>
        </div>

        <div className="navbar-end lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileNavVisible((v) => !v)}
            aria-expanded={isMobileNavVisible}
            aria-controls="mobile-menu"
            aria-label={isMobileNavVisible ? "Tanca el menú" : "Obre el menú"}
            className="btn btn-ghost btn-sm px-2"
          >
            <MenuToggle isOpen={isMobileNavVisible} />
          </button>
        </div>

        <div className="navbar-end hidden font-semibold lg:flex">
          <ul className="flex gap-5 px-1 items-center list-none m-0">
            {topNavbar.links.map(({ title, href }) => (
              <li key={href} className="m-0">
                <a
                  className="text-sm whitespace-nowrap link link-hover"
                  href={href}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
          {topNavbar.cta && (
            <a
              href="/app"
              className="ml-4 btn btn-primary btn-outline py-4 font-condensed"
            >
              {topNavbar.cta}
            </a>
          )}
        </div>
      </div>

      <AnimatedList
        listKey="mobile-navbar"
        listClassName="absolute bg-base-200 left-4 right-4 top-full mt-2 shadow-lg rounded-2xl border border-base-300 px-4 py-3 flex flex-col gap-2 lg:hidden"
        isVisible={isMobileNavVisible}
      >
        <div id="mobile-menu">
        <ul className="list-none p-0 m-0 flex flex-col gap-1">
          {topNavbar.links.map(({ title, href }) => (
            <li key={href} className="m-0 w-full">
              <a
                className="btn btn-ghost w-full justify-start"
                href={href}
                onClick={() => setIsMobileNavVisible(false)}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        </div>
      </AnimatedList>
    </nav>
  );
}

export default Navbar;