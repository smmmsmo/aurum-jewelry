import { motion } from "framer-motion";

const letters = ["A", "U", "R", "U", "M"];

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex overflow-hidden">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-light tracking-[0.3em] text-cream md:text-7xl"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 h-px w-40 origin-center bg-gold md:w-56"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-5 text-[10px] uppercase tracking-[0.5em] text-sand"
      >
        Genderless fine jewelry
      </motion.p>
    </motion.div>
  );
}
