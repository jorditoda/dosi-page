interface Props {
  src: string;
  /** Text alternatiu de la captura. */
  alt?: string;
}

/**
 * Captura dins d'un marc de mòbil fet només amb CSS (radi, vora i ombra).
 * Abans era una imatge `.webp` del mockup; amb les captures reals de
 * 390 × 844 el marc CSS és nítid a qualsevol escala i no arrossega cap asset.
 */
function IphoneFrame({ src, alt = "Pantalla de l'app Dosi" }: Props) {
  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] border-[8px] border-base-300 bg-base-100 shadow-2xl">
      <img src={src} alt={alt} className="rounded-[1.4rem] h-full w-full object-cover" />
    </div>
  );
}

export default IphoneFrame;
