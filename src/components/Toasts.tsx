import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useShop } from "../store";

export default function Toasts() {
  const { toasts } = useShop();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[150] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex items-center gap-3 rounded-full border border-gold/30 bg-coal/90 px-6 py-3.5 shadow-2xl shadow-ink backdrop-blur-xl"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
            <span className="text-xs tracking-wide text-cream">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
