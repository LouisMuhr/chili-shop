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
      {/* Dein ganzes wunderschönes Design – bleibt unverändert */}
      {/* ... Noise, Glow, Hero usw. wie vorher ... */}

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
                  className="group relative bg-gradient-to-b from-[#111111] to-black rounded-3xl overflow-hidden border border-gray-900 shadow-2xl hover:border-[#e63946]/60 transition-all duration-500 hover:shadow-[#e63946]/30 hover:-translate-y-3 flex flex-col cursor-pointer"
                >
                  {/* Bild + Badges */}
                  <div className="relative aspect-[5/6] bg-black overflow-hidden">
                    <Image
                      src={p.image || "/images/fallback.jpg"}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-black font-bold px-4 py-2 rounded-full text-xs shadow-xl border border-orange-400">
                      {p.hotness.toLocaleString("de-DE")} SHU
                    </div>
                    {hasDiscount && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-5 py-3 rounded-2xl text-lg shadow-2xl border-2 border-red-700 transform rotate-6">
                        −{discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div className="text-center space-y-8">
                      <h3 className="text-3xl md:text-2xl font-black text-white font-display leading-tight min-h-6 flex items-center justify-center">
                        {p.name}
                      </h3>
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

                    <div className="text-center mt-12">
                      <PriceDisplay
                        originalPrice={p.price}
                        discountPercent={p.discountPercent}
                        className="text-2xl md:text-3xl justify-center mb-6"
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            id: p.id,
                            name: p.name,
                            price: finalPrice,
                          });
                          showToast(); // ← EINMALIG!
                        }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
                      >
                        Warenkorb
                      </button>
                    </div>
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
