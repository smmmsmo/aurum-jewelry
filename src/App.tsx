import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ShopProvider } from "./store";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Collections from "./components/Collections";
import Shop from "./components/Shop";
import ForAll from "./components/ForAll";
import Craft from "./components/Craft";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import QuickView from "./components/QuickView";
import SearchOverlay from "./components/SearchOverlay";
import Toasts from "./components/Toasts";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1750);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <ShopProvider>
      <div className="noise relative min-h-screen bg-ink">
        <Cursor />

        <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <main>
              <Hero />
              <Marquee />
              <Collections />
              <Shop />
              <ForAll />
              <Craft />
              <Testimonials />
              <Marquee reverse />
            </main>
            <Footer />
          </>
        )}

        <CartDrawer />
        <QuickView />
        <SearchOverlay />
        <Toasts />
      </div>
    </ShopProvider>
  );
}
