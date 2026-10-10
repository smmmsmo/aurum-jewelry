import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useShop } from "../store";
import { PRODUCTS, type Category } from "../data/products";
import { cn } from "../utils/cn";

const COLLECTIONS: {
  key: Exclude<Category, "all">;
  name: string;
  line: string;
  image: string;
  span: string;
  height: string;
}[] = [
  {
    key: "rings",
    name: "Rings",
    line: "Signets, bands & talismans",
    image: "./images/ring-signet.jpg",
    span: "md:col-span-7",
    height: "h-[380px] md:h-[520px]",
  },
  {
    key: "bracelets",
    name: "Bracelets",
    line: "Cuffs & curbs with weight",
    image: "./images/bracelet-cuff.jpg",
    span: "md:col-span-5",
    height: "h-[380px] md:h-[520px]",
  },
  {
    key: "lockets",
    name: "Lockets",
    line: "Keepsakes for what you carry",
    image: "./images/locket-gold.jpg",
    span: "md:col-span-5",
    height: "h-[380px] md:h-[460px]",
  },
  {
    key: "chains",
    name: "Chains",
    line: "The everyday armour",
    image: "./images/chain-cuban.jpg",
    span: "md:col-span-7",
    height: "h-[380px] md:h-[460px]",
  },
];

export default function Collections() {
  const { setActiveCategory, scrollTo } = useShop();

  const open = (key: Exclude<Category, "all">) => {
    setActiveCategory(key);
    scrollTo("#shop");
  };

  return (
    <section id="collections" className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <Reveal>
          <p className="mb-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.45em] text-gold">
            <span className="h-px w-10 bg-gold" /> Collections
          </p>
          <h2 className="font-display text-5xl font-light leading-[1.02] text-cream md:text-7xl">
            Choose your <span className="italic gold-text">armour.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="max-w-xs">
          <p className="text-sm leading-relaxed text-sand">
            Four families of pieces, one philosophy: metal doesn&apos;t care who wears it.
            Neither do we.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {COLLECTIONS.map((c, i) => {
          const count = PRODUCTS.filter((p) => p.category === c.key).length;
          return (
            <motion.button
              key={c.key}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => open(c.key)}
              data-cursor="Explore"
              className={cn("group relative overflow-hidden rounded-3xl text-left", c.span, c.height)}
            >
              <img
                src={c.image}
                alt={`${c.name} collection`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-700 group-hover:from-ink/95" />

              <div className="absolute left-6 top-6 rounded-full border border-cream/20 bg-ink/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-cream backdrop-blur-sm">
                {count} {count === 1 ? "piece" : "pieces"}
              </div>

              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-gold">{c.line}</p>
                  <h3 className="font-display text-4xl font-light text-cream transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">
                    {c.name}
                  </h3>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/30 text-cream transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:h-14 md:w-14">
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
