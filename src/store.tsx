import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { FREE_SHIPPING_AT, type Category, type Product } from "./data/products";

export interface CartItem {
  key: string;
  product: Product;
  qty: number;
  metal: string;
  size?: string;
}

interface ToastMsg {
  id: number;
  message: string;
}

interface ShopCtx {
  cart: CartItem[];
  addToCart: (p: Product, qty?: number, metal?: string, size?: string) => void;
  updateQty: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (b: boolean) => void;
  toasts: ToastMsg[];
  showToast: (m: string) => void;
  count: number;
  subtotal: number;
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
  scrollTo: (target: string) => void;
  freeShippingAt: number;
}

const Ctx = createContext<ShopCtx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const lenisRef = useRef<Lenis | null>(null);

  /* ------- smooth scroll engine ------- */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    const lenis = lenisRef.current;
    const el = target === "top" ? 0 : document.querySelector(target);
    if (lenis && el !== null) {
      lenis.scrollTo(el as HTMLElement | number, { offset: target === "top" ? 0 : -72, duration: 1.4 });
    } else if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      (el as HTMLElement | null)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /* ------- toasts ------- */
  const showToast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, message }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  /* ------- cart ------- */
  const addToCart = useCallback(
    (p: Product, qty = 1, metal?: string, size?: string) => {
      const m = metal ?? p.metals[0];
      const s = size ?? (p.sizes ? p.sizes[Math.floor(p.sizes.length / 2)] : undefined);
      const key = `${p.id}-${m}-${s ?? "os"}`;
      setCart((c) => {
        const found = c.find((i) => i.key === key);
        if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...c, { key, product: p, qty, metal: m, size: s }];
      });
      showToast(`Added to bag — ${p.name}`);
    },
    [showToast]
  );

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((c) =>
      c
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((c) => c.filter((i) => i.key !== key));
  }, []);

  const count = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((n, i) => n + i.qty * i.product.price, 0), [cart]);

  /* ------- keyboard + scroll lock ------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const locked = cartOpen || !!quickView || searchOpen || menuOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, quickView, searchOpen, menuOpen]);

  const value: ShopCtx = {
    cart,
    addToCart,
    updateQty,
    removeItem,
    cartOpen,
    setCartOpen,
    quickView,
    setQuickView,
    searchOpen,
    setSearchOpen,
    menuOpen,
    setMenuOpen,
    toasts,
    showToast,
    count,
    subtotal,
    activeCategory,
    setActiveCategory,
    scrollTo,
    freeShippingAt: FREE_SHIPPING_AT,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
