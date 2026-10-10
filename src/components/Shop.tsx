import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import Reveal from "./Reveal";
import { CATEGORIES, PRODUCTS, type Product } from "../data/products";
import { useShop } from "../store";
import { cn } from "../utils/cn";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, setQuickView } = useShop();
  const [liked, setLiked] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-coal"
        data-cursor="View"
        onClick={() => setQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {product.tag && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em]",
              product.tag === "Limited" ? "bg-gold text-ink" : "bg-cream/90 text-ink"
            )}
          >
            {product.tag}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((l) => !l);
          }}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-ink/40 text-cream backdrop-blur-md transition-all duration-300 hover:scale-110"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("h-4 w-4 transition-all duration-300", liked && "fill-gold text-gold scale-110")}
            strokeWidth={1.5}
          />
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-cream text-[10px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            Add to bag
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickView(product);
            }}
            className="grid h-12 w-12 place-items-center rounded-full border border-cream/25 bg-ink/50 text-cream backdrop-blur-md transition-colors duration-300 hover:border-gold hover:text-gold"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <h3
            className="cursor-pointer font-display text-xl font-light text-cream transition-colors duration-300 hover:text-gold"
            onClick={() => setQuickView(product)}
          >
            {product.name}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sand">
            {product.category}
            <span className="inline-block h-0.5 w-0.5 rounded-full bg-sand" />
            <span className="flex items-center gap-1 normal-case tracking-normal">
              <Star className="h-3 w-3 fill-gold text-gold" /> {product.rating}
            </span>
          </p>
        </div>
        <p className="pt-0.5 text-base text-gold">${product.price}</p>
      </div>
    </motion.article>
  );
}

export default function Shop() {
  const { activeCategory, setActiveCategory } = useShop();

  const filtered = useMemo(
    () => (activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section id="shop" className="relative border-t border-line bg-coal/40">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
          <Reveal>
            <p className="mb-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.45em] text-gold">
              <span className="h-px w-10 bg-gold" /> The vault
            </p>
            <h2 className="font-display text-5xl font-light leading-[1.02] text-cream md:text-7xl">
              Every piece. <span className="italic gold-text">Every one.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = activeCategory === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActiveCategory(c.key)}
                    className={cn(
                      "relative rounded-full px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                      active ? "text-ink" : "text-sand hover:text-cream"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-16 text-center" delay={0.1}>
          <p className="text-xs uppercase tracking-[0.3em] text-sand">
            Showing {filtered.length} of {PRODUCTS.length} handcrafted pieces
          </p>
        </Reveal>
      </div>
    </section>
  );
}
