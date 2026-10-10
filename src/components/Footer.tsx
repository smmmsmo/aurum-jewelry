import { useState } from "react";
import { ArrowRight, ArrowUp, Check } from "lucide-react";
import Reveal from "./Reveal";
import { CATEGORIES } from "../data/products";
import { useShop } from "../store";

const SOCIALS: { label: string; svg: React.ReactNode }[] = [
  {
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M15.5 4H13a3.5 3.5 0 0 0-3.5 3.5V10H7v3.5h2.5V21H13v-7.5h2.6l.6-3.5h-3.2V7.8c0-.7.5-1.3 1.2-1.3h1.3Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.5v5l4.5-2.5Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { scrollTo, setActiveCategory, showToast } = useShop();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  const shopCategory = (key: (typeof CATEGORIES)[number]["key"]) => {
    setActiveCategory(key);
    scrollTo("#shop");
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line bg-coal/60">
      {/* newsletter */}
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-24 text-center md:px-10 md:pt-32">
        <Reveal>
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-gold">The guild</p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-light leading-tight text-cream md:text-6xl">
            First pour of every drop, <span className="italic gold-text">straight to you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-sand">
            Small batches sell out in hours. Guild members hear first — no noise, one email per drop.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm text-gold">
              <Check className="h-4 w-4" strokeWidth={2} />
              Welcome to the guild. Watch your inbox.
            </div>
          ) : (
            <form onSubmit={subscribe} className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-line pb-3 transition-colors focus-within:border-gold">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 w-full bg-transparent text-sm text-cream outline-none placeholder:text-sand/60"
              />
              <button
                type="submit"
                className="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink transition-transform duration-300 hover:scale-110"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
            </form>
          )}
        </Reveal>
      </div>

      {/* link grid */}
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-line px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-light tracking-[0.35em] text-cream">
            AURUM<span className="text-gold">.</span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand">
            Genderless fine jewelry, hand-poured from recycled gold and silver.
            Worn by every body since 2017.
          </p>
          <div className="mt-7 flex gap-3">
            {SOCIALS.map(({ label, svg }) => (
              <button
                key={label}
                onClick={() => showToast(`${label} — @aurum.atelier`)}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-sand transition-all duration-300 hover:border-gold hover:text-gold"
                aria-label={label}
              >
                {svg}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold">Shop</p>
          <ul className="space-y-3">
            {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
              <li key={c.key}>
                <button onClick={() => shopCategory(c.key)} className="text-sm text-sand transition-colors hover:text-cream">
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold">House</p>
          <ul className="space-y-3">
            <li><button onClick={() => scrollTo("#craft")} className="text-sm text-sand transition-colors hover:text-cream">Our craft</button></li>
            <li><button onClick={() => scrollTo("#forall")} className="text-sm text-sand transition-colors hover:text-cream">For all</button></li>
            <li><button onClick={() => scrollTo("#reviews")} className="text-sm text-sand transition-colors hover:text-cream">Reviews</button></li>
            <li><button onClick={() => showToast("The journal opens this winter")} className="text-sm text-sand transition-colors hover:text-cream">Journal</button></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold">Care</p>
          <ul className="space-y-3">
            <li><button onClick={() => showToast("Free worldwide shipping over $500")} className="text-sm text-sand transition-colors hover:text-cream">Shipping</button></li>
            <li><button onClick={() => showToast("30-day returns — no questions asked")} className="text-sm text-sand transition-colors hover:text-cream">Returns</button></li>
            <li><button onClick={() => showToast("A free size guide ships with every order")} className="text-sm text-sand transition-colors hover:text-cream">Size guide</button></li>
            <li><button onClick={() => showToast("Write to us — hello@aurum.example")} className="text-sm text-sand transition-colors hover:text-cream">Contact</button></li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 border-t border-line px-5 py-8 md:px-10">
        <p className="text-[11px] tracking-wide text-sand">© 2026 AURUM Atelier — designed for every body.</p>
        <div className="flex items-center gap-2">
          {["VISA", "MASTERCARD", "AMEX", "PAYPAL"].map((p) => (
            <span key={p} className="rounded-md border border-line px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] text-sand">
              {p}
            </span>
          ))}
        </div>
        <button
          onClick={() => scrollTo("top")}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-gold"
        >
          Back to top
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-gold group-hover:-translate-y-1">
            <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </button>
      </div>

      {/* watermark */}
      <div className="pointer-events-none relative flex justify-center overflow-hidden">
        <span className="text-outline -mb-[0.23em] select-none font-display text-[21vw] font-light leading-none tracking-[0.08em]">
          AURUM
        </span>
      </div>
    </footer>
  );
}
