import { Asterisk } from "lucide-react";

const ITEMS = [
  "Rings",
  "Bracelets",
  "Lockets",
  "Chains",
  "Genderless by design",
  "Handcrafted in small batches",
  "Recycled metals only",
];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-pause overflow-hidden border-y border-line bg-coal/60 py-5">
      <div className={`flex w-max items-center gap-12 whitespace-nowrap ${reverse ? "marquee-track-rev" : "marquee-track"}`}>
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-sand">{item}</span>
            <Asterisk className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
