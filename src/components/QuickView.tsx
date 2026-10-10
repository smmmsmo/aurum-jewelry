import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, Star, X } from "lucide-react";
import { useShop } from "../store";
import { cn } from "../utils/cn";

export default function QuickView() {
  const { quickView: p, setQuickView, addToCart } = useShop();
  const [metal, setMetal] = useState("");
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (p) {
      setMetal(p.metals[0]);
      setSize(p.sizes ? p.sizes[Math.floor(p.sizes.length / 2)] : undefined);
      setQty(1);
    }
  }, [p]);

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setQuickView(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [p, setQuickView]);

  return (
    <AnimatePresence>
      {p && (
        <div className="fixed inset-0 z-[96] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setQuickView(null)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-line bg-coal md:grid-cols-2"
            role="dialog"
            aria-label={`Quick view ${p.name}`}
          >
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-cream/15 bg-ink/50 text-cream backdrop-blur-md transition-colors hover:bg-cream/10"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="relative hidden md:block">
              <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
              {p.tag && (
                <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-ink">
                  {p.tag}
                </span>
              )}
            </div>

            <div className="max-h-[90vh] overflow-y-auto p-7 md:p-10">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl md:hidden">
                <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{p.category}</p>
              <h3 className="mt-2 font-display text-4xl font-light text-cream">{p.name}</h3>

              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-3.5 w-3.5", i < Math.round(p.rating) ? "fill-gold text-gold" : "text-line")}
                      strokeWidth={1}
                    />
                  ))}
                </span>
                <span className="text-sand">
                  {p.rating} · {p.reviews} reviews
                </span>
              </div>

              <p className="mt-5 font-display text-3xl font-light text-gold">${p.price}</p>
              <p className="mt-4 text-sm leading-relaxed text-sand">{p.blurb}</p>

              <div className="mt-7">
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-sand">Finish</p>
                <div className="flex flex-wrap gap-2">
                  {p.metals.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetal(m)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-[11px] tracking-wide transition-all duration-300",
                        metal === m
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-line text-sand hover:border-cream/40 hover:text-cream"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {p.sizes && (
                <div className="mt-6">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-sand">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {p.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cn(
                          "grid h-10 min-w-10 place-items-center rounded-full border px-3 text-[11px] transition-all duration-300",
                          size === s
                            ? "border-gold bg-gold text-ink font-semibold"
                            : "border-line text-sand hover:border-cream/40 hover:text-cream"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-14 items-center gap-4 rounded-full border border-line px-4">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-sand transition-colors hover:text-cream"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <span className="w-5 text-center text-cream">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="text-sand transition-colors hover:text-cream"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    addToCart(p, qty, metal, size);
                    setQuickView(null);
                  }}
                  className="flex h-14 flex-1 items-center justify-center gap-3 rounded-full bg-gold text-[11px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-gold-soft"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={2} />
                  Add to bag — ${(p.price * qty).toLocaleString()}
                </button>
              </div>

              <ul className="mt-8 space-y-2.5 border-t border-line pt-6">
                {p.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-xs text-sand">
                    <Check className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
