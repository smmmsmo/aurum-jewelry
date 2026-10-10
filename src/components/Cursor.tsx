import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const dc = t.closest("[data-cursor]") as HTMLElement | null;
      setLabel(dc?.dataset.cursor ?? null);
      setHover(!!t.closest("a, button, input, textarea, select, [role='button']"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[210]">
      {/* precise dot — follows instantly */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* trailing ring */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-gold/70"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 76 : hover ? 52 : 34,
          height: label ? 76 : hover ? 52 : 34,
          backgroundColor: label ? "rgba(200,164,92,0.92)" : hover ? "rgba(200,164,92,0.12)" : "rgba(200,164,92,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
