import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus, Star } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useShop } from "../store";

const EASE = [0.22, 1, 0.36, 1] as const;

function Word({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
        className={`block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { addToCart, setQuickView, scrollTo } = useShop();
  const noctis = PRODUCTS[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* ambient gold glow */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[70vh] w-[70vh] rounded-full bg-gold/[0.13] blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[40vh] w-[40vh] rounded-full bg-gold/[0.06] blur-[110px]" />
      {/* watermark */}
      <span className="text-outline pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none opacity-40">
        AURUM
      </span>

      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-28 pt-32 md:px-10 lg:grid-cols-12 lg:gap-4 lg:pt-40">
        {/* ------- copy ------- */}
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-sand md:text-[11px]">
              Unisex fine jewelry — est. 2017
            </span>
          </motion.div>

          <h1 className="font-display font-light leading-[0.92] text-cream text-[clamp(3.4rem,9.5vw,8.6rem)] tracking-[-0.02em]">
            <Word delay={0.45}>Worn by</Word>
            <Word delay={0.58} className="gold-text italic">
              every body.
            </Word>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="mt-8 max-w-md text-base leading-relaxed text-sand md:text-lg"
          >
            Rings, bracelets, lockets & chains — hand-poured in recycled gold and silver.
            For him, for her, for them. <span className="text-cream">For you.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("#shop")}
              className="group flex h-14 items-center gap-3 rounded-full bg-gold px-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-soft"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </button>
            <button
              onClick={() => scrollTo("#craft")}
              className="h-14 rounded-full border border-cream/25 px-8 text-[11px] uppercase tracking-[0.25em] text-cream transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Our craft
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-sand"
          >
            <span className="flex items-center gap-2">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1} />
                ))}
              </span>
              <span className="text-cream">4.9</span> · 12k+ wearers
            </span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span>100% recycled metals</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span>Ships worldwide in 48h</span>
          </motion.div>
        </motion.div>

        {/* ------- image ------- */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.55, ease: EASE }}
            className="relative mx-auto aspect-[4/5.2] w-full max-w-[440px] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-cream/10"
            data-cursor="View"
            onClick={() => setQuickView(noctis)}
          >
            <motion.img
              src="./images/hero.jpg"
              alt="Noctis signet ring in 18k gold"
              style={{ y: imgY }}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 1.6, delay: 0.55, ease: EASE }}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </motion.div>

          {/* rotating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
            className="absolute -left-4 top-6 md:-left-10"
          >
            <div className="relative grid h-28 w-28 place-items-center md:h-32 md:w-32">
              <svg viewBox="0 0 100 100" className="animate-spin-slower absolute inset-0 h-full w-full">
                <defs>
                  <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-gold text-[9.5px] uppercase" style={{ letterSpacing: "0.32em" }}>
                  <textPath href="#circlePath">handcrafted · genderless · recycled ·</textPath>
                </text>
              </svg>
              <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-ink/60 backdrop-blur-sm">
                <span className="font-display text-xl italic text-gold">Au</span>
              </div>
            </div>
          </motion.div>

          {/* product chip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.45, ease: EASE }}
            className="absolute -right-2 bottom-10 md:-right-6"
          >
            <div className="glass animate-floaty flex items-center gap-4 rounded-2xl border border-cream/15 p-4 pr-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-sand">As seen here</p>
                <p className="mt-1 font-display text-lg leading-none text-cream">{noctis.name}</p>
                <p className="mt-1 text-sm text-gold">${noctis.price}</p>
              </div>
              <button
                onClick={() => addToCart(noctis)}
                className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 hover:scale-110"
                aria-label={`Add ${noctis.name} to bag`}
              >
                <Plus className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.button
        onClick={() => scrollTo("#collections")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-[0.45em] text-sand">Scroll</span>
        <div className="h-12 w-px overflow-hidden bg-line">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gold"
          />
        </div>
      </motion.button>
    </section>
  );
}
