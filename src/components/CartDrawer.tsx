import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useShop } from "../store";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, subtotal, count, scrollTo, showToast, freeShippingAt } = useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const remaining = Math.max(0, freeShippingAt - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingAt) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-line bg-coal"
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-line px-7 py-6">
              <h2 className="font-display text-2xl font-light text-cream">
                Your bag <span className="text-gold">({count})</span>
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-cream transition-colors hover:bg-cream/10"
                aria-label="Close bag"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {cart.length > 0 && (
              <div className="border-b border-line px-7 py-5">
                <p className="text-xs text-sand">
                  {remaining > 0 ? (
                    <>
                      You&apos;re <span className="text-cream">${remaining}</span> away from free worldwide shipping
                    </>
                  ) : (
                    <span className="text-gold">Free worldwide shipping unlocked</span>
                  )}
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gold"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full border border-line">
                    <ShoppingBag className="h-8 w-8 text-sand" strokeWidth={1} />
                  </div>
                  <p className="mt-6 font-display text-2xl font-light text-cream">Nothing in here yet.</p>
                  <p className="mt-2 max-w-[220px] text-sm text-sand">
                    Your future heirlooms are one click away.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      scrollTo("#shop");
                    }}
                    className="mt-8 flex h-12 items-center gap-2 rounded-full bg-gold px-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-gold-soft"
                  >
                    Explore pieces <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-line">
                          <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-lg font-light leading-tight text-cream">{item.product.name}</p>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-sand">
                                {item.metal}
                                {item.size ? ` · Size ${item.size}` : ""}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.key)}
                              className="text-sand transition-colors hover:text-gold"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
                              <button
                                onClick={() => updateQty(item.key, -1)}
                                className="grid h-6 w-6 place-items-center rounded-full text-sand transition-colors hover:text-cream"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                              </button>
                              <span className="w-4 text-center text-sm text-cream">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.key, 1)}
                                className="grid h-6 w-6 place-items-center rounded-full text-sand transition-colors hover:text-cream"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                              </button>
                            </div>
                            <p className="text-sm text-gold">${(item.product.price * item.qty).toLocaleString()}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-line px-7 py-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-sand">Subtotal</p>
                  <p className="font-display text-2xl font-light text-cream">${subtotal.toLocaleString()}</p>
                </div>
                <p className="mt-2 text-[11px] text-sand">Taxes calculated at checkout · 30-day returns</p>
                <button
                  onClick={() => showToast("Design demo — checkout is disabled")}
                  className="group mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gold text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-gold-soft"
                >
                  Checkout
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.25em] text-sand transition-colors hover:text-cream"
                >
                  Continue browsing
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
