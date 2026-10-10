export type Category = "all" | "rings" | "bracelets" | "lockets" | "chains";

export interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "all">;
  price: number;
  image: string;
  tag?: "New" | "Bestseller" | "Limited";
  rating: number;
  reviews: number;
  blurb: string;
  details: string[];
  metals: string[];
  sizes?: string[];
}

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All Pieces" },
  { key: "rings", label: "Rings" },
  { key: "bracelets", label: "Bracelets" },
  { key: "lockets", label: "Lockets" },
  { key: "chains", label: "Chains" },
];

export const FREE_SHIPPING_AT = 500;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Noctis Signet",
    category: "rings",
    price: 265,
    image: "./images/hero.jpg",
    tag: "Limited",
    rating: 4.9,
    reviews: 312,
    blurb:
      "Our heaviest pour. A sculpted signet with a molten face, cast from recycled 18k gold and finished entirely by hand.",
    details: ["Recycled 18k gold vermeil", "Hand-finished in small batches", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["18k Gold Vermeil", "925 Sterling Silver"],
    sizes: ["6", "7", "8", "9", "10"],
  },
  {
    id: 2,
    name: "Solis Signet",
    category: "rings",
    price: 240,
    image: "./images/ring-signet.jpg",
    tag: "Bestseller",
    rating: 4.8,
    reviews: 486,
    blurb:
      "A brushed signet engraved with a single celestial star — a quiet talisman for every day and everybody.",
    details: ["Recycled 18k gold vermeil", "Engraved by hand", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["18k Gold Vermeil", "925 Sterling Silver"],
    sizes: ["6", "7", "8", "9", "10"],
  },
  {
    id: 3,
    name: "Terra Band",
    category: "rings",
    price: 145,
    image: "./images/ring-band.jpg",
    rating: 4.7,
    reviews: 203,
    blurb:
      "Hammered matte silver, softened at the edges. Stacks beautifully, stands alone even better.",
    details: ["Recycled 925 sterling silver", "Hammered matte finish", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["925 Sterling Silver", "18k Gold Vermeil"],
    sizes: ["6", "7", "8", "9", "10"],
  },
  {
    id: 4,
    name: "Vapor Cuff",
    category: "bracelets",
    price: 310,
    image: "./images/bracelet-cuff.jpg",
    tag: "Limited",
    rating: 5.0,
    reviews: 98,
    blurb:
      "An organic, molten cuff that looks poured rather than made. No two pours are ever the same.",
    details: ["Recycled 18k gold vermeil", "One-of-one molten texture", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["18k Gold Vermeil"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Meridian Curb",
    category: "bracelets",
    price: 190,
    image: "./images/bracelet-chain.jpg",
    rating: 4.8,
    reviews: 167,
    blurb:
      "A weighty curb bracelet with a minimal toggle — engineered to be clasped one-handed, worn forever.",
    details: ["Recycled 925 sterling silver", "Minimal toggle clasp", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["925 Sterling Silver", "18k Gold Vermeil"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    name: "Solis Locket",
    category: "lockets",
    price: 280,
    image: "./images/locket-gold.jpg",
    tag: "Bestseller",
    rating: 4.9,
    reviews: 541,
    blurb:
      "A round locket engraved with a sunburst, sized to hold whatever — or whoever — you carry with you.",
    details: ["Recycled 18k gold vermeil", "Holds two 12mm photos", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["18k Gold Vermeil", "925 Sterling Silver"],
  },
  {
    id: 7,
    name: "Luna Locket",
    category: "lockets",
    price: 215,
    image: "./images/locket-silver.jpg",
    tag: "New",
    rating: 4.6,
    reviews: 74,
    blurb:
      "An oval keepsake in cool sterling silver, hinged to open silently and close like a secret.",
    details: ["Recycled 925 sterling silver", "Holds two 10mm photos", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["925 Sterling Silver", "18k Gold Vermeil"],
  },
  {
    id: 8,
    name: "Eon Cuban Chain",
    category: "chains",
    price: 520,
    image: "./images/chain-cuban.jpg",
    tag: "New",
    rating: 4.9,
    reviews: 129,
    blurb:
      "A heavyweight Cuban with hand-polished links and our hidden box clasp. The one chain that ends the search.",
    details: ["Recycled 18k gold vermeil", "Hidden box clasp", "Hypoallergenic · nickel-free", "Ships in 48h · free returns"],
    metals: ["18k Gold Vermeil", "925 Sterling Silver"],
    sizes: ["45cm", "50cm", "55cm"],
  },
];
