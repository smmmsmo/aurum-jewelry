import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useShop } from "../store";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Shop", target: "#shop" },
  { label: "Collections", target: "#collections" },
  { label: "For All", target: "#forall" },
  { label: "Craft", target: "#craft" },
];

export default function Navbar() {
  const { count, setCartOpen, setSearchOpen, scrollTo, menuOpen, setMenuOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollTo(target), menuOpen ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass border-b border-line" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button
            onClick={() => go("top")}
            className="font-display text-xl font-light tracking-[0.4em] text-cream md:text-2xl"
            aria-label="AURUM home"
          >
            AURUM<span className="text-gold">.</span>
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.target)}
                className="group relative text-[11px] uppercase tracking-[0.28em] text-sand transition-colors duration-300 hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-400 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-cream transition-colors duration-300 hover:bg-cream/10"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-cream transition-colors duration-300 hover:bg-cream/10"
              aria-label="Open bag"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-cream transition-colors duration-300 hover:bg-cream/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ------- mobile menu ------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[120] flex flex-col bg-ink/97 px-8 pb-10 pt-5 backdrop-blur-xl"
          >
            <div className="flex h-[52px] items-center justify-between">
              <span className="font-display text-xl tracking-[0.4em] text-cream">
                AURUM<span className="text-gold">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(l.target)}
                  className="flex items-baseline gap-4 border-b border-line py-5 text-left"
                >
                  <span className="text-[10px] tracking-[0.3em] text-gold">0{i + 1}</span>
                  <span className="font-display text-4xl font-light text-cream">{l.label}</span>
                </motion.button>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto text-[10px] uppercase tracking-[0.4em] text-sand"
            >
              Genderless fine jewelry — est. 2017
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
