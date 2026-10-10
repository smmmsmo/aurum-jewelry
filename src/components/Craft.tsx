import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const MATERIALS = [
  {
    title: "18k Gold Vermeil",
    body: "A 2.5-micron pour of recycled 18k gold over solid sterling — five times thicker than standard plating, warm for decades.",
  },
  {
    title: "925 Sterling Silver",
    body: "Reclaimed silver, refined and re-cast in-house. Cool-toned, hypoallergenic and made to be worn to death.",
  },
  {
    title: "Conflict-free Stones",
    body: "Every stone is traceable to source. If we can't prove it, it doesn't touch the bench.",
  },
  {
    title: "Small-batch Casting",
    body: "No warehouses, no waste. We pour in runs of forty, and the moulds retire when the design does.",
  },
];

const STATS = [
  { value: 9, suffix: "", label: "Years at the bench" },
  { value: 40, suffix: "", label: "Pieces per batch" },
  { value: 100, suffix: "%", label: "Recycled metals" },
];

export default function Craft() {
  return (
    <section id="craft" className="relative border-t border-line bg-coal/40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="mb-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.45em] text-gold">
              <span className="h-px w-10 bg-gold" /> The craft
            </p>
            <h2 className="font-display text-5xl font-light leading-[1.02] text-cream md:text-6xl">
              Forged by hand.
              <br />
              <span className="italic gold-text">Finished with soul.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-sand">
              AURUM began at a single jeweller&apos;s bench in 2017, with one crucible and a
              stubborn belief: adornment belongs to everyone. Every piece is still poured,
              filed and polished by hand — slowly, deliberately, and without a gender label
              anywhere in sight.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-10">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12}>
                <p className="font-display text-5xl font-light text-cream md:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-sand">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          {MATERIALS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="group cursor-default border-t border-line py-8 transition-all duration-500 last:border-b hover:bg-cream/[0.03] hover:pl-6 md:py-10">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-light text-cream transition-colors duration-400 group-hover:text-gold md:text-3xl">
                    {m.title}
                  </h3>
                  <ArrowUpRight className="h-6 w-6 -translate-x-2 text-gold opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-sand">{m.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <p className="mt-10 font-display text-2xl font-light italic leading-snug text-cream/80 md:text-3xl">
              &ldquo;Metal doesn&apos;t ask questions.
              <br />
              Neither do we.&rdquo;
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-sand">
              — Mara Ellison, founder & head of bench
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
