import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useShop } from "../store";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, setQuickView } = useShop();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (searchOpen) setQ("");
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(query) || p.category.includes(query) || p.metals.some((m) => m.toLowerCase().includes(query))
    );
  }, [q]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[97] overflow-y-auto bg-ink/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-3xl px-6 pb-24 pt-24 md:pt-32">
            <button
              onClick={() => setSearchOpen(false)}
              className="fixed right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-cream/15 text-cream transition-colors hover:bg-cream/10"
              aria-label="Close search"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 border-b border-line pb-5 focus-within:border-gold">
                <Search className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rings, lockets, gold…"
                  className="w-full bg-transparent font-display text-3xl font-light text-cream outline-none placeholder:text-sand/50 md:text-4xl"
                />
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-sand">
                {q.trim() ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Popular right now"}
              </p>

              <div className="mt-8">
                {results.length === 0 ? (
                  <p className="py-16 text-center font-display text-2xl font-light italic text-sand">
                    No pieces match &ldquo;{q}&rdquo; — yet.
                  </p>
                ) : (
                  results.map((p, i) => (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      onClick={() => {
                        setQuickView(p);
                        setSearchOpen(false);
                      }}
                      className="group flex w-full items-center gap-5 border-b border-line/70 py-5 text-left transition-all duration-300 hover:pl-3"
                    >
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-line">
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-xl font-light text-cream transition-colors group-hover:text-gold">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-sand">{p.category}</p>
                      </div>
                      <p className="text-sm text-gold">${p.price}</p>
                      <ArrowUpRight className="h-4 w-4 text-sand opacity-0 transition-all duration-300 group-hover:text-gold group-hover:opacity-100" strokeWidth={1.5} />
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
