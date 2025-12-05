// components/ClientShop.tsx ← KOMPLETT ERSETZEN – Copy & Paste!

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cartStore";

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
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/data/products.json?t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-32 text-4xl text-[#e63946]">Lade Produkte...</div>;
  if (products.length === 0) return <div className="text-center py-32 text-3xl text-gray-500">Noch keine Produkte</div>;

  return (
    <section className="py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((p) => {
            const discount = p.discountPercent ?? 0;
            const hasDiscount = discount > 0;
            const finalPrice = p.price * (1 - discount / 100);

            return (
              <article
                key={p.id}
                className="group relative bg-gradient-to-b from-[#111111] to-black rounded-3xl overflow-hidden border border-gray-900 shadow-2xl hover:border-[#e63946]/60 transition-all duration-500 hover:shadow-[#e63946]/30 hover:-translate-y-3 flex flex-col"
              >
                {/* Bild */}
                <div className="relative aspect-[5/6] bg-black overflow-hidden">
                  <Image
                    src={p.image || "/images/fallback.jpg"}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* SHU Badge – kleiner, links oben */}
                  <div className="absolute top-4 left-4 bg-orange-500 text-black font-bold px-4 py-2 rounded-full text-xs shadow-xl border border-orange-400">
                    {p.hotness.toLocaleString("de-DE")} SHU
                  </div>

                  {/* Rabatt Badge – fett rechts oben */}
                  {hasDiscount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-5 py-3 rounded-2xl text-lg shadow-2xl border-2 border-red-700 transform rotate-6">
                      −{discount}%
                    </div>
                  )}
                </div>

                {/* Inhalt */}
                <div className="flex-1 p-10 flex flex-col justify-between">
                  <div className="text-center space-y-8">
                    <h3 className="text-3xl md:text-2xl font-black text-white font-display leading-tight min-h-6 flex items-center justify-center">
                      {p.name}
                    </h3>

                    <div className="flex justify-center gap-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl transition-all ${
                            i < p.spiciness
                              ? "text-[#e63946] drop-shadow-glow"
                              : "text-gray-700"
                          }`}
                        >
                          Chili
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preis + Button – sauber unten */}
                  <div className="flex items-center justify-between gap-6 mt-10">
                    <div className="text-left">
                      {hasDiscount && (
                        <span className="block text-lg text-gray-500 line-through">
                          {p.price.toFixed(2)}€
                        </span>
                      )}
                      <span className="text-2xl font-black text-[#e63946] tracking-tighter">
                        {finalPrice.toFixed(2)}€
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        addItem({ id: p.id, name: p.name, price: finalPrice })
                      }
                      className="px-4 py-4 bg-[#e63946] hover:bg-[#c1121f] text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-[#e63946]/60 transform hover:scale-105 transition-all duration-300 border-2 border-red-800 whitespace-nowrap flex-shrink-0"
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
  );
}