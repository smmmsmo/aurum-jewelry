import { Star } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  { name: "Jules M.", piece: "Solis Signet", text: "Bought it for my partner, stole it back within a week. We're a two-signet household now." },
  { name: "Amara K.", piece: "Eon Cuban Chain", text: "The weight is unreal. I've owned 'luxury' chains that feel like toys next to this." },
  { name: "Ren T.", piece: "Luna Locket", text: "Keeps a photo of my grandmother. The hinge closes so softly it feels like a secret being kept." },
  { name: "Dev P.", piece: "Vapor Cuff", text: "Strangers stop me to ask about it weekly. No men's or women's counter has ever done that." },
  { name: "Sofia L.", piece: "Noctis Signet", text: "Heavy in the best way. Like wearing a decision you're proud of." },
  { name: "Theo B.", piece: "Meridian Curb", text: "Clasped one-handed on the first try, worn every single day since. Zero tarnish, zero regrets." },
];

const REVERSED = [...REVIEWS].reverse();

function Card({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border border-line bg-coal p-7 md:w-[360px]">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1} />
        ))}
      </div>
      <p className="mt-5 min-h-[96px] text-sm leading-relaxed text-cream/90">&ldquo;{r.text}&rdquo;</p>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream">{r.name}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{r.piece}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="overflow-hidden border-t border-line py-24 md:py-36">
      <Reveal className="mx-auto mb-14 max-w-[1440px] px-5 text-center md:mb-16 md:px-10">
        <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-gold">Worn & loved</p>
        <h2 className="font-display text-5xl font-light text-cream md:text-7xl">
          From every <span className="italic gold-text">wrist, hand & neck.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-sand">
          12,000+ five-star reviews across every identity imaginable.
        </p>
      </Reveal>

      <div className="marquee-pause space-y-6">
        <div className="flex overflow-hidden">
          <div className="marquee-track-slow flex w-max gap-6 pr-6">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <Card key={`a-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="marquee-track-rev flex w-max gap-6 pr-6">
            {[...REVERSED, ...REVERSED].map((r, i) => (
              <Card key={`b-${i}`} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
