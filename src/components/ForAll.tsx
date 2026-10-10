import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useShop } from "../store";

const PANELS = [
  {
    label: "Him.",
    caption: "Eon Cuban · Solis Signet · Vapor Cuff",
    image: "./images/editorial-men.jpg",
  },
  {
    label: "Her.",
    caption: "Solis Locket · Vapor Cuff · Noctis Signet",
    image: "./images/editorial-women.jpg",
  },
];

export default function ForAll() {
  const { scrollTo, showToast } = useShop();

  const shop = () => {
    scrollTo("#shop");
    showToast("Same pieces. Every body.");
  };

  return (
    <section id="forall" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <Reveal className="mb-12 text-center md:mb-16">
        <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-gold">No mens, no womens</p>
        <h2 className="font-display font-light leading-[0.95] text-cream text-[clamp(2.8rem,7vw,6rem)]">
          No gender. <span className="italic gold-text">Just gold.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-sand md:text-base">
          Every AURUM piece is designed on a spectrum, not a side of the store.
          Hover each portrait — notice anything? It&apos;s the same metal.
        </p>
      </Reveal>

      <div className="flex h-auto flex-col gap-5 md:h-[72vh] md:flex-row">
        {PANELS.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.12} className="md:flex-1 md:hover:flex-[1.7] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
            <button
              onClick={shop}
              data-cursor="Shop"
              className="group relative block h-[420px] w-full overflow-hidden rounded-3xl text-left md:h-full"
            >
              <img
                src={p.image}
                alt={`AURUM jewelry styled on ${p.label.replace(".", "")}`}
                className="absolute inset-0 h-full w-full object-cover grayscale-[45%] transition-all duration-[1100ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20" />

              <div className="absolute inset-x-7 bottom-7 md:inset-x-9 md:bottom-9">
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {p.caption}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display text-5xl font-light italic text-cream md:text-6xl">{p.label}</h3>
                  <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/80 transition-colors duration-300 group-hover:text-gold">
                    Shop the edit
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <p className="font-display text-xl italic text-sand">
          &ldquo;them.&rdquo; shops the exact same page — <span className="gold-text">that&apos;s the point.</span>
        </p>
      </Reveal>
    </section>
  );
}
