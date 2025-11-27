// data/products.ts  (oder src/data/products.ts – je nach deiner Struktur)

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  hotness: number;      // ← jetzt Zahl, kein String mehr!
  spiciness: number;    // ← 1 bis 5
};

export const products = [
  {
    id: "1",
    name: "Carolina Reaper Pulver",
    price: 19.99,
    image: "/images/Roller.jpeg",
    description: "Die schärfste Chili der Welt als Pulver",
    hotness: 2_200_000,   // ← echte Zahl → 2.200.000 SHU
    spiciness: 5,
  },
  {
    id: "2",
    name: "Habanero Chili-Sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1595429776812-4dd4581d97c8?w=800",
    description: "Fruchtig-scharfe Sauce",
    hotness: 200_000,
    spiciness: 4,
  },
  {
    id: "3",
    name: "Jalapeño mild",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1625246333197-973eae2e4ce4?w=800",
    description: "Perfekt für Einsteiger",
    hotness: 5_000,
    spiciness: 2,
  },
  {
    id: "4",
    name: "Jalapeño Leon",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1625246333197-973eae2e4ce4?w=800",
    description: "Perfekt für Einsteiger",
    hotness: 5_000,
    spiciness: 2,
  },
  {
    id: "5",
    name: "Orange Kind",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1625246333197-973eae2e4ce4?w=800",
    description: "Perfekt für Einsteiger",
    hotness: 5_000,
    spiciness: 2,
  },
] as const;