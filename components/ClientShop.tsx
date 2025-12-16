// components/ClientShop.tsx ← KOMPLETT ERSETZEN!

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cartStore";
import ProductInfo from "@/components/ProductInfo";
import PriceDisplay from "@/components/PriceDisplay";

type Product = {
  id: string;
  name: string;
  price: number;
  hotness: number;
  spiciness: number;
  image?: string;
  discountPercent?: number;
};

export default function ClientShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState(false); // EINZIGER Toast-State!
  const { addItem } = useCart();

  // Zentrale Toast-Funktion – wird überall benutzt
  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 1000);
  };

  useEffect(() => {
    fetch("/data/products.json?t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950 flex items-center justify-center relative overflow-hidden">
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4 animate-pulse">Chili</div>
          <div className="text-4xl text-[#e63946] font-black animate-pulse">
            Lade Produkte...
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950 flex items-center justify-center">
        <div className="text-3xl text-gray-400">Noch keine Produkte</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-stone-950 relative overflow-hidden">
      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-red-600/20 border border-red-600/30 rounded-full">
            <span className="text-red-400 font-semibold text-sm tracking-wider uppercase">
              🔥 Extrem scharf
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Zizu
            </span>
            <br />
            <span className="text-white">Peppers</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Die schärfsten Chilis der Welt –
            <span className="text-red-400 font-semibold"> handverlesen</span>{" "}
            und
            <span className="text-orange-400 font-semibold">
              {" "}
              extrem scharf
            </span>
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="px-6 py-3 bg-white/5 rounded-full border border-white/100">
              ⚡ Schneller Versand
            </div>
            <div className="px-6 py-3 bg-white/5 rounded-full border border-white/100">
              🌡️ Bis 2.2 Mio SHU
            </div>
            <div className="px-6 py-3 bg-white/5 rounded-full border border-white/100">
              ✓ Premium Qualität
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              Unsere Chilis
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((p) => {
              const discount = p.discountPercent ?? 0;
              const hasDiscount = discount > 0;
              const finalPrice = p.price * (1 - discount / 100);

              return (
                <article
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/40 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 cursor-pointer flex flex-col"
                >
                  {/* Bild - größeres Aspect Ratio */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.image || "/images/fallback.jpg"}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Info direkt auf dem Bild */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <h3 className="text-2xl font-black text-white leading-tight line-clamp-2">
                        {p.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg transition-opacity ${
                                i < p.spiciness ? "opacity-100" : "opacity-20"
                              }`}
                            >
                              🌶️
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rabatt Badge - größer */}
                    {hasDiscount && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-5 py-3 rounded-xl text-lg backdrop-blur-sm shadow-xl border-2 border-red-700 transform rotate-6">
                        −{discount}%
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm text-black font-bold px-4 py-2 rounded-full text-sm shadow-xl">
                      {p.hotness.toLocaleString("de-DE")} SHU
                    </div>
                  </div>

                  {/* Preis + Button - mehr Padding */}
                  <div className="p-6 space-y-4">
                    <PriceDisplay
                      originalPrice={p.price}
                      discountPercent={p.discountPercent}
                      className="text-2xl font-black"
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const finalPrice =
                          p.price * (1 - (p.discountPercent ?? 0) / 100);
                        addItem({
                          id: p.id, name: p.name, price: finalPrice,
                          quantity: 1
                        });
                        showToast();
                      }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
                    >
                      In den Warenkorb
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Produkt-Modal */}
      {selectedProduct && (
        <ProductInfo
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          showToast={showToast} // ← weitergegeben!
        />
      )}

      {/* Schöner Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-2xl border border-green-400 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Gekauft!
          </div>
        </div>
      )}

      <div className="h-24"></div>
    </div>
  );
}
